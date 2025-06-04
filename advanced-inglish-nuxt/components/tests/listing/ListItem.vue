<script setup lang="ts">
import { Button } from "~/components/ui/buttons/";
const props = defineProps({
    topic: { type: String, required: true },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    showDefaultAction: {
        type: Boolean,
        default: false,
    },
    actionText: {
        type: String,
        default: "View",
    },
});
defineEmits(["action-click"]);
</script>

<template>
    <li
        class="flex flex-col p-4 m-0 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
        :class="{ 'bg-gray-100': isActive }"
    >
        <div class="flex items-center">
            <div class="flex flex-col">
                <h3 class="text-lg shrink-0 font-bold text-primary">
                    {{ topic }}
                </h3>
                <h3 class="shrink-0 text-base font-medium text-primary">
                    {{ title }}
                </h3>
                <p v-if="description" class="text-sm text-gray-500">
                    {{ description }}
                </p>
            </div>
        </div>
        <div class="flex items-center sm:mt-2 self-end sm:self-end">
            <slot name="actions">
                <Button v-if="showDefaultAction" @click="$emit('action-click')">
                    {{ actionText }}
                </Button>
            </slot>
        </div>
    </li>
</template>
