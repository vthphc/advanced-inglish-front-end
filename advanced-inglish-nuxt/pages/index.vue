<script setup lang="ts">
	import { zoomInPropsFn, fadeInPropsFn } from "@/utils/animation";
	import { motion } from "motion-v";
	import { CircleCheckBig } from "lucide-vue-next";
	// Import the Pinia store instead of the composable
	import { useAuthStore } from "~/stores/auth";
	import { storeToRefs } from "pinia"; // Import storeToRefs for reactive access

	definePageMeta({
		title: "Inglish",
		layout: "default",
	});

	// Get the auth store instance
	const authStore = useAuthStore();

	// Use storeToRefs to get reactive refs for state properties
	// This keeps reactivity when destructuring from the store
	const { isAuthenticated, user } = storeToRefs(authStore); // You can still log values, but access them via the refs from storeToRefs
	console.log("isAuthenticated", isAuthenticated.value);
	console.log("user from pages/index.vue: ", user);

	// Access the actual user data value and print as JSON
	console.log("User ID:", user.value?._id);
	console.log(
		"User object as JSON:",
		JSON.stringify(user.value, null, 2)
	);

	// Access the actual user data value and print as JSON
	console.log("User ID:", user.value?._id);
	console.log(
		"User object as JSON:",
		JSON.stringify(user.value, null, 2)
	);

	// --- Rest of your script setup remains the same ---
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
	<!-- Conditional rendering based on authentication status -->
	<!-- Access state directly via the refs from storeToRefs -->
	<div v-if="isAuthenticated" class="flex flex-col">
		<!-- Placeholder for authenticated users -->
		<div
			class="flex flex-col items-center justify-center min-h-screen p-6">
			<div
				class="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
				<h1
					class="text-3xl font-bold text-primary mb-6">
					Welcome to Inglish!
				</h1>

				<div class="mb-6">
					<!-- Access user properties via the user ref -->
					<img
						:src="
							user?.profile?.avatar ||
							'/default-avatar.png'
						"
						:alt="user?.profile?.name"
						class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary" />
					<h2
						class="text-2xl font-semibold text-center">
						{{ user?.profile?.name }}
					</h2>
					<p class="text-gray-600 text-center">
						{{ user?.email }}
					</p>
					<p
						class="text-sm text-gray-500 text-center mt-1">
						ID: {{ user?._id }}
					</p>
				</div>

				<div class="bg-gray-50 p-4 rounded-lg mb-6">
					<h3
						class="font-medium text-gray-800 mb-2">
						Your Progress
					</h3>
					<div
						class="w-full bg-gray-200 rounded-full h-2.5">
						<div
							class="bg-primary h-2.5 rounded-full"
							style="width: 45%" />
					</div>
					<p class="text-sm text-gray-600 mt-2">
						45% complete
					</p>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<UButton class="bg-primary text-white"
						>Continue Learning</UButton
					>
					<UButton
						variant="outline"
						class="border-primary text-primary"
						>Practice</UButton
					>
					<UButton
						variant="outline"
						class="border-primary text-primary"
						>Vocabulary</UButton
					>
					<UButton
						variant="outline"
						class="border-primary text-primary"
						>Settings</UButton
					>
				</div>
			</div>
		</div>
	</div>

	<!-- Original landing page for unauthenticated users -->
	<div v-else class="flex justify-center items-center h-screen">
		<!-- Rest of the template remains the same -->
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
							class=" w-fit m-auto py-2 px-4 bg-primary text-white hover:bg-white hover:text-primary border-2 hover:border-primary rounded-2xl mt-8"
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
							className="text-md font-medium mt-4 font-roboto text-gray-500 tracking-tighter ">
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
