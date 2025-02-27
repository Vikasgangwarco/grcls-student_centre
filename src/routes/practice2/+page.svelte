<script>
    let a = 2;
</script>

<main>
    <div class="mt-0 p-2">
        <div class="mt-0 p-4 border-2 rounded-md bg-green-600">
            <p class=" text-white">Test Result</p>
        </div>

        <!-- <div class="p-4">
            <p class="text-green-600 text-2xl">JEE MAIN TEST</p>
            <p class="text-green-600">Duration: 180 Minutes</p>
            <p class="text-green-600">Types: general</p>
        </div> -->

        <!-- <div class="flex justify-center">
            <button
                class="rounded-md bg-green-600 text-white w-[620px] h-[40px]"
                >Start</button
            >
        </div> -->

        <div class="p-4 flex justify-center mt-6 my-3">
            <div class=" ">
                <div class=" ">
                    <p class="text-green-600 text-2xl">Questions Analysis</p>
                    <div class="flex flex-row">
                        <div class="flex flex-col mx-10">
                            <p class="text-gray-500 mt-2">Answered</p>
                            <p class="text-gray-500 mt-2">8</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-gray-500 mt-2">Not Answered</p>
                            <p class="text-gray-500 mt-2">172</p>
                        </div>
                        <div class="flex flex-col mx-10">
                            <p class="text-gray-500 mt-2">Not Visited</p>
                            <p class="text-gray-500 mt-2">8</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row">
                    <div class="mt-14 flex flex-row">
                        <div class="border-[1px] p-4 border-green-600">
                            <p class="text-green-600 text-2xl">Marks</p>
                            <p class="text-green-600 text-2xl">-1/360</p>
                        </div>
                    </div>

                    <div class="mt-14 flex flex-row ml-4">
                        <div class="border-[1px] p-4 border-green-600">
                            <p class="text-green-600 text-2xl">Percentage</p>
                            <p class="text-green-600 text-2xl">-1/360</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class=" p-4 border-green-600 mt-4">
                        <p class="text-green-600 text-2xl">
                            View Questions and Solutions
                        </p>
                    </div>
                    <div class=" p-4 border-gray-400 mt-4 border-[1px]">
                        <p
                            class="text-white rounded-sm mb-2 p-2 text-2xl bg-blue-600"
                        >
                            Physics
                        </p>
                        <div
                            id="main"
                            class="grid grid-cols-6 gap-1 justify-evenly"
                        >
                            <a href="/practice1"
                                ><div
                                    class="bg-gray-400 w-8 h-8 rounded-full p-1"
                                >
                                    1
                                </div>
                            </a>
                            <div>
                                {#if (a == 1)}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-blue-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {:else if (a == 2)}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-red-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {:else}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-gray-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {/if}
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>

                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                        </div>
                    </div>
                    <div class=" p-4 border-gray-400 mt-4 border-[1px]">
                        <p
                            class="text-white rounded-sm mb-2 p-2 text-2xl bg-green-600"
                        >
                            Chemistry
                        </p>
                        <div
                            id="main"
                            class="grid grid-cols-6 gap-1 justify-evenly"
                        >
                            <a href="/practice1"
                                ><div
                                    class="bg-gray-400 w-8 h-8 rounded-full p-1"
                                >
                                    1
                                </div>
                            </a>
                            <div>
                                {#if (a = 1)}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-blue-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {:else if (a = 2)}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-red-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {:else}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-gray-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {/if}
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>

                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                        </div>
                    </div>
                    <div class=" p-4 border-gray-400 mt-4 border-[1px]">
                        <p
                            class="text-white rounded-sm mb-2 p-2 text-2xl bg-red-500"
                        >
                            Mathematics
                        </p>
                        <div
                            id="main"
                            class="grid grid-cols-6 gap-1 justify-evenly"
                        >
                            <a href="/practice1"
                                ><div
                                    class="bg-gray-400 w-8 h-8 rounded-full p-1"
                                >
                                    1
                                </div>
                            </a>
                            <div>
                                {#if (a = 1)}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-blue-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {:else if (a = 2)}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-red-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {:else}
                                    <a href="/practice1"
                                        ><div
                                            class="bg-gray-400 w-8 h-8 rounded-full p-1"
                                        >
                                            12
                                        </div>
                                    </a>
                                {/if}
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>

                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                1
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                2
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                3
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                4
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                5
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                6
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                            <div class="bg-gray-400 w-8 h-8 rounded-full p-1">
                                7
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</main>
