<script>
    export let modules = [];
</script>
<!-- component -->
<div class=" ">

    <div class="align-middle inline-block min-w-full overflow-hidden bg-white mt-8   rounded-bl-lg rounded-br-lg">

       

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            <!-- CARD 1 -->
            {#each modules as module,index}
            
                <div class="rounded overflow-hidden shadow-md hover:shadow-xl flex flex-col">
                  <a href="{module.file.url}">
                    <div class="relative">
                       
                    </div>
                    <div class="px-6 py-4 mb-auto">
                        <div
                            href="#"
                            class="font-medium text-lg inline-block text-gray-700 hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                            >  {module.name}</div
                        >
                        <!-- <p class="text-gray-500 text-sm">
                            <span class="ml-2">{lecture.subject.name}</span> 
                        </p> -->
                        <p class="text-gray-500 text-sm">
                            
                        </p>
                    </div>
                    <!-- <div
                        class="px-4 py-6 flex flex-row items-center justify-between bg-gray-100"
                    >
                        <a href="/batches/{batch._id}" class="hover:bg-indigo-600 border-[1px] text-indigo-600 hover:text-white border-indigo-600 rounded-md w-full flex justify-center  py-2 md:py-2 text-sm ">
                            <div class="">
                                LET'S STUDY
                            </div>
                        </a>
                    </div> -->
                  </a>
                </div>
            
    
            <!-- CARD 2 -->
            
    
            <!-- CARD 2 -->
            
            {/each}
        </div>

      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">

<div>
</div>
</div>
    </div>
</div>