<script setup lang="ts">
import { mainFakeData } from "~/utils/fakeData/tests/testBank/main_fake_data";
import { Button } from "~/components/ui/buttons";
import { reactive, onMounted } from "vue";
import { z } from "zod";
import { countTestParts } from "~/utils/helpers";
import { useApi } from "~/composables/api/useApi";
import type { GeneratedTest, PartType } from "~/utils/fakeData/tests/types";
import type { PopulatedTest } from "~/utils/types/test";
import { useTestStore } from "~/stores/test";

const route = useRoute();
const { id } = route.params as { id: string };
const testStore = useTestStore();
const subItems = ref<string[]>([]);
const api = useApi();

onMounted(async () => {
    try {
        const response = await api.get<PopulatedTest>(`/tests/${id}`);
        testStore.setCurrentTest(response);
        console.log("Test data:", response);
        subItems.value =
            testStore.currentTest?.lessonList.map(
                (lesson) => `${lesson.title}`
            ) || [];
    } catch (error) {
        console.error("Error fetching test:", error);
    }
});

const formSchema = z.object({
    selectedParts: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một phần"),
});

const formState = reactive({
    selectedParts: [],
});

async function onSubmit() {
    try {
        const validatedData = formSchema.parse(formState);
        const partsParam = validatedData.selectedParts.join(",");
        await navigateTo(
            `/tests/${id}/parts/${encodeURIComponent(partsParam)}`
        );
    } catch (error) {
        console.error("Validation error:", error);
    }
}
</script>

<template>
    <div class="container mx-auto">
        <div class="flex flex-col gap-y-4">
            <h1 class="text-3xl text-primary font-bold">
                {{ testStore.currentTest?.title || "No test found" }}
            </h1>
            <div class="flex flex-row gap-x-4">
                <button class="bg-gray-200 rounded-md cursor-pointer">
                    Thông tin đề thi
                </button>
                <button class="bg-gray-200 rounded-md cursor-pointer">
                    Đáp án
                </button>
            </div>
            <div class="flex flex-col">
                <p class="flex flex-row gap-x-2">
                    <span>Thời gian làm bài: 120 phút</span>
                    |
                    <span
                        >{{
                            testStore.currentTest
                                ? countTestParts(
                                      testStore.currentTest.lessonList
                                  )
                                : 0
                        }}
                        phần thi</span
                    >
                    |
                    <span>2395 bình luận</span>
                </p>
            </div>
            <UForm :state="formState" @submit="onSubmit">
                <UCheckboxGroup
                    v-model="formState.selectedParts"
                    class="my-4"
                    :items="subItems"
                    color="primary"
                />
                <Button type="submit">Bắt đầu </Button>
            </UForm>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
