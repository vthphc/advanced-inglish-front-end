<template>
    <div class="flex flex-col items-center p-4 rounded-lg shadow-md bg-gray-50">
        <div class="text-xl font-semibold mb-4">{{ word }}</div>
        <Button class="rounded-md" @click="$emit('choose', word)">
            Chọn
        </Button>
    </div>
</template>

<script setup lang="ts">
defineProps<{ word: string }>();
defineEmits<{ (e: "choose", word: string): void }>();
import { Button } from "~/components/ui/buttons";
</script>
