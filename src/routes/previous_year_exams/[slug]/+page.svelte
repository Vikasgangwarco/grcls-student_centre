<script>
  import { onMount } from "svelte";
  import { Token } from "../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "../../../lib/components/navigation_bars/top_student_daisy.svelte";
  import ModuleQuestions from "../../../lib/components/Lists/modern/module_questions.svelte";

  let body = {};
  let activeTab = "questions";
  async function toggleActiveTab(tab){
    activeTab = tab;
  }
  /** @type {import('./$types').PageData} */
  export let data;
  export let examId = data.examId;
  console.log("verificationId from slug:" + examId);

  var students = null;
  let exam;

  var loginPath = get(ApiUrl);
  onMount(async () => {
    console.log("mounted");
    // localStorage.setItem("token","some value");

    var token = localStorage.getItem("token");
    if(!token)
    {
    console.log("yes");
    location.href="/login";
    }
    Token.set(token);

    console.log(loginPath+'/auth/whoami');
    const res = await fetch(
      loginPath + "/user/students/exams/single/" + examId,
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
        exam = response.data;
      } catch (e) {
        console.log("caught");

        console.log(e);
      }
    } else {
      console.log(await res.text());
      // user.email = "no logged";
    }
    //
  });
</script>


{#if exam}
<div class="mt-16">
<!-- <TopStudentDaisy  title={"Exam:"+exam.name} /> -->
<table class="min-w-full">
  <thead>
      <tr>
        
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Name</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Exam Date</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Questions</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>

      </tr>
  </thead>
  <tbody class="bg-white">
    <tr>
     
      <td class="px-6 py-4 whitespace-no-wrap border-b ">
          <div class="text-sm leading-5 text-blue-900">{exam.name}</div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{new Date(exam.exam_date)}</td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{exam.questions!=null?exam.questions.length:0}</td>

      <td class="px-6 py-4 whitespace-no-wrap border-b ">
        <div class="flex items-center">
            <div>
                <div class="text-sm leading-5 text-gray-800">{exam._id}</div>
            </div>
        </div>
    </td>
    </tr>

 
        
  </tbody>
</table>
  <body class="">
    <div class="tabs tabs-boxed">
      <a class="tab {activeTab=="questions"?'tab-active':''}" on:click={()=>{toggleActiveTab("questions")}}>Questions</a> 
      <a class="tab {activeTab=="tests"?'tab-active':''}" on:click={()=>{toggleActiveTab("tests")}}>Tests</a> 
      <a class="tab {activeTab=="modules"?'tab-active':''}" on:click={()=>{toggleActiveTab("modules")}}>Modules</a>
      <a class="tab {activeTab=="files"?'tab-active':''}" on:click={()=>{toggleActiveTab("files")}}>Files</a>
    </div>


    <div>
      {#if activeTab=="questions"}
        <!-- <Lectures lectures={batch.lectures} /> -->
        <ModuleQuestions questions={exam.questions} />
      {/if}
    </div>
  </body>
</div>
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
