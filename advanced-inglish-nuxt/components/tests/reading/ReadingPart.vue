<script setup lang="ts">
	import { defineProps, defineExpose } from "vue";

	interface Question {
		id: string;
		question: string;
		options: string[];
		answer: string;
	}

	interface Props {
		partNumber: number;
		questions: Question[];
		validationErrors?: Record<string, string>;
	}

	const props = defineProps<Props>();
	const formRef = ref<HTMLFormElement | null>(null);
	const formState = reactive<Record<string, string>>({});

	// Expose methods and state to parent
	defineExpose({
		formRef,
		formState,
		validate: () => {
			return formRef.value?.checkValidity() ?? false;
		},
	});
</script>

<template>
	<form ref="formRef" class="space-y-4">
		<div
			v-for="(question, index) in questions"
			:key="question.id"
			:id="question.id"
			class="border-b pb-4">
			<div class="flex items-start gap-4 mb-2">
				<span
					class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
					{{ index + 1 }}
				</span>
				<p class="font-medium">
					{{ question.question }}
				</p>
			</div>
			<div class="space-y-2 ml-12">
				<div
					v-for="option in question.options"
					:key="option"
					class="flex items-center">
					<input
						type="radio"
						:name="question.id"
						:value="option"
						v-model="formState[question.id]"
						required
						class="mr-2" />
					<label>{{ option }}</label>
				</div>
				<p
					v-if="validationErrors?.[question.id]"
					class="text-red-500 text-sm mt-1">
					{{ validationErrors[question.id] }}
				</p>
			</div>
		</div>
	</form>
</template>
