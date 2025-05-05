<script setup lang="ts">
import { fakeFlashcards } from "~/utils/fakeData/flashcards/flashcardsBank/fake_flashcards";
import FlashcardItem from "~/components/flashcards/listing/FlashcardItem.vue";
</script>

<template>
    <div class="container mx-auto p-4 md:p-6 lg:p-8">
        <h1
            class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary"
        >
            My Flashcards
        </h1>

        <div
            v-if="fakeFlashcards && fakeFlashcards.length > 0"
            class="bg-white shadow-md overflow-hidden sm:rounded-lg p-4"
        >
            <ul
                role="list"
                class="divide-y space-y-4 divide-gray-200 md:grid md:grid-cols-4 md:gap-x-4"
            >
                <FlashcardItem
                    v-for="(flashcard, index) in fakeFlashcards"
                    :key="index"
                    :="flashcard"
                />
            </ul>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
