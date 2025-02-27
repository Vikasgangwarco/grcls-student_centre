<script>
  import Youtube from "svelte-youtube-embed";
  import { onMount } from "svelte";
  // import videojs from 'video.js';
  import { Token } from "../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "../../../lib/components/navigation_bars/top_student_daisy.svelte";
  import Files from "../../../lib/components/Lists/modern/files.svelte";
  const options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1
    }
  };
  function onReady(event) {
    event.target.pauseVideo();
  }
  let body = {};
  let activeTab = "files";

  async function toggleActiveTab(tab){
    activeTab = tab;
  }
  /** @type {import('./$types').PageData} */
  export let data;
  export let lectureId = data.lectureId;
  let ank;
  console.log("verificationId from slug:" + lectureId);
  let lecture;
  var loginPath = get(ApiUrl);
  onMount(async () => {
    console.log("mounted");
    var token = localStorage.getItem("token");
    if(!token)
    {
    console.log("yes");
    location.href="/login";
    }
    Token.set(token);
    console.log(loginPath+'/auth/whoami');
    const res = await fetch(
      loginPath + "/user/students/batches/lecture_get/" + lectureId,
      {
        mode: "cors",
        method: "get",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        lecture = response.data;
        let timestamp = new Date(lecture.timestamp);
        ank = timestamp;
        // console.log(ank.toLocaleString());
      } catch (e) {
        console.log("caught");

        console.log(e);
      }
    } else {
      console.log(await res.text());
    }
  });

  
</script>
{#if lecture}
<!-- <TopStudentDaisy  title={"Lecture:"+lecture.name} /> -->

<!-- <div class="flex mx-auto justify-center align-middle bg-white h-screen p-5">
  <iframe class="rounded-lg"
  style="width:100%;height:100%"
  src="https://www.youtube.com/embed/{lecture.media}?controls=0"
  title={lecture.name}
  frameborder="0"
  allow="autoplay; picture-in-picture; clipboard-write"
  allowfullscreen

  
/>
</div> -->
  
{#if lecture.live_lecture}
<div class="flex mx-auto justify-center align-middle bg-white h-screen w-full p-5">
  <!-- <Youtube id={lecture.media} stule="height:1500px">
    <button>play</button>
  </Youtube> -->
  <iframe class="rounded-lg"
  style="width:100%;height:100%"
  src="https://www.youtube.com/embed/live_stream?channel={lecture.channel}&controls=0"
  title={lecture.name}
  frameborder="0"
  allow="autoplay; picture-in-picture; clipboard-write"
  allowfullscreen

/>

</div>
{:else}
<div class="flex mx-auto justify-center align-middle bg-white h-screen  p-5">
  <!-- <Youtube id={lecture.media} stule="height:1500px">
    <button>play</button>
  </Youtube> -->
  <iframe class="rounded-lg"
  style="width:100%;height:100%"
  src="https://www.youtube.com/embed/{lecture.media}?controls=0"
  title={lecture.name}
  frameborder="0"
  allow="autoplay; picture-in-picture; clipboard-write"
  allowfullscreen

/>
 
</div>
{/if}

<table class="min-w-full">
  <thead>
      <tr>
          <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th> -->
          <!-- <th class="px-6 py-3 border-b-2 border-gray-300">Video</th> -->
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Name</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Subject</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Time-Stamp</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Chapter</th>
          <!-- <th class="px-6 py-3 border-b-2 border-gray-300"></th> -->
      </tr>
  </thead>
  <tbody class="bg-white">
     
      <tr>
          <!-- <td class="px-6 py-4 whitespace-no-wrap border-b ">
              <div class="flex items-center">
                  <div>
                      <div class="text-sm leading-5 text-gray-800">{lecture._id}</div>
                  </div>
              </div>
          </td> -->
          <!-- <td class="px-6 py-4 whitespace-no-wrap border-b ">
              <div class="flex items-center">
                  <div>
                      <div class="text-sm leading-5 text-gray-800 ">
                          <img src="https://img.youtube.com/vi/{lecture.media}/mqdefault.jpg" class="h-12 rounded-lg shadow-lg" alt="lecture thumbnail" />
                      </div>
                  </div>
              </div>
          </td> -->
          
          <!-- <td class="px-6 py-4 whitespace-no-wrap border-b ">
              <div class="flex items-center">
                  <div>
                      <div class="text-sm leading-5 text-gray-800">{lecture._id}</div>
                  </div>
              </div>
          </td> -->
          <td class="px-6 py-4 whitespace-no-wrap border-b ">
              <div class="text-sm leading-5 text-blue-900">{lecture.name}</div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{lecture.subject!=null?lecture.subject.name:"-"}</td>
          <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{ank}</td>
          <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">
              <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
              <span class="relative text-xs">{lecture.chapter!=null?lecture.chapter.name:"-"}</span>
          </span>
          </td>
          
          <!-- <td class="px-6 py-4 whitespace-no-wrap text-right border-b  text-sm leading-5">
              <a href="/lectures/{lecture._id}" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View</a> 
          </td> -->
</tr>
        
  </tbody>
</table>

  <body class="">
    <div class="tabs tabs-boxed">
      <!-- <a class="tab {activeTab=="lectures"?'tab-active':''}" on:click={()=>{toggleActiveTab("lectures")}}>Lectures</a> 
      <a class="tab {activeTab=="tests"?'tab-active':''}" on:click={()=>{toggleActiveTab("tests")}}>Tests</a> 
      <a class="tab {activeTab=="modules"?'tab-active':''}" on:click={()=>{toggleActiveTab("modules")}}>Modules</a> -->
      <a class="tab {activeTab=="files"?'tab-active':''}" on:click={()=>{toggleActiveTab("files")}}>Notes</a>
    </div>


    <div>
      <!-- {#if activeTab=="lectures"}
        <Lectures lectures={batch.lectures} />
      {/if}
      {#if activeTab=="tests"}
        <Tests tests={batch.tests} />
      {/if} -->
      {#if activeTab=="files"}
        <Files files={lecture.files} />
      {/if}
      <!-- {#if activeTab=="modules"}
        <Modules tests={batch.modules} />
      {/if} -->
    </div>
  </body>
{/if}

<style>
  .collapsible {
    background-color: #006347;
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
    /* left: 0; */
    z-index: 5;
    width: 75%;
    display: flex;
    justify-content: center;
    /* background: #333; */
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
