<script>
    export let results = [];
    console.log(results);
</script>
<!-- component -->
<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <h4 class="center text-xl p-2 m-2">Results</h4>
    <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table class="min-w-full">
            <thead>
                <tr>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Attempt #</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Marks Aquired</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Max-Marks</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300"></th>
                </tr>
            </thead>
            <tbody class="bg-white">
                {#each results as result}
                <tr>
                    
                    <td class="px-6 py-4 whitespace-no-wrap border-b ">
                        <div class="text-sm leading-5 text-blue-900">{result.attempt_number}</div>
                    </td>
                    <!-- <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{test.subjects}</td> -->
                    <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{result.total}</td>
                   
                    <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{result.max_marks}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-right border-b  text-sm leading-5">
                        <a href="/results/test/{result._id}" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Results</a> 
                    </td>
          </tr>

                {/each}
                  
            </tbody>
        </table>
      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">

<div>
</div>
</div>
    </div>
</div>