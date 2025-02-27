<script>
  import { onMount } from "svelte";
    import SubjectQuestionGrid from "./subject_question_grid.svelte";
  export let subjectWiseQuestions;
  export let selectedQuestion;
  export let testQuestions;
  export let marking;
  
  let activeTab;

  async function toggleActiveTab(tab){
    activeTab = tab;
    console.log(activeTab);
  }
  var subjects;

  onMount(async () => {
    console.log("mounted");
    subjects = Object.keys(subjectWiseQuestions);
    if(subjects.length>0){
      console.log("found subjects");
      activeTab = testQuestions[selectedQuestion].subject.name;
      console.log(activeTab);

    }
  });

  $:{
    // activeTab = testQuestions[selectedQuestion].subject.name;

    updateActiveTab(testQuestions[selectedQuestion].subject.name);
  }

  async function updateActiveTab(a){
    activeTab = a;
  }
</script>

{#if subjects && subjects.length>0}
  <body class="mt-2 md:m-10">
    <div class="tabs tabs-boxed bg-black">
      <!-- <a class="tab {activeTab=="lectures"?'tab-active tab-active':''}" on:click={()=>{toggleActiveTab("lectures")}}>Lectures</a> 
      <a class="tab {activeTab=="tests"?'tab-active':''}" on:click={()=>{toggleActiveTab("tests")}}>Tests</a> 
      <a class="tab {activeTab=="modules"?'tab-active':''}" on:click={()=>{toggleActiveTab("modules")}}>Modules</a>
      <a class="tab {activeTab=="files"?'tab-active':''}" on:click={()=>{toggleActiveTab("files")}}>Files</a> -->

      {#each subjects as subject}
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="tab   {activeTab==subject?'tab-active ':''} text-xs text-white bg-gray-600 rounded-xl m-1 md:m-2" on:click={()=>{toggleActiveTab(subject)}}>{subject.toUpperCase()}</a> 
      <!-- <a class="tab {activeTab==subject?'tab-active':''}" on:click={()=>{toggleActiveTab(subject)}}>{subject.toUpperCase()}</a>  -->
      {/each}
    </div>


    <div>
      {#each subjects as subject}
        {#if activeTab==subject}
          <SubjectQuestionGrid bind:marking={marking} questions={subjectWiseQuestions[subject]} bind:selectedQuestion={selectedQuestion}/>
        {/if}
      {/each}
      
     
    </div>
  </body>
{/if}

