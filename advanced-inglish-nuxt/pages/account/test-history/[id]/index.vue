<script setup lang="ts">
import { useApi } from "~/composables/api/useApi";
import { onMounted } from "vue";

const route = useRoute();
const testId = route.params.id;
const api = useApi();

const testData = ref<any>(null);
const error = ref<Error | null>(null);
const pending = ref(true);

onMounted(async () => {
    try {
        testData.value = await api.get(`/auth/taken-test/${testId}`);
    } catch (e) {
        error.value = e as Error;
    } finally {
        pending.value = false;
    }
});
</script>

<template>
    <div class="">
        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error loading test data</div>
        <div v-else>
            <!-- Test data will be displayed here -->
            <pre>{{ testData }}</pre>
        </div>
    </div>
</template>
