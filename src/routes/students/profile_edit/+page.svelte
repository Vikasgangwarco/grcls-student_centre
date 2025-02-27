<script>
  import Youtube from "svelte-youtube-embed";
  import { onMount } from "svelte";
  import { Token } from "../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "../../../lib/components/navigation_bars/top_student_daisy.svelte";
  import Files from "../../../lib/components/Lists/modern/files.svelte";
  import { subscribe } from "svelte/internal";

  let student;
  let studentId = "";
  let body = {};
  let phone;
  let verificationId;
  let otp;
  let streams;
  let batches;
  let branches;

  // function studentDelete(studentId){
  //     window.confirm("Are you sure you want to delete this student?");
  // }

  // /** @type {import('./$types').PageData} */
  // export let data;
  // export let lectureId = data.lectureId;
  // let ank;
  // console.log("verificationId from slug:" + lectureId);

  let lecture;
  var loginPath = get(ApiUrl);
  onMount(async () => {
    console.log("mounted");
    await getStudents();
    await getStreams();
    await getBranches();

    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }

    // Token.set(token);
    // console.log(loginPath + "/auth/whoami");
    // const res = await fetch(loginPath + "/user/students/student", {
    //     mode: "cors",
    //     method: "GET",
    //     headers: { Authorization: "Bearer " + token },
    // });
    // if (res.status === 200) {
    //     try {
    //         let response = await res.json();
    //         student = response;
    //         phone = student.phone;
    //         console.log("Student details:");
    //         console.log(response);
    //     } catch (e) {
    //         console.log("Error parsing response:");
    //         console.log(e);
    //     }
    // } else {
    //     console.log("Error fetching student details:");
    //     console.log(await res.text());
    // }
  });

  // function handleSubmit(){

  // }

  async function getStudents() {
    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }

    Token.set(token);
    console.log(loginPath + "/auth/whoami");
    const res = await fetch(loginPath + "/user/students/student", {
      mode: "cors",
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.status === 200) {
      try {
        let response = await res.json();
        student = response;
        phone = student.phone;
        console.log("Student details:");
        console.log(response);
      } catch (e) {
        console.log("Error parsing response:");
        console.log(e);
      }
    } else {
      console.log("Error fetching student details:");
      console.log(await res.text());
    }
  }

  async function getBranches() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/user/students/branches", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          branches = response.data;
          console.log("branches");
          console.log(branches);
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

  async function getStreams() {
    // console.log(body);
    var token = localStorage.getItem("token");
    var loginPath = get(ApiUrl);
    let res;
    console.log("trying streams");
    res = await fetch(loginPath + "/user/students/streams", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          streams = response.data;
          console.log("streams 123");
          console.log(streams);
        } else {
          console.log(response.message);
          alert(response.message);
        }
      } catch (e) {
        console.log("caught");
        console.log(e);
      } finally {
      }
    } else {
      console.log(await res.text());
      // user.email = "no logged";
    }
  }

  function otp_received() {
    otp = window.prompt("Please enter the OTP sent to your phone number");
    console.log("otp Received 1");
  }

  const handleSubmit = () => {
    return async () => {
      if (window.confirm("Are you sure you want to Edit your account?")) {
        // Here you can add the code to send the OTP
        await profile_otp();
        await otp_received();

        await otpVerify(verificationId);

        console.log(otp);
        console.log("otp");
        // Here you can add the code to verify the OTP
        // For now, let's assume the OTP is '1234'
        // await submit_otp(verificationId);
        // if (otp === '1234') {

        //   window.alert('Your account is permanently deleted.');
        // } else {
        //   window.alert('The OTP you entered is incorrect. Please try again.');
        // }
      }
    };
  };

  async function profile_otp(event) {
    // let myCreateURL = loginPath + "/panel/student_create";
    let phone_string = phone;
    // let y = toString(x);
    // console.log(typeof(x));

    // let phone_length = phone_string.length;
    // if (phone_length !== 10) {
    // 	alert("Please provide a 10 digits valid no");
    // }

    console.log("submitting inquiry form");
    console.log(body);
    var token = localStorage.getItem("token");

    if (phone) {
      let data = {
        phone: phone,
        signature: "hello ",
      };
      const res = await fetch(loginPath + "/user/verification/send_otp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });
      // console.log(await res.text());
      const json = await res.json();
      if (json.status == "success") {
        // console.log(json);
        // alert(
        // 	"Thankyou for contacting us, our team will reach you shortly"
        // );
        // location.reload();
        verificationId = json.data;
        console.log("json.data");
        console.log(json.data);
        console.log("json.data");
        // otpVerify(verificationId);
        // location.href = "/otp_verification" + "/" + json.data;
      } else {
        console.log("login failed");
        alert("Some problem has occured " + json.message);
        // location.reload();
      }
    }
  }

  export async function otpVerify(verificationId) {
    console.log("stage1");
    var token = localStorage.getItem("token");
    console.log(otp);
    console.log(verificationId);
    let data = {
      otp: otp,
      verification_id: verificationId,
      role: "user",
      student: student, // "faculty"
    };
    console.log("stage2");
    if (otp && otp.length == 6) {
      // const res= await fetch('login.json',{method:'get'});
      const res = await fetch(loginPath + "/user/students/student_update", {
        mode: "cors",
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("stage3");
      if (res.status == 200) {
        var response = await res.text();
        let data = await JSON.parse(response);
        console.log(data);
        console.log("stage4");
        // if (data.status == "success") {
        //   // let user = data.user;
        //   let token = data.data.token;
        //   console.log(token);
        //   localStorage.setItem("token", token);
        //   isLoggedIn.set(true);
        //   location.href = "/login";
        // } else {
        //   console.log(data.message);
        //   alert(data.message);
        // }
        if (data.status == "success") {
          location.reload();
          // Here you can add the code to delete the student
          //   window.alert('Your account is permanently deleted.');
          //   localStorage.removeItem("token"); // Remove the token from the local storage
          //   location.href = "/login";
        } else {
          window.alert("The OTP you entered is incorrect. Please try again.");
        }
      }
    } else {
      alert("Login Failed");
      console.log(res.text());
    }
  }
</script>

<body class="bg-white">
  <div class="mt-14 bg-white">
    {#if student}
      <div class="bg-white">
        <!-- <h3 class=" text-5xl">Students</h3> -->
        <div class="container flex bg-white" style="--template-color:red">
          <div class="flex-1"></div>
          <!-- <a
                        class="w3-button w3-round w3-card w3-hover-green w3-margin"
                        href="/students/student_batches/{studentId}">Batches</a
                    >
                    <a
                        class="w3-button w3-round w3-card w3-hover-green w3-margin"
                        href="/students/student_fee/{studentId}"
                        >Fee Management</a
                    > -->
          <!-- <a
                        class="w3-button w3-round w3-card w3-hover-green w3-margin h-10"
                        href="/students/student_edit/{studentId}">Edit</a
                    > -->

          <!-- <a
                        class="w3-button w3-round w3-card w3-hover-green w3-margin"
                        href="/students/student_address/{studentId}"
                        >Addresses</a
                    > -->

          <!-- <a
        class="w3-button w3-round w3-card w3-hover-red w3-margin"
        href="/admission/student_disable/{studentId}">Disable</a
      >

      <a
        class="w3-button w3-round w3-card w3-hover-red w3-margin"
        href="/admission/student_delete/{studentId}">Delete</a
      > -->

          <div class="flex-col">
            <div>
              <button
                on:click={handleSubmit()}
                class="w3-button w3-round w3-card w3-hover-green w3-margin"
                >Update</button
              >
            </div>
          </div>
          <div class="w-5 md:w-10"></div>

          <!-- {#if student.enabled}
                        <button
                            on:click={studentDisable(studentId)}
                            class="w3-button w3-round w3-card w3-hover-green w3-margin"
                            >Disable</button
                        >
                    {:else}
                        <button
                            on:click={studentEnable(studentId)}
                            class="w3-button w3-round w3-card w3-hover-green w3-margin"
                            >Enable</button
                        >
                    {/if} -->
        </div>

        {#if student}
          <!-- {JSON.stringify(student)} -->
          <form id="profile_update" class="">
            <main class="mt-16">
              <body class="bg-gray-200">
                <div class="container mx-auto">
                  <div class="bg-white p-6">
                    <!-- <h1 class="text-2xl font-bold mb-4 ">
                                        Delicious Chocolate Cake
                                    </h1> -->

                    <!-- <img class="max-w-sm mx-auto my-4 rounded-lg shadow" src="https://images.unsplash.com/photo-1616031037011-087000171abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxM3x8Q2hvY29sYXRlJTIwQ2FrZXxlbnwwfDB8fHwxNjk0MTc2ODk0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Chocolate Cake" > -->
                    <!-- <div class="flex-shrink-0 flex justify-center ">
                                        <span class="self-center text-4xl bg-white p-3 border-[1px] border-gray-300">
                                          {@html decodeAndModifyImage1(student.image)}
                                        </span>
                                      </div> -->
                    <!-- <div class="flex-shrink-0 flex justify-center ">
                                        <span class="self-center text-4xl bg-white p-3 border-[1px] border-gray-300">
                                            <img src={student.profilePicture} alt="Image" />
                                        </span>
                                      </div> -->
                    <div
                      class="bg-white overflow-hidden shadow rounded-lg mx-32 border"
                    >
                      <div class="px-4 py-5 sm:px-6">
                        <h3
                          class="text-lg text-blue-600 font-bold leading-6 uppercase"
                        >
                          <input
                            class="border p-2"
                            type="text"
                            id="enrolment"
                            bind:value={student.name}
                          />
                        </h3>
                        <!-- <p class="mt-1 max-w-2xl text-sm text-gray-600" style="text-transform: uppercase;">
                                                {@html atob(student.description)}
                                            </p> -->
                      </div>
                      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                          <div
                            class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Contact Number
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {student.phone}
                              <!-- <input
                                                          class="border p-2"
                                                          type="text"
                                                          id="enrolment"
                                                          bind:value={student.phone}
                                                        /> -->
                            </dd>
                          </div>
                          <div
                            class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              E Mail
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              <input
                                class="border p-2"
                                type="text"
                                id="enrolment"
                                bind:value={student.email}
                              />
                            </dd>
                          </div>
                          <div
                            class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Stream
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              <!-- <input
                                                          class="border p-2"
                                                          type="text"
                                                          id="enrolment"
                                                          bind:value={student.stream.name}
                                                        /> -->
                              {#if streams}
                                
                                 {#if student.stream}
                                 <select
                                  class="w3-input w3-border w3-round w3-margin"
                                  bind:value={student.stream._id}
                                >
                                  <option value="">Select Stream</option>
                                  {#each streams as stream}
                                   
                                    <option value={stream._id}
                                      >{stream.name.toUpperCase()}</option
                                    >
                                  {/each}
                                </select>
                                 {:else}
                                 <select
                                  class="w3-input w3-border w3-round w3-margin"
                                  bind:value={student.stream}
                                >
                                  <option value="">Select Stream</option>
                                  {#each streams as stream}
                                   
                                    <option value={stream._id}
                                      >{stream.name.toUpperCase()}</option
                                    >
                                  {/each}
                                </select>
                                 {/if}
                                
                               
                              {/if}
                            </dd>
                          </div>
                          <div
                            class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Branch
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              <!-- <input
                                                          class="border p-2"
                                                          type="text"
                                                          id="enrolment"
                                                          bind:value={student.branch.name}
                                                        /> -->
                              {#if branches}
                                <!-- <p class="w3-left">Select Branch</p> -->

                                {#if student.branch}
                                  <select
                                    class="w3-input w3-border w3-round w3-margin"
                                    bind:value={student.branch._id}
                                  >
                                    <option value="">Select Branch</option>
                                    {#each branches as branch}
                                      <option value={branch._id}
                                        >{branch.name.toUpperCase()}</option
                                      >
                                    {/each}
                                  </select>
                                {:else}
                                  <select
                                    class="w3-input w3-border w3-round w3-margin"
                                    bind:value={student.branch}
                                  >
                                    <option value="">Select Branch</option>
                                    {#each branches as branch}
                                      <option value={branch._id}
                                        >{branch.name.toUpperCase()}</option
                                      >
                                    {/each}
                                  </select>
                                {/if}

                                <!-- {#if student.branch}
                                {:else}
                                NA
                                {/if} -->
                              {/if}
                            </dd>
                          </div>
                          <!-- <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">
                                                        E Mail
                                                    </dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {student.email}
                                                    </dd>
                                                </div>
                                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">
                                                        Stream
                                                    </dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {student.stream.name}
                                                    </dd>
                                                </div>
                                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">
                                                        Branch
                                                    </dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {student.branch.name}
                                                    </dd>
                                                </div> -->
                          <!-- <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">
                                                        Center
                                                    </dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {@html atob(student.centre)}
                                                    </dd>
                                                </div> -->
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </body>
            </main>
            <div class="md:flex md:items-center mt-4 mb-5 float-right p-5">
              <div class="md:w-1/3 flex">
                <!-- <button
                  class="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded object-right"
                  on:click={handleSubmit}
                  type="submit"
                >
                  Submit
                </button> -->
              </div>
              <div class="md:w-2/3" />
            </div>
          </form>
        {/if}
      </div>
    {/if}

    <!-- Photo by '@jessbaileydesigns' & '@von_co' on Unsplash -->
  </div>
</body>
