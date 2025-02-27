<script>
    // import { onMount } from 'svelte';
    import {gridValue} from "../../../../routes/_utils/grid_store.js"
    export let batches = [];

    let gridvalue ;

    gridValue.subscribe(value =>{
        gridvalue = value
    })
    // var grid = get(gridValue);
    // onMount(async () => {
    //     console.log("mounted");

    //      grid = localStorage.getItem("grid");
   
    
    // });

</script>



<!-- component -->
<!-- {#if grid} -->
<div class="max-w-screen-xl mx-auto px-5 sm:px-10 md:px-16 ">
    <!-- <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
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
    </div> -->
    <!-- <div class="ml-10">{gridvalue}</div> -->
    <div class="align-middle inline-block min-w-full overflow-hidden bg-white    rounded-bl-lg rounded-br-lg">
        {#if !gridvalue}
        <div class="">
            <!-- <div class="border-b mb-5 flex justify-between text-sm">
                <div class="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
                    <svg class="h-6 mr-3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455.005 455.005"
                        style="enable-background:new 0 0 455.005 455.005;" xml:space="preserve">
                        <g>
                            <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z"> </path>
                            <path d="M353.664,232.676c2.492,0,4.928-1.241,6.354-3.504c2.207-3.505,1.155-8.136-2.35-10.343l-173.3-109.126 c-3.506-2.207-8.136-1.154-10.343,2.35c-2.207,3.505-1.155,8.136,2.35,10.343l173.3,109.126 C350.916,232.303,352.298,232.676,353.664,232.676z"> </path>
                            <path d="M323.68,252.58c2.497,0,4.938-1.246,6.361-3.517c2.201-3.509,1.14-8.138-2.37-10.338L254.46,192.82 c-3.511-2.202-8.139-1.139-10.338,2.37c-2.201,3.51-1.14,8.138,2.37,10.338l73.211,45.905 C320.941,252.21,322.318,252.58,323.68,252.58z"> </path>
                            <path d="M223.903,212.559c-3.513-2.194-8.14-1.124-10.334,2.39c-2.194,3.514-1.124,8.14,2.39,10.334l73.773,46.062 c1.236,0.771,2.608,1.139,3.965,1.139c2.501,0,4.947-1.251,6.369-3.529c2.194-3.514,1.124-8.14-2.39-10.334L223.903,212.559z"> </path>
                            <path d="M145.209,129.33l-62.33,39.254c-2.187,1.377-3.511,3.783-3.503,6.368s1.345,4.983,3.54,6.348l74.335,46.219 c1.213,0.754,2.586,1.131,3.96,1.131c1.417,0,2.833-0.401,4.071-1.201l16.556-10.7c3.479-2.249,4.476-6.891,2.228-10.37 c-2.248-3.479-6.891-4.475-10.37-2.228l-12.562,8.119l-60.119-37.38l48.2-30.355l59.244,37.147l-6.907,4.464 c-3.479,2.249-4.476,6.891-2.228,10.37c2.249,3.479,6.894,4.476,10.37,2.228l16.8-10.859c2.153-1.392,3.446-3.787,3.429-6.351 c-0.018-2.563-1.344-4.94-3.516-6.302l-73.218-45.909C150.749,127.792,147.647,127.795,145.209,129.33z"> </path>
                            <path d="M270.089,288.846c2.187-3.518,1.109-8.142-2.409-10.329l-74.337-46.221c-3.518-2.188-8.143-1.109-10.329,2.409 c-2.187,3.518-1.109,8.142,2.409,10.329l74.337,46.221c1.232,0.767,2.601,1.132,3.953,1.132 C266.219,292.387,268.669,291.131,270.089,288.846z"> </path>
                            <path d="M53.527,192.864c-2.187,3.518-1.109,8.142,2.409,10.329l183.478,114.081c1.232,0.767,2.601,1.132,3.953,1.132 c2.506,0,4.956-1.256,6.376-3.541c2.187-3.518,1.109-8.142-2.409-10.329L63.856,190.455 C60.338,188.266,55.714,189.346,53.527,192.864z"> </path>
                        </g>
                    </svg>
                    <a href="#" class="font-semibold inline-block">Cooking BLog</a>
                </div>
                <a href="#">See All</a>
            </div> -->
            
               
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                <!-- CARD 1 -->
                {#each batches as batch,index}
                <div class="rounded overflow-hidden shadow-lg flex flex-col">
                     
                    <div class="relative">
                        <!-- <a href="#">
                            <img
                                class="w-full"
                                src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                                alt="Sunset in the mountains"
                            />
                            <div
                                class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
                            ></div>
                        </a>
                        <a href="#!">
                            <div
                                class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out"
                            >
                                Cooking
                            </div>
                        </a> -->
                    </div>
                    <div class="px-6 py-4 mb-auto">
                        <div
                            href="#"
                            class="font-medium text-lg inline-block text-gray-700 hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                            >Batch Name : {batch.name}</div
                        >
                        <p class="text-gray-500 text-sm">
                            <span class="ml-2">{batch.stream.name}</span> 
                        </p>
                        <p class="text-gray-500 text-sm">
                            
                        </p>
                    </div>
                    <div
                        class="px-4 py-6 flex flex-row items-center justify-between bg-gray-100"
                    >
                        <a href="/batches/{batch._id}" class="hover:bg-indigo-600 border-[1px] text-indigo-600 hover:text-white border-indigo-600 rounded-md w-full flex justify-center  py-2 md:py-2 text-sm ">
                            <div class="">
                                LET'S STUDY
                            </div>
                        </a>
                    </div>
                </div>
        
                <!-- CARD 2 -->
                
        
                <!-- CARD 2 -->
                
                {/each}
            </div>

            
            
        </div>
        
        {:else}
        <div>
            <table class="min-w-full">
                <thead>
                    <tr>
                        <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th> -->
                        <th class="pr-2 md:pr-6 py-3 md:py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider">Batch Name</th>
                        <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Lectures</th> -->
                        <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Tests</th> -->
                        <th class="pr-2 md:pr-6 py-3 md:py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider">Class</th>
                        <th class="pr-2 md:pr-6 py-3 md:py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 text-blue-500 tracking-wider">Stream</th>
                        <th class="px-2 md:px-6 py-3 md:py-3 border-b-2 border-gray-300"></th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                       
                    {#each batches as batch,index}
                    <tr>
                        <!-- <td class="px-6 py-4 whitespace-no-wrap border-b ">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">{batch._id}</div>
                                </div>
                            </div>
                        </td> -->
                        <td class="pr-2 md:pr-6 py-3 md:py-3 whitespace-no-wrap border-b ">
                            <div class="text-xs md:text-sm leading-5 text-blue-900">{batch.name}</div>
                        </td>
                        <!-- <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{batch.lectures.length}</td> -->
                        <!-- <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{batch.tests.length}</td> -->
                        <td class="pr-2 md:pr-6 py-3 md:py-3 whitespace-no-wrap border-b text-blue-900  text-xs md:text-sm leading-5">
                            <!-- <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">{batch.class_number}</span>
                        </span> -->
                        <div class="text-xs md:text-sm leading-5 text-blue-900">{batch.class_number}</div>
                        </td>
                        <td class="pr-2 md:pr-6 py-3 md:py-3 whitespace-no-wrap border-b  text-blue-900 text-xs md:text-sm leading-5">{batch.stream.name}</td>
                        <!-- <td class="px-6 py-4 whitespace-no-wrap text-right border-b  text-sm leading-5"> -->
                            <td class="px-2 md:px-6 py-3 md:py-3 whitespace-no-wrap text-left border-b  text-xs md:text-sm leading-5">
                            <a href="/batches/{batch._id}" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View</a> 
                        </td>
              </tr>
    
                    {/each}
                      
                </tbody>
            </table>
        </div>
        {/if}

        
        
      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
<!-- <div>
<p class="text-sm leading-5 text-blue-700">
    Showing
    <span class="font-medium">1</span>
    to
    <span class="font-medium">200</span>
    of
    <span class="font-medium">2000</span>
    results
</p>
</div> -->
<div>
<!-- <nav class="relative z-0 inline-flex shadow-sm">
    <div	>
        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous" v-on:click.prevent="changePage(pagination.current_page - 1)">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
        </a>
    </div>
    <div>
        <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            1
        </a>
      <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            2
        </a>
       <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            3
        </a>
    </div>
    <div v-if="pagination.current_page < pagination.last_page">
        <a href="#" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </a>
    </div>
</nav> -->
</div>
</div>
    </div>
</div>
<!-- {/if} -->