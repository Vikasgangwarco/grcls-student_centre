<script>

  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";

  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  // import { roomId } from '../room/[slug].svelte';
  // export var roomId;

  let body = {};

  /** @type {import('./$types').PageData} */
  export let data;
  export let test_result_id = data.test_result_id;
  console.log("verificationId from slug:" + test_result_id);

  let testResult;
  var loginPath = get(ApiUrl);
  onMount(async () => {
    console.log("mounted");
    // localStorage.setItem("token", "some value");

    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }
    Token.set(token);

    console.log(loginPath + "/auth/whoami");
    const res = await fetch(loginPath + "/user/students/test_result/" + test_result_id, {
      mode: "cors",
      method: "get",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        testResult = response.data;
        console.log("testResult");
        console.log(testResult);
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

