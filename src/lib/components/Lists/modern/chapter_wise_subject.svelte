<script>
  import { onMount } from "svelte";
  import { Token } from "../../../../routes/_utils/dynamic_store";

  import { ApiUrl } from "../../../../routes/_utils/static_store.js";
  import { get } from "svelte/store";

 export let batchId ;

 let batch_subjects;
 
 var loginPath = get(ApiUrl);
 onMount(async () => {
 console.log("mounted10");
 // localStorage.setItem("token","some value");

 var token = localStorage.getItem("token");
 if (!token) {
   console.log("yes");
   location.href = "/login";
 }
 Token.set(token);
 console.log(loginPath + "/auth/whoami");  
 const res = await fetch(
   loginPath + "/user/students/batches/batch_get_subject/" + batchId,
   {
     mode: "cors",
     method: "get",
     headers: { Authorization: "Bearer " + token },
   },
 );
 if (res.status == 200) {
   try {
     let response = await res.text();
     console.log(response);
     response = await JSON.parse(response);
     batch_subjects = response.data;
     console.log("batch_subjects");
     console.log(batch_subjects);
     console.log("batch_subjects");
   } catch (e) {
     console.log("caught");

     console.log(e);
   }

   // let data = JSON.parse(text);
 } else {
   console.log(await res.text());
   // user.email = "no logged";
 }
});


</script>
<!-- component -->

{#if batch_subjects}

<div class=" ">

  <div class="align-middle inline-block min-w-full overflow-hidden bg-white mt-8   rounded-bl-lg rounded-br-lg">

     

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <!-- CARD 1 -->
          {#each batch_subjects as batch_subject,index}
          
              <div class="rounded overflow-hidden shadow-md hover:shadow-xl flex flex-col">
                <a href="/chapter_wise_test_list/{batch_subject._id}">
                  <div class="relative">
                     
                  </div>
                  <div class="px-6 py-4 mb-auto">
                      <div
                          href="#"
                          class="font-medium text-lg inline-block text-gray-700 hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                          >  {batch_subject.subjectId.name}</div
                      >
                      <!-- <p class="text-gray-500 text-sm">
                          <span class="ml-2">{batch_subject.chapters.length} Chapters</span> 
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


{/if}



