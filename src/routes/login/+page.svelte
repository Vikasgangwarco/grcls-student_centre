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
	export let phone;
	import { onMount } from "svelte";
	import { isLoggedIn } from "../_utils/isLoggedinStore.js";
	let body = {};

	onMount(async () => {
		var token = localStorage.getItem("token");
		if (token && token != "null") {
			location.href = "/batches";
		}
	});

	export async function handleSubmit(event) {
		// let myCreateURL = loginPath + "/panel/student_create";
		let phone_string = phone;
		// let y = toString(x);
		// console.log(typeof(x));

		let phone_length = phone_string.length;
		if (phone_length !== 10) {
			alert("Please provide a 10 digits valid no");
		}

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
				console.log("json.data");
				console.log(json.data);
				console.log("json.data");
				location.href = "/otp_verification" + "/" + json.data;
			} else {
				alert("Some problem has occured " + json.message);
				// location.reload();
			}
		}
	}
</script>

<svelte:head>
	<title>Students Portal</title>
</svelte:head>

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
			class="body-bg bg-black min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0"
			style="font-family:'Lato',sans-serif;"
		>
			<header class="max-w-lg mx-auto">
				<!-- <a href="#">
					<h1 class="text-4xl font-bold text-white text-center">Startup</h1>
				</a> -->
			</header>

			<main
				class="bg-white text-black max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
			>
				<section>
					<h3 class="font-bold text-2xl">Welcome to Gravity</h3>
					<p class="text-blue-500 pt-2">
						Please Enter your 10 digits Mobile Number
					</p>
				</section>

				<section class="mt-10">
					<form class="flex flex-col">
						<div
							class="flex justify-center align-middle bg-white rounded-xl"
						>
							<span class="text-gray-400 pt-1 pr-1">+91</span>
							<div class=" rounded">
								<!-- <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label> -->
								<input
									type="tel"
									pattern="[0-9]{10}"
									id="phone"
									maxlength="10"
									name="phone"
									bind:value={phone}
									class="border p-1 border-black rounded text-gray-700 focus:outline-none border-gray-300 transition duration-500"
								/>
							</div>
						</div>
						<!-- <div class="mb-6 pt-3 rounded bg-gray-200">
							<label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
							<input type="password" id="password" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none  border-gray-300  transition duration-500 px-3 pb-3">
						</div> -->
						<div class="flex justify-end">
							<!-- <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a> -->
						</div>
						<button
							class="bg-white mt-5 border border-gray-500 hover:bg-blue-600 text-gray-400 hover:text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
							type="submit"
							on:click|preventDefault={handleSubmit}
							>Submit</button
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

<!-- <p>created by: <a href="https://neoned71.com">neoned71</a></p> -->

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
