<script setup lang="ts">
	import { zoomInPropsFn, fadeInPropsFn } from "@/utils/animation";
	import { motion } from "motion-v";
	import { CircleCheckBig } from "lucide-vue-next";

	definePageMeta({
		title: "Inglish",
		layout: false,
	});

	const introArray = [
		{
			class: "text-3xl sm:text-4xl lg:text-5xl font-semibold text-center ",
			text: "Học tiếng Anh, mở ra cơ hội.",
		},
		{
			class: "text-3xl sm:text-4xl lg:text-5xl font-semibold text-center ",
			text: "Con đường đến kết nối trôi chảy.",
		},
	];

	const featureClass =
		"text-sm sm:text-base text-primary font-semibold text-center flex items-center gap-2 mx-2 sm:mx-4 md:mx-6 lg:mx-8";

	const featureArray = [
		{
			class: featureClass,
			text: "Miễn phí",
		},
		{
			class: featureClass,
			text: "Chủ động",
		},
		{
			class: featureClass,
			text: "Hiệu quả",
		},
		{
			class: featureClass,
			text: "Artificial Intelligence",
		},
	];

	const underlineVariants = {
		rest: {
			width: "0%", // The underline is hidden in the "rest" state
		},
		hovered: {
			width: "100%", // The underline expands fully in the "hovered" state
		},
	};
</script>

<template>
	<div class="flex justify-center items-center h-screen">
		<div class="m-auto flex flex-col items-center">
			<motion.p
				v-bind="fadeInPropsFn()"
				class="font-bold text-center text-xl">
				Welcome to
				<span class="text-primary">Inglish.</span>
			</motion.p>
			<p class="m-auto flex flex-col gap-4 mt-4">
				<motion.span
					v-for="(intro, index) in introArray"
					:key="index"
					:class="intro.class"
					v-bind="fadeInPropsFn(index)"
					>{{ intro.text }}</motion.span
				>
			</p>
			<p class="flex flex-row items-center mt-8">
				<motion.div
					v-for="(feature, index) in featureArray"
					:key="index"
					:class="feature.class"
					v-bind="zoomInPropsFn(index)">
					<CircleCheckBig
						height="1.5em"
						width="1.5em" />
					{{ feature.text }}</motion.div
				>
			</p>
			<ClientOnly>
				<div class="flex flex-col">
					<NuxtLink to="/register">
						<motion.button
							class="cursor-pointer w-fit m-auto py-2 px-4 bg-primary text-white hover:bg-white hover:text-primary border-2 hover:border-primary rounded-2xl mt-8"
							v-bind="fadeInPropsFn()"
							>BẮT ĐẦU
						</motion.button>
					</NuxtLink>
				</div>
				<motion.div v-bind="fadeInPropsFn(5)">
					<motion.div
						class="relative inline-block"
						while-hover="hovered"
						initial="rest"
						animate="rest">
						<p
							className="text-md font-medium mt-4 font-roboto text-gray-500 tracking-tighter cursor-pointer">
							<NuxtLink to="/login"
								><span>
									Đã có
									tài
									khoản?
								</span></NuxtLink
							>
						</p>
						<motion.div
							class="absolute bottom-0 left-0 h-[2px] bg-gray-500"
							:variants="
								underlineVariants
							"
							:transition="{
								duration: 0.3,
							}"
					/></motion.div>
				</motion.div>
			</ClientOnly>
		</div>
	</div>
</template>
