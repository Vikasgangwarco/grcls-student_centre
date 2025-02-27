<script>
    export let markings = [];

    function setType() {
        setTimeout(() => window.MathJax.typeset(), 1000);
        return "";
    }

    $: {
        if (markings) {
            setType();
        }
    }
</script>

<!-- component -->
<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div
        class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
    >
        <table class="min-w-full">
            <thead>
                <tr>
                    
                    <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >S.No</th
                    >
                    <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >Question</th
                    >
                    <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >Subject</th
                    >
                    <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >Visited</th
                    >
                    <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >Attempted</th
                    >
                    <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >Answer Marked</th
                    >
                    <!-- <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                        >Time Allotted</th
                    > -->
                    <!-- <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Correctly Marked</th> -->
                    <th class="px-6 py-3 border-b-2 border-gray-300" />
                </tr>
            </thead>
            <tbody class="bg-white">
                {#each markings as marking,index}
                    <tr>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-sm leading-5"
                            >{index+1}</td
                        >
                        <td class="px-6 py-4 whitespace-no-wrap border-b">
                            <div
                                class="text-sm leading-5 text-blue-900 overflow-scroll w-60"
                                
                            >
                            <!-- text-sm leading-5 text-blue-900 overflow-scroll max-w-xl -->
                                {@html atob(marking.question.question.question)}
                            </div>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-sm leading-5"
                            >{marking.subject}</td
                        >
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-sm leading-5"
                            >{marking.visited ? "Yes" : "No"}</td
                        >
                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-sm leading-5"
                            >{marking.attempted ? "Yes" : "No"}</td
                        >

                        <td
                            class="px-6 py-4 whitespace-no-wrap border-b {marking.attempted
                                ? marking.correctly_marked
                                    ? 'bg-green-400'
                                    : 'bg-red-400'
                                : ''} text-blue-900 text-sm leading-5"
                            >{marking.answer_value}</td
                        >
                        <!-- <td
                            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-sm leading-5"
                            >{marking.time_allotted} Seconds</td
                        > -->
                        <!-- <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900  text-sm leading-5">{marking.correctly_marked}</td> -->
                        <td
                            class="px-6 py-4 whitespace-no-wrap text-right border-b text-sm leading-5"
                        >
                            <a
                                href="/dpp_questions/simple/{marking.question
                                    .question._id}"
                                class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                >View</a
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <div
            class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans"
        >
            <div />
        </div>
    </div>
</div>
