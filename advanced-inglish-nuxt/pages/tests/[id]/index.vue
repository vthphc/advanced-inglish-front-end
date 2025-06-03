<script setup lang="ts">
import { mainFakeData } from "~/utils/fakeData/tests/testBank/main_fake_data";
import { Button } from "~/components/ui/buttons";
import { reactive } from "vue";
import { z } from "zod";
import { countTestParts } from "~/utils/helper";
import type { GeneratedTest, PartType } from "~/utils/fakeData/tests/types";

const route = useRoute();
const { id } = route.params as { id: string };
const test = mainFakeData.find((item) => item.uid === id);
// Convert the test to match GeneratedTest type with proper type casting
const typedTest = test
    ? ({
          ...test,
          createdAt: new Date(test.createdAt),
          lessonsList: test.lessonsList.map((part) => ({
              ...part,
              type: part.type as PartType, // Explicitly cast to PartType
          })),
      } as GeneratedTest)
    : undefined;

const subItems =
    test?.lessonsList.map((lesson) => `Part ${lesson.partNumber}`) || [];

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
                {{ test?.title || "No test found" }}
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
                        >{{ typedTest ? countTestParts(typedTest) : 0 }} phần
                        thi</span
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
