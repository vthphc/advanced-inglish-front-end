<script setup lang="ts"></script>

<template>
	<div class="flex flex-col justify-center items-center min-h-screen">
		<UButton
			class="cursor-pointer px-2 btn btn-ghost absolute top-0 left-0 m-8 rounded-2xl bg-primary border-primary hover:border-primary border-2 text-white text-base hover:text-primary hover:bg-white">
			Landing Page
		</UButton>
		<UButton
			class="cursor-pointer px-2 btn btn-ghost absolute top-0 right-0 m-8 rounded-2xl bg-primary border-primary hover:border-primary border-2 text-white text-base hover:text-primary hover:bg-white">
			Register
		</UButton>
		<slot />
	</div>
</template>
