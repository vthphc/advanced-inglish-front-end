<script setup lang="ts">
	const route = useRoute();
	const isRegisterPage = computed(() => route.path === "/register");
</script>

<template>
	<div class="flex flex-col justify-center items-center min-h-screen">
		<NuxtLink to="/">
			<UButton
				class="cursor-pointer px-2 btn btn-ghost absolute top-0 left-0 m-8 rounded-2xl bg-primary border-primary hover:border-primary border-2 text-white text-base hover:text-primary hover:bg-white">
				Landing Page
			</UButton>
		</NuxtLink>
		<UButton
			v-if="isRegisterPage"
			to="/login"
			class="cursor-pointer px-2 btn btn-ghost absolute top-0 right-0 m-8 rounded-2xl bg-primary border-primary hover:border-primary border-2 text-white text-base hover:text-primary hover:bg-white">
			Login
		</UButton>
		<UButton
			v-else
			to="/register"
			class="cursor-pointer px-2 btn btn-ghost absolute top-0 right-0 m-8 rounded-2xl bg-primary border-primary hover:border-primary border-2 text-white text-base hover:text-primary hover:bg-white">
			Register
		</UButton>
		<slot />
	</div>
</template>
