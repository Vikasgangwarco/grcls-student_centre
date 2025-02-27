<script>
    export let testOverview;

    console.log(testOverview);

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
  <div class=" mt- md:mt-16 bg-blue-900 border p-2 rounded-xl shadow-xl">
    {#if testOverview}
    <!-- <div class="m-0">
        <div class="bg-blue cursor-pointer" on:click={()=>setSelected(question.sequence)}>
            {#if marking[question.sequence].visited && marking[question.sequence].attempted && !marking[question.sequence].review_later }
                <img src="/images/saved.png" alt="Snow" style="">
            {:else if marking[question.sequence].visited && !marking[question.sequence].review_later}
            <img src="/images/not_saved.png" alt="Snow" style="">
            {:else if marking[question.sequence].visited && marking[question.sequence].review_later && !marking[question.sequence].attempted}
            <img src="/images/review_latr.png" alt="Snow" style="">
            {:else if marking[question.sequence].visited && marking[question.sequence].review_later && marking[question.sequence].attempted}
            <img src="/images/ans_marked.png" alt="Snow" style="">
            {:else}
            <img src="/images/empty.png" alt="Snow" style="">
            {/if}
            
            <div class="centered text-xs">{question.sequence+1}</div>
        </div>
    </div> -->
    
    <div>
        <div class="flex  mt-2 md:mt-0">
            <img class="w-6 md:w-8 h-6 md:h-8 " src="/images/saved.png" alt="Snow" style="">
            <div class="flex-1 text-xs md:text-sm text-white align-middle items-center text-center">
                Saved Answers
            </div>
            <div class="flex-1 text-white align-middle items-center text-center text-xs md:text-sm">
                {testOverview.saved}
            </div>
        </div>

        <div class="flex mt-2 md:mt-0">
            <img class="w-6 md:w-8 h-6 md:h-8 " src="/images/ans_marked.png" alt="Snow" style="">
            <div class="flex-1 text-white text-xs md:text-sm align-middle items-center text-center">
                Saved Marked Review
            </div>
            <div class="flex-1 text-white align-middle items-center text-center text-xs md:text-sm">
                {testOverview.savedAndMarkedReview}
            </div>
        </div>
        <div class="flex justify-between mt-2 md:mt-0">
            <img class="w-6 md:w-8 h-6 md:h-8 " src="/images/review_latr.png" alt="Snow" style="">
            <div class="flex-1 text-white text-xs md:text-sm align-middle items-center text-center">
                Marked Review
            </div>
            <div class="flex-1 text-white align-middle items-center text-center text-xs md:text-sm">
                {testOverview.markedReview}
            </div>
        </div>
        <div class="flex justify-between mt-2 md:mt-0">
            <img class="w-6 md:w-8 h-6 md:h-8 " src="/images/not_saved.png" alt="Snow" style="">
            <div class="flex-1 text-white text-xs md:text-sm align-middle items-center text-center">
                Not Answered
            </div>
            <div class="flex-1 text-white align-middle items-center text-center text-xs md:text-sm">
                {testOverview.notAnswered}
            </div>
        </div>

        <div class="flex justify-between align-middle mt-2 md:mt-0">
            <img class="w-6 md:w-8 h-6 md:h-8 " src="/images/empty.png" alt="Snow" style="">
            <div class="flex-1 text-white text-xs md:text-sm align-middle items-center text-center">
                Not Visited
            </div>
            <div class="flex-1 text-white align-middle items-center text-center text-xs md:text-sm">
                {testOverview.empty}
            </div>
        </div>

    </div>
    {/if}
  </div>