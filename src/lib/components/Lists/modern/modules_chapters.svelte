<script>
    export let moduleChapters = [];
</script>
<!-- component -->
<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div class="flex justify-between">
            <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                    <div class="flex">
                        <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                            <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <input type="text" class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search">
                </div>
            </div>
        </div>
    </div>
    <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table class="min-w-full">
            <thead>
                <tr>
                    
                    <!-- <th class="px-6 py-3 border-b-2 border-gray-300">Video</th> -->
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Name</th>
                    <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Chapter</th> -->
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">#Questions:Ex. 1</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">#Questions:Ex. 2</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">#Questions:Ex. 3</th>
                    <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Max-Marks</th> -->
                    <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th> -->
                    <th class="px-6 py-3 border-b-2 border-gray-300"></th>
                </tr>
            </thead>
            <tbody class="bg-white">
                {#each moduleChapters as gravityModule}
                <tr>
                    
                    <td class="px-6 py-4 whitespace-no-wrap border-b ">
                        <div class="text-sm leading-5 text-blue-900">{gravityModule.name}</div>
                    </td>
                    <!-- <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{gravityModule.subject}</td> -->
                    <!-- <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{gravityModule.chapter.name}</td> -->
                    <!-- <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span class="relative text-xs">{test.questions.length}</span>
                    </span>
                    </td> -->
                    <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{gravityModule.level_1.length}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{gravityModule.level_2.length}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{gravityModule.level_3.length}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-right border-b  text-sm leading-5">
                        <a href="/module_chapters/{gravityModule._id}" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View</a> 
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