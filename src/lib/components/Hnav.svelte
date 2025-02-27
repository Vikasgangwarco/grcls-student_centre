<script context="module">
	export const preload = async function (page, session) {
		// var { user } = session;
		// console.log(user);
		return { user };
	};
</script>

<script>
	import { onMount } from 'svelte';
	import {gridValue}  from '../../../src/routes/_utils/grid_store.js';
	import { ApiUrl } from "../../routes/_utils/static_store.js";
	import { Token } from "../../routes/_utils/dynamic_store.js";
	import { get } from "svelte/store";
	
	// export let user;
	export let segment;

	let grid = false;
	let student ;



	function forgrid(){
		// localStorage.setItem("grid",grid);
		gridValue.update(value =>{
			return grid
		})
	}

	onMount(async () => {
        console.log("mounted");
        // localStorage.setItem("token","some value");

        forgrid();
   
    grid = localStorage.getItem("grid");
	var token = localStorage.getItem("token");
	var loginPath = get(ApiUrl);
    
	// loginPath + "/user/students/batches/my_batches",
	const res = await fetch(loginPath + "/user/students/student", {
    mode: "cors",
    method: "GET",
    headers: { Authorization: "Bearer " + token },
    });
    if (res.status === 200) {
      try {
        let response = await res.json();
		student = response;
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
	
    });



	
	let activeTab = "Batches";

	if (segment) {
		segment = segment.split("/")[1];
	}

	console.log("Segment:" + segment);
	

	var token = null;
	Token.subscribe((a) => (token = a));

	var logoutPath = get(ApiUrl);

	async function logout() {
		event.preventDefault();
		localStorage.removeItem("token");
		location.href = "/";
	}
	// }
	let open = true;

	function toggle() {
		open = !open;
	}

	async function toggleActiveTab(tab) {
		activeTab = tab;
		console.log(activeTab);
	}

	async function grid_list(tab) {
		activeTab = tab;
		console.log(activeTab);
	}
</script>

<!-- <nav class="nav w3-padding sticky border-r-2 ">
	<img class="w3-padding" src="/images/glogoG.png" />
	<p class="w3-heading w3-text-teal" style="font-size:400%">Gravity</p>
	<hr>
	<div class="lft">
		
		<ul>
			<a class="  w3-round"  href="/dashboard"><li class="w3-hover-blue w3-padding w3-round" aria-current="{segment === "dashboard" ? 'page' : undefined}"><i class="fa-solid fa-gauge-high"></i> Dashboard </li></a><hr>
			<a class="  w3-round"  href="/batch">  <li class="w3-padding w3-hover-blue w3-round" aria-current="{segment === "students" ? 'page' : undefined}"><i class="fa-solid fa-book-open-reader"></i>  Batches</li></a><hr>
			<a class="  w3-round"  href="/previous_year_questions"><li class="w3-hover-blue w3-padding w3-round" aria-current="{segment === "dashboard" ? 'page' : undefined}"><i class="fa-solid fa-person-chalkboard"></i> Previous Year Questions </li></a><hr>
			<a class="  w3-round"  href="/students/batches">  <li class="w3-padding w3-hover-blue w3-round" aria-current="{segment === "students" ? 'page' : undefined}"><i class="fa-solid fa-building-columns"></i>Gravity Centres</li></a><hr>
			<a class="  w3-round"  href="/admission"><li class="w3-hover-blue w3-padding w3-round" aria-current="{segment === "dashboard" ? 'page' : undefined}"><i class="fa-solid fa-shapes"></i> Gravity Skills </li></a><hr>
			<a class="  w3-round"  href="/students/batches">  <li class="w3-padding w3-hover-blue w3-round" aria-current="{segment === "students" ? 'page' : undefined}"><i class="fa-solid fa-book"></i>  Library</li></a><hr>
			<a class="  w3-round"  href="/students/batches">  <li class="w3-padding w3-hover-blue w3-round" aria-current="{segment === "students" ? 'page' : undefined}"><i class="fa-solid fa-vials"></i>  Test Series</li></a><hr>
			<a class=" " href="/tests/"> <li class="w3-padding w3-hover-blue w3-round w3-padding"  aria-current="{segment === "tests" ? 'page' : undefined}" ><i class="fa-solid fa-vials"></i>  Batches</li></a><hr>
			<a class="" href="/questions/"><li  class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "questions" ? 'page' : undefined}" ><i class="fa-solid fa-book-open"></i>  Questions</li></a><hr>
			<a class=" " href="/chapters/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "chapters" ? 'page' : undefined}" ><i class="fa-solid fa-book-open-reader"></i>  Chapters,Topics & Subtopics</li></a><hr>
			<a class=" " href="/staff/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "staff" ? 'page' : undefined}" ><i class="fa-solid fa-users"></i>  Staff</li></a><hr>
			<a  href="/packages/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "packages" ? 'page' : undefined}" ><i class="fa-regular fa-paste"></i>  Packages</li></a><hr>
			<a  href="/exams/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "exams" ? 'page' : undefined}" ><i class="fa-solid fa-passport"></i>  Exams</li></a><hr>			
			<a  href="/comprehensions/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "comprehensions" ? 'page' : undefined}" ><i class="fa fa-book"></i>  Comprehensions</li></a><hr>
			<a  href="/stream/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "stream" ? 'page' : undefined}" ><i class="fa-solid fa-bars-staggered"></i>  Streams</li></a><hr>
			<a  href="/subjects/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "subjects" ? 'page' : undefined}" ><i class="fa-solid fa-shapes"></i>  Subjects</li></a><hr>
			<a  href="/batches/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "batches" ? 'page' : undefined}" ><i class="fa-solid fa-laptop-file"></i>  Batches</li></a><hr>
			<a  href="/lectures/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "lectures" ? 'page' : undefined}" ><i class="fa-solid fa-chalkboard-user"></i>  Lectures</li></a><hr>

			<a  href="/branch/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "branch" ? 'page' : undefined}" ><i class="fa-solid fa-graduation-cap"></i>  Branches</li></a><hr>
			<a  href="/marking_schemes/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "marking_scheme" ? 'page' : undefined}" ><i class="fa-solid fa-marker"></i>  Marking Schemes</li></a><hr>
			<a class=" " href="/files/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "files" ? 'page' : undefined}" ><i class="fa-solid fa-file"></i>  Files</li></a><hr>
		</ul>
	</div>
	
	<div class="rgt">
		<hr>
		<ul>
			<a class="w3-padding  w3-round w3-hover-text-white"  href="." on:click={logout}><li class="w3-hover-red  w3-margin w3-text-white w3-grey w3-round w3-padding w3-hover-shadow "><i class="fa-solid fa-arrow-right-from-bracket"></i>  Logout</li></a>
		</ul>
	</div>
</nav> -->
<head>
	<meta charset="UTF-8" />
	<title> Gravity </title>
	<link rel="stylesheet" href="style.css" />
	<!-- Boxicons CDN Link -->
	<link
		href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
		rel="stylesheet"
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="bg-[#f5f5f5]">
	
	<nav class="fixed w-full h-[56px] shadow- border bg-white">
		<div
			class=" justify-between fixed inset-0 z-50 h-14 w-full md:hidden 2xl:px-16"
		>
			<div class=" flex items-center px-4 z-50 w-full h-14 justify-between">
				<div on:click={toggle} class=" ">
					<i
						class={`fa-solid fa-bars   p-1   top-9 text-lg  cursor-pointer `}
					></i>
				</div>

				<!-- <div class=" pr-10">
					<ul class="flex gap-4">
						<a href=""><li class=" uppercase">menu</li></a>
						<a href=""><li class=" uppercase">contact</li></a>
					</ul>
				</div> -->
				<div class=" ">
					<!-- <a class="btn btn-ghost normal-case text-xl">{title}</a> -->
					<div class="m-0 p-0 flex">
						<div class="flex justify-end">
							<div
								class="  h-8 my-auto top-0 bottom-0 left-0 shadow-md rounded-md"
							>
								<!-- <button>
									<a
										class=" text-xs md:text-sm block px-2 md:px-6 h-8 flex items-center rounded-md {activeTab ==
										'lectures'
											? 'tab-active bg-gray-500 text-white'
											: ''}"
										on:click={() => {
											grid_list("lectures");
										}}
										><i
											class="fa-solid fa-table-cells text-base"
										></i></a
									>
								</button>
								<button>
									<a
										class=" text-xs md:text-sm block px-2 md:px-6 h-8 flex items-center rounded-md {activeTab ==
										'tests'
											? 'tab-active bg-gray-500 text-white'
											: ''}"
										on:click={() => {
											grid_list("tests");
										}}
										><i class="fa-solid fa-list text-base"
										></i></a
									>
								</button> -->
								<label class="inline-flex items-center cursor-pointer">
									<input type="checkbox" on:click={forgrid} value="" class="sr-only peer" bind:checked={grid}>
									<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-200"></div>
									<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">List/Grid</span>
								</label>
							</div>

							<!-- <a
								href="https://play.google.com/store/apps/details?id=org.gravityclasses.test_series"
							>
								<div class=" rounded-full p-2">
									<img
										src="/images/google-play-png-logo-3798.png"
										class="h-10 max-w-3xl"
									/>
								</div>
							</a> -->
						</div>
						<!-- <a href="#" >
						  <div class=" rounded-full p-2">
							  <img src="/images/ios.png" class="h-10 max-w-3xl" />
							</div>
					  </a> -->
					</div>
				</div>
			</div>

			<div
				class={` fixed left-0 top-0  z-50 h-screen bg-gray-900 duration-300 pt-8  ${open ? " w-56 " : " w-0"}`}
			>
				{#if open}
					<i
						class={`fa-solid fa-xmark z-50  p-1 text-white  absolute -right-8 top-4 text-2xl   cursor-pointer `}
						on:click={toggle}
					></i>

					<div class=" text-gray-100 text-center text-2xl">
						Gravity
					</div>
					<hr class="mt-4 border-gray-800 mx-3" />
					<ul class="pt-6">
						<!-- <li class="mb-1 group  mx-4">
							<a href="#" on:click={()=>{
								toggleActiveTab("Dashboard")
							}} class={`flex items-center py-2 px-4  rounded-md ${activeTab == "Dashboard" ? "text-gray-100 bg-gray-800 " : "text-gray-300 hover:bg-gray-950 hover:text-gray-100 " }`}>
								<i class="ri-home-2-line mr-3 text-lg"></i>
								<span class="font-medium ">Dashboard</span>
							</a>
						</li> -->

						<!-- <li class="mb-1 group mx-4">
							<a
								href="#"
								on:click={() => {
									toggleActiveTab("Dashboard");
								}}
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Dashboard" ? "   text-white bg-gray-800" : "text-gray-500 hover:bg-gray-950 hover:text-gray-300   "}`}
							>
								<i class="fa-solid fa-table-columns"></i>
								<span class="text-[15px] font-sans"
									>Dashboard</span
								>
							</a>
						</li> -->

						<li class="mb-1 group mx-4">
							<a
								href="/batches"
								on:click={() => {
									toggleActiveTab("Batches");
								}}
								class={`flex items-center py-2 px-4 gap-1 rounded-md ${activeTab == "Batches" ? "   text-white bg-gray-800" : "text-gray-500 hover:bg-gray-950 hover:text-gray-300   "}`}
							>
								<i class="fa-solid fa-chalkboard-user"></i>
								<span class="text-[15px] font-sans"
									>Batches</span
								>
							</a>
						</li>

						<li class="mb-1 group mx-4">
							<a
								href="/previous_year_exams"
								on:click={() => {
									toggleActiveTab("PYQ");
								}}
								class={`flex items-center py-2 px-4 gap-3 rounded-md ${activeTab == "PYQ" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-solid fa-question"></i>
								<span class="text-[15px] font-sans">PYQ</span>
							</a>
						</li>

						<li class="mb-1 group mx-4">
							<a
								href="/notifications"
								on:click={() => {
									toggleActiveTab("Notifications");
								}}
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Notifications" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-regular fa-envelope"></i>
								<span class="text-[15px] font-sans"
									>Notifications</span
								>
							</a>
						</li>

						<!-- <li class="mb-1 group mx-4">
							<a
								href="#"
								on:click={() => {
									toggleActiveTab("Results");
								}}
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Results" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-solid fa-square-poll-vertical"></i>
								<span class=" text-[15px] font-sans"
									>Results</span
								>
							</a>
						</li> -->

						<!-- <li class="log_out">
							<a href=".">
								<i class="bx bx-log-out" />
								<span on:click={logout} class="links_name">Log out</span>
							</a>
						</li>

						<li class="log_out mt-auto">
							<a href=".">
							  <i class="bx bx-log-out" />
							  <span on:click={logout} class="links_name">Log out</span>
							</a>
						</li> -->
					</ul>

					<div class="absolute bottom-0 w-full h-[132px]">
						<hr class="mt-4 border-gray-800 mx-3" />

						<!-- <div class=" mt-3 mb-8 group h-[69px] mx-4">
							<a href="#" on:click={()=>{
								toggleActiveTab("Settings")
							}} class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Settings" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  " }`}>
								<i class="fa-solid fa-gear"></i>
								<span class=" text-[15px] font-sans">Settings</span>
							</a>
                        </div> -->

						<div class=" mt-3 group h-[51px] mx-4">
							<a
								href=" "
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Settings" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-solid fa-arrow-right-to-bracket"
								></i>
								<span
									on:click={logout}
									class=" text-[15px] font-sans">Log out</span
								>
							</a>
						</div>

						<a href="/students/profile">
							<div class="bg-gray-800 rounded-t-md h-14 flex">
								<div class="mt-3 ml-4 text-white">
									<i class="fa-solid fa-user-tie text-xl"></i>
								</div>
								<div>
									{#if student}
									<div class="mt-2 ml-4 text-white">
										<div class="text-sm">
											{#if student.name}
                                            {student.name.toUpperCase()}
                                            {:else}
                                            NA
                                            {/if}
										</div>
										<div
											class=" text-xs text-gray-500 hover:text-gray-300"
										>
											{student.phone}
										</div>
									</div>
									{/if}
								</div>
							</div>
						</a>
					</div>
				{/if}
			</div>
			{#if open}
				<div on:click={toggle} class=" fixed inset-0 bg-gray-600 bg-opacity-50"></div>
			{/if}
		</div>

		<div
			class=" justify-between fixed inset-0 z-50 hidden md:block h-14 w-full 2xl:px-16"
		>
			<div class=" flex items-center px-4 w-full h-14 justify-between">
				<div on:click={toggle} class=" ">
					<i
						class={`fa-solid fa-bars   p-1   top-9   cursor-pointer `}
					></i>
				</div>

				<!-- <div class=" pr-10">
					<ul class="flex gap-4">
						<a href=""><li class=" uppercase">menu</li></a>
						<a href=""><li class=" uppercase">contact</li></a>
					</ul>
				</div> -->
				<div class=" ">
					<!-- <a class="btn btn-ghost normal-case text-xl">{title}</a> -->
					<div class="m-0 p-0 flex">
						<div class="flex justify-end">
							<div
								class="  h-8 my-auto top-0 bottom-0 left-0 shadow-md rounded-md"
							>
								<!-- <button>
									<a
										class=" text-xs md:text-sm block px-2 md:px-6 h-8 flex items-center rounded-md {activeTab ==
										'lectures'
											? 'tab-active bg-gray-300 text-white'
											: ''}"
										on:click={() => {
											grid_list("lectures");
										}}
										><i
											class="fa-solid fa-table-cells text-base"
										></i></a
									>
								</button>
								<button>
									<a
										class=" text-xs md:text-sm block px-2 md:px-6 h-8 flex items-center rounded-md {activeTab ==
										'tests'
											? 'tab-active bg-gray-300 text-white'
											: ''}"
										on:click={() => {
											grid_list("tests");
										}}
										><i class="fa-solid fa-list text-base"
										></i></a
									>
								</button> -->
								<label class="inline-flex items-center cursor-pointer">
									<input type="checkbox" on:click={forgrid} value="" class="sr-only peer" bind:checked={grid}>
									<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-200"></div>
									<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">List/Grid</span>
								</label>
							</div>
                            
                            <!-- <h1>{grid}</h1> -->

							<a
								href="https://play.google.com/store/apps/details?id=org.gravityclasses.test_series"
							>
								<div class=" rounded-full p-2">
									<img
										src="/images/android.png"
										class="h-10 max-w-3xl"
									/>
								</div>
							</a>
						</div>

						<!-- <a href="#" >
						  <div class=" rounded-full p-2">
							  <img src="/images/ios.png" class="h-10 max-w-3xl" />
							</div>
					  </a> -->
					</div>
				</div>

				<div
					class={` fixed left-0 top-0  z-50 h-screen bg-gray-900 duration-300 pt-8  w-[255px]`}
				>
					<!-- <i
						class={`fa-solid fa-xmark z-50  p-1 text-white  absolute -right-8 top-4 text-2xl   cursor-pointer `}
						on:click={toggle}
					></i> -->

					<div class=" text-gray-100 text-center text-2xl">
						Gravity
					</div>
					<hr class="mt-4 border-gray-800 mx-3" />
					<ul class="pt-6">
						<!-- <li class="mb-1 group  mx-4">
							<a href="#" on:click={()=>{
								toggleActiveTab("Dashboard")
							}} class={`flex items-center py-2 px-4  rounded-md ${activeTab == "Dashboard" ? "text-gray-100 bg-gray-800 " : "text-gray-300 hover:bg-gray-950 hover:text-gray-100 " }`}>
								<i class="ri-home-2-line mr-3 text-lg"></i>
								<span class="font-medium ">Dashboard</span>
							</a>
						</li> -->

						<!-- <li class="mb-1 group mx-4">
							<a
								href="#"
								on:click={() => {
									toggleActiveTab("Dashboard");
								}}
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Dashboard" ? "   text-white bg-gray-800" : "text-gray-500 hover:bg-gray-950 hover:text-gray-100   "}`}
							>
								<i class="fa-solid fa-table-columns"></i>
								<span class="text-[15px] font-sans"
									>Dashboard</span
								>
							</a>
						</li> -->

						<li class="mb-1 group mx-4">
							<a
								href="/batches"
								on:click={() => {
									toggleActiveTab("Batches");
								}}
								class={`flex items-center py-2 px-4 gap-1 rounded-md ${activeTab == "Batches" ? "   text-white bg-gray-800" : "text-gray-500 hover:bg-gray-950 hover:text-gray-300   "}`}
							>
								<i class="fa-solid fa-chalkboard-user"></i>
								<span class="text-[15px] font-sans"
									>Batches</span
								>
							</a>
						</li>

						<li class="mb-1 group mx-4">
							<a
								href="/previous_year_exams"
								on:click={() => {
									toggleActiveTab("PYQ");
								}}
								class={`flex items-center py-2 px-4 gap-3 rounded-md ${activeTab == "PYQ" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-solid fa-question"></i>
								<span class="text-[15px] font-sans">PYQ</span>
							</a>
						</li>

						<li class="mb-1 group mx-4">
							<a
								href="/notifications"
								on:click={() => {
									toggleActiveTab("Notifications");
								}}
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Notifications" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-regular fa-envelope"></i>
								<span class="text-[15px] font-sans"
									>Notifications</span
								>
							</a>
						</li>

						<!-- <li class="mb-1 group mx-4">
							<a
								href="#"
								on:click={() => {
									toggleActiveTab("Results");
								}}
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Results" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-solid fa-square-poll-vertical"></i>
								<span class=" text-[15px] font-sans"
									>Results</span
								>
							</a>
						</li> -->

						<!-- <li class="log_out">
							<a href=".">
								<i class="bx bx-log-out" />
								<span on:click={logout} class="links_name">Log out</span>
							</a>
						</li>

						<li class="log_out mt-auto">
							<a href=".">
							  <i class="bx bx-log-out" />
							  <span on:click={logout} class="links_name">Log out</span>
							</a>
						</li> -->
					</ul>

					<div class="absolute bottom-0 w-full h-48">
						<hr class="mt-4 border-gray-800 mx-3" />

						<!-- <div class=" mt-3 mb-8 group h-[69px] mx-4">
							<a href="#" on:click={()=>{
								toggleActiveTab("Settings")
							}} class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Settings" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  " }`}>
								<i class="fa-solid fa-gear"></i>
								<span class=" text-[15px] font-sans">Settings</span>
							</a>
                        </div> -->

						<!-- <div class=" mt-3 mb-8 group h-[69px] mx-4">
							<a
								href="."
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Settings" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-solid fa-arrow-right-to-bracket"
								></i>
								<span
									on:click={logout}
									class=" text-[15px] font-sans">Log out</span
								>
							</a>
						</div> -->
						<!-- <div class=" mt-3 mb-8 group h-[69px] mx-4">
							<a
								href=" "
								class={`flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Settings" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-solid fa-arrow-right-to-bracket"
								></i>
								<span
									on:click={logout}
									class=" text-[15px] font-sans">Log out</span
								>
							</a>
						</div> -->

						<div class=" mt-3 mb-8 group h-[69px] mx-4">
							<a
							    href=""
							  on:click={logout}
								class={` flex items-center py-2 px-4 gap-2 rounded-md ${activeTab == "Settings" ? "  text-white bg-gray-800" : " text-gray-500 hover:bg-gray-950 hover:text-gray-300  "}`}
							>
								<i class="fa-solid fa-arrow-right-to-bracket"
								></i>
								<span
									
									class=" text-[15px] font-sans">Log out</span
								>
							</a>
						</div>

						<a href="/students/profile">
							<div class="bg-gray-800 rounded-t-md h-14 flex">
								<div class="mt-3 ml-4 text-white">
									<i class="fa-solid fa-user-tie text-xl"></i>
								</div>
								<div>
									{#if student}
									<div class="mt-2 ml-4 text-white">
										<div class="text-sm">
											{#if student.name}
                                            {student.name.toUpperCase()}
                                            {:else}
                                            NA
                                            {/if}
										</div>
										<div
											class=" text-xs text-gray-500 hover:text-gray-300"
										>
											{student.phone}
										</div>
									</div>
									{/if}
								</div>
							</div>
						</a>
					</div>
					<!-- {#if open}
					<div class=" fixed inset-0 bg-gray-600 bg-opacity-50"></div>
			{/if} -->
				</div>
			</div>
		</div>
	</nav>
	
</body>
