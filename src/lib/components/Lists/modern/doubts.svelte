<script>
    export let doubts = [];

    function reloadLatex(){
        setTimeout(()=>{
            MathJax.typeset();
        },2000);
        return "";
    }
</script>

<style>
    /* table{
   width:100%;
   table-layout: fixed;
   overflow-wrap: break-word;
} */
</style>

<!-- component -->
<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
   <p class="p-2 m-2"> All Doubts</p>
    <div class="align-middle inline-block min-w-full overflow-hidden bg-white  px-8 pt-3 rounded-bl-lg rounded-br-lg">
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
                   
                {#each doubts as doubt,index}
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
                    
                    <td class="px-6 py-4 whitespace-no-wrap text-right border-b  text-sm leading-5">
                        <a href="/doubts/single/{doubt._id}" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View</a> 
                    </td>
          </tr>

                {/each}

                {reloadLatex()}
                  
            </tbody>
        </table>
      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">

<div>
</div>
</div>
    </div>
</div>