<script>
  import { onMount, onDestroy } from "svelte";
  import { ApiUrl } from "./_utils/static_store.js";
  import { Token } from "./_utils/dynamic_store.js";
  // import abcd from "./_utils/static_store.js";
  import { get } from "svelte/store";
    import { html } from "daisyui/dist/base.js";
    import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let currentIndexBanner = 0;
  let intervalIdBanner;
  
  let banners;
  let batches;
  let galleries;
  let courses;
  let testseries;
  let programs;
  let testimonials;
  let teams;

  let currentIndexCardContainer1 = 0;
  let intervalIdCard1;

  let currentIndexCardContainer2 = 0;
  let intervalIdCard2;

  let currentIndexCardContainer3 = 0;
  let intervalIdCard3;

  let currentIndexCardContainer4 = 0;
  let intervalIdCard4;

  let currentIndexCardContainer5 = 0;
  let intervalIdCard5;

  let currentIndexCardContainer6 = 0;
  let intervalIdCard6;


  const number1 = tweened(0, { duration: 1000, easing: cubicOut });
  const number2 = tweened(0, { duration: 1000, easing: cubicOut });
  const number3 = tweened(0, { duration: 1000, easing: cubicOut });
  const number4 = tweened(0, { duration: 1000, easing: cubicOut });

  let sectionElement;
  let intervalId;


  const startIntervalBanner = () => {
  if (banners && banners.length > 0) {
    intervalIdBanner = setInterval(nextSlide, 2000); // Change slide every 2 seconds
  }
  };

  const stopIntervalBanner = () => {
    clearInterval(intervalIdBanner); // Clear the interval
  };

  const nextSlide = () => {
    currentIndexBanner = (currentIndexBanner + 1) % banners.length;
    resetInterval();
  };

  const prevSlide = () => {
    currentIndexBanner = (currentIndexBanner - 1 + banners.length) % banners.length;
    resetInterval();
  };

  const resetInterval = () => {
    stopIntervalBanner();
    startIntervalBanner();
  };

  onMount(async () => {

    intervalId = setInterval(() => {
      const rect = sectionElement.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        number1.set(1000);
        number2.set(70);
        number3.set(500);
        number4.set(200);
      } else {
        number1.set(0);
        number2.set(0);
        number3.set(0);
        number4.set(0);
      }
    }, 100);

    
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
    await getBanners();
    await getBatches();
    await getGalleries();
    await getCourses();
    await getTestSeriess();
    await getPrograms();
    await getTestimonials();
    await getTeams();
    startIntervalBanner();
    startIntervalCard1();

    return () => {
      clearInterval(intervalId);
    };

  });

  onDestroy(stopIntervalBanner);

  async function getBanners() {
    console.log("trying banners");
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/promotions/selectedBanners", {
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
          banners = data[0].banners;
          startIntervalBanner();
          console.log("banners");
          console.log(banners);
          console.log("banners");
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

  async function getGalleries() {
  console.log("trying galleries");
  var token = localStorage.getItem("token");
  var res;
  var loginPath = get(ApiUrl);
  console.log("trying branches");
  var res = await fetch(loginPath + "/promotions/selectedGalleries", {
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
        galleries = data[0].galleries;
        // startIntervalBatch();
        console.log("galleries");
        console.log(galleries);
        console.log("galleries");
        // galleries= response.data.galleries;
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

async function getCourses() {
  console.log("trying courses");
  var token = localStorage.getItem("token");
  var res;
  var loginPath = get(ApiUrl);
  console.log("trying branches");
  var res = await fetch(loginPath + "/promotions/selectedCourses", {
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
        courses = data[0].courses;
        // startIntervalBatch();
        console.log("courses");
        console.log(courses);
        console.log("courses");
        // courses= response.data.courses;
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

async function getTestSeriess() {
  console.log("trying testseriess");
  var token = localStorage.getItem("token");
  var res;
  var loginPath = get(ApiUrl);
  console.log("trying testseriess2");
  var res = await fetch(loginPath + "/promotions/selectedTestSeriess", {
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
        testseries = data[0].testseriess;
        // startIntervalBatch();
        console.log("testseries");
        console.log(testseries);
        console.log("testseries");
        // testseriess= response.data.testseriess;
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

  async function getPrograms() {
    console.log("trying programs");
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/promotions/selectedPrograms", {
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
          programs = data[0].programs;
          // startIntervalBatch();
          console.log("programs");
          console.log(programs);
          console.log("programs");
          // programs= response.data.programs;
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

  async function getTestimonials() {
    console.log("trying testimonials");
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/promotions/selectedTestimonials", {
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
          testimonials = data[0].testimonials;
          // startIntervalBatch();
          console.log("testimonials");
          console.log(testimonials);
          console.log("testimonials");
          // testimonials= response.data.testimonials;
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

  async function getTeams() {
  console.log("trying teams");
  var token = localStorage.getItem("token");
  var res;
  var loginPath = get(ApiUrl);
  console.log("trying branches");
  var res = await fetch(loginPath + "/promotions/selectedTeams", {
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
        teams = data[0].teams;
        // startIntervalBatch();
        console.log("teams");
        console.log(teams);
        console.log("teams");
        // teams= response.data.teams;
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

  const decodeAndModifyImage1 = (encodedImage) => {
    let decodedImageTag = atob(encodedImage);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let imageWidth = screenWidth / 7;
    let imageHeight = screenHeight / 3;
    // let modifiedImageTag = decodedImageTag.replace('<img ', `<img class="mx-auto object-cover  h-40 w-40" `);

    let modifiedImageTag = decodedImageTag.replace('<img ', `<img  style="width:${imageWidth}px;height:${imageHeight}px;" `);
    return modifiedImageTag;
  };

  // Start the interval when the component mounts
  // console.log(@html atob(banners[0].banner));
  const nextCard2 = () => {
    if (currentIndexCardContainer2 <= batches.length - 12) {
      currentIndexCardContainer2 += 6;
    } else if (currentIndexCardContainer2 < batches.length - 6) {
      currentIndexCardContainer2 = batches.length - 6; // Show the last 6 cards
    } else {
      currentIndexCardContainer2 = 0; // Loop back to the start
    }
    resetIntervalCard2();
  };
  
  const prevCard2 = () => {
    if (currentIndexCardContainer2 >= 6) {
      currentIndexCardContainer2 -= 6;
    } else if (currentIndexCardContainer2 > 0) {
      currentIndexCardContainer2 = 0; // Show the first 6 cards
    } else {
      currentIndexCardContainer2 = batches.length - 6; // Loop back to the end
    }
    resetIntervalCard2();
  };
  
    const startIntervalCard2 = () => {
      intervalIdCard2 = setInterval();
    };
  
    const resetIntervalCard2 = () => {
      clearInterval(intervalIdCard2);
      startIntervalCard2();
    };

    const decodeAndModifyImage2 = (encodedImage) => {
    let decodedImageTag = atob(encodedImage);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let imageWidth = screenWidth / 7;
    let imageHeight = screenHeight / 3;
    let modifiedImageTag = decodedImageTag.replace('<img ', `<img  style="width:${imageWidth}px;height:${imageHeight}px;" `);
    return modifiedImageTag;
  };

    const nextCard3 = () => {
    if (currentIndexCardContainer3 <= batches.length - 12) {
      currentIndexCardContainer3 += 6;
    } else if (currentIndexCardContainer3 < batches.length - 6) {
      currentIndexCardContainer3 = batches.length - 6; // Show the last 6 cards
    } else {
      currentIndexCardContainer3 = 0; // Loop back to the start
    }
    resetIntervalCard3();
  };
  
  const prevCard3 = () => {
    if (currentIndexCardContainer3 >= 6) {
      currentIndexCardContainer3 -= 6;
    } else if (currentIndexCardContainer3 > 0) {
      currentIndexCardContainer3 = 0; // Show the first 6 cards
    } else {
      currentIndexCardContainer3 = batches.length - 6; // Loop back to the end
    }
    resetIntervalCard3();
  };
  
    const startIntervalCard3 = () => {
      intervalIdCard3 = setInterval();
    };
  
    const resetIntervalCard3 = () => {
      clearInterval(intervalIdCard3);
      startIntervalCard3();
    };

    const decodeAndModifyImage3 = (encodedImage) => {
    let decodedImageTag = atob(encodedImage);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let imageWidth = screenWidth / 7;
    let imageHeight = screenHeight / 3;
    let modifiedImageTag = decodedImageTag.replace('<img ', `<img  style="width:${imageWidth}px;height:${imageHeight}px;" `);
    return modifiedImageTag;
  };

    const nextCard4 = () => {
  if (currentIndexCardContainer4 <= batches.length - 12) {
    currentIndexCardContainer4 += 6;
  } else if (currentIndexCardContainer4 < batches.length - 6) {
    currentIndexCardContainer4 = batches.length - 6; // Show the last 6 cards
  } else {
    currentIndexCardContainer4 = 0; // Loop back to the start
  }
  resetIntervalCard4();
};

const prevCard4 = () => {
  if (currentIndexCardContainer4 >= 6) {
    currentIndexCardContainer4 -= 6;
  } else if (currentIndexCardContainer4 > 0) {
    currentIndexCardContainer4 = 0; // Show the first 6 cards
  } else {
    currentIndexCardContainer4 = batches.length - 6; // Loop back to the end
  }
  resetIntervalCard4();
};

  const startIntervalCard4 = () => {
    intervalIdCard4 = setInterval();
  };

  const resetIntervalCard4 = () => {
    clearInterval(intervalIdCard4);
    startIntervalCard4();
  };

  const decodeAndModifyImage4 = (encodedImage) => {
    let decodedImageTag = atob(encodedImage);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let imageWidth = screenWidth / 7;
    let imageHeight = screenHeight / 3;
    let modifiedImageTag = decodedImageTag.replace('<img ', `<img  style="width:${imageWidth}px;height:${imageHeight}px;" `);
    return modifiedImageTag;
  };
  //   const prevCard5 = () => {
  //   if (currentIndexCardContainer5 >= 6) {
  //     currentIndexCardContainer5 -= 6;
  //   } else if (currentIndexCardContainer5 > 0) {
  //     currentIndexCardContainer5 = 0; // Show the first 6 cards
  //   } else {
  //     currentIndexCardContainer5 = batches.length - 6; // Loop back to the end
  //   }
  //   resetIntervalCard5();
  // };
  
  //   const startIntervalCard5 = () => {
  //     intervalIdCard5 = setInterval();
  //   };
  
  //   const resetIntervalCard5 = () => {
  //     clearInterval(intervalIdCard5);
  //     startIntervalCard5();
  //   };
  
  //   const decodeAndModifyImage5 = (encodedImage) => {
  //     let decodedImageTag = atob(encodedImage);
  //     let screenWidth = window.innerWidth;
  //     let screenHeight = window.innerHeight;
  //     let imageWidth = screenWidth / 7;
  //     let imageHeight = screenHeight / 3;
  //     let modifiedImageTag = decodedImageTag.replace('<img ', `<img class="mx-auto object-cover rounded-full h-40 w-40" `);
  //     return modifiedImageTag;
  //   };

  const nextCard5 = () => {
  if (currentIndexCardContainer5 <= batches.length - 12) {
    currentIndexCardContainer5 += 6;
  } else if (currentIndexCardContainer5 < batches.length - 6) {
    currentIndexCardContainer5 = batches.length - 6; // Show the last 6 cards
  } else {
    currentIndexCardContainer5 = 0; // Loop back to the start
  }
  resetIntervalCard4();
};

  const prevCard5 = () => {
  if (currentIndexCardContainer5 >= 3) {
    currentIndexCardContainer5 -= 3;
  } else if (currentIndexCardContainer5 > 0) {
    currentIndexCardContainer5 = 0; // Show the first 3 cards
  } else {
    currentIndexCardContainer5 = batches.length - 3; // Loop back to the end
  }
  resetIntervalCard5();
};

const startIntervalCard5 = () => {
  intervalIdCard5 = setInterval();
};

const resetIntervalCard5 = () => {
  clearInterval(intervalIdCard5);
  startIntervalCard5();
};

const decodeAndModifyImage5 = (encodedImage) => {
  let decodedImageTag = atob(encodedImage);
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let imageWidth = screenWidth / 4; // Adjusted for 3 cards
  let imageHeight = screenHeight / 3;
  let modifiedImageTag = decodedImageTag.replace('<img ', `<img class="mx-auto object-cover rounded-full h-40 w-40" `);
  return modifiedImageTag;
};

const decodeAndModify5 = (encodedImage) => {
  console.log("abcdefgh");
  let decodedImageTag = atob(encodedImage);
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let imageWidth = screenWidth / 4; // Adjusted for 3 cards
  let imageHeight = screenHeight / 3;
  console.log("123456");
  console.log(decodedImageTag);
  let modifiedImageTag = decodedImageTag.replace(/<p>/g, '<span>').replace(/<\/p>/g, '</span>');
  console.log("modifiedImageTag");
  console.log(modifiedImageTag);
  console.log("modifiedImageTag");
  return modifiedImageTag;
};

const nextCard6 = () => {
    if (currentIndexCardContainer6 <= batches.length - 12) {
      currentIndexCardContainer6 += 6;
    } else if (currentIndexCardContainer6 < batches.length - 6) {
      currentIndexCardContainer6 = batches.length - 6; // Show the last 6 cards
    } else {
      currentIndexCardContainer6 = 0; // Loop back to the start
    }
    resetIntervalCard6();
  };
  const prevCard6 = () => {
    if (currentIndexCardContainer6 >= 6) {
      currentIndexCardContainer6 -= 6;
    } else if (currentIndexCardContainer6 > 0) {
      currentIndexCardContainer6 = 0; // Show the first 6 cards
    } else {
      currentIndexCardContainer6 = batches.length - 6; // Loop back to the end
    }
    resetIntervalCard6();
  };
  
    const startIntervalCard6 = () => {
      intervalIdCard6 = setInterval();
    };
  
    const resetIntervalCard6 = () => {
      clearInterval(intervalIdCard6);
      startIntervalCard6();
    };
  
    const decodeAndModifyImage6 = (encodedImage) => {
      let decodedImageTag = atob(encodedImage);
      let screenWidth = window.innerWidth;
      let screenHeight = window.innerHeight;
      let imageWidth = screenWidth / 7;
      let imageHeight = screenHeight / 3;
      let modifiedImageTag = decodedImageTag.replace('<img ', `<img class="mx-auto object-cover rounded-lg h-40 w-40" `);
      return modifiedImageTag;
    };
  
</script>

<main class="mt-[67px] bg-gray-100">
  {#if banners}
  <div class="relative w-full">
    <div class="relative h-56 overflow-hidden md:h-96">
      <div
        class="flex transition-transform duration-700"
        style="transform: translateX(-{currentIndexBanner * 100}%)"
      >
        <!-- Slides -->
        {#each banners as banner}
          <div class="flex-shrink-0 w-full  md:h-96 ">
            <span class="self-center text-4xl">{@html atob(banner.banner)}</span
            >
          </div>
        {/each}
        <!-- {#each banners as banner}
          <div class="flex-shrink-0 w-full bg-blue-400 md:h-96 p-6">
            <img src={`data:image/jpeg;base64,${banner.banner}`} alt="Banner" class="w-full h-full object-cover" />
          </div>
        {/each} -->
        <!-- {#each banners as banner , ind}
          <div class="flex-shrink-0 w-full h-56 bg-blue-400 md:h-96 p-6">
            <img src={`data:image/jpeg;base64,${banner.banner}`} alt={`Banner ${ind + 1}`} class="w-full h-full object-contain" />
          </div>
        {/each} -->
      </div>
    </div>

    <!-- Slider indicators -->
    <div
      class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"
    >
    <!-- {#each banners as banner, i}
    <button
      type="button"
      class="w-3 h-3 border-gray-400 z-10 border-[1px] rounded-full {currentIndexBanner === i ? 'bg-white' : ''}"
      aria-current={currentIndexBanner === i}
      aria-label={`Slide ${i + 1}`}
      on:click={() => (currentIndexBanner = i)}
    ></button>
    {/each} -->
    {#each banners as banner, i}
<button
  type="button"
  class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-clip-padding p-0 -indent-[999px] transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none {currentIndexBanner === i ? 'bg-white' : 'bg-gray-400'}"
  aria-current={currentIndexBanner === i}
  aria-label={`Slide ${i + 1}`}
  on:click={() => {
    currentIndexBanner = i;
    resetInterval();
  }}
></button>
{/each}
    </div>

    <!-- Slider controls -->
    <!-- <button type="button" class="hover:bg-gray-400 opacity-50 absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" on:click={prevSlide}>
            <i class="fa-solid fa-angle-left text-black"></i>
        </button>
        <button type="button" class="hover:bg-gray-400 opacity-50 absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" on:click={nextSlide}>
            <i class="fa-solid fa-angle-right text-black"></i>
        </button> -->
    <div
      class="absolute top-0 start-0 z-20 h-full flex items-center justify-center"
    >
    <button
    type="button"
    class="px-4 cursor-pointer group focus:outline-none"
    on:click={prevSlide}
  >
    <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon fill-current text-gray-500 group-hover:text-white" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" />
    </svg>
  </button>
    </div>
    <div
      class="absolute top-0 end-0 z-20 h-full flex items-center justify-center"
    >
    <button
  type="button"
  class="px-4 cursor-pointer group focus:outline-none"
  on:click={nextSlide}
>
  <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon fill-current text-gray-500 group-hover:text-white" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
  </svg>
</button>
    </div>
  </div>
  {/if}

   <!-- left Right card Container -->
   <!-- <div class="flex justify-center items-center mt-16 py-3">
    <button class="absolute left-4 z-10 px-3 py-3 bg-gray-100 rounded-sm" on:click={prevCard1}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <div class="relative w-full flex overflow-hidden">
      <div class="flex w-full space-x-4 transition-transform duration-500" style={`transform: translateX(-${currentIndexCardContainer1 * 25}%);`}>
        {#each cards as card, i}
          <div class="w-[24%] flex-none bg-white flex flex-col items-center justify-center text-2xl rounded-lg p-4">
            <img src={card.image} alt={`Card ${i + 1}`} class="w-full bg-slate-600 h-64 object-cover rounded-lg mb-4">
            <h2 class="text-lg font-bold mb-2 ">{card.title}</h2>
            <p class="text-sm mb-4">{card.description}</p>
            <a href={card.link} class="text-blue-500 hover:underline">Read more</a>
          </div>
        {/each}
      </div>
    </div>
    <button class="absolute right-4 px-3 py-3 bg-gray-100 rounded-sm" on:click={nextCard1}><span><i class="fa-solid fa-angle-right"></i></span></button>
  </div> -->

    <!-- left Right card Container -->
    {#if batches}
    <main class="mt-8 py-5 bg-white">
      <div class=" ">
        <a href="/view_all/batches"><h2 class="text-3xl font-semibold text-center ">Our Batches</h2></a>
        <!-- <p class="max-w-3xl mx-auto mt-3 text-xl text-center text-gray-800"><a class="hover:underline" href="/view_all/batches">Check Out all our Batches</a></p> -->
      </div>
      <div class="flex justify-center items-center mt-2 bg-white py-2">
        <button class="absolute left-3 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={prevCard1}><span><i class="fa-solid fa-angle-left"></i></span></button>
        <button class="absolute right-4 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={nextCard1}><span><i class="fa-solid fa-angle-right"></i></span></button>
        <div class="relative w-full overflow-hidden box-border px-">
          <div class="flex flex-nowrap transition-transform duration-500 box-border " style={`transform: translateX(-${currentIndexCardContainer1 * (100 / 6)}%);`}>
            {#each batches as batch, i}
            <div class="w-[16.70%] flex-none bg-white  flex flex-col items-center justify-center text-2xl rounded-sm box-border overflow-hidden" >
              <div class="border-[1px] border-gray-400">
                <a href="/view/batch/{batch._id}">
                  <div class="flex-shrink-0  ">
                    <span class="self-center text-4xl ">
                      {@html decodeAndModifyImage1(batch.image)}
                    </span>
                  </div>
                  <h2 class="text-lg font-bold mb-2 text-center">{@html atob(batch.name)}</h2>
                  <p class="text-sm mb-4 text-center">{@html atob(batch.description)}</p>  
                </a>
              </div>
            </div>
            {/each}
          </div>
        </div>
      </div>
    </main>
    {/if}

    <div class="flex-wrap items-center justify-center gap-8 text-center sm:flex  my-8">
      <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                  <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                      </path>
                  </svg>
              </div>
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
              Daily Interactive Classes
          </h3>
          <p class="py-4 text-gray-500 text-md dark:text-gray-300">
            Daily interactive classes provide consistent engagement, immediate feedback, and personalized learning experiences, leading to better understanding and retention of material. 
          </p>
      </div>
      <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800">
          <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                  <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                      </path>
                  </svg>
              </div>
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
              Doubt Solving Sessions
          </h3>
          <p class="py-4 text-gray-500 text-md dark:text-gray-300">
              Doubt solving sessions offer targeted and immediate clarification of students' queries, enhancing their understanding and retention of complex concepts. 
          </p>
      </div>
      <div class="w-full  px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                  <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                      </path>
                  </svg>
              </div>
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
              100+
          </h3>
          <p class="py-4 text-gray-500 text-md dark:text-gray-300">
            100+ Tests, sample papers, and notes are essential tools for effective learning and exam preparation and ensures thorough preparation and a deeper grasp of the subject matter. 
          </p>
      </div>
      </div>


      <div class="container p-6 px-6 mx-auto bg-white dark:bg-gray-800 my-8">
        <div class="mb-16 text-center">
            <!-- <h2 class="text-base font-semibold tracking-wide text-indigo-600 uppercase">
                Features
            </h2> -->
            <p class="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Categories
            </p>
        </div>
        <div class="flex flex-wrap my-12 dark:text-white">
            <div class="w-full p-8 border-b md:w-1/2 md:border-r lg:w-1/3">
                <div class="flex items-center mb-6">
                    <svg width="20" height="20" fill="currentColor" class="w-6 h-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                        </path>
                    </svg>
                    <div class="ml-4 text-xl">
                        IIT JEE
                    </div>
                </div>
                <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                  Gravity classes is considered one of the best options for preparing for the IIT JEE exam.
                </p>
            </div>
            <div class="w-full p-8 border-b md:w-1/2 lg:w-1/3 lg:border-r">
                <div class="flex items-center mb-6">
                    <svg width="20" height="20" fill="currentColor" class="w-6 h-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                        </path>
                    </svg>
                    <div class="ml-4 text-xl">
                        NEET
                    </div>
                </div>
                <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                  Gravity classes NEET Online Coaching is one of the best coaching for the NEET UG Exam.
                </p>
            </div>
            <div class="w-full p-8 border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0">
                <div class="flex items-center mb-6">
                    <svg width="20" height="20" fill="currentColor" class="w-6 h-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                        </path>
                    </svg>
                    <div class="ml-4 text-xl">
                        Repeaters Batch
                    </div>
                </div>
                <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                    In Our target batch, we provide comprehensive study to the students who are preparing for the IIT JEE and NEET UG exam.
                </p>
            </div>
            <div class="w-full p-8 border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0">
                <div class="flex items-center mb-6">
                    <svg width="20" height="20" fill="currentColor" class="w-6 h-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                        </path>
                    </svg>
                    <div class="ml-4 text-xl">
                        School Integrated Programs
                    </div>
                </div>
                <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                    School Integrated Programs are designed to provide students to manage their school and coaching classes simultaneously.
                </p>
            </div>
            <div class="w-full p-8 border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0">
                <div class="flex items-center mb-6">
                    <svg width="20" height="20" fill="currentColor" class="w-6 h-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                        </path>
                    </svg>
                    <div class="ml-4 text-xl">
                        Pre Foundation
                    </div>
                </div>
                <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                  Our Pre Foundation is designed to provide students with a strong foundation in science and mathematics.
                </p>
            </div>
            <!-- <div class="w-full p-8 md:w-1/2 lg:w-1/3">
                <div class="flex items-center mb-6">
                    <svg width="20" height="20" fill="currentColor" class="w-6 h-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                        </path>
                    </svg>
                    <div class="ml-4 text-xl">
                        XYZ
                    </div>
                </div>
                <p class="leading-loose text-gray-500 dark:text-gray-200 text-md">
                    Build unique product titles and descriptions instead of spending days manually editing each product.
                </p>
            </div> -->
        </div>
        </div>

      


{#if courses}
<main class="mt-8 py-5 bg-white">
  <div>
    <a href="/courses"><h2 class="text-3xl font-semibold text-center ">Our Courses</h2></a>
    <!-- <p class="max-w-3xl mx-auto mt-3 text-xl text-center text-gray-800"><a class="hover:underline" href="/courses">Check Out all our Courses</a></p> -->
  </div>
  <div class="flex justify-center items-center mt-2 bg-white py-2">
    <button class="absolute left-3 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={prevCard2}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <button class="absolute right-4 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={nextCard2}><span><i class="fa-solid fa-angle-right"></i></span></button>
    <div class="relative w-full overflow-hidden box-border px-">
      <div class="flex flex-nowrap transition-transform duration-500 box-border " style={`transform: translateX(-${currentIndexCardContainer2 * (100 / 6)}%);`}>
        {#each courses as course, i}
        <div class="w-[16.70%] flex-none bg-white  flex flex-col items-center justify-center text-2xl rounded-sm box-border overflow-hidden" >
          <div class="border-[1px] border-gray-400">
            <a href="/view/course/{course._id}">
              <div class="flex-shrink-0  ">
                <span class="self-center text-4xl ">
                  {@html decodeAndModifyImage2(course.image)}
                </span>
              </div>
              <h2 class="text-lg font-bold mb-2 text-center">{@html atob(course.name)}</h2>
              <p class="text-sm mb-4 text-center">{@html atob(course.description)}</p>  
            </a>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</main>
{/if}

<section class="bg-white mt-5">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <!-- <img
          alt=""
          src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="absolute inset-0 h-full w-full object-cover"
        /> -->
        <img
          alt=""
          src="/images/best-Neet-coahing.jpg"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>
  
      <div class="lg:py-24">
        <h2 class="text-3xl font-bold sm:text-4xl">Learn With Us</h2>
  
        <p class="mt-4 text-gray-600">
          At Gravity, embark on a transformative learning journey with our expert instructors, comprehensive and 
          up-to-date curriculum, and flexible online courses designed to fit your schedule. Our interactive and engaging 
          materials, coupled with personalized support from dedicated tutors, ensure you receive the guidance and motivation
          needed to succeed. Join a vibrant global community, enjoy affordable and accessible education, and gain practical 
          skills for career advancement. Experience innovative learning solutions and a commitment to lifelong learning, 
          preparing you for success in an interconnected world. Start your educational journey with us today and discover the
          difference.
        </p>
  
        <a
          href="/contact_us"
          class="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Started Today
        </a>
      </div>
    </div>
  </div>
  </section>


{#if testseries}
<main class="mt-8 py-5 bg-white">
  <div>
    <a href="/view_all/testseries"><h2 class="text-3xl font-semibold text-center ">Our Testseries</h2></a>
    <!-- <p class="max-w-3xl mx-auto mt-3 text-xl text-center text-gray-800"><a class="hover:underline" href="/view_all/testseries">Check Out all our Testseries</a></p> -->
  </div>
  <div class="flex justify-center items-center mt-2 bg-white py-2">
    <button class="absolute left-3 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={prevCard3}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <button class="absolute right-4 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={nextCard3}><span><i class="fa-solid fa-angle-right"></i></span></button>
    <div class="relative w-full overflow-hidden box-border px-">
      <div class="flex flex-nowrap transition-transform duration-500 box-border " style={`transform: translateX(-${currentIndexCardContainer3 * (100 / 6)}%);`}>
        {#each testseries as testseries, i}
        <div class="w-[16.70%] flex-none bg-white  flex flex-col items-center justify-center text-2xl rounded-sm box-border overflow-hidden" >
          <div class="border-[1px] border-gray-400">
            <a href="/view/testseries/{testseries._id}">
              <div class="flex-shrink-0  ">
                <span class="self-center text-4xl ">
                  {@html decodeAndModifyImage3(testseries.image)}
                </span>
              </div>
              <h2 class="text-lg font-bold mb-2 text-center">{@html atob(testseries.name)}</h2>
              <p class="text-sm mb-4 text-center">{@html atob(testseries.description)}</p>  
            </a>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</main>
{/if}

    
{#if programs}
<main class="mt-8 py-5 bg-white">
  <div>
    <a href="/view_all/programs"><h2 class="text-3xl font-semibold text-center ">Our Programs</h2></a>
    <!-- <p class="max-w-3xl mx-auto mt-3 text-xl text-center text-gray-800"><a class="hover:underline" href="/view_all/programs">Check Out all our Programs</a></p> -->
  </div>
  <div class="flex justify-center items-center mt-2 bg-white py-2">
    <button class="absolute left-3 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={prevCard4}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <button class="absolute right-4 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={nextCard4}><span><i class="fa-solid fa-angle-right"></i></span></button>
    <div class="relative w-full overflow-hidden box-border px-">
      <div class="flex flex-nowrap transition-transform duration-500 box-border " style={`transform: translateX(-${currentIndexCardContainer4 * (100 / 6)}%);`}>
        {#each programs as program, i}
        <div class="w-[16.70%] flex-none bg-white  flex flex-col items-center justify-center text-2xl rounded-sm box-border overflow-hidden" >
          <div class="border-[1px] border-gray-400">
            <a href="/view/program/{program._id}">
              <div class="flex-shrink-0  ">
                <span class="self-center text-4xl ">
                  {@html decodeAndModifyImage4(program.image)}
                </span>
              </div>
              <h2 class="text-lg font-bold mb-2 text-center">{@html atob(program.name)}</h2>
              <p class="text-sm mb-4 text-center">{@html atob(program.description)}</p>  
            </a>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</main>
{/if}

<!-- <section
class="overflow-hidden bg-[url(https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80)] bg-cover bg-top bg-no-repeat"
>
<div class="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
  <div class="text-center ltr:sm:text-left rtl:sm:text-right">
    <h2 class="text-2xl font-bold text-white sm:text-3xl md:text-5xl">Make a start </h2>

    <p class="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore officia corporis quasi
      doloribus iure architecto quae voluptatum beatae excepturi dolores.
    </p>

    <div class="mt-4 sm:mt-8">
      <a
        href="/contact_us"
        class="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
      >
        Get Yours Selection
      </a>
    </div>
  </div>
</div>
</section> -->
<div class="w-full h-full">
  <img
          alt=""
          src="/images/scholorship_exam_jee_neet-scaled.jpg"
          class=""
        />

</div>

{#if testimonials}
<main class="mt-8 py-5 bg-gray-100">
  <div>
    <a href="/view_all/testimonials"><h2 class="text-3xl font-semibold text-center ">Our Results</h2></a>
    <!-- <p class="max-w-3xl mx-auto mt-3 text-xl text-center text-gray-800"><a class="hover:underline" href="/view_all/testimonials">Check Out all our Testimonials</a></p> -->
  </div>
  <div class="flex justify-center items-center mt-2 bg-gray-100 py-2">
    <button class="absolute left-3 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={prevCard5}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <button class="absolute right-4 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={nextCard5}><span><i class="fa-solid fa-angle-right"></i></span></button>
    <div class="relative w-full overflow-hidden box-border  px-">
      <div class="flex flex-nowrap transition-transform duration-500 box-border " style={`transform: translateX(-${currentIndexCardContainer5 * (100 / 3)}%);`}>
        {#each testimonials as testimonial, i}
        <div class="w-[33.33%] flex-none   flex flex-col items-center justify-center text-2xl rounded-sm box-border overflow-hidden" >
          <div class="bg-white dark:bg-gray-800 w-80 shadow-lg mx-auto rounded-xl p-4">
            <a href="/view/testimonial/{testimonial._id}">
              <div class="flex-shrink-0  ">
                <span class="self-center text-4xl ">
                  {@html decodeAndModifyImage5(testimonial.image)}
                </span>
              </div>
              <div class="">
                <p class="text-gray-600 text-base dark:text-white">
                    <span class="text-lg font-bold text-indigo-500">
                        “
                    </span>
                    {@html decodeAndModify5(testimonial.description)}
                    <span class="text-lg font-bold text-indigo-500">
                        ”
                    </span>
                </p>
                <div class="flex items-center mt-4">
                    <!-- <a href="#" class="relative block">
                        <img alt="profil" src="/images/person/1.jpg" class="mx-auto object-cover rounded-full h-10 w-10 "/>
                    </a> -->
                    <div class="flex flex-col justify-between ml-2">
                        <span class="text-sm font-semibold text-gray-800">
                          {@html decodeAndModify5(testimonial.name)}
                        </span>
                        <!-- <span class="flex items-center text-xs dark:text-gray-400">
                            User of Tail-Kit
                            <img src="/icons/rocket.svg" class="w-4 h-4 ml-2"/>
                        </span> -->
                    </div>
                    
                </div>
                <div class="flex flex-col justify-between ml-2">
                  <p>
                    <span class="text-sm font-semibold text-indigo-500">
                      {@html decodeAndModify5(testimonial.rank)}
                  </span>
                  <span class="text-sm font-semibold text-gray-500">
                    |
                </span>
                <span class="text-sm font-semibold text-indigo-500">
                  {@html decodeAndModify5(testimonial.stream)}
              </span>
                  </p>
                 
                  
              </div>
            </div>
            </a>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</main>
{/if}

<!-- {#if teams}
<main class="mt-8 bg-gray-100">
  <div>
    <h2 class="text-3xl font-bold text-center sm:text-2xl">Our Teams</h2>
    <p class="max-w-3xl mx-auto mt-3 text-xl text-center text-gray-800"><a class="hover:underline" href="/view_all/teams">Check Out all our Teams</a></p>
  </div>
  <div class="flex justify-center items-center mt-2 bg-gray-100 py-2">
    <button class="absolute left-3 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={prevCard6}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <button class="absolute right-4 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={nextCard6}><span><i class="fa-solid fa-angle-right"></i></span></button>
    <div class="relative w-full overflow-hidden box-border  px-">
      <div class="flex flex-nowrap transition-transform duration-500 box-border " style={`transform: translateX(-${currentIndexCardContainer6 * (100 / 3)}%);`}>
        {#each teams as team, i}
        <div class="w-[33.33%] flex-none   flex flex-col items-center justify-center text-2xl rounded-sm box-border overflow-hidden" >
          <div class="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4">
            <a href="/view/team/{team._id}">
              <div class="flex-shrink-0  ">
                <span class="self-center text-4xl ">
                  {@html decodeAndModifyImage6(team.image)}
                </span>
              </div>
              <div class="">
                <div class="flex items-center mt-4">
                    
                    <div class="flex flex-col justify-between ml-2 justify-center">
                        <span class="text-sm font-semibold text-gray-800">
                            Jean Miguel
                        </span>
                       
                    </div>             
                </div>
                <div class="flex flex-col justify-between ml-2">
                  <p>
                    <span class="text-sm font-semibold text-indigo-500">
                      AIR 1222
                  </span>
                  <span class="text-sm font-semibold text-gray-300">
                    |
                </span>
                <span class="text-sm font-semibold text-indigo-500">
                  JEE
              </span>
                  </p>
                 
                  
              </div>
            </div>
            </a>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</main>
{/if} -->

<!-- <section
  bind:this={sectionElement}
  class="bg-indigo-800 text-white text-5xl font-bold p-4 mt-20"
>
  {$number1.toFixed(0)}
  {$number2.toFixed(0)}
  {$number3.toFixed(0)}
</section> -->

<section bind:this={sectionElement} class="bg-indigo-600">
  <div class="container grid grid-cols-2 gap-8 py-8 mx-auto text-center md:grid-cols-4">
      <div>
          <h5 class="text-5xl font-bold text-white">
              <span class="inline text-white">
                {$number1.toFixed(0)}
              </span>
              <span class="text-indigo-200">
                  +
              </span>
          </h5>
          <p class="text-xs font-medium tracking-wide text-indigo-100 uppercase">
              Total Selection
          </p>
      </div>
      <div>
          <h5 class="text-5xl font-bold text-white">
              <span class="inline text-white">
                {$number2.toFixed(0)}
              </span>
              <span class="text-indigo-200">
                  +
              </span>
          </h5>
          <p class="text-xs font-medium tracking-wide text-indigo-100 uppercase">
              Mock Test
          </p>
      </div>
      <div>
          <h5 class="text-5xl font-bold text-white">
              <span class="inline text-white">
                {$number3.toFixed(0)}
              </span>
              <span class="text-indigo-200">
                  +
              </span>
          </h5>
          <p class="text-xs font-medium tracking-wide text-indigo-100 uppercase">
              Video Lectures
          </p>
      </div>
      <div>
          <h5 class="text-5xl font-bold text-white">
              <span class="inline text-white">
                {$number4.toFixed(0)}
              </span>
              <span class="text-indigo-200">
                  +
              </span>
          </h5>
          <p class="text-xs font-medium tracking-wide text-indigo-100 uppercase">
              Practice papers
          </p>
      </div>
  </div>
  <div class="flex p-4 mx-auto mt-4 w-52">
      <a href="/contact_us">
        <button type="button" class="py-2 px-10  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
          Join
      </button>
      </a>
  </div>
  </section>

{#if teams}
<main class="mt-8 py-5 bg-gray-100">
  <div>
    <a href="/view_all/teams"><h2 class="text-3xl font-semibold text-center ">Our Team</h2></a>
    <!-- <p class="max-w-3xl mx-auto mt-3 text-xl text-center text-gray-800"><a class="hover:underline" href="/view_all/teams">Check Out all our Teams</a></p> -->
  </div>
  <div class="flex justify-center items-center mt-2 bg-gray-100 py-2">
    <button class="absolute left-3 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={prevCard6}><span><i class="fa-solid fa-angle-left"></i></span></button>
    <button class="absolute right-4 z-10 px-3 py-4 bg-white text-gray-500 rounded-sm" on:click={nextCard6}><span><i class="fa-solid fa-angle-right"></i></span></button>
    <div class="relative w-full overflow-hidden box-border  px-">
      <div class="flex flex-nowrap transition-transform duration-500 box-border " style={`transform: translateX(-${currentIndexCardContainer6 * (100 / 3)}%);`}>
        {#each teams as team, i}
        <div class="w-[33.33%] flex-none   flex flex-col items-center justify-center text-2xl rounded-sm box-border overflow-hidden" >
          <div class="relative p-4 mt-20 w-96">
            <a href="/view/team/{team._id}">
              <div class="absolute mb-4 text-center transform translate-x-1/2 border-white border-2 rounded-lg -top-16 right-1/2">
                <span class="self-center text-4xl ">
                  {@html decodeAndModifyImage6(team.image)}
                </span>
            </div>
            <div class="px-8 py-4 pt-24 bg-white rounded-lg shadow dark:bg-gray-800">
                <div class="text-center">
                    <p class="text-lg text-gray-800 dark:text-white">
                      {@html atob(team.name)}
                    </p>
                    <!-- <p class="text-xl font-light text-gray-500 dark:text-gray-200">
                        Lead dev
                    </p> -->
                    <p class="py-4 mx-auto font-light text-gray-500 text-base  ">
                      {@html atob(team.description)}
                    </p>
                </div>
                <div class="flex items-center justify-between w-40 pt-8 mx-auto text-gray-500 border-t border-gray-200">
                    <a href="#">
                        <svg width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z">
                            </path>
                        </svg>
                    </a>
                    <a href="#">
                        <svg width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z">
                            </path>
                        </svg>
                    </a>
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792">
                            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                            </path>
                        </svg>
                    </a>
                    <a href="#">
                        <svg width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z">
                            </path>
                        </svg>
                    </a>
                    <a href="#">
                        <svg width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1551 1476q15-6 26-3t11 17.5-15 33.5q-13 16-44 43.5t-95.5 68-141 74-188 58-229.5 24.5q-119 0-238-31t-209-76.5-172.5-104-132.5-105-84-87.5q-8-9-10-16.5t1-12 8-7 11.5-2 11.5 4.5q192 117 300 166 389 176 799 90 190-40 391-135zm207-115q11 16 2.5 69.5t-28.5 102.5q-34 83-85 124-17 14-26 9t0-24q21-45 44.5-121.5t6.5-98.5q-5-7-15.5-11.5t-27-6-29.5-2.5-35 0-31.5 2-31 3-22.5 2q-6 1-13 1.5t-11 1-8.5 1-7 .5h-10l-3-.5-2-1.5-1.5-3q-6-16 47-40t103-30q46-7 108-1t76 24zm-394-443q0 31 13.5 64t32 58 37.5 46 33 32l13 11-227 224q-40-37-79-75.5t-58-58.5l-19-20q-11-11-25-33-38 59-97.5 102.5t-127.5 63.5-140 23-137.5-21-117.5-65.5-83-113-31-162.5q0-84 28-154t72-116.5 106.5-83 122.5-57 130-34.5 119.5-18.5 99.5-6.5v-127q0-65-21-97-34-53-121-53-6 0-16.5 1t-40.5 12-56 29.5-56 59.5-48 96l-294-27q0-60 22-119t67-113 108-95 151.5-65.5 190.5-24.5q100 0 181 25t129.5 61.5 81 83 45 86 12.5 73.5v589zm-672 21q0 86 70 133 66 44 139 22 84-25 114-123 14-45 14-101v-162q-59 2-111 12t-106.5 33.5-87 71-32.5 114.5z">
                            </path>
                        </svg>
                    </a>
                </div>
            </div>
            </a>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</main>
{/if}


<!-- <div class="relative p-4 mt-20 w-80">
  <div class="absolute mb-4 text-center transform translate-x-1/2 -top-16 right-1/2">
      <a href="#" class="relative block">
          <img alt="profil" src="/images/person/2.jpeg" class="mx-auto object-cover rounded-lg h-40 w-40 bg-gray-500 border-2 border-white dark:border-gray-800"/>
      </a>
  </div>
  <div class="px-8 py-4 pt-24 bg-gray-300 rounded-lg shadow dark:bg-gray-800">
      <div class="text-center">
          <p class="text-2xl text-gray-800 dark:text-white">
              Charlie
          </p>
          <p class="text-xl font-light text-gray-500 dark:text-gray-200">
              Lead dev
          </p>
          <p class="py-4 mx-auto font-light text-gray-500 text-md w-60 dark:text-gray-400">
              Charlie, born December 18, 1993 in Challans, is an imitator.
          </p>
      </div>
      <div class="flex items-center justify-between w-40 pt-8 mx-auto text-gray-500 border-t border-gray-200">
          <a href="#">
              <svg width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z">
                  </path>
              </svg>
          </a>
          <a href="#">
              <svg width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z">
                  </path>
              </svg>
          </a>
          <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792">
                  <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                  </path>
              </svg>
          </a>
          <a href="#">
              <svg width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z">
                  </path>
              </svg>
          </a>
          <a href="#">
              <svg width="30" height="30" fill="currentColor" class="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1551 1476q15-6 26-3t11 17.5-15 33.5q-13 16-44 43.5t-95.5 68-141 74-188 58-229.5 24.5q-119 0-238-31t-209-76.5-172.5-104-132.5-105-84-87.5q-8-9-10-16.5t1-12 8-7 11.5-2 11.5 4.5q192 117 300 166 389 176 799 90 190-40 391-135zm207-115q11 16 2.5 69.5t-28.5 102.5q-34 83-85 124-17 14-26 9t0-24q21-45 44.5-121.5t6.5-98.5q-5-7-15.5-11.5t-27-6-29.5-2.5-35 0-31.5 2-31 3-22.5 2q-6 1-13 1.5t-11 1-8.5 1-7 .5h-10l-3-.5-2-1.5-1.5-3q-6-16 47-40t103-30q46-7 108-1t76 24zm-394-443q0 31 13.5 64t32 58 37.5 46 33 32l13 11-227 224q-40-37-79-75.5t-58-58.5l-19-20q-11-11-25-33-38 59-97.5 102.5t-127.5 63.5-140 23-137.5-21-117.5-65.5-83-113-31-162.5q0-84 28-154t72-116.5 106.5-83 122.5-57 130-34.5 119.5-18.5 99.5-6.5v-127q0-65-21-97-34-53-121-53-6 0-16.5 1t-40.5 12-56 29.5-56 59.5-48 96l-294-27q0-60 22-119t67-113 108-95 151.5-65.5 190.5-24.5q100 0 181 25t129.5 61.5 81 83 45 86 12.5 73.5v589zm-672 21q0 86 70 133 66 44 139 22 84-25 114-123 14-45 14-101v-162q-59 2-111 12t-106.5 33.5-87 71-32.5 114.5z">
                  </path>
              </svg>
          </a>
      </div>
  </div>
</div> -->

  
<footer class="bg-gray-300">
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div
      class="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between"
    >
      <strong class="text-xl text-white sm:text-xl"> Make Your Next Career Move! </strong>

      <a
        class="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
        href="#"
      >
        <span class="text-sm font-medium"> Let's Get Started </span>

        <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>

    <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div class="text-center sm:text-left">
        <p class="text-lg font-medium text-gray-900">About Us</p>

        <ul class="mt-8 space-y-4 text-sm">
          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
              Company History
            </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Meet the Team </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
              Employee Handbook
            </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
          </li>
        </ul>
      </div>

      <div class="text-center sm:text-left">
        <p class="text-lg font-medium text-gray-900">Our Services</p>

        <ul class="mt-8 space-y-4 text-sm">
          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
              Web Development
            </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Web Design </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Marketing </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Google Ads </a>
          </li>
        </ul>
      </div>

      <div class="text-center sm:text-left">
        <p class="text-lg font-medium text-gray-900">Resources</p>

        <ul class="mt-8 space-y-4 text-sm">
          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Online Guides </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
              Conference Notes
            </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Forum </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Downloads </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
              Upcoming Events
            </a>
          </li>
        </ul>
      </div>

      <div class="text-center sm:text-left">
        <p class="text-lg font-medium text-gray-900">Helpful Links</p>

        <ul class="mt-8 space-y-4 text-sm">
          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> FAQs </a>
          </li>

          <li>
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Support </a>
          </li>

          <li>
            <a
              class="group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
              href="#"
            >
              <span class="text-gray-700 transition group-hover:text-gray-700/75"> Live Chat </span>

              <span class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"
                ></span>
                <span class="relative inline-flex size-2 rounded-full bg-teal-500"></span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-16">
      <ul class="flex justify-center gap-6 sm:justify-end">
        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            class="text-teal-700 transition hover:text-teal-700/75"
          >
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            class="text-teal-700 transition hover:text-teal-700/75"
          >
            <span class="sr-only">Instagram</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            class="text-teal-700 transition hover:text-teal-700/75"
          >
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
              />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            class="text-teal-700 transition hover:text-teal-700/75"
          >
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            class="text-teal-700 transition hover:text-teal-700/75"
          >
            <span class="sr-only">Dribbble</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>

      <div class="mt-16 sm:flex sm:items-center sm:justify-between">
        <div class="flex justify-center text-teal-600 sm:justify-start">
          <svg class="h-8" viewBox="0 0 118 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37.83 19.2047C37.2352 19.237 36.6469 19.0679 36.16 18.7247C35.9566 18.5739 35.7929 18.3758 35.6831 18.1476C35.5733 17.9193 35.5208 17.6678 35.53 17.4147V8.1447C35.5252 8.1055 35.5293 8.0656 35.5422 8.0282C35.555 7.9908 35.5762 7.9569 35.6042 7.9289C35.6322 7.9009 35.6661 7.8797 35.7035 7.8669C35.7409 7.854 35.7808 7.8499 35.82 7.8547H37.5C37.69 7.8547 37.78 7.9547 37.78 8.1447V16.6947C37.78 17.0747 37.95 17.2647 38.3 17.2647C38.4484 17.2708 38.5968 17.254 38.74 17.2147C38.94 17.2147 39.05 17.2747 39.06 17.4547L39.21 18.7047C39.2172 18.7412 39.2165 18.7787 39.208 18.8149C39.1995 18.851 39.1833 18.885 39.1605 18.9143C39.1378 18.9437 39.109 18.9679 39.0762 18.9852C39.0433 19.0025 39.0071 19.0126 38.97 19.0147C38.602 19.1363 38.2175 19.2004 37.83 19.2047Z"
              fill="currentColor"
            />
            <path
              d="M47.28 18.1347C46.4359 18.8322 45.375 19.2137 44.28 19.2137C43.185 19.2137 42.1242 18.8322 41.28 18.1347C40.5381 17.3857 40.1218 16.374 40.1218 15.3197C40.1218 14.2654 40.5381 13.2537 41.28 12.5047C42.1258 11.8108 43.186 11.4316 44.28 11.4316C45.374 11.4316 46.4342 11.8108 47.28 12.5047C48.0049 13.2606 48.4096 14.2674 48.4096 15.3147C48.4096 16.362 48.0049 17.3688 47.28 18.1247V18.1347ZM42.86 16.8147C43.2518 17.1696 43.7614 17.3661 44.29 17.3661C44.8186 17.3661 45.3283 17.1696 45.72 16.8147C46.0746 16.4071 46.2698 15.885 46.2698 15.3447C46.2698 14.8045 46.0746 14.2824 45.72 13.8747C45.3283 13.5199 44.8186 13.3233 44.29 13.3233C43.7614 13.3233 43.2518 13.5199 42.86 13.8747C42.5055 14.2824 42.3102 14.8045 42.3102 15.3447C42.3102 15.885 42.5055 16.4071 42.86 16.8147Z"
              fill="currentColor"
            />
            <path
              d="M57.66 11.6847C57.85 11.6847 57.94 11.7847 57.94 11.9747V19.1447C57.9575 19.6287 57.8669 20.1104 57.6749 20.5549C57.4829 20.9995 57.1943 21.3957 56.83 21.7147C56.0214 22.4042 54.9816 22.7615 53.92 22.7147C52.9612 22.7484 52.0151 22.4866 51.21 21.9647C50.8662 21.739 50.5725 21.4449 50.3472 21.1009C50.1218 20.7568 49.9696 20.3701 49.9 19.9647C49.9 19.7647 49.9 19.6747 50.17 19.6747H51.85C51.9213 19.6771 51.9905 19.7002 52.049 19.741C52.1076 19.7818 52.1531 19.8386 52.18 19.9047C52.289 20.2084 52.5062 20.4613 52.79 20.6147C53.1359 20.7932 53.5209 20.8826 53.91 20.8747C54.1448 20.8876 54.3798 20.8535 54.6013 20.7745C54.8228 20.6956 55.0263 20.5732 55.2 20.4147C55.3587 20.2489 55.4821 20.0526 55.5629 19.8378C55.6437 19.623 55.6801 19.394 55.67 19.1647V18.5347C55.0685 18.9771 54.3364 19.2059 53.59 19.1847C53.0676 19.2037 52.5468 19.117 52.0587 18.9297C51.5707 18.7423 51.1256 18.4584 50.75 18.0947C50.0291 17.3489 49.6261 16.3521 49.6261 15.3147C49.6261 14.2774 50.0291 13.2806 50.75 12.5347C51.1274 12.1743 51.5731 11.8931 52.0608 11.7076C52.5486 11.5221 53.0685 11.4361 53.59 11.4547C54.358 11.4344 55.1098 11.678 55.72 12.1447V11.9847C55.7154 11.9464 55.7194 11.9075 55.7317 11.8709C55.744 11.8344 55.7643 11.801 55.7911 11.7732C55.8179 11.7454 55.8506 11.724 55.8867 11.7104C55.9229 11.6968 55.9616 11.6915 56 11.6947L57.66 11.6847ZM53.78 17.4047C54.0376 17.4127 54.2939 17.364 54.5306 17.262C54.7673 17.1601 54.9788 17.0074 55.15 16.8147C55.4825 16.3854 55.6629 15.8577 55.6629 15.3147C55.6629 14.7717 55.4825 14.2441 55.15 13.8147C54.9794 13.6247 54.7692 13.4742 54.5343 13.374C54.2993 13.2738 54.0453 13.2263 53.79 13.2347C53.5294 13.2265 53.2702 13.275 53.0302 13.3769C52.7902 13.4788 52.5752 13.6316 52.4 13.8247C52.0317 14.2354 51.838 14.7735 51.86 15.3247C51.842 15.8705 52.0314 16.4029 52.39 16.8147C52.5656 17.0073 52.7807 17.1598 53.0206 17.2616C53.2605 17.3634 53.5195 17.4122 53.78 17.4047Z"
              fill="currentColor"
            />
            <path
              d="M66.57 18.1347C65.7242 18.8286 64.664 19.2078 63.57 19.2078C62.476 19.2078 61.4158 18.8286 60.57 18.1347C59.8445 17.3771 59.4395 16.3687 59.4395 15.3197C59.4395 14.2708 59.8445 13.2623 60.57 12.5047C61.4166 11.8126 62.4765 11.4345 63.57 11.4345C64.6635 11.4345 65.7234 11.8126 66.57 12.5047C67.2949 13.2606 67.6996 14.2674 67.6996 15.3147C67.6996 16.362 67.2949 17.3688 66.57 18.1247V18.1347ZM62.14 16.8147C62.3317 16.9971 62.5577 17.1396 62.8049 17.234C63.0521 17.3284 63.3155 17.3729 63.58 17.3647C63.8428 17.3715 64.1044 17.3265 64.3498 17.2321C64.5952 17.1377 64.8195 16.9959 65.01 16.8147C65.3588 16.4043 65.5503 15.8833 65.5503 15.3447C65.5503 14.8061 65.3588 14.2851 65.01 13.8747C64.8195 13.6936 64.5952 13.5517 64.3498 13.4574C64.1044 13.363 63.8428 13.3179 63.58 13.3247C63.3155 13.3166 63.0521 13.361 62.8049 13.4554C62.5577 13.5498 62.3317 13.6924 62.14 13.8747C61.7913 14.2851 61.5998 14.8061 61.5998 15.3447C61.5998 15.8833 61.7913 16.4043 62.14 16.8147Z"
              fill="currentColor"
            />
            <path
              d="M71.31 9.9847C71.0457 10.2161 70.7063 10.3436 70.355 10.3436C70.0037 10.3436 69.6644 10.2161 69.4 9.9847C69.2802 9.8716 69.1847 9.7352 69.1194 9.5839C69.0542 9.4326 69.0205 9.2695 69.0205 9.1047C69.0205 8.9399 69.0542 8.7769 69.1194 8.6255C69.1847 8.4742 69.2802 8.3378 69.4 8.2247C69.6671 7.9991 70.0054 7.8754 70.355 7.8754C70.7046 7.8754 71.0429 7.9991 71.31 8.2247C71.4299 8.3378 71.5254 8.4742 71.5906 8.6255C71.6559 8.7769 71.6895 8.9399 71.6895 9.1047C71.6895 9.2695 71.6559 9.4326 71.5906 9.5839C71.5254 9.7352 71.4299 9.8716 71.31 9.9847ZM71.52 19.2047C70.9256 19.2339 70.3383 19.0651 69.85 18.7247C69.6497 18.5717 69.4888 18.3729 69.381 18.145C69.2731 17.9171 69.2213 17.6667 69.23 17.4147V11.9747C69.2252 11.9355 69.2293 11.8956 69.2422 11.8582C69.255 11.8208 69.2762 11.7869 69.3042 11.7589C69.3322 11.7309 69.3661 11.7097 69.4035 11.6969C69.4409 11.684 69.4808 11.6799 69.52 11.6847H71.2C71.39 11.6847 71.48 11.7847 71.48 11.9747V16.6947C71.48 17.0747 71.65 17.2647 71.99 17.2647C72.1417 17.2702 72.2933 17.2533 72.44 17.2147C72.64 17.2147 72.75 17.2747 72.76 17.4547L72.91 18.7047C72.9172 18.7412 72.9165 18.7787 72.908 18.8149C72.8995 18.851 72.8833 18.885 72.8605 18.9143C72.8378 18.9437 72.809 18.9679 72.7762 18.9852C72.7433 19.0025 72.7071 19.0126 72.67 19.0147C72.2988 19.137 71.9109 19.2011 71.52 19.2047Z"
              fill="currentColor"
            />
            <path
              d="M79.09 11.4447C79.6148 11.424 80.1383 11.5089 80.6296 11.6944C81.1209 11.88 81.57 12.1623 81.95 12.5247C82.6572 13.2837 83.0504 14.2824 83.0504 15.3197C83.0504 16.357 82.6572 17.3558 81.95 18.1147C81.5718 18.4804 81.1233 18.7655 80.6317 18.9528C80.1401 19.1402 79.6157 19.2259 79.09 19.2047C78.3412 19.2214 77.6073 18.9932 77 18.5547V22.1647C77 22.3547 76.9 22.4447 76.71 22.4447H75.03C74.9917 22.4519 74.9522 22.4496 74.9149 22.4381C74.8777 22.4265 74.8438 22.4061 74.8162 22.3785C74.7887 22.3509 74.7682 22.3171 74.7567 22.2798C74.7451 22.2426 74.7429 22.2031 74.75 22.1647V13.9647C74.7618 13.8845 74.7546 13.8027 74.7292 13.7257C74.7037 13.6488 74.6605 13.5788 74.6032 13.5215C74.5459 13.4642 74.476 13.4211 74.399 13.3956C74.3221 13.3701 74.2402 13.363 74.16 13.3747H73.83C73.61 13.3747 73.5 13.2947 73.5 13.1347V11.9547C73.4948 11.8817 73.5148 11.8091 73.5567 11.7491C73.5985 11.689 73.6597 11.6451 73.73 11.6247C74.0759 11.499 74.442 11.438 74.81 11.4447C75.177 11.4122 75.5453 11.4901 75.8678 11.6682C76.1902 11.8464 76.4522 12.1168 76.62 12.4447C76.9421 12.1189 77.3273 11.8622 77.752 11.6902C78.1767 11.5183 78.632 11.4347 79.09 11.4447ZM77.53 16.8147C77.7083 17.0011 77.9225 17.1494 78.1597 17.2507C78.3969 17.352 78.6521 17.4042 78.91 17.4042C79.1679 17.4042 79.4232 17.352 79.6603 17.2507C79.8975 17.1494 80.1117 17.0011 80.29 16.8147C80.6656 16.3958 80.8629 15.8469 80.84 15.2847C80.8662 14.7221 80.6684 14.1719 80.29 13.7547C80.1117 13.5684 79.8975 13.4201 79.6603 13.3188C79.4232 13.2174 79.1679 13.1652 78.91 13.1652C78.6521 13.1652 78.3969 13.2174 78.1597 13.3188C77.9225 13.4201 77.7083 13.5684 77.53 13.7547C77.1662 14.1793 76.9768 14.726 77 15.2847C76.9797 15.843 77.1688 16.3887 77.53 16.8147Z"
              fill="currentColor"
            />
            <path
              d="M87.77 19.2047C86.8723 19.2416 85.9822 19.0269 85.2 18.5847C84.8862 18.3957 84.619 18.1384 84.4181 17.832C84.2173 17.5256 84.0881 17.1779 84.04 16.8147C84.04 16.6147 84.11 16.5147 84.33 16.5147H85.8C85.8699 16.5175 85.9378 16.5394 85.996 16.5783C86.0542 16.6171 86.1006 16.6712 86.13 16.7347C86.34 17.2747 86.89 17.5447 87.77 17.5447C88.077 17.5588 88.3826 17.4969 88.66 17.3647C88.7558 17.3215 88.8379 17.2531 88.8978 17.1668C88.9577 17.0805 88.993 16.9795 89 16.8747C89 16.6147 88.84 16.4347 88.52 16.3147C88.1405 16.1884 87.7481 16.1045 87.35 16.0647C86.8785 16.0113 86.4109 15.9278 85.95 15.8147C85.5018 15.7133 85.0943 15.4799 84.78 15.1447C84.5949 14.9169 84.4587 14.6534 84.3797 14.3707C84.3008 14.088 84.2809 13.792 84.3212 13.5013C84.3616 13.2105 84.4613 12.9311 84.6142 12.6806C84.7671 12.43 84.9699 12.2136 85.21 12.0447C85.9308 11.5856 86.7765 11.3619 87.63 11.4047C88.4564 11.3768 89.274 11.5812 89.99 11.9947C90.2786 12.1582 90.527 12.3839 90.7173 12.6555C90.9076 12.9271 91.0349 13.2377 91.09 13.5647C91.09 13.7647 91 13.8647 90.82 13.8647H89.34C89.2777 13.8684 89.2157 13.8532 89.1622 13.8211C89.1087 13.789 89.0661 13.7414 89.04 13.6847C88.9411 13.4479 88.7549 13.2581 88.52 13.1547C88.255 13.0161 87.959 12.9472 87.66 12.9547C87.3669 12.9388 87.0745 12.9973 86.81 13.1247C86.7168 13.1607 86.6366 13.2237 86.5795 13.3057C86.5225 13.3877 86.4913 13.4849 86.49 13.5847C86.4964 13.7215 86.5465 13.8526 86.6329 13.9588C86.7193 14.065 86.8374 14.1406 86.97 14.1747C87.354 14.3195 87.7533 14.4201 88.16 14.4747C88.6277 14.5363 89.0917 14.6231 89.55 14.7347C89.9982 14.8362 90.4057 15.0695 90.72 15.4047C90.8882 15.5894 91.018 15.8055 91.1021 16.0407C91.1862 16.2758 91.2229 16.5253 91.21 16.7747C91.2186 17.1204 91.1375 17.4624 90.9745 17.7674C90.8115 18.0723 90.5722 18.3298 90.28 18.5147C89.5329 18.9944 88.6574 19.235 87.77 19.2047Z"
              fill="currentColor"
            />
            <path
              d="M101.78 18.7047C101.786 18.7402 101.784 18.7765 101.776 18.8114C101.767 18.8464 101.752 18.8792 101.73 18.9081C101.709 18.937 101.682 18.9613 101.651 18.9796C101.62 18.9979 101.586 19.0098 101.55 19.0147C101.185 19.1339 100.804 19.198 100.42 19.2047C100.04 19.2441 99.656 19.1847 99.306 19.0323C98.955 18.8799 98.65 18.6396 98.42 18.3347C97.714 18.942 96.8 19.2536 95.87 19.2047C95.438 19.2246 95.007 19.1539 94.604 18.9972C94.201 18.8405 93.835 18.6012 93.53 18.2947C93.227 17.9736 92.9922 17.5946 92.8392 17.1805C92.6863 16.7664 92.6186 16.3257 92.64 15.8847V11.9747C92.64 11.7847 92.73 11.6847 92.92 11.6847H94.6C94.79 11.6847 94.88 11.7847 94.88 11.9747V15.5847C94.862 16.0345 95.015 16.4743 95.31 16.8147C95.457 16.9707 95.636 17.0933 95.834 17.1744C96.032 17.2555 96.246 17.2931 96.46 17.2847C96.679 17.2943 96.898 17.2604 97.104 17.1848C97.31 17.1093 97.499 16.9937 97.66 16.8447C97.812 16.6877 97.931 16.5011 98.008 16.2964C98.086 16.0917 98.12 15.8733 98.11 15.6547V11.9747C98.11 11.7847 98.2 11.6847 98.39 11.6847H100.09C100.28 11.6847 100.37 11.7847 100.37 11.9747V16.6847C100.37 17.0747 100.54 17.2647 100.87 17.2647C101.025 17.2707 101.18 17.2539 101.33 17.2147C101.368 17.2041 101.408 17.2022 101.446 17.2092C101.485 17.2161 101.521 17.2317 101.553 17.2548C101.585 17.2779 101.611 17.3079 101.63 17.3425C101.648 17.3771 101.658 17.4155 101.66 17.4547L101.78 18.7047Z"
              fill="currentColor"
            />
            <path
              d="M117.67 18.7047C117.679 18.7405 117.68 18.7779 117.673 18.8141C117.665 18.8502 117.65 18.8844 117.628 18.914C117.606 18.9436 117.578 18.968 117.545 18.9854C117.513 19.0029 117.477 19.0129 117.44 19.0147C117.068 19.1356 116.681 19.1997 116.29 19.2047C115.695 19.2354 115.108 19.0665 114.62 18.7247C114.409 18.5783 114.238 18.3822 114.121 18.1537C114.004 17.9252 113.945 17.6713 113.95 17.4147V15.0647C113.971 14.6163 113.821 14.1766 113.53 13.8347C113.39 13.6784 113.216 13.5552 113.023 13.4739C112.829 13.3927 112.62 13.3554 112.41 13.3647C112.221 13.3576 112.033 13.3935 111.859 13.4697C111.686 13.5459 111.533 13.6605 111.41 13.8047C111.146 14.1398 111.011 14.5586 111.03 14.9847V18.6747C111.03 18.8647 110.94 18.9647 110.75 18.9647H109.06C109.021 18.9696 108.981 18.9654 108.944 18.9526C108.906 18.9397 108.872 18.9185 108.844 18.8905C108.816 18.8626 108.795 18.8286 108.782 18.7912C108.769 18.7538 108.765 18.714 108.77 18.6747V15.0647C108.792 14.6212 108.653 14.1846 108.38 13.8347C108.258 13.6877 108.105 13.5694 107.932 13.4882C107.76 13.407 107.571 13.3648 107.38 13.3647C107.176 13.3565 106.973 13.3914 106.783 13.4673C106.593 13.5431 106.422 13.6581 106.28 13.8047C105.994 14.1291 105.847 14.5529 105.87 14.9847V18.6747C105.875 18.714 105.871 18.7538 105.858 18.7912C105.845 18.8286 105.824 18.8626 105.796 18.8905C105.768 18.9185 105.734 18.9397 105.697 18.9526C105.659 18.9654 105.619 18.9696 105.58 18.9647H103.95C103.76 18.9647 103.67 18.8647 103.67 18.6747V13.9647C103.682 13.8845 103.675 13.8027 103.649 13.7257C103.624 13.6488 103.581 13.5788 103.523 13.5215C103.466 13.4642 103.396 13.4211 103.319 13.3956C103.242 13.3701 103.16 13.363 103.08 13.3747H102.75C102.53 13.3747 102.42 13.2947 102.42 13.1347V11.9547C102.415 11.8817 102.435 11.8091 102.477 11.7491C102.519 11.689 102.58 11.6451 102.65 11.6247C102.996 11.499 103.362 11.438 103.73 11.4447C104.083 11.4146 104.438 11.485 104.753 11.6478C105.068 11.8106 105.33 12.0591 105.51 12.3647C105.847 12.045 106.247 11.7982 106.684 11.6399C107.121 11.4816 107.586 11.4152 108.05 11.4447C108.501 11.4227 108.95 11.5072 109.362 11.6914C109.774 11.8756 110.136 12.1542 110.42 12.5047C110.751 12.145 111.158 11.8634 111.611 11.68C112.064 11.4967 112.552 11.4164 113.04 11.4447C113.476 11.4243 113.912 11.4946 114.32 11.6513C114.728 11.8079 115.099 12.0474 115.41 12.3547C115.714 12.6752 115.949 13.0541 116.102 13.4684C116.255 13.8826 116.323 14.3237 116.3 14.7647V16.6947C116.3 17.0747 116.47 17.2647 116.79 17.2647C116.945 17.2719 117.1 17.2551 117.25 17.2147C117.457 17.2147 117.567 17.2947 117.58 17.4547L117.67 18.7047Z"
              fill="currentColor"
            />
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-right">
          Copyright &copy; 2022. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</footer>
 
</main>
