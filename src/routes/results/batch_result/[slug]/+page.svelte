<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let test_Id = data.test_Id;
  console.log("studentID from slug:" + test_Id);

  // import { onMount } from "svelte";
  // import { Token } from "$lib/dynamic_store.js";
  // import { ApiUrl } from "$lib/static_store.js";
  // import { get } from "svelte/store";
  import { onMount } from "svelte";
    import { Token } from "../../../_utils/dynamic_store.js";
    import { selected_batch } from "../../../_utils/batch_id.js";
    import { onDestroy } from "svelte";
  
    import { ApiUrl } from "../../../_utils/static_store.js";
    import { get } from "svelte/store";
  // import ResultsList from "$lib/components/lists/results.svelte";
  import { bubble } from "svelte/internal";
  // import { read, utils, writeFileXLSX } from "xlsx";
  // import ResultsView from "$lib/components/lists/result_view.svelte";
  // import ResultView from "../../../../lib/components/lists/result_view.svelte";
  import ResultView from "../../../../lib/components/Lists/modern/result_view.svelte";

  let result_new = null;
  // let result_new = [];
  let result_export = [];
  let atc = "12345678";


  // var tests = null;

  // streams = [],
  // branches = [],
  // batches = [];
  // tests = null;

  let fresh = true;

  let body = {};
  var loginPath = get(ApiUrl);

  let batchId;

  // let total_test_results = [
  //   // {
  //   //   student: {
  //   //     id: " ",
  //   //   },
  //   // },
  // ];

  let total_test_results;
  

  // function next() {
  //   body.skip += body.limit;
  //   getStudents();
  // }

  // function previous() {
  //   body.skip -= body.limit;
  //   if (body.skip < 0) body.skip = 0;
  //   getStudents();
  // }

  onMount(async () => {
    console.log("mounted");
    // localStorage.setItem("token","some value");

    var token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href="/login";
    }
    Token.set(token);

    body.batch = "-";
    body.branch = "-";
    // body.stream = "-";
    body.skip = 0;
    body.limit = 50;

    // await getStreams();
    // await getBatches();
    // await getBranches();

    await getResults();
    // await newResult();
    await exportResult();
    atc = "abcdefgh";
  });

  // const forceUpdate = async (_) => {};
  // ``;

  async function getResults() {
    var res;
    var token = localStorage.getItem("token");

    // res = await fetch(loginPath + "/panel/results/results_filter?batch=" + " "+"&result_type="+"  "+ "&updatedAt=" + " " + "&branch=", {
      // let xyz = loginPath + "/panel/results/results_filter?test=" + test_Id;
      //       console.log("xyz");
      //       console.log(xyz);
      // loginPath + "/user/students/test_report/" + testId,
      console.log("get request1");
    res = await fetch(
      // loginPath + "/user/students/panel/results/results_filter?test=" + test_Id,
      loginPath + "/user/students/results_filter/" + test_Id,
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
        result_new = response.data;
        result_new = result_new;
        console.log("This is results12");
        console.log(result_new);
        console.log("This is results12");
      } catch (e) {
        console.log("caught");

        console.log(e);
      }

      // let data = JSON.parse(text);
    } else {
      console.log(await res.text());
      user.email = "no logged";
    }
  }

  // async function newResult() {
  //   if (results) {
  //     for (let i = 0; i < results.length; i++) {
  //       if (results[i].test == test_Id) {
  //         result_new.push(results[i]);
  //       }
  //     }
  //   }
  // }


  // This one code is for unique results
  // async function exportResult() {
  //   total_test_results = [];
  //   const uniqueResultIds = new Set(); // Create a set to store unique result_id values

   
  //   let serialNo = 1;
  //   for (let i = 0; i < result_new.length; i++) {
  //     if (result_new[i].student._id !== " ") {
  //       // Check if the result_id is already in the set
  //       if (!uniqueResultIds.has(result_new[i].student._id)) {
  //         // If it's not in the set, add it to both the set and the total_test_results array
  //         uniqueResultIds.add(result_new[i].student._id);
  //         var abcdef = {
  //           "S.No.": serialNo++,
  //           "Student Name": result_new[i].student.name,
  //           "Phone No": result_new[i].student.phone,
  //           // "Max Marks": result_new[i].max_marks,
  //           // "Marks Obtained": result_new[i].total,
  //         };
  //         let subject_wise = result_new[i].section_wise;
  //         let sw = Object.keys(subject_wise);
  //         for (var k = 0; k < sw.length; k++) {
  //           abcdef[sw[k] + "-attempted"] = subject_wise[sw[k]].attempted;
  //           abcdef[sw[k] + "-correct"] = subject_wise[sw[k]].correct;
  //           abcdef[sw[k] + "-incorrect"] = subject_wise[sw[k]].incorrect;
  //           abcdef[sw[k] + "-outOf"] = subject_wise[sw[k]].outOf;
  //           abcdef[sw[k] + "-total"] = subject_wise[sw[k]].total;
  //         }
  //       abcdef["Max Marks"] = result_new[i].max_marks;
  //       abcdef["Marks Obtained"] = result_new[i].total;
  //       // abcdef["Student ID"] = result_new[i].student._id;
  //       abcdef["Batch Name"] = result_new[i].batch.name;
  //         total_test_results.push(abcdef);
  //       }
  //     }
  //   }
  // }

  // this one code is for non uniue results
  async function exportResult() {
    total_test_results = [];
    const uniqueResultIds = new Set(); // Create a set to store unique result_id values

   
    let serialNo = 1;
    for (let i = 0; i < result_new.length; i++) {
      if (result_new[i].student._id !== " ") {
        // Check if the result_id is already in the set
        if (result_new[i].student._id) {
          // If it's not in the set, add it to both the set and the total_test_results array
          // uniqueResultIds.add(result_new[i].student._id);
          var abcdef = {
            "S.No.": serialNo++,
            "Student Name": result_new[i].student.name,
            "Phone No": result_new[i].student.phone,
            // "Max Marks": result_new[i].max_marks,
            // "Marks Obtained": result_new[i].total,
          };
          let subject_wise = result_new[i].section_wise;
          let sw = Object.keys(subject_wise);
          for (var k = 0; k < sw.length; k++) {
            abcdef[sw[k] + "-attempted"] = subject_wise[sw[k]].attempted;
            abcdef[sw[k] + "-correct"] = subject_wise[sw[k]].correct;
            abcdef[sw[k] + "-incorrect"] = subject_wise[sw[k]].incorrect;
            abcdef[sw[k] + "-outOf"] = subject_wise[sw[k]].outOf;
            abcdef[sw[k] + "-total"] = subject_wise[sw[k]].total;
          }
        abcdef["Max Marks"] = result_new[i].max_marks;
        abcdef["Marks Obtained"] = result_new[i].total;
        // abcdef["Student ID"] = result_new[i].student._id;
        abcdef["Batch Name"] = result_new[i].batch.name;
          total_test_results.push(abcdef);
        }
      }
    }
  }

  console.log("ATC");
  console.log(atc);

  console.log("This is new results");
  console.log(result_new);
  console.log("This is new results");
  // total_test_results.shift();
  // console.log("This is new total_test_results");
  // console.log(total_test_results);
  // console.log("This is new total_test_results");

  let myarr = [
    { name: "Vikas", abc: "gangwar", wxy: 58 },
    { name: "amit", abc: "anand", wxy: 58 },
  ];

  
  // function exportdata() {
  //   console.log("abcdefgh");
  //   console.log(total_test_results);
  //   const ws = utils.json_to_sheet(total_test_results);
  //   // const ws = utils.json_to_sheet(myarr);
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, "Data");
  //   writeFileXLSX(wb, result_new.result_name+"abcd.xlsx");

  //   console.log("This is ws");
  //   // console.log(testresult);
  //   console.log(result_new.result_name);
  // }
  
</script>

<svelte:head>
  <title>Chapter</title>
</svelte:head>

<!-- <div class="container w3-border w3-padding" style="--template-color:red"> -->

<!-- {#if results}
      <h3>Results({body.skip}-{body.skip + body.limit})</h3>
      <div class="flex">
          <p
              class="w3-button w3-border w3-round w3-margin"
              on:click={previous}
          >
              Previous
          </p>
          <p class="w3-button w3-border w3-round w3-margin" on:click={next}>
              Next
          </p>
      </div>

      <div class="w3-padding w3-margin">
          <ResultsList {results} />
      </div>
  {:else}
      <p>No results found!</p>
  {/if} -->

<!-- </div> -->
<!-- <p>{test_Id}</p> -->
<div class="">
  <button class="my-4 border-2 rounded-md p-2" on:click={exportdata}
    >Export to Excel</button
  >
</div>
{#if total_test_results}
<ResultView {total_test_results} />
{/if}
<!-- <ResultView {total_test_results} /> -->

<style>
  * {
    color: rgb(51, 51, 51);
  }
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #dfc502;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  .container {
    width: 100%;
    /* border:1px solid rgb(140, 140, 140); */
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: left;

    /* background: linear-gradient(45deg,rgb(134, 60, 253),var(--template-color)); */
  }
  img {
    display: block;
    width: 150px;
  }
  .certificate {
    font-size: 120px;
    font-family: "MonteCarlo", cursive;
  }
  .organization {
    color: black;
    font-size: 80px;
    font-family: "MonteCarlo", cursive;
  }
  .cont {
    font-family: "MonteCarlo", cursive;
    font-size: 30px;
  }
  .straight {
    font-family: "Merriweather", serif;

    /* font-family: 'MonteCarlo', cursive; */
  }
  .flex {
    margin-top: 30px;
    display: flex;
    align-items: stretch;
  }
  .flexit {
    flex: 1;
    padding: 20px;
  }
  p {
    /* width:100%; */
    margin: 0;
    text-align: left;
  }
  h1 {
    margin: 00px;
  }
  div {
    align-self: left;
    justify-self: left;
  }
  .abs {
    position: absolute;
    top: 120px;
    right: 130px;
  }
  a {
    text-decoration: none;
  }

  h2,
  h3 {
    font-size: 250%;
  }

  button {
    display: inline;
    width: 200px;
  }
</style>
