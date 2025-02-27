<!-- Coding by CodingNepal | www.codingnepalweb.com -->

<!-- <head>
    <meta charset="UTF-8">
    <title> Responsiive Admin Dashboard | CodingLab </title>
    <link rel="stylesheet" href="style.css">
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head> -->

<script>
 import StudentsList from "../../lib/components/Lists/students.svelte";
  
  import StudentPicker from "../_utils/_students/student_picker.svelte";
  import { onMount } from "svelte";
  import { Token } from "../_utils/dynamic_store.js";

  import { ApiUrl } from "../_utils/static_store.js";
  import { get } from "svelte/store";
  // import { roomId } from '../room/[slug].svelte';
  // export var roomId;

  let body = {};

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
    const res = await fetch(loginPath + "/panel/students", {
      mode: "cors",
      method: "get",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);
        response = await JSON.parse(response);
        students = response.data;
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

  async function getStudent() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/student/" + studentId, {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          body = response.data;
          // batches= response.data.batches;
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log("caught1");
        alert("Some problem has occured, see console for more info.");
        console.log(e.message);
      }
    } else {
      console.log(await res.text());
    }
  }

  let x = false;

  function menu_toggle() {
    x = !x;
  }
</script>

<body>
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <!-- <i class='bx bx-menu sidebarBtn'></i> -->
        <span class="dashboard">Dashboard</span>
      </div>
      <div class="search-box">
        <input type="text" placeholder="Search..." />
        <i class="bx bx-search" />
      </div>
      <div class="profile-details">
        <div class="avatar ml-4">
          <div
            class="w-8 rounded-full ring ring-gray-800 ring-offset-base-100"
          />
        </div>

        <div class="dropdown dropdown-end">
          <label tabindex="0" class=" m-1"
            ><span><i on:click={menu_toggle} class="bx bx-chevron-down" /></span
            ></label
          >
          {#if x}
              <ul
                tabindex="0"
                class="swap-on dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href=" "
                    ><i class="fa-regular fa-user text-gray-800 mr-3" /><span
                      class="text-gray-800">My Profile</span
                    ></a
                  >
                </li>
                <li>
                  <a href=" "
                    ><i
                      class="fa-solid fa-arrow-right-from-bracket text-gray-800 mr-3"
                    /><span class="text-gray-800">Logout</span></a
                  >
                </li>
              </ul>
            {/if}
        </div>
      </div>
    </nav>
    
    <div class="home-content">
      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Fees</div>
            <div class="number">40,876</div>
            <div class="indicator">
              <i class="bx bx-up-arrow-alt" />
              <span class="text">Up from yesterday</span>
            </div>
          </div>
          <i class="bx bx-cart-alt cart" />
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Salary</div>
            <div class="number">38,876</div>
            <div class="indicator">
              <i class="bx bx-up-arrow-alt" />
              <span class="text">Up from yesterday</span>
            </div>
          </div>
          <i class="bx bxs-cart-add cart two" />
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Profit</div>
            <div class="number">12,876</div>
            <div class="indicator">
              <i class="bx bx-up-arrow-alt" />
              <span class="text">Up from yesterday</span>
            </div>
          </div>
          <i class="bx bx-cart cart three" />
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Return</div>
            <div class="number">11,086</div>
            <div class="indicator">
              <i class="bx bx-down-arrow-alt down" />
              <span class="text">Down From Today</span>
            </div>
          </div>
          <i class="bx bxs-cart-download cart four" />
        </div>
      </div>

      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">Recent Batches</div>
          <div class="sales-details">
            <!-- <ul class="details">
              <li class="topic">Date</li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
            </ul>
            <ul class="details">
            <li class="topic">Customer</li>
            <li><a href="#">Alex Doe</a></li>
            <li><a href="#">David Mart</a></li>
            <li><a href="#">Roe Parter</a></li>
            <li><a href="#">Diana Penty</a></li>
            <li><a href="#">Martin Paw</a></li>
            <li><a href="#">Doe Alex</a></li>
            <li><a href="#">Aiana Lexa</a></li>
            <li><a href="#">Rexel Mags</a></li>
             <li><a href="#">Tiana Loths</a></li>
          </ul>
          <ul class="details">
            <li class="topic">Sales</li>
            <li><a href="#">Delivered</a></li>
            <li><a href="#">Pending</a></li>
            <li><a href="#">Returned</a></li>
            <li><a href="#">Delivered</a></li>
            <li><a href="#">Pending</a></li>
            <li><a href="#">Returned</a></li>
            <li><a href="#">Delivered</a></li>
             <li><a href="#">Pending</a></li>
            <li><a href="#">Delivered</a></li>
          </ul>
          <ul class="details">
            <li class="topic">Total</li>
            <li><a href="#">$204.98</a></li>
            <li><a href="#">$24.55</a></li>
            <li><a href="#">$25.88</a></li>
            <li><a href="#">$170.66</a></li>
            <li><a href="#">$56.56</a></li>
            <li><a href="#">$44.95</a></li>
            <li><a href="#">$67.33</a></li>
             <li><a href="#">$23.53</a></li>
             <li><a href="#">$46.52</a></li>
          </ul> -->
          </div>
          <div class="button">
            <a href="#">See All</a>
          </div>
        </div>
        <div class="top-sales box">
          <div class="title">
            Top Performer
          </div>
          <!-- <ul class="top-sales-details">
            <li>
            <a href="#">
              <img src="images/sunglasses.jpg" alt="">
              <span class="product">Vuitton Sunglasses</span>
            </a>
            <span class="price">$1107</span>
          </li>
          <li>
            <a href="#">
               <img src="images/jeans.jpg" alt="">
              <span class="product">Hourglass Jeans </span>
            </a>
            <span class="price">$1567</span>
          </li>
          <li>
            <a href="#">
             <img src="images/nike.jpg" alt="">
              <span class="product">Nike Sport Shoe</span>
            </a>
            <span class="price">$1234</span>
          </li>
          <li>
            <a href="#">
              <img src="images/scarves.jpg" alt="">
              <span class="product">Hermes Silk Scarves.</span>
            </a>
            <span class="price">$2312</span>
          </li>
          <li>
            <a href="#">
              <img src="images/blueBag.jpg" alt="">
              <span class="product">Succi Ladies Bag</span>
            </a>
            <span class="price">$1456</span>
          </li>
          <li>
            <a href="#">
              <img src="images/bag.jpg" alt="">
              <span class="product">Gucci Womens's Bags</span>
            </a>
            <span class="price">$2345</span>
          <li>
            <a href="#">
              <img src="images/addidas.jpg" alt="">
              <span class="product">Addidas Running Shoe</span>
            </a>
            <span class="price">$2345</span>
          </li>
<li>
            <a href="#">
             <img src="images/shirt.jpg" alt="">
              <span class="product">Bilack Wear's Shirt</span>
            </a>
            <span class="price">$1245</span>
          </li>
          </ul> -->
        </div>
      </div>
    </div>
  </section>


  <!-- <script>
   let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
  sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
}else
  sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}
 </script> -->
</body>

<style>
  /* Googlefont Poppins CDN Link */
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  /* .sidebar{
  position: fixed;
  height: 100%;
  width: 240px;
  background: #0A2558;
  transition: all 0.5s ease;
} */
  .sidebar.active {
    width: 60px;
  }
  .sidebar .logo-details {
    height: 80px;
    display: flex;
    align-items: center;
  }
  .sidebar .logo-details i {
    font-size: 28px;
    font-weight: 500;
    color: #fff;
    min-width: 60px;
    text-align: center;
  }
  .sidebar .logo-details .logo_name {
    color: #fff;
    font-size: 24px;
    font-weight: 500;
  }
  .sidebar .nav-links {
    margin-top: 10px;
  }
  .sidebar .nav-links li {
    position: relative;
    list-style: none;
    height: 50px;
  }
  .sidebar .nav-links li a {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
  }
  .sidebar .nav-links li a.active {
    background: #081d45;
  }
  .sidebar .nav-links li a:hover {
    background: #081d45;
  }
  .sidebar .nav-links li i {
    min-width: 60px;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }
  .sidebar .nav-links li a .links_name {
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
  }
  .sidebar .nav-links .log_out {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .home-section {
    position: relative;
    background: #f5f5f5;
    min-height: 100vh;
    /* width: calc(100% - 240px); */
    /* left: 240px; */
    transition: all 0.5s ease;
  }
  .sidebar.active ~ .home-section {
    width: calc(100% - 60px);
    left: 60px;
  }
  .home-section nav {
    display: flex;
    justify-content: space-between;
    height: 80px;
    background: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    width: calc(100% - 240px);
    left: 253px;
    z-index: 100;
    padding: 0 20px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
  }
  .sidebar.active ~ .home-section nav {
    left: 60px;
    width: calc(100% - 60px);
  }
  .home-section nav .sidebar-button {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
  }
  nav .sidebar-button i {
    font-size: 35px;
    margin-right: 10px;
  }
  .home-section nav .search-box {
    position: relative;
    height: 50px;
    max-width: 550px;
    width: 100%;
    margin: 0 20px;
  }
  nav .search-box input {
    height: 100%;
    width: 100%;
    outline: none;
    background: #f5f6fa;
    border: 2px solid #efeef1;
    border-radius: 6px;
    font-size: 18px;
    padding: 0 15px;
  }
  nav .search-box .bx-search {
    position: absolute;
    height: 40px;
    width: 40px;
    background: #2697ff;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 4px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 22px;
    transition: all 0.4 ease;
  }
  .home-section nav .profile-details {
    display: flex;
    align-items: center;
    /* background: #f5f6fa; */
    /* border: 2px solid #efeef1; */
    border-radius: 6px;
    height: 50px;
    min-width: 190px;
    padding: 0 15px 0 2px;
  }
  nav .profile-details img {
    height: 40px;
    width: 40px;
    border-radius: 6px;
    object-fit: cover;
  }
  nav .profile-details .admin_name {
    font-size: 15px;
    font-weight: 500;
    color: #333;
    margin: 0 10px;
    white-space: nowrap;
  }
  nav .profile-details i {
    font-size: 25px;
    color: #333;
  }
  .home-section .home-content {
    position: relative;
    padding-top: 104px;
  }
  .home-content .overview-boxes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 20px;
    margin-bottom: 26px;
  }
  .overview-boxes .box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 4 - 15px);
    background: #fff;
    padding: 15px 14px;
    border-radius: 12px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
  .overview-boxes .box-topic {
    font-size: 20px;
    font-weight: 500;
  }
  .home-content .box .number {
    display: inline-block;
    font-size: 35px;
    margin-top: -6px;
    font-weight: 500;
  }
  .home-content .box .indicator {
    display: flex;
    align-items: center;
  }
  .home-content .box .indicator i {
    height: 20px;
    width: 20px;
    background: #8fdacb;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
    margin-right: 5px;
  }
  .box .indicator i.down {
    background: #e87d88;
  }
  .home-content .box .indicator .text {
    font-size: 12px;
  }
  .home-content .box .cart {
    display: inline-block;
    font-size: 32px;
    height: 50px;
    width: 50px;
    background: #cce5ff;
    line-height: 50px;
    text-align: center;
    color: #66b0ff;
    border-radius: 12px;
    margin: -15px 0 0 6px;
  }
  .home-content .box .cart.two {
    color: #2bd47d;
    background: #c0f2d8;
  }
  .home-content .box .cart.three {
    color: #ffc233;
    background: #ffe8b3;
  }
  .home-content .box .cart.four {
    color: #e05260;
    background: #f7d4d7;
  }
  .home-content .total-order {
    font-size: 20px;
    font-weight: 500;
  }
  .home-content .sales-boxes {
    display: flex;
    justify-content: space-between;
    /* padding: 0 20px; */
  }

  /* left box */
  .home-content .sales-boxes .recent-sales {
    width: 65%;
    background: #fff;
    padding: 20px 30px;
    margin: 0 20px;
    border-radius: 12px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
  .home-content .sales-boxes .sales-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sales-boxes .box .title {
    font-size: 24px;
    font-weight: 500;
    /* margin-bottom: 10px; */
  }
  .sales-boxes .sales-details li.topic {
    font-size: 20px;
    font-weight: 500;
  }
  .sales-boxes .sales-details li {
    list-style: none;
    margin: 8px 0;
  }
  .sales-boxes .sales-details li a {
    font-size: 18px;
    color: #333;
    font-size: 400;
    text-decoration: none;
  }
  .sales-boxes .box .button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .sales-boxes .box .button a {
    color: #fff;
    background: #0a2558;
    padding: 4px 12px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .sales-boxes .box .button a:hover {
    background: #0d3073;
  }

  /* Right box */
  .home-content .sales-boxes .top-sales {
    width: 35%;
    background: #fff;
    padding: 20px 30px;
    margin: 0 20px 0 0;
    border-radius: 12px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
  .sales-boxes .top-sales li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
  }
  .sales-boxes .top-sales li a img {
    height: 40px;
    width: 40px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 10px;
    background: #333;
  }
  .sales-boxes .top-sales li a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .sales-boxes .top-sales li .product,
  .price {
    font-size: 17px;
    font-weight: 400;
    color: #333;
  }
  /* Responsive Media Query */
  @media (max-width: 1240px) {
    .sidebar {
      width: 60px;
    }
    .sidebar.active {
      width: 220px;
    }
    .home-section {
      width: calc(100% - 60px);
      left: 60px;
    }
    .sidebar.active ~ .home-section {
      /* width: calc(100% - 220px); */
      overflow: hidden;
      left: 220px;
    }
    .home-section nav {
      width: calc(100% - 60px);
      left: 60px;
    }
    .sidebar.active ~ .home-section nav {
      width: calc(100% - 220px);
      left: 220px;
    }
  }
  @media (max-width: 1150px) {
    .home-content .sales-boxes {
      flex-direction: column;
    }
    .home-content .sales-boxes .box {
      width: 100%;
      overflow-x: scroll;
      margin-bottom: 30px;
    }
    .home-content .sales-boxes .top-sales {
      margin: 0;
    }
  }
  @media (max-width: 1000px) {
    .overview-boxes .box {
      width: calc(100% / 2 - 15px);
      margin-bottom: 15px;
    }
  }
  @media (max-width: 700px) {
    nav .sidebar-button .dashboard,
    nav .profile-details .admin_name,
    nav .profile-details i {
      display: none;
    }
    .home-section nav .profile-details {
      height: 50px;
      min-width: 40px;
    }
    .home-content .sales-boxes .sales-details {
      width: 560px;
    }
  }
  @media (max-width: 550px) {
    .overview-boxes .box {
      width: 100%;
      margin-bottom: 15px;
    }
    .sidebar.active ~ .home-section nav .profile-details {
      display: none;
    }
  }
  @media (max-width: 400px) {
    .sidebar {
      width: 0;
    }
    .sidebar.active {
      width: 60px;
    }
    .home-section {
      width: 100%;
      left: 0;
    }
    .sidebar.active ~ .home-section {
      left: 60px;
      width: calc(100% - 60px);
    }
    .home-section nav {
      width: 100%;
      left: 0;
    }
    .sidebar.active ~ .home-section nav {
      left: 60px;
      width: calc(100% - 60px);
    }
  }
</style>
