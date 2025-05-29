<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils/merger";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <p :class="cn('text-2xs sm:text-xs text-muted-foreground', props.class)">
        <slot />
    </p>
</template>
