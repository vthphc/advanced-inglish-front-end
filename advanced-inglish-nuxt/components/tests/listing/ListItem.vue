<script setup lang="ts">
const props = defineProps({
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
        class="flex flex-col p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
        :class="{ 'bg-gray-100': isActive }"
    >
        <div class="flex items-center gap-4">
            <div class="flex flex-col">
                <h3 class="shrink-0 text-base font-medium text-primary m-0">
                    {{ title }}
                </h3>
                <p v-if="description" class="text-sm text-gray-500 mt-1 m-0">
                    {{ description }}
                </p>
            </div>
        </div>
        <div
            class="flex flex-1 items-center gap-2 sm:mt-2 self-end sm:self-end"
        >
            <slot name="actions">
                <button
                    v-if="showDefaultAction"
                    class="flex-1 cursor-pointer px-3 py-2 text-sm font-medium bg-primary rounded-md text-white hover:bg-hover-bg transition-colors duration-200"
                    @click="$emit('action-click')"
                >
                    {{ actionText }}
                </button>
            </slot>
        </div>
    </li>
</template>
