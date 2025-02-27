<script>
  import Youtube from "svelte-youtube-embed";
  import { onMount } from "svelte";
  import { Token } from "../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../_utils/static_store.js";
  import { get } from "svelte/store";
  import TopStudentDaisy from "../../../lib/components/navigation_bars/top_student_daisy.svelte";
  import Files from "../../../lib/components/Lists/modern/files.svelte";
    import ModuleQuestions from "../../../lib/components/Lists/modern/module_questions.svelte";
    import ModulesChapters from "../../../lib/components/Lists/modern/modules_chapters.svelte";
  function onReady(event) {
    event.target.pauseVideo();
  }
  let body = {};
  let activeTab = "level_1";

  async function toggleActiveTab(tab){
    activeTab = tab;
  }
  /** @type {import('./$types').PageData} */
  export let data;
  export let moduleId = data.moduleId;
  console.log("verificationId from slug:" + moduleId);
  let gravityModule;

  var loginPath = get(ApiUrl);
  onMount(async () => {
    console.log("mounted");
    var token = localStorage.getItem("token");
    if(!token)
    {
    console.log("yes");
    location.href="/login";
    }
    Token.set(token);

    console.log(loginPath+'/auth/whoami');
    const res = await fetch(
      loginPath + "/user/students/modules/single/" + moduleId,
      {
        mode: "cors",
        method: "get",
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        gravityModule = response.data;
      } catch (e) {
        console.log("caught");
        console.log(e);
      }
    } else {
      console.log(await res.text());
    }
  });
</script>


{#if gravityModule}
<TopStudentDaisy  title={"Module:"+gravityModule.name} />
  <body class="">
   <ModulesChapters moduleChapters={gravityModule.chapters} />
  </body>
{/if}

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
