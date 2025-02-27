<script>

  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";

  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "$lib/components/navigation_bars/top_student_daisy.svelte";
  import Doubts from "../../../../lib/components/Lists/modern/doubts.svelte";
    import DoubtResponses from "../../../../lib/components/Lists/modern/doubt_responses.svelte";
  let body = {};
  let activeTab = "lectures";

  async function toggleActiveTab(tab){
    activeTab = tab;
    console.log(activeTab);
  }

  function reloadLatex(){
        setTimeout(()=>{
            MathJax.typeset();
        },2000);
        return "";
    }

  /** @type {import('./$types').PageData} */
  export let data;
  export let doubtId = data.doubtId;
  console.log("verificationId from slug:" + doubtId);
  let doubt;

  let subjects = [];

  var loginPath = get(ApiUrl);
  onMount(async () => {
    setTimeout(()=>{
      tinymce.init({
        selector: '#doubtbox'
      });
    },1000);
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
      loginPath + "/user/students/doubts/single/" + doubtId,
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
        doubt = response.data;
        // console.log("Information of batch");
        // console.log(batch);
      } catch (e) {
        console.log("caught");

        console.log(e);
      }

      // let data = JSON.parse(text);
    } else {
      console.log(await res.text());
      // user.email = "no logged";
    }

    // getBatchSubjects();
    //
  });


let form={};

async function attemptSendResponse(){
  // alert("asds");

  var token = localStorage.getItem("token");
  form.sender = "Student";
  form.response = btoa(tinyMCE.get('doubtbox').getContent());
  console.log(form);
  
  // return;
  const res = await fetch(
      loginPath + "/user/students/doubts/add_response/"+doubtId,
      {
        mode: "cors",
        method: "post",
        headers: { Authorization: "Bearer " + token,'Content-Type':'application/json' },
        body:JSON.stringify(form)
      }
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        if(response.status=="success"){
          console.log(response);
          location.reload();
        }
        else{
          throw {message:"error"+response.message};
        }
        // subjects = response.data;
        // console.log("Information of batch");
        // console.log(batch);
      } catch (e) {
        console.log("caught");

        console.log(e);
      }

      // let data = JSON.parse(text);
    } else {
      console.log(await res.text());
      // user.email = "no logged";
    }
}

async function attemptRemoveResponse(responseId){
  // alert("asds");

  var token = localStorage.getItem("token");
  form.sender = "Student";
  form.response = btoa(tinyMCE.get('doubtbox').getContent());
  console.log(form);
  
  // return;
  const res = await fetch(
      loginPath + "/user/students/doubts/delete_response/"+doubtId+"/"+responseId,
      {
        mode: "cors",
        method: "post",
        headers: { Authorization: "Bearer " + token,'Content-Type':'application/json' },
      }
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        if(response.status=="success"){
          location.reload();
        }
        else{
          throw {message:"error"+response.message};
        }
        // subjects = response.data;
        // console.log("Information of batch");
        // console.log(batch);
      } catch (e) {
        console.log("caught");

        console.log(e);
      }

      // let data = JSON.parse(text);
    } else {
      console.log(await res.text());
      // user.email = "no logged";
    }
}

async function getBatchSubjects(){
  var token = localStorage.getItem("token");
  const res = await fetch(
      loginPath + "/user/students/batches/subjects/" + batchId,
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
        if(response.status=="success"){
          subjects = response.data;
        }
        else{
          throw {message:"error"+response.message};
        }
      } catch (e) {
        console.log("caught");

        console.log(e);
      }

      // let data = JSON.parse(text);
    } else {
      console.log(await res.text());
      // user.email = "no logged";
    }
}
</script>
{#if doubt}
<TopStudentDaisy  title={"Doubt:"+doubtId} />
<table class="min-w-full">
  <thead>
      <tr>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
          <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Name</th> -->
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Subject</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Content</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Question</th>
          <th class="px-6 py-3 border-b-2 border-gray-300"></th>
      </tr>
  </thead>
  <tbody class="bg-white">
  
      <tr>
          <!-- <td class="px-6 py-4 whitespace-no-wrap border-b ">
              <div class="flex items-center">
                  <div>
                      <div class="text-sm leading-5 text-gray-800">{doubt._id}</div>
                  </div>
              </div>
          </td> -->
          <!-- <td class="px-6 py-4 whitespace-no-wrap border-b ">
              <div class="text-sm leading-5 text-blue-900">{doubt.name}</div>
          </td> -->
          <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{doubt.doubt_status.toUpperCase()}</td>
          <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{doubt.subject.name}</td>
          <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5 max-w-xs">{@html atob(doubt.content)}</td>
          
          {#if doubt.question}
          <td class="px-6 py-4 overflow-scroll text-right border-b  text-sm leading-5 max-w-sm">
              <a href="/questions/simple/{doubt.question._id}" class="px-5 py-2 border-blue-500 text-blue-500 rounded transition duration-30 focus:outline-none">{@html atob(doubt.question.question)}</a> 
          </td>
          {:else}
          <td class="px-6 py-4 whitespace-no-wrap text-left border-b  text-sm leading-5">
             ---
          </td>
          {/if}
          
          
</tr>

      {reloadLatex()}
        
  </tbody>
</table>
<DoubtResponses doubtResponses={doubt.responses} />
<div class="p-10 m-2">
  <p class="text-2xl text-gray-400">Add A Response</p>
  <hr>
  <form>
    <textarea id="doubtbox" placeholder="Doubt Response"></textarea><br>
    <button class="bg-blue-700 text-white p-2 rounded-xl shadow" on:click={attemptSendResponse}>Submit Response</button>
  </form>
  <hr class="m-2">
</div>



{/if}

  
