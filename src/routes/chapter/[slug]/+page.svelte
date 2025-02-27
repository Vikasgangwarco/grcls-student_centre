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
    export let batchChapterId = data.batchChapterId;
  
    console.log("verificationId from slug:" + batchChapterId);
  
    // selected_batch.update(value =>{
    //    return value = batchId;
    // })
    //   selected_batch.update(previousValue => {
    //   return batchId; // Return the new value you want to set
    // });
  
    
  
    var students = null;
    let chapter;
  
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
      console.log("batchChapterId");
      console.log(batchChapterId);
      const res = await fetch(
        loginPath + "/user/students/batches/chapter_get_content/" + batchChapterId,
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
          chapter = response.data;
          console.log("chapter Information");
          console.log(chapter);
          console.log("chapter Information");
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
  
  {#if chapter}
    <!-- <h1>This is branch{branch}</h1> -->
    <div
      class="pt-16 align-middle inline-block min-w-full overflow-hidden bg-white px-1 rounded-bl-lg rounded-br-lg"
    >
      <!-- <TopStudentDaisy title={"BATCH:" + batch.name} /> -->
      
        
  
      <body class="">
        
        <!-- tabs  -->
        <div
          class=" min-w-full bg-gray-200 h-8 my-auto top-0 bottom-0 left-0 rounded-lg shadow-md"
        >

        <button>
            <a
              class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
              'lectures'
                ? 'tab-active bg-indigo-600 text-white'
                : ''}"
              on:click={() => {
                toggleActiveTab("lectures");
              }}>Lectures</a
            >
          </button>
          
        <!-- <button>
          <a
            class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
            'study'
              ? 'tab-active bg-indigo-600 text-white'
              : ''}"
            on:click={() => {
              toggleActiveTab("study");
            }}>Study</a
          >
        </button> -->
  
          
          <!-- <button>
            <a
              class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
              'tests'
                ? 'tab-active bg-indigo-600 text-white'
                : ''}"
              on:click={() => {
                toggleActiveTab("tests");
              }}>Tests</a
            >
          </button> -->

          <button>
            <a
              class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
              'dpp_file'
                ? 'tab-active bg-indigo-600 text-white'
                : ''}"
              on:click={() => {
                toggleActiveTab("dpp_file");
              }}>DPP Pdf</a
            >
          </button>
  
          <button>
            <a
              class=" text-xs md:text-sm block px-2 md:px-6 h-8  flex items-center rounded-lg {activeTab ==
              'module_file'
                ? 'tab-active bg-indigo-600 text-white'
                : ''}"
              on:click={() => {
                toggleActiveTab("module_file");
              }}>Module Files</a
            >
          </button>
  
          
  
         
  
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
          {#if activeTab == "lectures"}
            <Lectures lectures={chapter.lectures} />
          {/if}

          {#if activeTab == "dpp_file"}
            <Dpp dpps={chapter.files} />
          {/if}

          {#if activeTab == "module_file"}
            <Module_file modules={chapter.module_files} />
          {/if}
        
  
          <!-- {#if activeTab == "modules"}
            <Modules modules={batch.modules} />
          {/if}
          {#if activeTab == "files"}
            <Files files={batch.files} />
          {/if}
          
          {#if activeTab == "announcements"}
            <Announcements batchId={batchId} />
          {/if} -->
        </div>
      </body>
    </div>
  {/if}
  
  <style>
  </style>
  