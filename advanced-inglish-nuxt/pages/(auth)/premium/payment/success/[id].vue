<script setup lang="ts">
	import { useRoute } from "vue-router";
	import { useApi } from "~/composables/api/useApi";
	import { ref } from "vue";

	interface Transaction {
		amount: number;
		sender: string;
		createdAt: string;
		_id: string;
	}

	interface PaymentResponse {
		message: string;
		transaction: Transaction;
	}

	const route = useRoute();
	const api = useApi();
	const isLoading = ref(false);
	const paymentData = ref<PaymentResponse | null>(null);

	// Get the ID from the URL path
	const paymentId = route.params.id as string;

	// Make the POST request when the component is mounted
	onMounted(async () => {
		isLoading.value = true;
		try {
			const response = await api.post<PaymentResponse>(
				"/payments/update-user-and-transaction",
				{
					userId: paymentId,
				}
			);
			paymentData.value = response;
		} catch (error) {
			console.error("Error updating payment:", error);
		} finally {
			isLoading.value = false;
		}
	});
</script>

<template>
	<div class="payment-success-container">
		<LoadingSpinner v-if="isLoading" size="50" />
		<PaymentSuccess
			v-else-if="paymentData"
			:transaction="paymentData.transaction"
			:message="paymentData.message" />
	</div>
</template>

<style scoped>
	.payment-success-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}
</style>
