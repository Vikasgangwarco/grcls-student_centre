<script>
    export let questions=[];
    export let marking=[];
    export let selectedQuestion;

    console.log(marking);

    function setSelected(i){
        selectedQuestion=i;
    }
</script>

<style>
    .container {
  position: relative;
  text-align: center;
  color: white;
}
.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>


<!-- 
<div class="container">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div> -->

  <div class="grid grid-cols-6 md:grid-cols-8 gap-0 m-2 w-30 bg-blue-900 border p-2 rounded-xl shadow-xl">
    {#each questions as question}
    <div class="container w-8">
        <!-- <img src="/images/glogo.png" alt="Snow" style="width:100%;"> -->
        
      
      
        <div class="m-0 h-8 ">
            <div class="bg-blue cursor-pointer" on:click={()=>setSelected(question.sequence)}>
                {#if marking[question.sequence].visited && marking[question.sequence].attempted && !marking[question.sequence].review_later }
                    <img src="/images/saved.png" alt="Snow" style="width:30px;height:30px">
                {:else if marking[question.sequence].visited && !marking[question.sequence].review_later}
                <img src="/images/not_saved.png" alt="Snow" style="width:30px;height:30px">
                {:else if marking[question.sequence].visited && marking[question.sequence].review_later && !marking[question.sequence].attempted}
                <img src="/images/review_latr.png" alt="Snow" style="width:30px;height:30px">
                {:else if marking[question.sequence].visited && marking[question.sequence].review_later && marking[question.sequence].attempted}
                <img src="/images/ans_marked.png" alt="Snow" style="width:30px;height:30px">
                {:else}
                <img src="/images/empty.png" alt="Snow" style="width:30px;height:30px">
                {/if}
                
                <div class="centered text-xs">{question.sequence+1}</div>
            </div>
        </div>
    </div>
    {/each}
  </div>