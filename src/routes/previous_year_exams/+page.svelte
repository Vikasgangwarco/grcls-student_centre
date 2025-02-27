<script>
    import StudentsList from "../../lib/components/Lists/students.svelte";

    import StudentPicker from "../_utils/_students/student_picker.svelte";
    import { onMount } from "svelte";
    import { Token } from "../_utils/dynamic_store.js";

    import { ApiUrl } from "../_utils/static_store.js";
    import { get } from "svelte/store";
    import TopStudentDaisy from "../../lib/components/navigation_bars/top_student_daisy.svelte";
    import BatchesNew from "../../lib/components/Lists/modern/batches_new.svelte";
    import Exams from "../../lib/components/Lists/modern/exams.svelte";
    // import { roomId } from '../room/[slug].svelte';
    // export var roomId;

    let body = {};
    let exams;

    var students = null;
    var loginPath = get(ApiUrl);
    onMount(async () => {
        console.log("mounted");
        // localStorage.setItem("token","some value");

        var token = localStorage.getItem("token");
        // if(!token)
        // {
        // 	console.log("yes");
        // 	location.href="/login";
        // }
        // Token.set(token);

        // console.log(loginPath+'/auth/whoami');
        const res = await fetch(loginPath + "/user/students/exams/", {
            mode: "cors",
            method: "get",
            headers: { Authorization: "Bearer " + token },
        });
        if (res.status == 200) {
            try {
                let response = await res.text();
                console.log(response);
                response = await JSON.parse(response);
                exams = response.data;
                
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

    // async function getStudent() {
    //     var token = localStorage.getItem("token");
    //     var res;
    //     var loginPath = get(ApiUrl);
    //     console.log("trying branches");
    //     var res = await fetch(loginPath + "/panel/student/" + studentId, {
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
    //                 body = response.data;
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

<body class="p-0 m-0 mt-16 bg-white">
    <TopStudentDaisy  title={"Previous Year Exams"} />

    <!-- <TopStudent title={"Batches"} /> -->
    <!-- <LoggedInNavigation /> -->
    {#if exams}
         <Exams {exams} />
    {/if}

   
</body>

<style>
   
</style>
