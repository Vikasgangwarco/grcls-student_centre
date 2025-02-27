<script>
    let isLoggedIn = false;
    let isProfilePage = false;
    let isOTPVerified = false;

    function login() {
        isLoggedIn = true;
    }

    function goToProfilePage() {
        isProfilePage = true;
    }

    function verifyOTP() {
        isOTPVerified = true;
    }

    function deleteAccount() {
        // Code to delete the user's account and remove their details
    }
</script>

<main
    class="min-h-screen mx-2 my-4 bg-white flex flex-col items-center justify-center "
>
    <div class="max-w-md p-6 bg-white rounded shadow mb-4 mt-16">
        <h1 class="text-2xl font-bold mb-4">Account Deletion Manual</h1>
        <p class="mb-4">
            This page provides a step-by-step guide on how to delete your
            account. Please follow the instructions carefully.
        </p>
    </div>
    <div class="flex flex-row space-x-4">
        <div class="max-w-md p-6 bg-white rounded shadow mb-4">
            <img
                src="/images/login.png"
                alt="Login Image"
                class="mb-4"
            />
            <h2 class="text-xl font-bold mb-4">Step 1: Login</h2>
            <p class="mb-4">
                To delete your account, you first need to login. Click the
                "Login" button to proceed.
            </p>
            <!-- <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={login}
            >
                Login
            </button> -->
        </div>

        <div class="max-w-md p-6 bg-white rounded shadow mb-4">
            <img
                src="/images/profile.png"
                alt="Profile Page Image"
                class="mb-4"
            />
            <h2 class="text-xl font-bold mb-4">
                Step 2: Navigate to Profile Page
            </h2>
            <p class="mb-4">
                After logging in, navigate to your profile page by clicking the
                "At your Name or Number" button in the left bottom of the menu bar.
            </p>
            <!-- <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={goToProfilePage}
            >
                Go to Profile Page
            </button> -->
        </div>

        <div class="max-w-md p-6 bg-white rounded shadow mb-4">
            <img
                src="/images/delete.png"
                alt="Account Deletion Image"
                class="mb-4"
            />
            <h2 class="text-xl font-bold mb-4">Step 3: Delete Your profile</h2>
            <p class="mb-4">
                You need to click the "Delete Account" button. After that, you will be prompted to verify your account with an OTP.

            </p>
            <!-- <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                on:click={deleteAccount}
            >
                Delete Account
            </button> -->
        </div>

        
    </div>
    <div class="flex flex-row space-x-4">
        

        <div class="max-w-md p-6 bg-white rounded shadow mb-4">
            <img
                src="/images/otp.png"
                alt="OTP Verification Image"
                class="mb-4"
            />
            <h2 class="text-xl font-bold mb-4">Step 4: Verify OTP</h2>
            <p class="mb-4">
                In this step, you will be prompted to verify your account
                with an OTP. Enter the OTP in the input field and click the
                "Verify OTP" button.
            </p>
            <!-- <input
                type="text"
                class="border border-gray-300 rounded px-4 py-2 mb-4"
                placeholder="Enter OTP"
            /> -->
            <!-- <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={verifyOTP}
            >
                Verify OTP
            </button> -->
        </div>

        

        <div class="max-w-md p-6 bg-white rounded shadow mb-4">
            <img
                src="/images/deleted.png"
                alt="Account Deletion Image"
                class="mb-4"
            />
            <h2 class="text-xl font-bold mb-4">  Account Deleted</h2>
            <p class="mb-4">
                After successful OTP verification, your account will be deleted,
                 and you will be redirected to home page.
            </p>
            <!-- <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                on:click={deleteAccount}
            >
                Delete Account
            </button> -->
        </div>
        <div class="max-w-md p-6 bg-white rounded shadow mb-4">
            <!-- <img
                src="/images/deleted.png"
                alt="Account Deletion Image"
                class="mb-4"
            /> -->
            <h2 class="text-xl font-bold mb-4">Deleted Details</h2>
            <p class="mb-4">
                This will delete all your details from our database, including your name, email,
                 phone number, associated branch, stream, batch, and any other details associated with us.
            </p>
            <!-- <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                on:click={deleteAccount}
            >
                Delete Account
            </button> -->
        </div>
    </div>
</main>
