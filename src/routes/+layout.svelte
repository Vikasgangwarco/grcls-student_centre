<script>
	import "../app.css";
	import { Modals, closeModal } from 'svelte-modals';
	import { isLoggedIn } from '../routes/_utils/isLoggedinStore.js';
	import Hnav from '../lib/components/Hnav.svelte';
	import Pre_hnav from '../lib/components/pre_login_hnav.svelte';
//   import Footer from "$lib/components/footer.svelte";
  import {page} from '$app/stores';
  
  import { onMount } from 'svelte';
  
//   import LoggedInNavigation from "$lib/components/logged_in_navigation.svelte";
//   import MainNavigation from "$lib/components/main_navigation.svelte";
//     import SideNav from "../lib/components/navigation_bars/side_nav.svelte";
// 	let authStore;

onMount(()=>{
		$page = page;
		async function _initialization(){
	//   authStore = (await import('$lib/stores/authentication')).authStore;
	//   console.log($page.url.pathname);
	}
	}
	)
  </script>
  
  <style>
	.backdrop {
	  position: fixed;
	  top: 0;
	  z-index: 30;
	  bottom: 0;
	  right: 0;
	  left: 0;
	  background: rgba(0,0,0,0.50)
	}
  </style>
  
  
  
  
  
  <Modals>
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
  </Modals> 
  
  <!-- <MainNavigation /> -->
  <!-- {#if $authStore && $authStore.isAuthenticated()}
	  <LoggedInNavigation />
	{/if} -->

	
  <!-- This one is for large screen -->
  <div class="">
    <main class="flex flex-row">
        <div class="hidden md:block">
			{#if $page.url.pathname === "/" || $page.url.pathname.includes("/about_us") || $page.url.pathname.includes("/contact_us")  || $page.url.pathname.includes("/courses") || $page.url.pathname.includes("/profile_deletion_guidance") || $page.url.pathname.includes("/content_of_outer_website") || $page.url.pathname.includes("/view_all") || $page.url.pathname.includes("/view")}
            <div class=""> 
                <Pre_hnav segment={$page.url.pathname} />
            </div>
            {:else if $isLoggedIn && $page.url.pathname !== "/login" && !$page.url.pathname.includes("/otp_verification") && !$page.url.pathname.includes("/tests/test/") && !$page.url.pathname.includes("/tests/dpp_test/")}
            <div class="w-[253px]"> 
                <Hnav segment={$page.url.pathname} />
            </div>
            {/if}
		</div>
		<div class="md:hidden">
			{#if $page.url.pathname === "/" || $page.url.pathname.includes("/about_us") || $page.url.pathname.includes("/contact_us")  || $page.url.pathname.includes("/courses") || $page.url.pathname.includes("/profile_deletion_guidance")}
            <div class=""> 
                <Pre_hnav segment={$page.url.pathname} />
            </div>
            {:else if $isLoggedIn && $page.url.pathname !== "/login" && !$page.url.pathname.includes("/otp_verification") && !$page.url.pathname.includes("/tests/test/") && !$page.url.pathname.includes("/tests/dpp_test/")}
            <div class=""> 
                <Hnav segment={$page.url.pathname} />
            </div>
            {/if}
		</div>
        <div class="grow p-0">
            <slot/>
        </div>
    </main>
   </div>

<!-- This one is for small screen -->

<!-- <div class="md:hidden">
    <main class="flex flex-row">
        {#if $page.url.pathname === "/" || $page.url.pathname.includes("/about_us") || $page.url.pathname.includes("/contact_us")  || $page.url.pathname.includes("/courses")}
            <div class=""> 
                <Pre_hnav segment={$page.url.pathname} />
            </div>
        {:else if $isLoggedIn && $page.url.pathname !== "/login" && !$page.url.pathname.includes("/otp_verification") && !$page.url.pathname.includes("/tests/test/")}
            <div class=""> 
                <Hnav segment={$page.url.pathname} />
            </div>
        {/if}
        <div class="grow p-0">
            <slot/>
        </div>
    </main>
</div> -->



<!-- for outer before logged in pages -->


<!-- This one is for large screen -->
	<!-- <div class="hidden md:block">
		<main class=" flex flex-row ">
			{#if $page.url.pathname.includes("/home")  || $page.url.pathname.includes("/about_us") || $page.url.pathname.includes("/contact_us") || $page.url.pathname.includes("/")}
			<div class="w-[253px]  "> 
			<Pre_hnav  segment={$page.url.pathname} />
			</div>
			{/if} -->
		
			<!-- <div class=" grow  p-0">
			<slot/>
			</div> -->
		<!-- </main>
	</div> -->

<!-- This one is for small screen -->

	<!-- <div class="md:hidden">
		<main class=" flex flex-row  ">
			{#if $page.url.pathname.includes("/home")  || $page.url.pathname.includes("/about_us") || $page.url.pathname.includes("/contact_us") || $page.url.pathname.includes("/")}
			<div class="w-[253px]"> 
			<Pre_hnav  segment={$page.url.pathname} />
			</div>
			{/if} -->
		
			<!-- <div class=" grow  p-0">
			<slot/>
			</div> -->
		<!-- </main>
	</div> -->
  
  
 <!-- <div class="w3-rest" data-theme="emerald"> <slot /></div> -->
  
  
  <!-- <Footer />  -->



  <!-- <script> -->
	<!-- // import Nav from '../components/Nav.svelte';
	import Hnav from '../lib/components/Hnav.svelte';
	
//	import "../tailwind_i.css";
	export let segment;
	// console.log(segment.indexOf("certificate")); -->
<!-- </script> -->

<!-- <style>
	main {
		position: relative;
		width: 100%;
		background-color: white;
		padding: 0em;
		margin: 0 auto;
		/* box-sizing: border-box; */
	}
	.nav{
		max-width:300px;
		position:sticky;
		top:0;
	}

	h1{
		font-size:300%;
	}
	h2{
		font-size:200%;
	}
	h3{
		font-size:150%;
	}

	.slot{
		padding:0em;
		/* height:100; */
		overflow:scroll;

	}
</style> -->
<!-- <link rel="stylesheet" href="index.css" /> -->

<!-- {#if (segment != "login" && segment != "register" && !(segment.indexOf("certificate")== 0 && segment.indexOf("certificates")<0 ))} -->
<!-- {#if segment != "login"}
<Nav {segment}/>
{/if} -->
	
<!-- {/if} -->
<!-- <main class="w3-row">
	{#if segment != "login"}
	<div class="w3-col nav"> 
	<Hnav  {segment} />
	</div>
	{/if}

	<div class="w3-rest slot w3-padding">
	<slot></slot>
	</div>
</main> -->
