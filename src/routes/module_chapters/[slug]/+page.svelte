<script>
  import Youtube from "svelte-youtube-embed";
  import { onMount } from "svelte";
  import { Token } from "../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "../../../lib/components/navigation_bars/top_student_daisy.svelte";
  import Files from "../../../lib/components/Lists/modern/files.svelte";
    import ModuleQuestions from "../../../lib/components/Lists/modern/module_questions.svelte";
  function onReady(event) {
    event.target.pauseVideo();
  }
  let body = {};
  let activeTab = "level_1";

  async function toggleActiveTab(tab){
    activeTab = tab;
  }
  /** @type {import('./$types').PageData} */
  export let data;
  export let moduleChapterId = data.moduleChapterId;
  console.log("verificationId from slug:" + moduleChapterId);
  let gravityModulChapter;

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
      loginPath + "/user/students/modules/module_chapter/" + moduleChapterId,
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
        gravityModulChapter = response.data;
      } catch (e) {
        console.log("caught");
        console.log(e);
      }
    } else {
      console.log(await res.text());
    }
  });
</script>


{#if gravityModulChapter}
<TopStudentDaisy  title={"Module Chapter:"+gravityModulChapter.name} />
<div class="flex mx-auto justify-center align-middle h-8/12 w-8/12">
</div>
<table class="min-w-full">
  <thead>
      <tr>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Name</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">#Questions:Ex. 1</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">#Questions:Ex. 2</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">#Questions:Ex. 3</th>
      </tr>
  </thead>
  <tbody class="bg-white">
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b ">
          <div class="text-sm leading-5 text-blue-900">{gravityModulChapter.name}</div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{gravityModulChapter.level_1.length}</td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{gravityModulChapter.level_2.length}</td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{gravityModulChapter.level_3.length}</td> 
</tr>   
  </tbody>
</table>
  <body class="">
    <div class="tabs tabs-boxed">
      <a class="tab {activeTab=="level_1"?'tab-active':''}" on:click={()=>{toggleActiveTab("level_1")}}>Exercise 1</a>
      <a class="tab {activeTab=="level_2"?'tab-active':''}" on:click={()=>{toggleActiveTab("level_2")}}>Exercise 2</a>
      <a class="tab {activeTab=="level_3"?'tab-active':''}" on:click={()=>{toggleActiveTab("level_3")}}>Exercise 3</a>
    </div>
    <div>
      {#if activeTab=="level_1"}
        <ModuleQuestions questions={gravityModulChapter.level_1} />
      {/if}
      {#if activeTab=="level_2"}
        <ModuleQuestions questions={gravityModulChapter.level_2} />
      {/if}
      {#if activeTab=="level_3"}
        <ModuleQuestions questions={gravityModulChapter.level_3} />
      {/if}
    </div>
  </body>
{/if}
