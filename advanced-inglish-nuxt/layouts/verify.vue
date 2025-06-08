<script setup lang="ts">
	import { House } from "lucide-vue-next";
	import Button from "~/components/ui/buttons/Button.vue";
</script>

<template>
	<div class="flex flex-col justify-center items-center min-h-screen">
		<NuxtLink to="/">
			<Button class="absolute top-0 left-0 m-8">
				<House />
			</Button>
		</NuxtLink>
		<NuxtLink to="/login">
			<Button class="absolute top-0 right-0 m-8">
				Login
			</Button>
		</NuxtLink>
		<slot />
	</div>
</template>
