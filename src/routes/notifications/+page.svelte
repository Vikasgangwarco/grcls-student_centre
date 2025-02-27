<script>
    import { onMount } from "svelte";
    import { ApiUrl } from "../_utils/static_store.js";
    import { get } from "svelte/store";
    import TopStudentDaisy from "../../lib/components/navigation_bars/top_student_daisy.svelte";
    import Notifications from "../../lib/components/Lists/modern/notifications.svelte";

    let notifications;
    var loginPath = get(ApiUrl);
    onMount(async () => {
        console.log("mounted");
        // localStorage.setItem("token","some value");

        var token = localStorage.getItem("token");
        const res = await fetch(loginPath + "/user/students/notifications/students", {
            mode: "cors",
            method: "get",
            headers: { Authorization: "Bearer " + token },
        });
        if (res.status == 200) {
            try {
                let response = await res.text();
                console.log(response);
                response = await JSON.parse(response);
                notifications = response.data;
                console.log("Information of batches");
                console.log(notifications);
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
</script>

<body class="p-0 m-0 mt-16">
    <TopStudentDaisy  title={"Student Notifications"} />
    {#if notifications}
         <Notifications {notifications} />
    {/if}
</body>

<style>
   
</style>
