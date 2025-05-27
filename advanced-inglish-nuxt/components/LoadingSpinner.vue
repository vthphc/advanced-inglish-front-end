<template>
    <div class="spinner" :style="spinnerStyle"></div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
    /**
     * The size of the spinner (width and height).
     * Can be a number (in pixels) or a CSS string (e.g., '50px', '2em').
     */
    size: {
        type: [String, Number],
        default: 40, // default to 40px
    },
    /**
     * The color of the spinning part of the spinner.
     * Can be any valid CSS color string.
     */
    color: {
        type: String,
        default: "var(--color-primary)", // Using theme primary color
    },
    /**
     * The color of the base (background) part of the spinner circle.
     * Can be any valid CSS color string.
     */
    baseColor: {
        type: String,
        default: "var(--ui-bg-muted)", // Using theme muted background color
    },
    /**
     * The thickness of the spinner border.
     * Can be a number (in pixels) or a CSS string (e.g., '4px', '0.2em').
     */
    borderWidth: {
        type: [String, Number],
        default: 4, // default to 4px
    },
    /**
     * The duration of one full rotation animation cycle in seconds.
     */
    duration: {
        type: [String, Number],
        default: 1, // default to 1 second
    },
});

// Computed properties to format props into CSS variables
const sizePx = computed(() =>
    typeof props.size === "number" ? `${props.size}px` : props.size
);
const borderWidthPx = computed(() =>
    typeof props.borderWidth === "number"
        ? `${props.borderWidth}px`
        : props.borderWidth
);
const durationS = computed(() =>
    typeof props.duration === "number" ? `${props.duration}s` : props.duration
);

// Computed style object to apply CSS variables dynamically
const spinnerStyle = computed(() => ({
    "--spinner-size": sizePx.value,
    "--spinner-color": props.color,
    "--spinner-base-color": props.baseColor,
    "--spinner-border-width": borderWidthPx.value,
    "--spinner-duration": durationS.value,
}));
</script>

<style scoped>
.spinner {
    /* Use CSS variables for dynamic styling */
    width: var(--spinner-size);
    height: var(--spinner-size);
    border: var(--spinner-border-width) solid var(--spinner-base-color);
    border-top: var(--spinner-border-width) solid var(--spinner-color); /* This part spins */
    border-radius: 50%; /* Makes it round */
    box-sizing: border-box; /* Include padding and border in element's total width and height */
    animation: spin var(--spinner-duration) linear infinite; /* Apply animation */
}

/* Define the spinning animation */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
