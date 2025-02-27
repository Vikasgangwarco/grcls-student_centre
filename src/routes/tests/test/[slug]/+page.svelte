<script>
  import Youtube from "svelte-youtube-embed";
  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import { TaskTimer } from "tasktimer";
  import Scq from "../../../../lib/components/questions/test_questions/scq.svelte";
  import Tests from "../../../../lib/components/Lists/modern/tests.svelte";
  import SubjectWiseQuestions from "../../../../lib/components/Lists/test/subject_wise_questions.svelte";
  import { update_await_block_branch } from "svelte/internal";
  import TestOverview from "../../../../lib/components/Lists/test/test_overview.svelte";
  import Mcq from "../../../../lib/components/questions/test_questions/mcq.svelte";
  import Integer from "../../../../lib/components/questions/test_questions/integer.svelte";
  import Comprehension from "../../../../lib/components/questions/test_questions/comprehension.svelte";
  import Matrix from "../../../../lib/components/questions/test_questions/matrix.svelte";
  let timer, timerTask;
  let body = {};
  let syncInterval = 15;
  let time = 11110;
  let time1 = 11233;
  let selectedQuestion = 0,
    selectedAnswer = "";
  let totalQuestions = 0;
  let testOverview = {
    saved: 0,
    notAnswered: 0,
    markedReview: 0,
    savedAndMarkedReview: 0,
    empty: 0,
  };
  let currentQuestion;
  let markings;
  let test,
    testQuestions = [];
  let testSections = [];
  let subjectWiseQuestions = {};
  let timerInterval;
  /** @type {import('./$types').PageData} */
  export let data;
  let testStateId = data.testStateId;
  console.log("test state id from slug:" + testStateId);
  let testState;

  let batch_id;
  let branch_id;

  var loginPath = get(ApiUrl);
  onMount(async () => {
    console.log("mounted");
    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }
    Token.set(token);
    console.log(loginPath + "/auth/whoami");
    const res = await fetch(
      loginPath + "/user/students/test_state/" + testStateId,
      {
        mode: "cors",
        method: "get",
        headers: { Authorization: "Bearer " + token },
      },
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        testState = response.data;
        console.log("Test state");
        console.log(testState);
        test = testState.test;
        console.log(test);
        testQuestions = [];
        testSections = test.structure.sections;
        console.log("Test sections");
        console.log(testSections);
        initializeTestState(testState);
        if (testState.test_state_status == "uninitialized") {
          console.log("initializing test state");
        }

        markings = testState.data;
        // TODO: Fix subject to not be an array
        var i = 0;
        for (var section in testSections) {
          testSections[section].attempted_questions = 0;
          testSections[section].markedQuestions = []; // array that keeps a record of which questions have been attempted
          for (var question in testSections[section].questions) {
            let q = testSections[section].questions[question];
            q.question.sequence = i;

            if (markings[i].visited) {
              if (markings[i].attempted) {
                testSections[section].attempted_questions++;
                testSections[section].markedQuestions.push(i);
                if (markings[i].review_later) {
                  testOverview.savedAndMarkedReview++;
                } else {
                  testOverview.saved++;
                }
              } else {
                if (markings[i].review_later) {
                  testOverview.markedReview++;
                } else {
                  testOverview.notAnswered++;
                }
              }
            } else {
              testOverview.empty++;
            }

            q.question.sectionIndex = section;
            q.question.sectionName = testSections[section].name;
            q.question.instructions = q.instructions;
            i++;

            console.log(q.subject.name);
            if (subjectWiseQuestions[q.subject.name] == null) {
              subjectWiseQuestions[q.subject.name] = [];
            }
            q.question.subject = q.subject;
            testQuestions.push(q.question);
            subjectWiseQuestions[q.subject.name].push(q.question);
          }
        }

        console.log("done creating subject wise list");
        console.log(testQuestions);
        console.log(subjectWiseQuestions);
        currentQuestion = testQuestions[selectedQuestion];

        markings = markings.map((m) => {
          if (!m.review_later) {
            m.review_later = false;
          }
          return m;
        });
        if (
          currentQuestion.question_type == "mcq" ||
          (currentQuestion.question_type == "comprehension" &&
            currentQuestion.question_subtype == "mcq")
        ) {
          selectedAnswer = markings[selectedQuestion].attempted
            ? markings[selectedQuestion].answer_value
            : [];
        } else {
          selectedAnswer = markings[selectedQuestion].attempted
            ? markings[selectedQuestion].answer_value
            : "";
        }
        time = testState.time_left;

        timer = new TaskTimer(time);
        timerInterval = setInterval(async () => {
          if (time == 0) {
            console.log("submitting test");

            if (await syncServer()) {
              await submitTest();
              if (timerInterval != null) {
                clearInterval(timerInterval);
                timerInterval = null;
              }
            } else {
            }

            return;
          }
          time--;
          if (time % syncInterval == 0) {
            syncServer();
          }
          // console.log(time);
          if (markings) {
            // console.log("time allotted to Question: "+currentQuestion._id+":"+markings[selectedQuestion].time_allotted);
            markings[selectedQuestion].time_allotted++;
          }
        }, 1000);

        timer.on("tick", () => {
          // time--;
          // console.log(time);

          if (markings) {
            // console.log("time allotted to Question: "+currentQuestion._id+":"+markings[selectedQuestion].time_allotted);
            markings[selectedQuestion].time_allotted++;
          }
        });

        timer.add([
          {
            id: "sync-server", // unique ID of the task
            tickInterval: 20, // run every 5 ticks (5 x interval = 5000 ms)
            totalRuns: 0, // run 10 times only. (set to 0 for unlimited times)
            callback(task) {
              // code to be executed on each run
              // console.log(`${task.id} task has run ${task.currentRuns} times.`);
              syncServer();
            },
          },
        ]);

        // timer.start();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(await res.text());
    }
  });

  function initializeTestState(testState) {
    // testState.data
    for (var section in testSections) {
      for (var question in testSections[section].questions) {
        let q = testSections[section].questions[question];
        console.log("q");
        console.log(q);
        let s = testSections[section];
        let data = {
          question: {
            question: q.question._id,
            subject: q.subject._id,
            scheme: q.scheme._id,
            instructions: q.instructions._id,
          },
          attempted: false,
          subject: q.subject.name,
          visited: false,
          time_allotted: 0,
          is_optional:
            s.section_type == "optional-jee" ||
            s.section_type == "optional-neet",
          contribution: false,
        };
        if (
          q.question.question_type == "mcq" ||
          (q.question.question_type == "comprehension" &&
            q.question.question_subtype == "mcq")
        ) {
          data.answer_value = [];
        } else {
          data.answer_value = "";
        }
        console.log(data);
        testState.data.push(data);
      }
    }

    testState.test_state_status = "running";
  }

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    // return hDisplay + mDisplay + sDisplay;

    var hDisplay = h > 0 ? h + (h == 1 ? "  :" : " : ") : "00 :";
    var mDisplay = m > 0 ? m + (m == 1 ? "  :" : " : ") : "00 :";
    var sDisplay = s > 0 ? s + (s == 1 ? " " : " ") : "00 ";
    return hDisplay + mDisplay + sDisplay;
  }

  async function syncServer() {
    // console.log("sync-server");
    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }
    Token.set(token);
    console.log(loginPath + "/auth/whoami");
    let data = {
      data: markings,
      time_left: time,
    };

    const res = await fetch(
      loginPath + "/user/students/update_test_state/" + testStateId,
      {
        mode: "cors",
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        if (response.status == "success") {
          console.log("saved test state successful");
          console.log(response.data);
          time = response.data;
          return true;
        } else {
          console.log(response.message);
          return false;
        }
      } catch (err) {
        console.log(err.message);
        console.log("some error occured");
        return false;
      }
    } else {
      console.log("request failed for some other reason");
      return false;
    }

    return false;
  }

  // batch_id = localStorage.getItem("batch_id");
  // branch_id = localStorage.getItem("branch_id");

  async function submitTest() {
    // console.log("sync-server");

    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }
    Token.set(token);
    console.log(loginPath + "/auth/whoami");
    const res = await fetch(
      loginPath + "/user/students/test_submit_general/" + testStateId,
      {
        mode: "cors",
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        // body:JSON.stringify({
        //   batch_id:batch_id,
        //   branch_id:branch_id
        // })
      },
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        // let data=response.data;
        if (response.status == "success") {
          console.log("saved test state successful");
          window.location.href = "/results/test/" + response.data;
          return true;
        } else {
          console.log(response.message);
          return false;
        }
      } catch (err) {
        console.log(err.message);
        console.log("some error occured");
      }
    } else {
    }
  }

  async function markForReview() {
    // console.log("markForReview");
    if (
      !markings[selectedQuestion].review_later &&
      markings[selectedQuestion].attempted
    ) {
      testOverview.savedAndMarkedReview++;
    } else if (
      !markings[selectedQuestion].review_later &&
      !markings[selectedQuestion].attempted
    ) {
      testOverview.markedReview++;
    }

    markings[selectedQuestion].review_later = true;

    // nextQuestion();
  }

  async function clearAnswer() {
    // console.log("clearAnswer");
    if (
      !markings[selectedQuestion].attempted &&
      !markings[selectedQuestion].review_later
    ) {
      return;
    }
    if (
      markings[selectedQuestion].attempted &&
      !markings[selectedQuestion].review_later
    ) {
      testOverview.saved--;
    } else if (
      !markings[selectedQuestion].attempted &&
      markings[selectedQuestion].review_later
    ) {
      testOverview.markedReview--;
    } else {
      testOverview.savedAndMarkedReview--;
    }
    testOverview.notAnswered++;

    if (
      currentQuestion.question_type == "scq" ||
      currentQuestion.question_type == "integer"
    ) {
      selectedAnswer = "";
      markings[selectedQuestion].answer_value = "";
    } else if (currentQuestion.question_type == "mcq") {
      selectedAnswer = [];

      markings[selectedQuestion].answer_value = [];
    }
    let section = testSections[currentQuestion.sectionIndex];
    console.log(section.markedQuestions);
    if (section.markedQuestions.includes(currentQuestion.sequence)) {
      // section.attempted_questions--;
      section.markedQuestions.splice(
        section.markedQuestions.indexOf(currentQuestion.sequence),
        1,
      );
    }
    markings[selectedQuestion].attempted = false;
    markings[selectedQuestion].review_later = false;
  }

  async function save() {
    console.log(selectedAnswer);
    if (selectedAnswer == "" || selectedAnswer.length == 0) {
      alert("Please mark an Answer to save");
      return;
    }

    let section = testSections[currentQuestion.sectionIndex];

    if (
      section.section_type == "compulsory" ||
      section.section_type == "optional-neet"
    ) {
      if (!section.markedQuestions.includes(currentQuestion.sequence)) {
        // section.attempted_questions++;
        section.markedQuestions.push(currentQuestion.sequence);
        markings[selectedQuestion].answer_value = selectedAnswer;
        markings[selectedQuestion].attempted = true;
        if (!markings[selectedQuestion].attempted) {
          if (!markings[selectedQuestion].review_later) {
            testOverview.saved++;
            testOverview.notAnswered--;
          } else {
            testOverview.savedAndMarkedReview++;
            testOverview.notAnswered--;
          }
        } else {
          if (
            markings[selectedQuestion].review_later &&
            markings[selectedQuestion].attempted
          ) {
            testOverview.savedAndMarkedReview++;
            testOverview.notAnswered--;
            testOverview.saved++;
            testOverview.markedReview--;
          } else {
            testOverview.saved++;
            testOverview.notAnswered--;
          }
        }
      }
    } else if (section.section_type == "optional-jee") {
      if (
        !section.markedQuestions.includes(currentQuestion.sequence) &&
        section.markedQuestions.length < section.numberCompulsoryQuestions
      ) {
        // section.attempted_questions++;
        section.markedQuestions.push(currentQuestion.sequence);
        markings[selectedQuestion].answer_value = selectedAnswer;
        markings[selectedQuestion].attempted = true;
        if (!markings[selectedQuestion].attempted) {
          if (!markings[selectedQuestion].review_later) {
            testOverview.saved++;
            testOverview.notAnswered--;
          } else {
            testOverview.savedAndMarkedReview++;
            testOverview.notAnswered--;
          }
        } else {
          if (
            markings[selectedQuestion].review_later &&
            markings[selectedQuestion].attempted
          ) {
            testOverview.savedAndMarkedReview++;
            testOverview.notAnswered--;
            testOverview.saved++;
            testOverview.markedReview--;
          } else {
            testOverview.saved++;
            testOverview.notAnswered--;
          }
        }
      } else {
        console.log("Maybe");
        alert("Maximum optional Questions attempted in this section.");
        // console.log(section.attempted_questions <= section.numberCompulsoryQuestions);
      }
    } else {
      if (!section.markedQuestions.includes(currentQuestion.sequence)) {
        // section.attempted_questions++;
        section.markedQuestions.push(currentQuestion.sequence);
        markings[selectedQuestion].answer_value = selectedAnswer;
        markings[selectedQuestion].attempted = true;
        if (!markings[selectedQuestion].attempted) {
          if (!markings[selectedQuestion].review_later) {
            testOverview.saved++;
            testOverview.notAnswered--;
          } else {
            testOverview.savedAndMarkedReview++;
            testOverview.notAnswered--;
          }
        }
      }
      // section.attempted_questions++;
    }

    console.log("section.markedQuestions");
    console.log(section.markedQuestions);
    // if(currentQuestion.question_type=="mcq"){
    //   markings[selectedQuestion].answer_value=selectedAnswer;
    // }
    // else{
    //   markings[selectedQuestion].answer_value=selectedAnswer;
    // }
  }

  async function nextQuestion() {
    if (selectedQuestion < testQuestions.length - 1) {
      selectedQuestion++;
      selectedAnswer = markings[selectedQuestion].answer_value;
    }
  }

  async function previousQuestion() {
    if (selectedQuestion > 0) {
      selectedQuestion--;
      selectedAnswer = markings[selectedQuestion].answer_value;
    }
  }

  $: {
    if (test) {
      updateQuestion(selectedQuestion);
    }
  }

  async function updateQuestion(index) {
    currentQuestion = testQuestions[index];
    if (!markings[index].visited) {
      testOverview.notAnswered++;
      testOverview.empty--;
    }

    markings[index].visited = true;

    //uncomment this in case of an issue
    // if(currentQuestion.question_type=="mcq"){
    //   selectedAnswer=markings[index].attempted?markings[index].answer_value:[];
    // }
    // else{
    //   selectedAnswer=markings[index].attempted?markings[index].answer_value:"";
    // }

    selectedAnswer = markings[index].answer_value;
    console.log("selectedAnswer");
    console.log(selectedAnswer);
  }

  async function attemptSubmit() {
    if (confirm("Are you sure that you want to submit the test?")) {
      if (await syncServer()) {
        await submitTest();
        if (timerInterval != null) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      } else {
      }
    }
  }

  let open = false;

  function toggle() {
    open = !open;
  }
</script>

<body class=" ">
  {#if testState && test && testQuestions}
    <div class="flex justify-center">
      <div class="w-11/12 md:w-8/12">
        <nav class="w-full">
          <div
            class="justify-between  inset-0 z-40 h-14 w-full md:hidden 2xl:px-16"
          >
            <div class="flex items-center px-4 w-full h-14 justify-between">
              <div on:click={toggle} class="  w-8">
                <i
                  class={`fa-solid fa-bars   p-1   top-9 text-lg  cursor-pointer `}
                ></i>
              </div>
              <button
            class="rounded shadow m-1 md:m-2 px-1 py-2 md:p-2 hover:bg-blue-800 bg-blue-900 text-white text-xs md:text-sm"
          >
            <i class="fa-solid fa-stopwatch" />
            {secondsToHms(time)}
          </button>

          <button
            class="rounded shadow m-1 md:m-2 px-1 py-2 md:p-2 hover:bg-green-800 bg-green-900 text-white text-xs md:text-sm"
            on:click={attemptSubmit}
          >
            <i class="fa-solid fa-check" /> Submit Test
          </button>
            </div>
            <div
              class={`overflow-y-scroll fixed left-0 top-0  z-50 h-screen bg-white duration-300 pt-3  ${open ? " w-60 " : " w-0"}`}
            >
              {#if open}
                <i
                  class={`fa-solid fa-xmark z-50  p-1 text-gray-600  absolute right-2 top-2  text-2xl   cursor-pointer `}
                  on:click={toggle}
                ></i>
                <div class="mx-1 mt-">
                  <div class="flex justify-center mb-2">
                    <button
                      class="rounded shadow  p-2 hover:bg-blue-800 bg-blue-900 text-white text-sm"
                    >
                      <i class="fa-solid fa-stopwatch" />
                      {secondsToHms(time)}
                    </button>
                  </div>
                  <TestOverview bind:testOverview />
                  <SubjectWiseQuestions
                    bind:marking={markings}
                    {testQuestions}
                    bind:selectedQuestion
                    {subjectWiseQuestions}
                  />
                </div>
              {/if}
            </div>
            {#if open}
              <div
                on:click={toggle}
                class="cursor-pointer fixed inset-0 bg-gray-600 bg-opacity-50"
              ></div>
            {/if}
          </div>
        </nav>
        <div class="hidden md:block">
          <div class="flex justify-between mt-2">
            <button
              class="rounded shadow m-1 md:m-2 px-1 py-2 md:p-2 hover:bg-blue-800 bg-blue-900 text-white text-xs md:text-sm"
            >
              <i class="fa-solid fa-stopwatch" />
              {secondsToHms(time)}
            </button>
  
            <button
              class="rounded shadow m-1 md:m-2 px-1 py-2 md:p-2 hover:bg-green-800 bg-green-900 text-white text-xs md:text-sm"
              on:click={attemptSubmit}
            >
              <i class="fa-solid fa-check" /> Submit Test
            </button>
          </div>
        </div>
        

        {#if currentQuestion.question_type == "scq" || (currentQuestion.question_type == "comprehension" && currentQuestion.question_subtype == "scq") || currentQuestion.question_type == "matrix"}
          <div class="overflow-scroll h-50 flex w-full">
            <div class="grow">
              <Scq
                marking={markings[selectedQuestion]}
                testSection={testSections[currentQuestion.sectionIndex]}
                question={currentQuestion}
                bind:selectedAnswer
              />
            </div>
            <!-- <div class="grow" /> -->
          </div>
        {:else if currentQuestion.question_type == "integer"}
          <div class="overflow-scroll h-50 flex">
            <div class="grow">
              <Integer
                marking={markings[selectedQuestion]}
                testSection={testSections[currentQuestion.sectionIndex]}
                question={currentQuestion}
                bind:selectedAnswer
                markedAns={selectedAnswer}
              />
            </div>
            <!-- <div class="grow" /> -->
          </div>
        {:else if currentQuestion.question_type == "comprehension"}
          <div class="overflow-scroll h-50 flex">
            <div class="grow">
              <Comprehension
                marking={markings[selectedQuestion]}
                testSection={testSections[currentQuestion.sectionIndex]}
                question={currentQuestion}
                bind:selectedAnswer
              />
            </div>
            <!-- <div class="grow" /> -->
          </div>

          <!-- {:else if  currentQuestion.question_type=="mcq" || currentQuestion.question_type=="matrix" }
    <div class="overflow-scroll h-50 flex">
      <div class="grow">
        <Matrix marking={markings[selectedQuestion]} testSection={testSections[currentQuestion.sectionIndex]} question={currentQuestion} bind:selectedAnswer={selectedAnswer} />
      </div>
      <div class="grow">
        
      </div>
    </div> -->
        {:else if currentQuestion.question_type == "mcq" || (currentQuestion.question_type == "comprehension" && currentQuestion.question_subtype == "mcq")}
          <div class="overflow-scroll h-50 flex">
            <div class="grow">
              <Mcq
                marking={markings[selectedQuestion]}
                {clearAnswer}
                testSection={testSections[currentQuestion.sectionIndex]}
                question={currentQuestion}
                bind:selectedAnswer
              />
            </div>
            <div class="grow" />
          </div>
        {:else}
          <p class="text-lg">Unknown Question type...</p>
        {/if}

        <div class="hidden md:block">
          <div class="flex justify-evenly">
            <button
              class="rounded bg-grey-400 m-1 p-1 md:m-2 md:p-2 bg-gray-300 hover:bg-gray-200 border text-xs md:text-sm"
              on:click={previousQuestion}
            >
              <i class="fa-solid fa-backward" /> Previous
            </button>
            <button
              class="rounded shadow m-2 p-2 bg-gray-300 hover:bg-purple-200 text-sm"
              on:click={markForReview}
            >
              <i class="fa-solid fa-list" /> Mark For Review
            </button>
            <button
              class="rounded shadow border m-2 p-2 bg-gray-300 hover:bg-red-200 text-sm"
              on:click={clearAnswer}
            >
              <i class="fa-solid fa-trash" /> clear
            </button>
            <button
              class="rounded shadow m-2 p-2 bg-gray-300 hover:bg-green-200 text-sm"
              on:click={save}
            >
              <i class="fa-solid fa-check" /> Save
            </button>
            <button
              class="rounded bg-grey-400 m-2 p-2 bg-gray-300 hover:bg-gray-200 border text-sm"
              on:click={nextQuestion}
            >
              <i class="fa-solid fa-forward" /> Next
            </button>
          </div>
        </div>

        <div class=" md:hidden">
          <div class="flex justify-evenly">
            <button
              class="rounded bg-grey-400 m-1 p-1 md:m-2 md:p-2 bg-gray-300 hover:bg-gray-200 border text-xs md:text-sm"
              on:click={previousQuestion}
            >
              <i class="fa-solid fa-backward" /> Previous
            </button>

            <button
              class="rounded shadow m-2 p-2 bg-gray-300 hover:bg-green-200 text-sm"
              on:click={save}
            >
              <i class="fa-solid fa-check" /> Save
            </button>
            <button
              class="rounded bg-grey-400 m-2 p-2 bg-gray-300 hover:bg-gray-200 border text-sm"
              on:click={nextQuestion}
            >
              <i class="fa-solid fa-forward" /> Next
            </button>
          </div>
          <div class="flex justify-evenly mt-2">
            <button
              class="rounded shadow border m-2 p-2 bg-gray-300 hover:bg-red-200 text-sm"
              on:click={clearAnswer}
            >
              <i class="fa-solid fa-trash" /> clear
            </button>

            <button
              class="rounded shadow m-2 p-2 bg-gray-300 hover:bg-purple-200 text-sm"
              on:click={markForReview}
            >
              <i class="fa-solid fa-list" /> Mark For Review
            </button>
          </div>
        </div>
      </div>
      <div class="hidden md:block lg:block">
        <!-- <SubjectWiseQuestions bind:marking={markings} {testQuestions} bind:selectedQuestion={selectedQuestion} {subjectWiseQuestions} /> -->
        <TestOverview bind:testOverview />
        <SubjectWiseQuestions
          bind:marking={markings}
          {testQuestions}
          bind:selectedQuestion
          {subjectWiseQuestions}
        />
      </div>
    </div>
  {/if}
</body>
