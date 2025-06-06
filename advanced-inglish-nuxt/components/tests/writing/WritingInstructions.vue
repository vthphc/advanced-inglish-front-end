<script setup lang="ts">
	defineProps<{
		part: string;
	}>();
</script>

<template>
	<div class="p-8 my-4 bg-gray-50 rounded-lg shadow-sm">
		<div class="max-w-3xl mx-auto">
			<!-- Part 1 -->
			<div v-if="part === 'Part 1'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					In this part of the test, you will write
					ONE sentence that is based on a picture.
					With each picture, you will be given TWO
					words or phrases that you must use in
					your sentence.
				</p>
				<p class="text-gray-700 leading-relaxed">
					You can change the forms of the words
					and you can use the words in any order.
				</p>
				<p class="text-gray-700 leading-relaxed">
					Your sentence will be scored on the
					appropriate use of grammar, and the
					relevance of the sentence to the
					picture.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have eight minutes to complete
					this part of the test.
				</p>
			</div>

			<!-- Part 2 -->
			<div v-if="part === 'Part 2'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					In this part of the test, you will show
					how well you can write a response to an
					e-mail.
				</p>
				<p class="text-gray-700 leading-relaxed">
					Your response will be scored on the
					quality and variety of your sentences,
					vocabulary, and organization.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have 10 minutes to read and
					answer each e-mail.
				</p>
			</div>

			<!-- Part 3 -->
			<div v-if="part === 'Part 3'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					In this part of the test, you will write
					an essay in response to a question that
					asks you to state, explain, and support
					your opinion on an issue. Typically, an
					effective essay will contain a minimum
					of 300 words.
				</p>
				<p class="text-gray-700 leading-relaxed">
					Your response will be scored on whether
					your opinion is supported with reasons
					and/or examples, grammar, vocabulary,
					and organization.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have 30 minutes to plan, write,
					and revise your essay.
				</p>
			</div>
		</div>
	</div>
</template>
