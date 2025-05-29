<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils/merger";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div
        :class="
            cn(
                'rounded-lg bg-card text-card-foreground shadow-sm hover:bg-gray-100 transition-colors duration-200',
                props.class
            )
        "
    >
        <slot />
    </div>
</template>
