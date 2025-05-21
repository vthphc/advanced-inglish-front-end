<script setup lang="ts">
	import type { HTMLAttributes } from "vue";
	import { Primitive, type PrimitiveProps } from "reka-ui";
	import { cn } from "~/utils/merger";
	import { type ButtonVariants, buttonVariants } from "./index";
	import { useRouter } from "vue-router";

	interface Props extends PrimitiveProps {
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		class?: HTMLAttributes["class"];
		to?: string;
	}

	const props = withDefaults(defineProps<Props>(), {
		as: "button",
	});

	const router = useRouter();

	const handleClick = (event: MouseEvent) => {
		if (props.to) {
			event.preventDefault();
			router.push(props.to);
		}
	};
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ variant, size }), props.class)"
		@click="handleClick">
		<slot />
	</Primitive>
</template>
