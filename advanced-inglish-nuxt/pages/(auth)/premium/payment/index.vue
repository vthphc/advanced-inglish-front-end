<script setup lang="ts">
	import { onMounted } from "vue";
	import { useAuthStore } from "~/stores/auth";
	import { useApi } from "~/composables/api/useApi";

	interface CheckoutResponse {
		url: string;
	}

	const authStore = useAuthStore();
	const api = useApi();

	onMounted(async () => {
		try {
			if (!authStore.user?._id) {
				throw new Error("User not authenticated");
			}

			const response = await api.post<CheckoutResponse>(
				"/payments/create-checkout-session",
				{
					userId: authStore.user._id,
				}
			);

			if (response?.url) {
				window.location.href = response.url;
			} else {
				throw new Error("No payment URL received");
			}
		} catch (error) {
			console.error(
				"Payment session creation failed:",
				error
			);
			// You might want to show an error message to the user here
		}
	});
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-50">
		<div class="text-center p-8">
			<div
				class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
			<h1 class="text-2xl font-semibold text-gray-800 mb-4">
				Đang chuyển hướng về trang thanh toán
			</h1>
			<p class="text-gray-600">
				Xin hãy đợi khi chúng tôi chuyển hướng bạn về
				trang thanh toán
			</p>
		</div>
	</div>
</template>

<style scoped>
	.animate-spin {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
