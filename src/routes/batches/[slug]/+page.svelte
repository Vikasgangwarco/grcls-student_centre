<script>
  import { onMount } from "svelte";
  import { Token } from "../../_utils/dynamic_store.js";

  import { ApiUrl } from "../../_utils/static_store.js";
  import { selected_batch } from "../../_utils/batch_id.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "../../../lib/components/navigation_bars/top_student_daisy.svelte";
  import Lectures from "../../../lib/components/Lists/modern/lectures.svelte";
  import Tests from "../../../lib/components/Lists/modern/tests.svelte";
  import Files from "../../../lib/components/Lists/modern/files.svelte";
  import Modules from "../../../lib/components/Lists/modern/modules.svelte";
  // import { roomId } from '../room/[slug].svelte';
  // export var roomId;
  import Study from "../../../lib/components/Lists/modern/study.svelte";
  import Announcements from "../../../lib/components/Lists/modern/announcements.svelte";
  import DppSubjects from "../../../lib/components/Lists/modern/dpp_subject.svelte";
  import ChapterWiseSubjects from "../../../lib/components/Lists/modern/chapter_wise_subject.svelte";
 
  let body = {};
  let activeTab = "study";
  let branch;

  async function toggleActiveTab(tab) {
    activeTab = tab;
    console.log(activeTab);
  }

  /** @type {import('./$types').PageData} */
  export let data;
  export let batchId = data.batchId;

  console.log("verificationId from slug:" + batchId);

  // selected_batch.update(value =>{
  //    return value = batchId;
  // })
  //   selected_batch.update(previousValue => {
  //   return batchId; // Return the new value you want to set
  // });

  selected_batch.set(batchId);

  var students = null;
  let batch;

  var loginPath = get(ApiUrl);
  onMount(async () => {
    console.log("mounted");
    // localStorage.setItem("token","some value");
    localStorage.setItem("batch_id", batchId);

    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }
    Token.set(token);

    console.log(loginPath + "/auth/whoami");
    const res = await fetch(
      loginPath + "/user/students/batches/batch_get/" + batchId,
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
        batch = response.data;
        console.log("Information of batch");
        console.log(batch);
      } catch (e) {
        console.log("caught");

        console.log(e);
      }

      // let data = JSON.parse(text);
    } else {
      console.log(await res.text());
      // user.email = "no logged";
    }
    //
    branch = batch.branch._id;
    localStorage.setItem("branch_id", branch);
  });

  function testReport(test_id) {
    location.href = "/test_report/" + test_id;
  }

  let toggle = false;

  function menu_toggle() {
    x = !x;
  }

  function visitDoubtsPage() {
    window.location.href = "/doubts/batch/" + batchId;
  }
</script>

{#if batch}
  <!-- <h1>This is branch{branch}</h1> -->
  <div
    class="pt-16 align-middle inline-block min-w-full overflow-hidden bg-white px-1 rounded-bl-lg rounded-br-lg"
  >
    <!-- <TopStudentDaisy title={"BATCH:" + batch.name} /> -->
    <table class="min-w-full">
      <thead class="">
        <tr>
          <!-- <th
            class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
            >ID</th
          > -->
          <th
            class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider"
            >Name</th
          >
          <!-- <th
            class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider"
            >Lectures</th
          >
          <th
            class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider"
            >Tests</th
          > -->
          <th
            class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider"
            >Class</th
          >
          <th
            class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider"
            >Stream</th
          >
          <!-- <th class="px-2 md:px-6 py-3 border-b-2 border-gray-300"></th> -->
        </tr>
      </thead>
      <tbody class="bg-white min-w-full">
        <tr>
          <!-- <td class="px-2 md:px-6 py-4 whitespace-no-wrap border-b">
            <div class="flex items-center">
              <div>
                <div class="text-xs md:text-sm leading-5 text-gray-800">{batch._id}</div>
              </div>
            </div>
          </td> -->
          <td class="px-2 md:px-6 py-4 whitespace-no-wrap border-b">
            <div class="text-xs md:text-sm leading-5 text-blue-900">
              {batch.name}
            </div>
          </td>
          <!-- <td
            class="px-2 md:px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-xs md:text-sm leading-5"
            >{batch.lectures.length}</td
          > -->
          <!-- <td
            class="px-2 md:px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-xs md:text-sm leading-5"
            >{batch.tests.length}</td
          > -->
          <td
            class="px-2 md:px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-xs md:text-sm leading-5"
          >
            <!-- <span
              class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span class="relative text-xs">{batch.class_number}</span>
            </span> -->
            <div class="text-xs md:text-sm leading-5 text-blue-900">
              {batch.class_number}
            </div>
          </td>
          <td
            class="px-2 md:px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-xs md:text-sm leading-5"
            >{batch.stream.name}</td
          >
          <!-- <td class="px-2 md:px-6 py-4 whitespace-no-wrap text-right border-b  text-xs md:text-sm leading-5">
                <a href="/batches/{batch._id}" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View</a> 
            </td> -->
        </tr>
      </tbody>
    </table>

    <body class="">
      <div class="m-4  rounded p-2 flex justify-center ">
        <img
          src="/images/student_confused.png"
          class="h-10 w-10 md:h-16 md:w-16"
        />
        <div>
          <p class="text-center">Have any Doubts?</p>
          <button
            class="bg-blue-800 text-white p-1 rounded hover:bg-blue-400 m-2"
            on:click={visitDoubtsPage}
          >
            Ask a Teacher
          </button>
        </div>

        <!-- <p class="text-gray-600 text-center p-2">Ask a faculty a doubt...</p>
        <button class="bg-blue-800 text-white p-2 rounded hover:bg-blue-400" on:click={visitDoubtsPage}>
          Doubt Page
        </button> -->
      </div>
      <!-- tabs  -->
      <div
        class=" min-w-full bg-gray-200 h-8 my-auto top-0 bottom-0 left-0 rounded-lg shadow-md"
      >
        
      <button>
        <a
          class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
          'study'
            ? 'tab-active bg-indigo-600 text-white'
            : ''}"
          on:click={() => {
            toggleActiveTab("study");
          }}>Study</a
        >
      </button>

        <!-- <button>
          <a
            class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
            'lectures'
              ? 'tab-active bg-indigo-600 text-white'
              : ''}"
            on:click={() => {
              toggleActiveTab("lectures");
            }}>Lectures</a
          >
        </button> -->
        <button>
          <a
            class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
            'tests'
              ? 'tab-active bg-indigo-600 text-white'
              : ''}"
            on:click={() => {
              toggleActiveTab("tests");
            }}>Tests</a
          >
        </button>

        <button>
          <a
            class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
            'dpp_subject'
              ? 'tab-active bg-indigo-600 text-white'
              : ''}"
            on:click={() => {
              toggleActiveTab("dpp_subject");
            }}>Dpp Tests</a
          >
        </button>

        <button>
          <a
            class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
            'chapter_wise_subjects'
              ? 'tab-active bg-indigo-600 text-white'
              : ''}"
            on:click={() => {
              toggleActiveTab("chapter_wise_subjects");
            }}>Chapterwise Tests</a
          >
        </button>

        <!-- <button>
          <a
            class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
            'modules'
              ? 'tab-active bg-indigo-600 text-white'
              : ''}"
            on:click={() => {
              toggleActiveTab("modules");
            }}>Modules</a
          >
        </button> -->

        <!-- <button>
          <a
            class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
            'files'
              ? 'tab-active bg-indigo-600 text-white'
              : ''}"
            on:click={() => {
              toggleActiveTab("files");
            }}>Files</a
          >
        </button> -->

       

        <!-- <button>
          <a
            class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
            'announcements'
              ? 'tab-active bg-indigo-600 text-white'
              : ''}"
            on:click={() => {
              toggleActiveTab("announcements");
            }}>Announcements</a
          >
        </button> -->
      </div>

      <div>
        {#if activeTab == "study"}
          <Study batchId={batchId} />
        {/if}
        <!-- {#if activeTab == "lectures"}
          <Lectures lectures={batch.lectures} />
        {/if} -->
        
        {#if activeTab == "tests"}
          <Tests tests={batch.tests} {batchId} />
        {/if}

        <!-- {#if activeTab == "modules"}
          <Modules modules={batch.modules} />
        {/if} -->
        <!-- {#if activeTab == "files"}
          <Files files={batch.files} />
        {/if}
        
        {#if activeTab == "announcements"}
          <Announcements batchId={batchId} />
        {/if} -->

        {#if activeTab == "chapter_wise_subjects"}
          <ChapterWiseSubjects batchId={batchId} />
        {/if}

        {#if activeTab == "dpp_subject"}
          <DppSubjects batchId={batchId} />
        {/if}
      </div>
    </body>
  </div>
{/if}

<style>
</style>
