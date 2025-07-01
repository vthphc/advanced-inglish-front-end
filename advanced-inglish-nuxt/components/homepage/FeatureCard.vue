<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{ icon: any; title: string; description: string }>();
</script>

<template>
    <div
        class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
    >
        <div class="bg-primary text-white inline-block p-4 rounded-full mb-6">
            <component :is="props.icon" class="w-8 h-8" />
        </div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">
            {{ props.title }}
        </h3>
        <p class="text-slate-600 leading-relaxed">{{ props.description }}</p>
    </div>
</template>
