<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { motion } from "motion-v";

const schema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	email: undefined,
	password: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
	toast.add({
		title: "Success",
		description: "The form has been submitted.",
		color: "success",
	});
	console.log(event.data);
}
</script>

<template>
	<div class=" ">
		<UForm
			:schema="schema"
			:state="state"
			class="space-y-4"
			@submit="onSubmit">
			<UFormField label="Email" name="email">
				<UInput v-model="state.email" />
			</UFormField>

			<UFormField label="Password" name="password">
				<UInput
					v-model="state.password"
					type="password" />
			</UFormField>

			<UButton type="submit"> Submit </UButton>
		</UForm>
		<motion.div
			:while-hover="{ scale: 1.2 }"
			:while-press="{ scale: 0.8 }"
			class="w-[100px] h-[100px] bg-blue-400 rounded-md" />
	</div>
</template>
