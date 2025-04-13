<template>
	<div
		class="flex items-center w-full"
		:class="[colorClass, thicknessClass]">
		<!-- Line before text -->
		<div class="flex-1 border-t"></div>

		<!-- Label (optional) -->
		<span
			v-if="label"
			class="shrink-0 px-4 font-medium"
			:class="labelSizeClass">
			<slot>{{ label }}</slot>
		</span>

		<!-- Line after text -->
		<div class="flex-1 border-t"></div>
	</div>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: "",
			},
			color: {
				type: String,
				default: "neutral-200", // Tailwind color
			},
			thickness: {
				type: String,
				default: "1px",
			},
			labelSize: {
				type: String,
				default: "text-base",
			},
		},
		computed: {
			colorClass() {
				return `border-${this.color}`;
			},
			thicknessClass() {
				return `border-[${this.thickness}]`;
			},
			labelSizeClass() {
				return this.labelSize;
			},
		},
	};
</script>
