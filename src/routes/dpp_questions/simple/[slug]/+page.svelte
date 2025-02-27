<script>
  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "$lib/components/navigation_bars/top_student_daisy.svelte";
    import Scq from "$lib/components/questions/module_questions/scq.svelte";
    import Mcq from "../../../../lib/components/questions/module_questions/mcq.svelte";
    import Integer from "../../../../lib/components/questions/module_questions/integer.svelte";

  let question;
  /** @type {import('./$types').PageData} */
  export let data;
  export let questionId = data.questionId;
  console.log("questionId from slug:" + questionId);
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
      loginPath + "/user/students/dpp_question_get/" + questionId,
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
        question = response.data;
        console.log("This is question");
        console.log(question);
        console.log("This is question");

      } catch (e) {
        console.log("caught");
        console.log(e);
      }
    } else {
      console.log(await res.text());
    }
  });

  let resultData={time_allotted:10,answer_marked:"A"};
</script>


{#if question}
<TopStudentDaisy  title={"Question: "+question._id} />
  {#if question.question_type=="scq"}
    <Scq {question} {resultData} />
  {/if}
  {#if question.question_type=="mcq"}
    <Mcq {question} {resultData} />
  {/if}
  {#if question.question_type=="integer"}
    <Integer {question} {resultData} />
  {/if}
  {#if question.question_type=="comprehension"}
    <Scq {question} {resultData} />
  {/if}
  {#if question.question_type=="matrix"}
    <Scq {question} {resultData} />
  {/if}
{/if}
