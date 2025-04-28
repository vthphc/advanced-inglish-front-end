<script setup lang="ts">
// Import the fake data array
import { mainFakeData } from "~/utils/fakeData/tests/testBank/main_fake_data";
import ListItem from "~/components/tests/listing/ListItem.vue";

// Optional: Define page meta if needed
definePageMeta({
    // middleware: ['auth'] // Add if this page requires authentication
});

// Helper function to format the date for description
const formatDate = (date: Date | string): string => {
    if (!date) return "No date";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Handle action click (example)
const handleTestAction = (title: string, uid: string) => {
    console.log("Action clicked for test:", title, uid);
    // Navigate to the specific test page, e.g., using router.push(`/tests/${test.uid}`)
    // Example navigation (uncomment and adjust as needed):
    // const router = useRouter();
    // router.push(`/tests/${test.uid}`);
};
</script>

<template>
    <div class="container mx-auto p-4 md:p-6 lg:p-8">
        <!-- Added responsive padding -->
        <h1
            class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary"
        >
            Available Tests
        </h1>

        <div
            v-if="mainFakeData && mainFakeData.length > 0"
            class="bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
            <!-- Added shadow, rounded corners -->
            <ul
                role="list"
                class="divide-y space-y-4 divide-gray-200 md:grid md:grid-cols-4 md:gap-x-4"
            >
                <!-- Standard list styling -->
                <!-- Loop through the fake data -->
                <ListItem
                    v-for="test in mainFakeData"
                    :key="test.uid"
                    :title="test.title"
                    :description="`Created on: ${formatDate(test.createdAt)}`"
                    :show-default-action="true"
                    action-text="Start Test"
                    @action-click="handleTestAction(test.title, test.uid)"
                >
                    <!-- You can add custom actions via the slot if needed -->
                    <!-- <template #actions>
                        <UButton size="sm" variant="outline">Details</UButton>
                    </template> -->
                </ListItem>
            </ul>
        </div>
        <div
            v-else
            class="text-center text-gray-500 mt-10 py-10 bg-gray-50 rounded-lg"
        >
            <!-- Styled the 'no data' message -->
            <p class="text-lg">No tests available at the moment.</p>
            <p class="text-sm mt-2">Check back later or contact support.</p>
        </div>
    </div>
</template>

<style scoped>
/* Keep container max-width if desired, or manage via Tailwind */
.container {
    max-width: 1200px; /* Example max width */
}

/* Add any other specific non-Tailwind styles here */
</style>
