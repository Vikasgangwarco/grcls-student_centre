<script context="module">
    // var user={};
    import { ApiUrl } from "../_utils/static_store.js";
    var loginPath = get(ApiUrl);
    import { Token } from "../_utils/dynamic_store.js";
    console.log("hello");
    import { get } from "svelte/store";
    export const preload = async function (page, session) {};
</script>

<script>
    export let email, password;
    import { onMount } from "svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    export let studentId = data.studentId;
    console.log("studentID from slug:" + studentId);
    let body;

    let phone;
    let timer;

    const dt = new Date();
    timer=dt.getTime();

    onMount(async () => {
        var token = localStorage.getItem("token");
        if (token && token != "null") {
            location.href = "/batches";
        }
        await getnumber();
    });

    async function getnumber() {
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
                    phone = response.data;
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

    async function resend_otp(studentID) {
        var token = localStorage.getItem("token");
        var res;
        var loginPath = get(ApiUrl);
        console.log("trying branches");
        var res = await fetch(loginPath + "/panel/otp" + "/" + studentId, {
            mode: "cors",
            method: "post",
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
                    history.back();
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

    async function otpVerify(studentID) {
        var token = localStorage.getItem("token");
        var res;
        var loginPath = get(ApiUrl);
        console.log("trying branches");
        var res = await fetch(loginPath + "/panel/otp" + "/" + studentId, {
            mode: "cors",
            method: "post",
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
                    history.back();
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

    export async function handleSubmit() {
        if (email && password) {
            // const res= await fetch('login.json',{method:'get'});
            const res = await fetch(loginPath + "/panel/authentication/login", {
                mode: "cors",
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (res.status == 200) {
                var response = await res.text();
                let data = await JSON.parse(response);
                if (data.status == "success") {
                    let user = data.user;
                    let token = user.token;
                    console.log(token);
                    localStorage.setItem("token", token);
                    location.href = "/batches";
                } else {
                    console.log(data.message);
                    alert(data.message);
                }
            } else {
                alert("Login Failed");
                console.log(res.text());
            }
        }
    }
    async function getback() {
        location.href = "/login";
    }
</script>

<svelte:head>
    <title>Gravity Admin Panel</title>
</svelte:head>

<!-- {#if body} -->
<body>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Tailwind Login Template by David Grzyb</title>
            <meta name="author" content="David Grzyb" />
            <meta name="description" content="" />

            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <style>
                .body-bg {
                    /* background-color: #9921e8;
					background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%); */
                }
            </style>
        </head>
        <body
            class="body-bg bg-gray-200 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0"
            style="font-family:'Lato',sans-serif;"
        >
            <header class="max-w-lg mx-auto">
                <!-- <a href="#">
					<h1 class="text-4xl font-bold text-white text-center">Startup</h1>
				</a> -->
            </header>
            <button on:click={getback} class="ml-2 btn">Back</button>

            <main
                class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
            >
                <section>
                    <h3 class="font-bold text-2xl">Code Verification</h3>
                    <p class="text-gray-600 pt-2">
                        Enter OTP code sent to ({phone})
                    </p>
                </section>

                <section class="mt-10">
                    <form class="flex flex-col" method="POST" action="#">
                        <div class="mb-6 pt-3 rounded bg-gray-200">
                            <!-- <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label> -->
                            <input
                                type="text"
                                pattern="[6-9][0-9][0-9][0-9][0-9][0-9]"
                                id="phone"
                                class=" bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-gray-300 transition duration-500 px-3 pb-3"
                            />
                        </div>

                        <div class="flex flex-row mb-4">
                            <div class="flex-1">
                                <div class="flex flex-row">
                                    <p class="">Time Remaining:</p>
                                    <p class="ml-1">{timer}</p>
                                </div>
                            </div>
                            <div><button  on:click={resend_otp} class="underline">Resend OTP</button></div>
                            <!-- <p class="underline">Resend OTP</p> -->
                        </div>

                        <div class="flex justify-end">
                            <!-- <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a> -->
                        </div>
                        <button
                            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                            type="submit">Submit</button
                        >
                    </form>
                </section>
            </main>

            <!-- <div class="max-w-lg mx-auto text-center mt-12 mb-6">
				<p class="text-white">Don't have an account? <a href="#" class="font-bold hover:underline">Sign up</a>.</p>
			</div>
		
			<footer class="max-w-lg mx-auto flex justify-center text-white">
				<a href="#" class="hover:underline">Contact</a>
				<span class="mx-3">•</span>
				<a href="#" class="hover:underline">Privacy</a>
			</footer> -->
        </body>
    </html>
</body>
<!-- {/if} -->

<p>created by: <a href="https://neoned71.com">neoned71</a></p>

<style>
    /* h1,
	figure,
	p {
		text-align: left;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 0em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	input {
		width: 50%;
	} */

    /* .main {
		background: white;
		padding: 20;
	}

	.body-bg {
		background-color: #9921e8;
		background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
		
	} */
</style>
