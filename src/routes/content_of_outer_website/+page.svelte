<script>
  import { onMount, onDestroy } from "svelte";
  import { ApiUrl } from "../_utils/static_store.js";
  import { Token } from "../_utils/dynamic_store.js";
  // import abcd from "./_utils/static_store.js";
  import { get } from "svelte/store";
    import { html } from "daisyui/dist/base.js";

  let batches;

  let currentIndexCardContainer1 = 0;
  let intervalIdCard1;
  let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // This will hold the data for the cards


  onMount(async () => {
    console.log("mounted");
    // localStorage.setItem("token","some value");

    var token = localStorage.getItem("token");
    if (token) {
      console.log("yes");
      location.href = "/login";
    }
    Token.set(token);
    // const response = await fetch('https://your-api-url.com/cards');
    // cards = await response.json();
   
    await getBatches();
    startIntervalCard1();
  });


  

  async function getBatches() {
    console.log("trying batches");
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/promotions/selectedBatches", {
      mode: "cors",
      method: "get",
      headers: {
        // Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          let data = response.data;
          batches = data[0].batches;
          // startIntervalBatch();
          console.log("batches");
          console.log(batches);
          console.log("batches");
          // batches= response.data.batches;
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log("caught1");
        alert("Some problem has occured, see console for more info.");
        console.log(e.message);
      }
    } else {
      console.log(await res.text());
    }
  }


  const nextCard1 = () => {
  if (currentIndexCardContainer1 <= batches.length - 12) {
    currentIndexCardContainer1 += 6;
  } else if (currentIndexCardContainer1 < batches.length - 6) {
    currentIndexCardContainer1 = batches.length - 6; // Show the last 6 cards
  } else {
    currentIndexCardContainer1 = 0; // Loop back to the start
  }
  resetIntervalCard1();
};

const prevCard1 = () => {
  if (currentIndexCardContainer1 >= 6) {
    currentIndexCardContainer1 -= 6;
  } else if (currentIndexCardContainer1 > 0) {
    currentIndexCardContainer1 = 0; // Show the first 6 cards
  } else {
    currentIndexCardContainer1 = batches.length - 6; // Loop back to the end
  }
  resetIntervalCard1();
};

  const startIntervalCard1 = () => {
    intervalIdCard1 = setInterval();
  };

  const resetIntervalCard1 = () => {
    clearInterval(intervalIdCard1);
    startIntervalCard1();
  };

//   let decodedImageTag = atob(batch.image);
// let imgElement = new DOMParser().parseFromString(decodedImageTag, 'text/html').body.firstChild;
// imgElement.width = '100%';
// imgElement.height = '100%';
// let modifiedImageTag = imgElement.outerHTML;

   // Function to decode the image, modify its attributes, and return the modified image tag
  //  const decodeAndModifyImage = (encodedImage) => {
  //   let decodedImageTag = atob(encodedImage);
  //   console.log("decodedImageTag");
  //   console.log(decodedImageTag);
  //   console.log("decodedImageTag");
  //   let imgElement = new DOMParser().parseFromString(decodedImageTag, 'text/html').body.firstChild;
  //   console.log("imgElement");
  //   console.log(imgElement);
  //   console.log("imgElement");
  //   imgElement.width = '100%';
  //   imgElement.height = '100%';
  //   return imgElement.outerHTML;
  // };

    // Function to decode the image, modify its attributes, and return the modified image tag
  //   const decodeAndModifyImage = (encodedImage) => {
  //   let decodedImageTag = atob(encodedImage);
  //   let modifiedImageTag = decodedImageTag.replace('<img ', '<img style="width:200px;height:100%;" ');
  //   return modifiedImageTag;
  // };
  const decodeAndModifyImage = (encodedImage) => {
    let decodedImageTag = atob(encodedImage);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let imageWidth = screenWidth / 7;
    let imageHeight = screenHeight / 3;
    let modifiedImageTag = decodedImageTag.replace('<img ', `<img style="width:${imageWidth}px;height:${imageHeight}px;" `);
    return modifiedImageTag;
  };


</script>

<!-- <img class="h-full" src="" alt=""> -->
<!-- <main class="mt-[69px] bg-gray-200">
  {#if batches}
  <div class="flex justify-center items-center mt-16 bg-white py-2">
    <button class="absolute left-4 z-10 px-3 py-4 bg-gray-200 rounded-sm" on:click={prevCard1}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <button class="absolute right-4 z-10 px-3 py-4 bg-gray-200 rounded-sm" on:click={nextCard1}><span><i class="fa-solid fa-angle-right"></i></span></button>
    <div class="relative w-full overflow-hidden box-border px-5">
      <div class="flex flex-nowrap transition-transform duration-500 box-border" style={`transform: translateX(-${currentIndexCardContainer1 * (100 / 6)}%);`}>
        {#each batches as batch, i}
        <div class="flex-none bg-white flex flex-col items-center justify-center text-2xl rounded-sm p-2 box-border" style="width: calc((100% - 0px) / 6);">
          <div class="flex-shrink-0 w-full h-64 md:h-64 ">
            <span class="self-center text-4xl">
              {@html decodeAndModifyImage(batch.image)}
            </span>
          </div>
          <h2 class="text-lg font-bold mb-2 ">{@html atob(batch.name)}</h2>
          <p class="text-sm mb-4">{@html atob(batch.description)}</p>  
        </div>
        {/each}
      </div>
    </div>
  </div>
  {/if}
</main> -->

<main class="mt-[69px] bg-gray-200">
  {#if batches}
  <div class="flex justify-center items-center mt-16 bg-white py-2">
    <button class="absolute left-3 z-10 px-3 py-4 bg-gray-200 rounded-sm" on:click={prevCard1}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <button class="absolute right-4 z-10 px-3 py-4 bg-gray-200 rounded-sm" on:click={nextCard1}><span><i class="fa-solid fa-angle-right"></i></span></button>
    <div class="relative w-full overflow-hidden box-border px-">
      <div class="flex flex-nowrap transition-transform duration-500 box-border" style={`transform: translateX(-${currentIndexCardContainer1 * (100 / 6)}%);`}>
        {#each batches as batch, i}
        <div class="w-[16.70%] flex-none bg-white flex flex-col items-center justify-center text-2xl rounded-sm box-border overflow-hidden" >
          <div class="flex-shrink-0  ">
            <span class="self-center text-4xl">
              {@html decodeAndModifyImage(batch.image)}
            </span>
          </div>
          <h2 class="text-lg font-bold mb-2 ">{@html atob(batch.name)}</h2>
          <p class="text-sm mb-4">{@html atob(batch.description)}</p>  
        </div>
        {/each}
      </div>
    </div>
  </div>
  {/if}
</main>


