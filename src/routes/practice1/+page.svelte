<script>
    import StudentsList from "../../lib/components/Lists/students.svelte";

    import StudentPicker from "../_utils/_students/student_picker.svelte";
    import { onMount } from "svelte";
    import { Token } from "../_utils/dynamic_store.js";

    import { ApiUrl } from "../_utils/static_store.js";
    import { get } from "svelte/store";
    // import { roomId } from '../room/[slug].svelte';
    // export var roomId;

    let body = {};

    // /** @type {import('./$types').PageData} */
    // export let data;
    // export let verificationId = data.verificationId;
    // console.log("verificationId from slug:" + verificationId);

    var students = null;
    var loginPath = get(ApiUrl);
    onMount(async () => {
        console.log("mounted");
        // localStorage.setItem("token","some value");

        var token = localStorage.getItem("token");
        // if(!token)
        // {
        // console.log("yes");
        // location.href="/login";
        // }
        // Token.set(token);

        // console.log(loginPath+'/auth/whoami');
        const res = await fetch(loginPath + "/panel/students", {
            mode: "cors",
            method: "get",
            headers: { Authorization: "Bearer " + token },
        });
        if (res.status == 200) {
            try {
                let response = await res.text();
                console.log(response);
                response = await JSON.parse(response);
                students = response.data;
            } catch (e) {
                console.log("caught");

                console.log(e);
            }

            // let data = JSON.parse(text);
        } else {
            console.log(await res.text());
            user.email = "no logged";
        }
        //
    });

    async function getStudent() {
        var token = localStorage.getItem("token");
        var res;
        var loginPath = get(ApiUrl);
        console.log("trying branches");
        var res = await fetch(loginPath + "/panel/student/" + studentId, {
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
                    body = response.data;
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

    let x = false;

    function menu_toggle() {
        x = !x;
    }

    function testReport(x) {
        location.href = "/practice2/";
    }
</script>

<body class="">
    <header>
        <nav class="navbar bg-white shadow-2xl">
            <button
                class="font-semibold text-gray-800 z-10 p-2 px-6 ml-4 shadow-lg rounded-md"
                ><span> Gravity</span></button
            >

            <label for="menu-toggler" id="hamburger-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="24px"
                    height="24px"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 18h18v-2H3v2zm0-5h18V11H3v2zm0-7v2h18V6H3z" />
                </svg>
            </label>
            <ul class=" pr-20">
                <li>
                    <a href="#home"><span class="text-gray-800">Home</span></a>
                </li>
                <li>
                    <a href="#services"
                        ><span class="text-gray-800">Services</span></a
                    >
                </li>
                <div class="avatar ml-4">
                    <div
                        class="w-8 rounded-full ring ring-gray-800 ring-offset-base-100"
                    />
                </div>

                <div class="dropdown dropdown-end ml-2">
                    <label tabindex="0" class=" m-1 swap"
                        ><i
                            on:click={menu_toggle}
                            class="fa-solid fa-arrow-down text-gray-800"
                        /></label
                    >

                    {#if x}
                        <ul
                            tabindex="0"
                            class="swap-on dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a href=" "
                                    ><!-- <i class="fa-regular fa-user text-gray-800 mr-3" /> --><span
                                        class="text-gray-800">My Profile</span
                                    ></a
                                >
                            </li>
                            <li>
                                <a href=" "
                                    ><i
                                        class="fa-solid fa-arrow-right-from-bracket text-gray-800 mr-3"
                                    /><span class="text-gray-800">Logout</span
                                    ></a
                                >
                            </li>
                        </ul>
                    {/if}
                    <ul class="swap-off" />
                </div>
            </ul>
        </nav>
    </header>

    <div class="mt-16 p-12">
        <div class="mt-4 p-4 border-2 rounded-md bg-green-600">
            <p class=" text-white">Test Report</p>
        </div>

        <div class="p-4">
            <p class="text-green-600 text-2xl">JEE MAIN TEST</p>
            <p class="text-green-600">Duration: 180 Minutes</p>
            <p class="text-green-600">Types: general</p>
        </div>

        <div class="flex justify-center">
            <button
                class="rounded-md bg-green-600 text-white w-[620px] h-[40px]"
                >Start</button
            >
        </div>

        <div class="p-4 flex justify-center mt-6 my-3">
            <div class=" ">
                <div class=" ">
                    <p class="text-green-600 text-2xl">Pending Tests</p>
                    <div class="flex flex-row ">
                        <div class="flex flex-col mx-16">
                            <p class="text-gray-500 mt-2">Attempt</p>
                            <p class="text-gray-500 mt-2">8</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-gray-500 mt-2">Time Left</p>
                            <p class="text-gray-500 mt-2">172</p>
                        </div>
                        <!-- <div class="rounded-full bg-green-600 w-12 h-12 ml-10 mt-4 p-1" >Cont</div> -->
                        <button class="rounded-full bg-green-600 w-12 h-12 ml-10 mt-4 p-1">Cont</button>

                    </div>
                </div>

                <div class=" ">
                    <p class="text-green-600 text-2xl">Test Result Report</p>
                    <div class="flex flex-row ">
                        <div class="flex flex-col mx-16">
                            <p class="text-gray-500 mt-2">Attempt</p>
                            <p class="text-gray-500 mt-2">8</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-gray-500 mt-2">Marks</p>
                            <p class="text-gray-500 mt-2">172</p>
                        </div>
                        <div class="rounded-full bg-green-600 w-12 h-12 ml-10 mt-4 p-1" >Rest</div>

                    </div>
                </div>
            </div>
        </div>

        <!-- <p class="border-2 bg-slate-500">Batch S1</p> -->
        <!-- <span class="border-2 bg-slate-500">Batch S1</span> -->

        <div class="mt-4 p-4 space-y-1">
            <button class="collapsible">Lecture</button>

            <div class="content">
                <table class="">
                    <br />
                    <tr>
                        <a class="hover:text-slate-600" href="/practice4"
                            >hello</a
                        >
                    </tr><br />

                    <tr>
                        <a class="hover:text-green-700" href="/practice4"
                            >hello</a
                        >
                    </tr><br />

                    <tr>
                        <a class="hover:text-green-700" href="/practice4"
                            >hello</a
                        >
                    </tr><br />
                </table>
            </div>

            <button class="collapsible">Modules</button>
            <div class="content">
                <table class="">
                    <!-- <thead>
      <tr>
      <th>name</th>
      <th>link</th>
      </tr>
      </thead> -->
                    <br />
                    <tr>
                        <a class="hover:text-green-700" href="/practice4"
                            >hello</a
                        >
                    </tr><br />

                    <tr>
                        <a class="hover:text-green-700" href="/practice4"
                            >hello</a
                        >
                    </tr><br />

                    <tr>
                        <a class="hover:text-green-700" href="/practice4"
                            >hello</a
                        >
                    </tr><br />
                </table>
            </div>

            <button class="collapsible">Files</button>
            <div class="content">
                <table class="">
                    <!-- <thead>
      <tr>
      <th>name</th>
      <th>link</th>
      </tr>
      </thead> -->
                    <br />
                    <tr>
                        <a class="hover:text-green-700" href="/practice4"
                            >hello</a
                        >
                    </tr><br />

                    <tr>
                        <a class="hover:text-green-700" href="/practice4"
                            >hello</a
                        >
                    </tr><br />

                    <tr>
                        <a class="hover:text-green-700" href="/practice4"
                            >hello</a
                        >
                    </tr><br />
                </table>
            </div>

            <button class="collapsible">Test</button>
            <div class="content">
                <table class="">
                    <!-- <thead>
      <tr>
      <th>name</th>
      <th>link</th>
      </tr>
      </thead> -->

                    <tr>
                        <button
                            on:click={() => testReport("abcde")}
                            class="bg-green-600 border-[1px] w-[900px] py-2 px-6 rounded-lg"
                            ><div class="flex flex-row">
                                <div class="flex flex-col flex-1">
                                    <div class="text-white">JEE MAIN</div>

                                    <div class="text-white">general</div>
                                </div>
                                <div class="mt-3">
                                    <i
                                        class="text-white fa-solid fa-circle-arrow-right"
                                    />
                                </div>
                            </div></button
                        >
                    </tr><br />

                    <!-- <tr>
                        <button class="border-green-600 border-[1px] w-[900px] py-2 px-6 rounded-lg"
                            ><div class="flex flex-row">
                                <div class="flex flex-col flex-1">
                                    <div class="text-green-600">JEE MAIN</div>
                                    
                                    <div class="text-green-600">general</div>
                                </div>
                                <div class="mt-3"><i  class="text-green-600  fa-solid fa-circle-arrow-right" /></div>
                            </div></button
                        >
                    </tr><br /> -->
                </table>
            </div>

            <script>
                var coll = document.getElementsByClassName("collapsible");
                var i;

                for (i = 0; i < coll.length; i++) {
                    coll[i].addEventListener("click", function () {
                        this.classList.toggle("active");
                        var content = this.nextElementSibling;
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                        } else {
                            content.style.maxHeight =
                                content.scrollHeight + "px";
                        }
                    });
                }
            </script>
        </div>
    </div>
    <!-- <footer>
    <div>
    <span>Copyright © 2023 All Rights Reserved</span>
    <span class="link">
    <a href="#">Home</a>
    <a href="#contact">Contact</a>
    </span>
    </div>
    </footer> -->
</body>

<style>
    .collapsible {
        background-color: #006347;
        color: white;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        font-size: 15px;
    }

    .collapsible:after {
        content: "\002B";
        color: white;
        font-weight: bold;
        float: right;
        margin-left: 5px;
    }

    .content {
        padding: 0 18px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        background-color: #f1f1f1;
    }

    @media screen and (max-height: 450px) {
    }

    header {
        position: fixed;
        top: 0;
        /* left: 0; */
        z-index: 5;
        width: 75%;
        display: flex;
        justify-content: center;
        /* background: #333; */
        background: #333;
    }

    .navbar {
        display: flex;
        padding: 0 10px;
        max-width: 1200px;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .navbar #hamburger-btn {
        cursor: pointer;
        display: none;
    }

    .navbar .all-links li {
        position: relative;
        list-style: none;
    }

    .navbar .logo a {
        display: flex;
        align-items: center;
        margin-left: 0;
    }

    header a,
    header a:hover,
    .content a:hover {
        color: #00aa00;
        background: rgba(255, 255, 255, 0.3);
    }

    @media screen and (max-width: 860px) {
        .navbar .all-links li {
            font-size: 18px;
        }

        .navbar #hamburger-btn {
            display: block;
        }

        .content a {
            font-size: 17px;
            padding: 9px 20px;
        }
    }
</style>
