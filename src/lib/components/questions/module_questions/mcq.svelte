<script>
    export let question;
    // export let instructions;
    export let selectedAnswer=[];
    let showInstructions=false;
    let showAnswer = false;
    export let resultData;
    export let marking;

    

    function setType(){
        setTimeout(()=>window.MathJax.typeset(),1000);
        return "";
    }

    $:{
        if(question){
            setType();
        }
    }


    function selectAnswer(answer){
        showAnswer=false;
        if(!selectedAnswer.includes(answer))
        {
            selectedAnswer.push(answer);
        }
        else{
            // selectedAnswer=;
            selectedAnswer=selectedAnswer.splice(selectedAnswer.indexOf(answer),1);
        }
        selectedAnswer = selectedAnswer;
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

    function arrayEqual(array1,array2){
        if(array1.sort().join(',')=== array2.sort().join(',')){
            return true;
        }
        else return false;
    }
</script>
<!-- component -->
<div class="my-2 py- sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    
    <div class="align-middle inline-block min-w-full overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
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
                <div class=" text-center text-sm bg-blue-800 rounded-xl shadow-xl m-1 p-1 text-white cursor-pointer hover:bg-blue-700" on:click={toggleInstructions}>Question Instructions</div>
                {#if showInstructions}
                    <div class=" text-center text-xs bg-white rounded-xl  m-1 text-black">
                        <div class="text-sm leading-5  overflow-scroll max-w-xl px-5 py-2">{@html atob(question.instructions.instructions)}</div>
                    </div>    
                {/if}

            {/if}
            <!-- {#if resultData}
                <p class="p-2">Answer marked in exam: {resultData.answer_marked}</p>
                <p class="p-2">Time Allotted: {resultData.time_allotted} seconds</p><hr>
            {/if} -->
                  
            <div class="text-sm leading-5 text-blue-900 overflow-scroll max-w-xl px-5 py-2">{@html atob(question.question)}</div>
            {#if question.comprehension}
                <div class="text-sm leading-5 text-blue-900 overflow-scroll max-w-xl px-5 py-2">{@html atob(question.comprehension.content)}</div>
            {/if}
            <div class="text-sm leading-5 text-blue-900 overflow-scroll max-w-xl flex p-5 m-2 rounded shadow {selectedAnswer.includes("A")?'bg-green-400':''}" on:click={()=>selectAnswer("A")}><span class="px-5 bg-grey-400 rounded">A)</span>{@html atob(question.options[0].option_value)}</div>
            <div class="text-sm leading-5 text-blue-900 overflow-scroll max-w-xl flex p-5 m-2 rounded shadow {selectedAnswer.includes("B")?'bg-green-400':''}" on:click={()=>selectAnswer("B")}><span class="px-5 bg-grey-400 rounded">B)</span>{@html atob(question.options[1].option_value)}</div>                    
            <div class="text-sm leading-5 text-blue-900 overflow-scroll max-w-xl flex p-5 m-2 rounded shadow {selectedAnswer.includes("C")?'bg-green-400':''}" on:click={()=>selectAnswer("C")}><span class="px-5 bg-grey-400 rounded">C)</span>{@html atob(question.options[2].option_value)}</div>
            <div class="text-sm leading-5 text-blue-900 overflow-scroll max-w-xl flex p-5 m-2 rounded shadow {selectedAnswer.includes("D")?'bg-green-400':''}" on:click={()=>selectAnswer("D")}><span class="px-5 bg-grey-400 rounded">D)</span>{@html atob(question.options[3].option_value)}</div>

            {#if showAnswer}
                    <button class=" p-2 m-4 rounded bg-gray-300 shadow" disabled>Check Answer</button><br>

                    {:else}
                        <button on:click={checkAnswer} class="p-2 m-4 hover:bg-blue-500 hover:text-white rounded shadow" >Check Answer</button><br>
                    {/if}
                    {#if showAnswer}
                    Correct Answer: <span class="p-2 rounded {arrayEqual(question.correct_answer,selectedAnswer)?'bg-green-200':'bg-red-200'}"> {question.correct_answer }</span><br>
                    {#if question.solution}
                    Solutions
                    <div class="text-sm leading-5 text-blue-900 overflow-scroll max-w-xl">{@html atob(question.solution)}</div>
                    {/if}
                    <br>
                    {#if question.media}
                    <div class="flex mx-auto justify-center align-middle bg-black h-screen">
                        <!-- <Youtube id={lecture.media} stule="height:1500px">
                          <button>play</button>
                        </Youtube> -->
                        <iframe
                        style="width:100%;height:100%"
                        src="https://www.youtube.com/embed/{question.media}?controls=0"
                        frameborder="0"
                        allow="autoplay; picture-in-picture; clipboard-write"
                        allowfullscreen
                      />
                      </div>
                    {/if}
                    {/if}
            
        {/if}


      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">

<div>
</div>
</div>
    </div>
</div>