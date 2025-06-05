<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/api/useApi";
import type { TakenTest, TakenTestsResponse } from "~/utils/types/test";
import HistoryItem from "~/components/tests/history/HistoryItem.vue";
import { ChevronLeft } from "lucide-vue-next";
import { Button } from "~/components/ui/buttons";

definePageMeta({
    title: "Test History",
});

// State for taken tests
const takenTests = ref<TakenTest[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Table headers configuration
const tableHeaders = [
    { key: "date", label: "Date" },
    { key: "test", label: "Test" },
    { key: "score", label: "Score" },
    { key: "questions", label: "Questions" },
    { key: "action", label: "Action" },
];

// // Optional: Define page meta if needed
// definePageMeta({
//     middleware: ["auth"], // This page requires authentication
// });

// Fetch taken tests from API
const fetchTakenTests = async () => {
    try {
        const api = useApi();
        const response = await api.get<TakenTestsResponse>(
            "/auth/taken-tests/"
        );
        // Sort tests by date in descending order (newest first)
        takenTests.value = response.takenTests.sort(
            (a, b) =>
                new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
        );
        console.log(response.takenTests);
    } catch (err: unknown) {
        error.value =
            err instanceof Error ? err.message : "Failed to fetch test history";
        console.error("Error fetching test history:", err);
    } finally {
        isLoading.value = false;
    }
};

// Fetch tests when component mounts
onMounted(() => {
    fetchTakenTests();
});

const router = useRouter();

// Handle action click (view test details)
const handleTestAction = (title: string, id: string) => {
    router.push(`/account/test-history/${id}`);
};

const handleBackClick = () => {
    router.push("/account/");
};
</script>

<template>
    <div class="">
        <Button @click="handleBackClick" class="mb-4" size="icon"
            ><ChevronLeft
        /></Button>
        <!-- Page Title -->
        <h1
            class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary"
        >
            Test History
        </h1>

        <!-- Loading state -->
        <div v-if="isLoading" class="text-center py-10">
            <p class="text-gray-500">Loading test history...</p>
        </div>

        <!-- Error state -->
        <div
            v-else-if="error"
            class="text-center text-red-500 mt-10 py-10 bg-red-50 rounded-lg"
        >
            <p class="text-lg">{{ error }}</p>
        </div>

        <!-- Tests list -->
        <div
            v-else-if="takenTests && takenTests.length > 0"
            class="bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                v-for="header in tableHeaders"
                                :key="header.key"
                                scope="col"
                                class="px-3 sm:px-6 py-2 sm:py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {{ header.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr
                            v-for="test in takenTests"
                            :key="test.test._id"
                            class="hover:bg-gray-50"
                        >
                            <td
                                class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center"
                            >
                                {{
                                    new Date(test.takenAt).toLocaleDateString(
                                        "en-GB",
                                        {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )
                                }}
                            </td>
                            <td
                                class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center"
                            >
                                <div
                                    class="text-xs sm:text-sm font-medium text-gray-900"
                                >
                                    {{ test.test.topic }}
                                </div>
                            </td>
                            <td
                                class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center"
                            >
                                <span
                                    :class="[
                                        'text-xs sm:text-sm font-bold',
                                        test.score >= 70
                                            ? 'text-green-600'
                                            : test.score >= 50
                                            ? 'text-yellow-600'
                                            : 'text-red-600',
                                    ]"
                                >
                                    {{ test.score }}
                                </span>
                            </td>
                            <td
                                class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center"
                            >
                                {{
                                    test.lessons.reduce(
                                        (total, lesson) =>
                                            total + lesson.questions.length,
                                        0
                                    )
                                }}
                            </td>
                            <td
                                class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center"
                            >
                                <Button
                                    @click="
                                        handleTestAction(
                                            test.test.topic,
                                            test.test._id
                                        )
                                    "
                                    class="text-xs sm:text-sm"
                                    variant="ghost"
                                >
                                    Xem chi tiết
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Empty state -->
        <div
            v-else
            class="text-center text-gray-500 mt-10 py-10 bg-gray-50 rounded-lg"
        >
            <p class="text-lg">No test history found.</p>
            <p class="text-sm mt-2">
                Take some tests to see your history here.
            </p>
        </div>
    </div>
</template>
