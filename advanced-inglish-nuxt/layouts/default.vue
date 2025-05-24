<script setup lang="ts">
	import { useAuthStore } from "~/stores/auth";
	import { storeToRefs } from "pinia";

	const authStore = useAuthStore();
	const { isAuthenticated } = storeToRefs(authStore); // Use storeToRefs for reactivity
</script>

<template>
	<div v-if="isAuthenticated">
		<h1>Default Layout</h1>
		<div class="container p-4 md:p-6 lg:p-8 mx-auto">
			<slot />
		</div>
	</div>
	<div v-else class="">
		<slot />
	</div>
</template>

<style scoped>
	.container {
		max-width: 1200px;
	}
</style>
