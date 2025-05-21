<script setup lang="ts">
	import DialogDemo from "~/components/DialogDemo.vue";
	import { useAuthStore } from "~/stores/auth";

	definePageMeta({
		title: "Inglish - Verify Email",
		layout: "auth",
	});

	useHead({
		title: "Verify Email",
	});

	const authStore = useAuthStore();
	const email = ref("");

	// Get email from query parameters or auth store
	onMounted(() => {
		const route = useRoute();
		if (route.query.email) {
			email.value = route.query.email as string;
		} else if (authStore.user?.email) {
			email.value = authStore.user.email;
		}
	});

</script>

<template>
	<div>
		<div
			class="flex flex-col items-center space-y-6 max-w-lg mx-auto">
			<h1 class="text-2xl font-bold">Dialog demo page</h1>

			<p
				class="text-sm text-gray-600 dark:text-gray-400 text-center">
				Please check your email inbox and click the
				verification link to verify your account. If you
				don't see the email, check your spam folder.
			</p>

			<div class="flex justify-center mt-4">
				<DialogDemo />
			</div>
		</div>
	</div>
</template>
