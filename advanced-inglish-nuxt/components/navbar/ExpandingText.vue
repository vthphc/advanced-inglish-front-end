<template>
	<div
		tabindex="0"
		role="button"
		:aria-label="isHovered ? 'Displays Inglish' : 'Displays I'"
		class="inline-block overflow-hidden whitespace-nowrap select-none cursor-pointer "
		:style="{
			width: currentWidth,
			opacity: currentOpacity,
			transitionProperty: 'width, opacity, box-shadow',
			transitionDuration: '500ms, 400ms, 300ms', // width, opacity, shadow
			transitionTimingFunction:
				'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth ease-out
			boxShadow: isHovered
				? '0 0 25px 5px rgba(56, 189, 248, 0.4)'
				: '0 0 10px 0px rgba(56, 189, 248, 0.2)',
		}"
		@mouseenter="handleInteractionStart"
		@mouseleave="handleInteractionEnd"
		@focus="handleInteractionStart"
		@blur="handleInteractionEnd">
		<span
			ref="textSpanRef"
			class="block font-serif text-base font-extrabold text-primary hover:text-highlight transition-colors duration-300 px-2 py-1">
			Inglish
		</span>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue";

	const isHovered = ref(false);
	const measuredWidths = ref<{ i: number; inglish: number } | null>(null);
	// Initialize currentWidth to '0px' and opacity to 0 for initial fade-in effect once measured.
	const currentWidth = ref<string>("0px");
	const currentOpacity = ref<number>(0);

	const textSpanRef = ref<HTMLSpanElement | null>(null);

	onMounted(() => {
		if (textSpanRef.value) {
			const tempSpan = document.createElement("span");
			// Copy classes that define the text appearance for accurate measurement
			tempSpan.className = textSpanRef.value.className;
			tempSpan.style.position = "absolute";
			tempSpan.style.visibility = "hidden";
			tempSpan.style.left = "-9999px";
			tempSpan.style.top = "-9999px";
			tempSpan.style.whiteSpace = "nowrap"; // Prevent wrapping during measurement

			document.body.appendChild(tempSpan);

			tempSpan.textContent = "I";
			const widthI = tempSpan.offsetWidth;

			tempSpan.textContent = "Inglish";
			const widthInglish = tempSpan.offsetWidth;

			document.body.removeChild(tempSpan);

			measuredWidths.value = {
				i: widthI,
				inglish: widthInglish,
			};
			currentWidth.value = `${widthI}px`; // Set initial width to "I"
			currentOpacity.value = 1; // Fade in
		}
	});

	const handleInteractionStart = () => {
		isHovered.value = true;
		if (measuredWidths.value) {
			currentWidth.value = `${measuredWidths.value.inglish}px`;
		}
	};

	const handleInteractionEnd = () => {
		isHovered.value = false;
		if (measuredWidths.value) {
			currentWidth.value = `${measuredWidths.value.i}px`;
		}
	};

	// Optional: Could make dynamic styles computed properties for better organization if they were more complex.
	// For example, the boxShadow could be:
	// const dynamicBoxShadow = computed(() => {
	//   return isHovered.value ? '0 0 25px 5px rgba(56, 189, 248, 0.4)' : '0 0 10px 0px rgba(56, 189, 248, 0.2)';
	// });
	// Then in :style, use `boxShadow: dynamicBoxShadow`
</script>

<style scoped>
	/* If you had component-specific styles that are not covered by utility classes, they would go here.
   The utility classes (Tailwind) will work as is, provided Tailwind is set up in your Vue project. */
</style>
