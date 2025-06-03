<script setup lang="ts">
// Import the fake data array
import { mainFakeData } from "~/utils/fakeData/tests/testBank/main_fake_data";
import ListItem from "~/components/tests/listing/ListItem.vue";
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/api/useApi";
import type { Test } from "~/utils/types/test";

// State for tests with proper typing
const tests = ref<Test[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Optional: Define page meta if needed
definePageMeta({
    // middleware: ['auth'] // Add if this page requires authentication
});

// Fetch tests from API
const fetchTests = async () => {
    try {
        const api = useApi();
        const response = await api.get<Test[]>("/tests");
        tests.value = response;
    } catch (err: unknown) {
        error.value =
            err instanceof Error ? err.message : "Failed to fetch tests";
        console.error("Error fetching tests:", err);
    } finally {
        isLoading.value = false;
    }
};

// Fetch tests when component mounts
onMounted(() => {
    fetchTests();
});

// Helper function to format the date for description
const formatDate = (date: Date | string): string => {
    if (!date) return "Không có ngày";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Handle action click (example)
const handleTestAction = (title: string, id: string) => {
    console.log("Action clicked for test:", title, id);
    const router = useRouter();
    router.push(`/tests/${id}`);
};
</script>

<template>
    <div class="">
        <!-- Added responsive padding -->
        <h1
            class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary"
        >
            Danh sách bài kiểm tra
        </h1>

        <!-- Loading state -->
        <div v-if="isLoading" class="text-center py-10">
            <p class="text-gray-500">Đang tải...</p>
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
            v-else-if="tests && tests.length > 0"
            class="bg-white shadow-md overflow-hidden sm:rounded-lg p-4"
        >
            <ul
                role="list"
                class="divide-y space-y-4 divide-gray-200 md:grid md:grid-cols-4 md:gap-x-4"
            >
                <ListItem
                    v-for="test in tests"
                    :key="test._id"
                    :title="test.title"
                    :topic="test.topic"
                    :description="`Được tạo vào: ${formatDate(test.createdAt)}`"
                    :show-default-action="true"
                    action-text="Chi tiết"
                    @action-click="handleTestAction(test.title, test._id)"
                />
            </ul>
        </div>
        <div
            v-else
            class="text-center text-gray-500 mt-10 py-10 bg-gray-50 rounded-lg"
        >
            <p class="text-lg">Hiện không có bài kiểm tra nào.</p>
            <p class="text-sm mt-2">
                Vui lòng quay lại sau hoặc liên hệ hỗ trợ.
            </p>
        </div>
    </div>
</template>
