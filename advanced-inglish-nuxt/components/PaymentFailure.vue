<script setup lang="ts">
	import { Ban } from "lucide-vue-next";

	interface InfoItem {
		attribute: string;
		value: string;
	}

	interface Props {
		infoArray?: InfoItem[];
	}

	const props = withDefaults(defineProps<Props>(), {
		infoArray: () => [
			{
				attribute: "Default Attribute 1",
				value: "Default Value 1",
			},
			{
				attribute: "Default Attribute 2",
				value: "Default Value 2",
			},
		],
	});
</script>

<template>
	<UCard class="w-96">
		<template #header> <Placeholder class="h-8" /> </template>
		<div
			class="flex flex-col items-center font-bold text-3xl text-error gap-x-2">
			<Ban class="w-10 h-10" />
			<span>Payment Failure</span>
		</div>
		<USeparator class="my-8" />
		<div class="flex flex-col">
			<span class="text-error">Something went wrong!</span>
			<div v-if="props.infoArray.length > 0" class="w-full">
				<div
					v-for="(item, index) in props.infoArray"
					:key="index"
					class="grid grid-cols-2">
					<span class="text-neutral-600">{{
						item.attribute
					}}</span>
					<span class="text-right">{{
						item.value
					}}</span>
				</div>
			</div>
		</div>
		<template #footer>
			<div class="flex flex-row w-full justify-between">
				<UButton
					to="/register"
					class="cursor-pointer px-4 btn btn-ghost rounded-2xl bg-primary border-primary hover:border-primary border-2 text-white text-base hover:text-primary hover:bg-white">
					Register
				</UButton>
				<UButton
					to="/"
					class="cursor-pointer px-4 btn btn-ghost rounded-2xl bg-primary border-primary hover:border-primary border-2 text-white text-base hover:text-primary hover:bg-white">
					Close
				</UButton>
			</div>
		</template>
	</UCard>
</template>
