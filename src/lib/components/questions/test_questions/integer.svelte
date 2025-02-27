<script>
    export let question;
    // export let instructions;
    export let selectedAnswer="";
    export let markedAns="";
    export let testSection;


   
    let showInstructions=false;
    let showAnswer = false;
    export let resultData;
    export let marking;

    import { onMount } from "svelte";



    

    function setType(){
        setTimeout(()=>window.MathJax.typeset(),1000);
        return "";
    }

    $:{
        if(question){
            setType();
        }
    }


    // $:{
    //     selectAnswer(selectedAnswer);
    // }


    function selectAnswer(){
        let answer = markedAns;
        showAnswer=false;
        if(answer!=selectedAnswer)
        {
            selectedAnswer = answer;
        }
        else{
            selectedAnswer="";
        }
        console.log(answer);
    }

    function checkAnswer(){
       showAnswer = true;
    }


    function toggleInstructions(){
        if(showInstructions){
            showInstructions=false;
        }
        else{
            showInstructions=true;
        }
    }
</script>
<!-- component -->
<div class="my-2 py- sm:-mx-6 sm:px-6 lg:-mx-8  lg:px-8">
    
    <div class="align-middle inline-block min-w-full overflow-hidden bg-white shadow-dashboard px-1 md:px-8 pt-3 rounded-bl-lg rounded-br-lg">
        {#if question}
            {#if marking}
                <div class="p-2 bg-blue-900 shadow-xl flex align-middle justify-center rounded-xl ">
                    {#if marking.visited && marking.attempted && !marking.review_later }
                        <img src="/images/saved.png" alt="Snow" style="width:30px;height:30px">
                    {:else if marking.visited && !marking.review_later}
                        <img src="/images/not_saved.png" alt="Snow" style="width:30px;height:30px">
                    {:else if marking.visited && marking.review_later && !marking.attempted}
                        <img src="/images/review_latr.png" alt="Snow" style="width:30px;height:30px">
                    {:else if marking.visited && marking.review_later && marking.attempted}
                        <img src="/images/ans_marked.png" alt="Snow" style="width:30px;height:30px">
                    {:else}
                        <img src="/images/empty.png" alt="Snow" style="width:30px;height:30px">
                    {/if}
                    <p class="text-white text-center ">Q#:{question.sequence+1}</p>

                    <p class="text-white text-right text-xs grow">{question.subject.name}</p>
                </div>
            {/if}
            {#if question.instructions}
                <div class="flex justify-center">
                    <div
                    class=" text-center text-sm bg-blue-800 rounded-xl shadow-xl m-1 p-1 text-white cursor-pointer hover:bg-blue-700 w-60"
                    on:click={toggleInstructions}
                >
                    Question Instructions <span><i class="fa-solid fa-arrow-down"></i></span>
                </div>

                </div>
                {#if showInstructions}
                    <div
                        class=" flex justify-center text-xs bg-white rounded-xl m-1 text-black "
                    >
                        <div
                            class="text-sm leading-5 overflow-scroll  px-2 py-2 "
                        >
                            {@html atob(question.instructions.instructions)}
                        </div>
                    </div>
                {/if}
            {/if}
            {#if resultData}
                <p class="p-2">Answer marked in exam: {resultData.answer_marked}</p>
                <p class="p-2">Time Allotted: {resultData.time_allotted} seconds</p><hr>
            {/if}
                  
            <div class="text-sm leading-5 text-blue-900 overflow-scroll w-full  md:px-5 py-2">{@html atob(question.question)}</div>
            <input class="input rounded-xl shadow-xl w-full snap-center p-5 m-2 border border-black" placeholder="answer" type="text" on:change={selectAnswer} bind:value={markedAns} >
            
        {/if}


      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">

<div>
</div>
</div>
    </div>
</div>