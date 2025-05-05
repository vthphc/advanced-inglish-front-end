<script setup lang="ts">
import { mainFakeData } from "~/utils/fakeData/tests/testBank/main_fake_data";
const route = useRoute();
const { id } = route.params as { id: string };
const test = mainFakeData.find((item) => item.uid === id);
const subItems = [
    "Part 1",
    "Part 2",
    "Part 3",
    "Part 4",
    "Part 5",
    "Part 6",
    "Part 7",
];
</script>

<template>
    <div class="">
        <span>Skibidi test id: {{ id }}</span>
        <div>
            <h1 class="text-3xl font-bold">
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
                    <span>Thời gian làm bài: 120 phút</span> |
                    <span>7 phần thi</span> |
                    <span>2395 bình luận</span>
                </p>
                <p class="flex flex-row">
                    <span>1823424 người đã luyện tập đề thi này</span>
                </p>
            </div>
            <URadioGroup :items="subItems" />
        </div>
    </div>
</template>
