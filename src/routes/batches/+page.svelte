<script>
    import StudentsList from "../../lib/components/Lists/students.svelte";

    import StudentPicker from "../_utils/_students/student_picker.svelte";
    import { onMount } from "svelte";
    import { Token } from "../_utils/dynamic_store.js";

    import { ApiUrl } from "../_utils/static_store.js";
    import { get } from "svelte/store";
    import LoggedInNavigation from "$lib/components/logged_in_navigation.svelte";
    import TopStudent from "../../lib/components/navigation_bars/top_student.svelte";
    import TopStudentDaisy from "../../lib/components/navigation_bars/top_student_daisy.svelte";
    import BatchesNew from "../../lib/components/Lists/modern/batches_new.svelte";
    // import { roomId } from '../room/[slug].svelte';
    // export var roomId;
    let banners;

    let body = {};
    let batches;
    
    let grid;

    var students = null;
    var loginPath = get(ApiUrl);

    
    onMount(async () => {
        console.log("mounted");
        // localStorage.setItem("token","some value");

        var token = localStorage.getItem("token");
         grid = localStorage.getItem("grid");
        // if(!token)
        // {
        // 	console.log("yes");
        // 	location.href="/login";
        // }
        // Token.set(token);

        // console.log(loginPath+'/auth/whoami');
        const res = await fetch(loginPath + "/user/students/batches/my_batches", {
            mode: "cors",
            method: "get",
            headers: { Authorization: "Bearer " + token },
        });
        if (res.status == 200) {
            try {
                let response = await res.text();
                console.log(response);
                response = await JSON.parse(response);
                batches = response.data;
                console.log("Information of batches");
                console.log(batches);
            } catch (e) {
                console.log("caught");

                console.log(e);
            }

            // let data = JSON.parse(text);
        } else {
            console.log(await res.text());
            user.email = "no logged";
        }
        // getBanners();
    });

    // async function getBanners() {
    //     var token = localStorage.getItem("token");
    //     var res;
    //     var loginPath = get(ApiUrl);
    //     console.log("trying branches");
    //     var res = await fetch(loginPath + "/user/students/promotions/selectedBanners" , {
    //         mode: "cors",
    //         method: "get",
    //         headers: {
    //             Authorization: "Bearer " + token,
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     if (res.status == 200) {
    //         try {
    //             let response = await res.text();
    //             response = await JSON.parse(response);
    //             if (response.status == "success") {
    //                 banners = response.data;
    //                 console.log("banners");
    //                 console.log(banners);
    //                 console.log("banners");
    //                 // batches= response.data.batches;
    //             } else {
    //                 console.log(response.message);
    //             }
    //         } catch (e) {
    //             console.log("caught1");
    //             alert("Some problem has occured, see console for more info.");
    //             console.log(e.message);
    //         }
    //     } else {
    //         console.log(await res.text());
    //     }
    // }

   

    
</script>

<body class="p-0 m-0 pt-20 bg-white">
    <!-- <TopStudentDaisy  title={"Batches"} /> -->

    <!-- <TopStudent title={"Batches"} /> -->
    <!-- <LoggedInNavigation /> -->
    <!-- <h1>{grid}</h1> -->
    {#if batches}
         <BatchesNew {batches} />
    {/if}
    

   
</body>

<style>
   
</style>
