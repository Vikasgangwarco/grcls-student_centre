<script>
  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { selected_batch } from "../../../_utils/batch_id.js";
  import { onDestroy } from "svelte";

  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "../../../../lib/components/navigation_bars/top_student_daisy.svelte";
  import TestReportResults from "../../../../lib/components/Lists/modern/test_report_results.svelte";
  import TestReportStatuses from "../../../../lib/components/Lists/modern/test_report_statuses.svelte";

  let body = {};

  let batch_id;
  let branch_id;
  // const unsubscribe = selected_batch.subscribe(value =>{
  //   batch_id = value
  // })

  // onDestroy(unsubscribe)

  // In file3.js
  selected_batch.subscribe((value) => {
    console.log("Batch ID updated:", value);
    batch_id = value;
  });

  // console.log("This is batch_id");
  // console.log(batch_id);
  // console.log("This is batch_id");

  /** @type {import('./$types').PageData} */
  export let data;
  export let testId = data.test_id;
  let testStateId;
  console.log("verificationId from slug:" + testId);

  let testReport;
  var students = null;
  var loginPath = get(ApiUrl);
  onMount(async () => {
    console.log("mounted");
    body.batch_id = localStorage.getItem("batch_id");
    body.branch_id = localStorage.getItem("branch_id");
    //  console.log("this is batch and branch");
    //  console.log(body.batch_id);
    //  console.log(body.branch_id);
    //  console.log("this is batch and branch");
    // localStorage.setItem("token", "some value");

    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }
    Token.set(token);

    console.log(loginPath + "/auth/whoami");
    const res = await fetch(
      loginPath + "/user/students/dpp_test_report/" + testId,
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
        testReport = response.data;
        console.log("testReport");
        console.log(testReport);
        console.log("testReport");
      } catch (e) {
        console.log("caught");

        console.log(e);
      }
    } else {
      console.log(await res.text());
      user.email = "no logged";
    }
    //
  });

  async function requestTestAttempt() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(
      loginPath + "/user/students/create_dpp_test_attempt/" + testId,
      {
        mode: "cors",
        method: "post",
        body: JSON.stringify(body),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      },
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          testStateId = response.data;
          console.log("testStateID");
          console.log(testStateId);
          window.location.href = "/tests/dpp_test/" + testStateId;
          // batches= response.data.batches;
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log("caught1");
        alert("Some problem has occured, see console for more info.");
        console.log(e.message);
      }
    } else {
      console.log(await res.text());
    }
  }

  let x = false;

  function menu_toggle() {
    x = !x;
  }

  function pendingTest() {
    location.href = "/dpp_test_report/" + test_id;
  }

  function testResult(test_result_id) {
    location.href = "/test_result/" + test_result_id;
  }

  function timeLeft(time) {
    return time.toFixed(2);
  }

  function canStartTest(startTime, endTime) {
    if (startTime == null && endTime == null) {
      return true;
    } else if (startTime != null) {
      let dt = new Date(startTime);
      return dt.getTime() < Date.now();
    } else if (endTime != null) {
      let dt = new Date(endTime);
      return dt.getTime() > Date.now();
    }
  }

  function isTestEnded(endTime) {
    if (endTime == null) {
      return false;
    } else {
      let dt = new Date(endTime);
      return Date.now() > dt.getTime();
    }
  }

  body.batch_id = batch_id;
  console.log("batch_id");
  console.log(body.batch_id);
  console.log("batch_id");
</script>

<!-- <h1>This is batch information {batch_id} </h1> -->
<TopStudentDaisy title={"Test Report Page"} />
{#if testReport}
  <body class="">
    <div class="">
      <div class="p-4">
        <p class="text-blue-700 text-2xl">
          {testReport.test.name.toUpperCase()}
        </p>
        <p>Duration: {testReport.test.duration} Minute</p>
        <p>Type: {testReport.test.test_type.toUpperCase()}</p>
        <p class="text-gray-600">
          Start Time: {testReport.test.start_time != null
            ? new Date(testReport.test.start_time).toString()
            : "-"}
        </p>
        <p class="text-gray-600">
          End time: {testReport.test.end_time != null
            ? new Date(testReport.test.end_time).toString()
            : "-"}
        </p>

        <!-- <div class="flex flex-row">
          {#if canStartTest(testReport.test.start_time, testReport.test.end_time)}
            <div
              class="px-6 py-4 whitespace-no-wrap border-b text-sm leading-5"
            >
              <button
                on:click={requestTestAttempt}
                class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                >Start new test</button
              >
            </div>
          {/if}

          {#if isTestEnded(testReport.test.end_time)}
            <div
              class="px-6 py-4 whitespace-no-wrap border-b text-sm leading-5"
            >
              <button
                on:click={testResult()}
                class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                >View Class Test Result</button
              >
            </div>
            <div
              class="px-6 py-4 whitespace-no-wrap border-b text-sm leading-5"
            >
              <a
                href="/your-redirect-url"
                class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
              >
                View Class Test Result
              </a>
            </div>
          {/if}
        </div> -->
        <div class="flex flex-row items-center">
          {#if canStartTest(testReport.test.start_time, testReport.test.end_time)}
              <div class="px-6 py-4 whitespace-no-wrap border-b text-sm leading-5">
                  <button on:click={requestTestAttempt} class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Start new test</button>
              </div>
          {/if}
          <!-- {#if isTestEnded(testReport.test.end_time)} -->
              <div class="px-6 py-4 whitespace-no-wrap border-b text-sm leading-5">
                  <!-- <a href="/results/batch_result/{testReport.test._id}" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Class Test Result</a> -->
              </div>
          <!-- {/if} -->
      </div>
      </div>
      <hr />

      <TestReportStatuses statuses={testReport.test_states} />
      <TestReportResults results={testReport.test_results} />
    </div>
  </body>
{/if}

<style>
  .collapsible {
    background-color: #190063;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }

  .collapsible:after {
    content: "\002B";
    color: white;
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }

  .content {
    padding: 0 18px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #f1f1f1;
  }

  @media screen and (max-height: 450px) {
  }

  header {
    position: fixed;
    top: 0;
    z-index: 5;
    width: 75%;
    display: flex;
    justify-content: center;
    background: #333;
  }

  .navbar {
    display: flex;
    padding: 0 10px;
    max-width: 1200px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .navbar #hamburger-btn {
    cursor: pointer;
    display: none;
  }

  .navbar .all-links li {
    position: relative;
    list-style: none;
  }

  .navbar .logo a {
    display: flex;
    align-items: center;
    margin-left: 0;
  }

  header a,
  header a:hover,
  .content a:hover {
    color: #00aa00;
    background: rgba(255, 255, 255, 0.3);
  }

  @media screen and (max-width: 860px) {
    .navbar .all-links li {
      font-size: 18px;
    }

    .navbar #hamburger-btn {
      display: block;
    }

    .content a {
      font-size: 17px;
      padding: 9px 20px;
    }
  }
</style>
