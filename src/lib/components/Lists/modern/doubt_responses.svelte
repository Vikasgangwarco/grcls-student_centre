<script>
    export let doubtResponses = [];
    function reloadLatex(){
        setTimeout(()=>{
            MathJax.typeset();
        },2000);
        return "";
    }
</script>

<!-- component -->
<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div
        class="align-middle inline-block min-w-full overflow-hidden bg-white px-8 pt-3 rounded-bl-lg rounded-br-lg"
    >


    <div class="">Responses</div>
        <table class="min-w-full">
            <thead>
                <tr>
                    <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th> -->
                    <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >Sender</th
                    >
                   
                    <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >Response</th
                    >
                    <th
                    class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                    >Timestamp</th
                >
                </tr>
            </thead>
            <tbody class="bg-white">
                {#if doubtResponses.length==0}
                <p class="text-lg">No Responses yet...</p>
                {/if}
                {#each doubtResponses as response, index}
                    <tr>
                        <!-- <td class="px-6 py-4 whitespace-no-wrap border-b ">
                        <div class="flex items-center">
                            <div>
                                <div class="text-sm leading-5 text-gray-800">{re._id}</div>
                            </div>
                        </div>
                    </td> -->
                        <td class="px-6 py-4 whitespace-no-wrap border-b">
                            <div class="text-sm leading-5 text-blue-900">
                                {response.sender}
                            </div>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-sm leading-5"
                            >{@html atob(response.response)}</td
                        >
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-sm leading-5"
                            >{new Date(response.timestamp).toString().split("+")[0]}</td
                        >
                        
                    </tr>
                {/each}
            </tbody>
        </table>
        {reloadLatex()}
        <div
            class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans"
        >
            <div />
        </div>
    </div>
</div>
