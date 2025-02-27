<script>
  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "../../../../lib/components/navigation_bars/top_student_daisy.svelte";
    import Scq from "../../../../lib/components/questions/module_questions/scq.svelte";
    import ResultQuestions from "../../../../lib/components/Lists/modern/result_questions.svelte";

  let result;
  /** @type {import('./$types').PageData} */
  export let data;
  export let resultId = data.resultId;
  console.log("resultId from slug:" + resultId);
  // let gravityModulChapter;

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
      loginPath + "/user/students/test_result_with_questions/" + resultId,
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
        result = response.data;
      } catch (e) {
        console.log("caught");
        console.log(e);
      }
    } else {
      console.log(await res.text());
    }
  });

  let resultData={time_allotted:10,answer_marked:"A"};
  function canShowResults(time){
    // return true;
    if(time==null){
      return true;
    }
    else{
      let dt = new Date(time);
      return dt.getTime() < Date.now();
    }
    
    // else if(endTime==null){
    //   let dt = new Date(startTime);
    //   return dt.getTime() < Date.now();
    // }
    // else if(startTime==null){
    //   let dt = new Date(endTime);
    //   return dt.getTime() > Date.now();
    // }
  }
</script>


<div class="mt-16">
  {#if result}
<TopStudentDaisy  title={"Result: "+ result._id} />
<!-- {#if true} -->
<!-- {#if canShowResults(result.declaration_time)} -->
{#if canShowResults(true)}



<p class="ml-2">{result.declaration_time}</p>

<table class="min-w-full">
  <thead>
      <tr>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Attempt #</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Marks Obtained</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Maximum Marks</th>
        <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>

      </tr>
  </thead>
  <tbody class="bg-white">
    <tr>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{result.attempt_number}</td>
      <td class="px-6 py-4 whitespace-no-wrap border-b ">
          <div class="text-sm leading-5 text-blue-900">{result.total}</div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{result.max_marks}</td>
    

      <td class="px-6 py-4 whitespace-no-wrap border-b ">
        <div class="flex items-center">
            <div>
                <div class="text-sm leading-5 text-gray-800">{result._id}</div>
            </div>
        </div>
    </td>
    </tr>

 
        
  </tbody>
</table>
<hr>
<p class="text-lg p-2 m-2">Test Questions</p>
<ResultQuestions markings={result.marked} />

{:else}

<p class="text-center text-xl m-2">Result Declaration Time: {new Date(result.declaration_time).toString()} </p>
{/if}
{/if}

</div>