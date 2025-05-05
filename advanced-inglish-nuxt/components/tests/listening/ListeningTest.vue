<script setup lang="ts">
import { URadioGroup } from "#components";
import { part1Static } from "~/utils/fakeData/tests/testBank/part1/part1_static";
</script>

<template>
    <div class="container mx-auto p-4 md:p-6 lg:p-8">
        <h1
            class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary"
        >
            Listening Test
        </h1>
        <ul
            class="border-b-2 border-gray-200 p-4"
            v-for="(item, index) in part1Static.questions"
            :key="index"
        >
            <!-- Conditional Audio Player -->
            <audio
                v-if="item.audioURL"
                controls
                :src="item.audioURL"
                class="mb-2"
            >
                Your browser does not support the audio element.
            </audio>

            <!-- Conditional Image Display -->
            <img
                v-if="item.imageURL"
                :src="item.imageURL"
                alt="Question Image"
                class="mb-2 max-w-full h-auto rounded"
            />
            <div class="flex flex-row gap-x-4 mb-4">
                <h2
                    class="flex-grow-0 self-start rounded-full bg-primary text-white font-bold px-2"
                >
                    {{ index + 1 }}
                </h2>
                <div class="flex-grow-0 self-center">
                    <p>{{ item.question }}</p>
                    <URadioGroup
                        class="w-96 mt-4"
                        variant="card"
                        :items="item.options"
                    ></URadioGroup>
                    <!--
                            @update:modelValue="handleSelect"
                            -->
                </div>
            </div>
        </ul>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
