<script>
	
    /** @type {import('./$types').PageData} */
    export let data;
  export let courseId = data.courseId;
  console.log("studentID from slug:" + courseId);

	

	import {onMount} from 'svelte';
	import {Token} from '../../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../../_utils/static_store.js';
	import { get } from 'svelte/store';
	import { bubble } from 'svelte/internal';
	// import SCQ from '../../_utils/_banners/_scq.svelte';
	



	
	let course;
	var token;

// 	let course = {
// 	image: "image",
// 	name: "name1",
// 	stream: "stream",
// 	centre: "centre",
// 	tests: "tests",
// 	modules: "modules",
// 	centres: "centres"
//    };


	// let day= date.getDay();
	
	onMount(async ()=>{
		console.log(courseId);
		console.log("mounted1");
		// localStorage.setItem("token","some value");
		
		//  token = localStorage.getItem("token");
		// if(!token)
		// {
		// 	console.log("yes");
		// 	location.href="/login";
		// }
		// Token.set(token);
		var loginPath=get(ApiUrl);
        
		// console.log(loginPath+'/auth/whoami');
		console.log("mounted2");
		console.log(loginPath);
		const res = await fetch(loginPath+'/promotions/course_get/'+courseId,{mode:'cors',method:'get',headers:{"Content-Type": "application/json",}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					// jsonCourse = response;
					
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("got courses")
						course = response.data;
						console.log("course");
						console.log(course);
						console.log("course");
					}
					else
					{
						console.log(response.message);
						alert(response.message);
					}
					
					
			}
			catch(e){
				console.log("caught");
				
				console.log(e);
			}
			finally{
				
			}
			
			// let data = JSON.parse(text);
			
		}
		else{
					console.log(await res.text());
					// user.email="no logged";
					
				}
		// 
	});


	const decodeAndModifyImage1 = (encodedImage) => {
    let decodedImageTag = atob(encodedImage);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let imageWidth = screenWidth / 6;
    let imageHeight = screenHeight / 2.5;
    let modifiedImageTag = decodedImageTag.replace('<img ', `<img style="width:${imageWidth}px;height:${imageHeight}px;" `);
    return modifiedImageTag;
  };


</script>


{#if course}
<main class="mt-16">
	<body class="bg-gray-200">
		<div class="container mx-auto ">
			<div class="bg-white p-6 rounded-lg shadow-lg">
	
				<!-- <h1 class="text-2xl font-bold mb-4 ">
					Delicious Chocolate Cake
				</h1> -->
				
				<!-- <img class="max-w-sm mx-auto my-4 rounded-lg shadow" src="https://images.unsplash.com/photo-1616031037011-087000171abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxM3x8Q2hvY29sYXRlJTIwQ2FrZXxlbnwwfDB8fHwxNjk0MTc2ODk0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Chocolate Cake" > -->
	            <div class="flex-shrink-0 flex justify-center ">
                    <span class="self-center text-4xl bg-white p-3 border-[1px] border-gray-300">
                      {@html decodeAndModifyImage1(course.image)}
                    </span>
                  </div>
				<div class="bg-white overflow-hidden shadow rounded-lg border">
					<div class="px-4 py-5 sm:px-6">
						<h3 class="text-lg text-blue-600 font-bold leading-6  uppercase">
							{@html atob(course.name)}
						</h3>
						<p class="mt-1 max-w-2xl text-sm text-gray-600" style="text-transform: uppercase;">
							{@html atob(course.description)}
						</p>
					</div>
					<div class="border-t border-gray-200 px-4 py-5 sm:p-0">
						<dl class="sm:divide-y sm:divide-gray-200">
							<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">
									Class
								</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{@html atob(course.class)}
								</dd>
							</div>
							<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">
									Stream
								</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{@html atob(course.stream)}
								</dd>
							</div>
							<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">
									SIP
								</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{@html atob(course.sip)}
								</dd>
							</div>
							<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">
									School
								</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{@html atob(course.school)}
								</dd>
							</div>
							<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt class="text-sm font-medium text-gray-500">
									Center
								</dt>
								<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{@html atob(course.centre)}
								</dd>
							</div>
							
						</dl>
					</div>
				</div>
			</div>
		</div>
	</body>

	

</main>
{/if}