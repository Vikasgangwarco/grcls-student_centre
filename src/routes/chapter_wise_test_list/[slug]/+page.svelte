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
    import Dpp from "../../../lib/components/Lists/modern/dpps.svelte";
    import Module_file from "../../../lib/components/Lists/modern/module_files.svelte";

    // import { roomId } from '../room/[slug].svelte';
    // export var roomId;
    import Study from "../../../lib/components/Lists/modern/study.svelte";
    import Announcements from "../../../lib/components/Lists/modern/announcements.svelte";
   
    let body = {};
    let activeTab = "lectures";
    let branch;
  
    async function toggleActiveTab(tab) {
      activeTab = tab;
      console.log(activeTab);
    }
  
    /** @type {import('./$types').PageData} */
    export let data;
    export let batchSubjectId = data.batchSubjectId;
  
    console.log("verificationId from slug:" + batchSubjectId);
  
    // selected_batch.update(value =>{
    //    return value = batchId;
    // })
    //   selected_batch.update(previousValue => {
    //   return batchId; // Return the new value you want to set
    // });
  
    
  
    var students = null;
    let chapter_tests;
  
    var loginPath = get(ApiUrl);
    onMount(async () => {
      console.log("mounted");
      // localStorage.setItem("token","some value");
    //   localStorage.setItem("batch_id", batchId);
  
      var token = localStorage.getItem("token");
      if (!token) {
        console.log("yes");
        location.href = "/login";
      }
      Token.set(token);
  
      console.log(loginPath + "/auth/whoami");
      console.log("batchSubjectId");
      console.log(batchSubjectId);
      const res = await fetch(
        loginPath + "/user/students/batches/subject_get_test/" + batchSubjectId,
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
          chapter_tests = response.data;
          console.log("chapter_tests");
          console.log(chapter_tests);
          console.log("chapter_tests");
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
      // branch = batch.branch._id;
      // localStorage.setItem("branch_id", branch);
    });
  
    // function testReport(test_id) {
    //   location.href = "/test_report/" + test_id;
    // }
  
    // let toggle = false;
  
    // function menu_toggle() {
    //   x = !x;
    // }
  
    // function visitDoubtsPage() {
    //   window.location.href = "/doubts/batch/" + batchId;
    // }
  </script>

{#if chapter_tests}
<div class="">
  <div class="align-middle rounded-tl-lg rounded-tr-lg  w-full py-4 overflow-hidden   px-12">
      <!-- <div class="flex justify-between">
          <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
              <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                  <div class="flex">
                      <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-xs md:text-sm">
                          <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                      </span>
                  </div>
                  <input type="text" class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search">
              </div>
          </div>
      </div> -->
  </div>
  <div class="align-middle  min-w-full  overflow-hidden   px-3 md:px-8 pt-3 rounded-bl-lg rounded-br-lg">
      <table class="min-w-full">
          <thead>
              <tr>
                  <th class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider">Name</th>
                  <!-- <th class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider">Subjects</th> -->
                  <th class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider">Duration</th>
                  <!-- <th class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider">Max Attempts</th> -->
                  <!-- <th class="px-2 md:px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th> -->
                  <th class="px-2 md:px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
          </thead>
          <tbody class="bg-white">
            {#each chapter_tests.chapter_wise_tests as test}
            <tr>
                
                <td class="px-2 md:px-6 py-4 whitespace-no-wrap border-b ">
                    <div class="text-xs md:text-sm leading-5 text-blue-900">{test.name}</div>
                </td>
                <!-- <td class="px-2 md:px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-xs md:text-sm leading-5">{test.subjects}</td> -->
                <td class="px-2 md:px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-xs md:text-sm leading-5">{test.duration}</td>
                <!-- <td class="px-2 md:px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-xs md:text-sm leading-5"> -->
                    <!-- <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"> -->
                    <!-- <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span> -->
                    <!-- <span class="relative text-xs">{test.attempts==0?"Infinite":test.attempts}</span> -->
                <!-- </span> -->
                <!-- </td> -->
                <!-- <td class="px-2 md:px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-xs md:text-sm leading-5">{test._id}</td> -->
                <td class="px-2 md:px-6 py-4 whitespace-no-wrap text-right border-b  text-xs md:text-sm leading-5">
                    <a href="/tests/test_report/{test._id}" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View</a> 
                </td>
          </tr>

            {/each}
              
          </tbody>
      </table>
    <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">

<div>
</div>
</div>
  </div>
</div>
{/if}
  
  