<script setup lang="ts">
	defineProps<{
		part: string;
	}>();
</script>

<template>
	<div class="p-8 my-4 bg-gray-50 rounded-lg shadow-sm">
		<div class="max-w-3xl mx-auto">
			<!-- Part 1: Read a text aloud -->
			<div v-if="part === 'Part 1'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					In this part, you will read a text
					aloud. You will have 45 seconds to
					prepare. Then you will have 45 seconds
					to read the text aloud.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					Preparation time: 45 seconds | Speaking
					time: 45 seconds
				</p>
			</div>

			<!-- Part 2: Describe a picture -->
			<div v-if="part === 'Part 2'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					In this part, you will describe the
					photo on the screen with as much detail
					as possible. You will have 45 seconds to
					prepare. You will have 30 seconds to
					describe the photo.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					Preparation time: 45 seconds | Speaking
					time: 30 seconds
				</p>
			</div>

			<!-- Part 3: Respond to questions -->
			<div v-if="part === 'Part 3'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					In this part, you will answer three
					questions. You will have three seconds
					to prepare after you hear each question.
					You will have 15 seconds to speak for
					Questions 5 and 6 and 30 seconds for
					Question 7.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					Preparation time: 3 seconds per question
					| Speaking time: 15 seconds (Q5-6), 30
					seconds (Q7)
				</p>
			</div>

			<!-- Part 4: Respond to questions using information provided -->
			<div v-if="part === 'Part 4'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					You will answer three questions based on
					information on the screen. You will have
					45 seconds to read the information. You
					will have 15 seconds to respond to
					Questions 7 and 8, and you will have 30
					seconds to respond to Question 9. You
					will hear Question 10 two times. For
					each question, you will have three
					seconds to prepare before answering.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					Reading time: 45 seconds | Preparation
					time: 3 seconds per question | Speaking
					time: 15 seconds (Q8-9), 30 seconds
					(Q10)
				</p>
			</div>

			<!-- Part 5: Express an opinion -->
			<div v-if="part === 'Part 5'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					In Question 11, you will give your
					opinion about a topic. You will have 45
					seconds to prepare your response. You
					will have 60 seconds to speak. Say as
					much as you can in the time you have.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					Preparation time: 45 seconds | Speaking
					time: 60 seconds
				</p>
			</div>
		</div>
	</div>
</template>
