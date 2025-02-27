<script>

  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";

  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "$lib/components/navigation_bars/top_student_daisy.svelte";
  import Doubts from "../../../../lib/components/Lists/modern/doubts.svelte";
  let body = {};
  let activeTab = "lectures";

  async function toggleActiveTab(tab){
    activeTab = tab;
    console.log(activeTab);
  }

  /** @type {import('./$types').PageData} */
  export let data;
  export let batchId = data.batchId;
  console.log("verificationId from slug:" + batchId);

  var students = null;
  let doubts;

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
      loginPath + "/user/students/doubts/student_batch_doubts/" + batchId,
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
        doubts = response.data;
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

    getBatchSubjects();
    //
  });
let form={};

async function attemptSubmitDoubt(){
  // alert("asds");

  var token = localStorage.getItem("token");
  form.batch = batchId;
  form.content = btoa(tinyMCE.get('doubtbox').getContent());
  console.log(form);
  
  // return;
  const res = await fetch(
      loginPath + "/user/students/doubts/create",
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
{#if doubts}
<TopStudentDaisy  title={"Doubts:"+doubts.length} />
<div class="p-10 m-2">
  <p class="text-2xl text-gray-400">Ask new Doubt</p>
  <hr>
  <form>
    <div class="flex">
      <div class="m-2">
        Subject *<br>
        <!-- <input type="text" class="input bg-gray-200 m-2 p-2" placeholder="Specify Subject" /> -->

        {#if subjects}
          <select bind:value={form.subject} class="input  m-2 p-2 bg-gray-200 ">
            <option value="">Select Subject</option>
            {#each subjects as subject}
              <option value="{subject._id}">{subject.name}</option>
            {/each}
          </select>
        
        {/if}
      </div>
      <div class="m-2">
        Related Question(If any...)<br> <input type="text" bind:value={form.question} class="input bg-gray-200 m-2 p-2" placeholder="Question Id(16 digit)" />
      </div>
    </div>
    <br>
    <textarea id="doubtbox" placeholder="Doubt Content"></textarea><br>

    <button class="bg-blue-700 text-white p-2 rounded-xl shadow" on:click={attemptSubmitDoubt}>Submit Doubt</button>
  </form>
  <hr class="m-2">
</div>
<Doubts doubts={doubts} />


{/if}

  
