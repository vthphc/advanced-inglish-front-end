<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/api/useApi";
import type { TakenTest, TakenTestsResponse } from "~/utils/types/test";
import HistoryItem from "~/components/tests/history/HistoryItem.vue";

// State for taken tests
const takenTests = ref<TakenTest[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

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
        takenTests.value = response.takenTests;
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

// Handle action click (view test details)
const handleTestAction = (title: string, id: string) => {
    console.log("Viewing test details:", title, id);
    const router = useRouter();
    router.push(`/account/test-history/${id}`);
};
</script>

<template>
    <div class="">
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
            class="bg-white shadow-md overflow-hidden sm:rounded-lg p-4"
        >
            <ul
                role="list"
                class="divide-y gap-4 divide-gray-200 grid md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4"
            >
                <HistoryItem
                    v-for="test in takenTests"
                    :key="test._id"
                    :test="test"
                    @action-click="handleTestAction"
                />
            </ul>
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
