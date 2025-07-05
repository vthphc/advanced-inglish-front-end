<script setup lang="ts">
	defineProps<{
		part: string;
	}>();
</script>

<template>
	<div class="p-8 my-4 bg-gray-50 rounded-lg shadow-sm">
		<div class="max-w-3xl mx-auto">
			<!-- Part 1 - Photographs -->
			<div v-if="part === 'Part 1'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					Four short statements regarding a
					photograph will be spoken only one time.
					The statements will not be printed. Of
					these four statements, select the one
					that best describes the photograph and
					mark your answer on the answer sheet.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have approximately 45 minutes
					to complete the entire Listening Section
					(100 questions).
				</p>
			</div>

			<!-- Part 2 - Question-Response -->
			<div v-if="part === 'Part 2'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					Three responses to one question or
					statement will be spoken only one time.
					They will not be printed. Select the
					best response for the question, and mark
					your answer on the answer sheet.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have approximately 45 minutes
					to complete the entire Listening Section
					(100 questions).
				</p>
			</div>

			<!-- Part 3 - Conversations -->
			<div v-if="part === 'Part 3'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					Conversations between two or three
					people will be spoken only one time.
					They will not be printed. Listen to each
					conversation and read the questions
					printed in the test book (the questions
					will also be spoken), select the best
					response for the question, and mark your
					answer on the answer sheet.
				</p>
				<p class="text-gray-700 leading-relaxed">
					Some questions may require responses
					related to information found in
					diagrams, etc. printed on the test book
					as well as what you heard in the
					conversations. There are three questions
					for each conversation.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have approximately 45 minutes
					to complete the entire Listening Section
					(100 questions).
				</p>
			</div>

			<!-- Part 4 - Talks -->
			<div v-if="part === 'Part 4'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					Short talks such as announcements or
					narrations will be spoken only one time.
					They will not be printed. Listen to each
					talk and read the questions printed in
					the test book (the questions will also
					be spoken), select the best response for
					the question, and mark your answer on
					the answer sheet.
				</p>
				<p class="text-gray-700 leading-relaxed">
					Some questions may require responses
					related to information found in
					diagrams, etc. printed on the test book
					as well as what you heard in the talks.
					There are three questions for each talk.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have approximately 45 minutes
					to complete the entire Listening Section
					(100 questions).
				</p>
			</div>

			<!-- Part 5 - Incomplete Sentences -->
			<div v-if="part === 'Part 5'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					Select the best answer of the four
					choices to complete the sentence, and
					mark your answer on the answer sheet.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have 75 minutes to complete the
					entire Reading Section (100 questions).
				</p>
			</div>

			<!-- Part 6 - Text Completion -->
			<div v-if="part === 'Part 6'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					Select the best answer of the four
					choices (words, phrases, or a sentence)
					to complete the text, and mark your
					answer on the answer sheet. There are
					four questions for each text.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have 75 minutes to complete the
					entire Reading Section (100 questions).
				</p>
			</div>

			<!-- Part 7 - Single Passages & Multiple Passages -->
			<div v-if="part === 'Part 7'" class="space-y-4">
				<p
					class="text-lg md:text-2xl font-bold text-primary">
					DIRECTIONS:
				</p>
				<p class="text-gray-700 leading-relaxed">
					A range of different texts will be
					printed in the test book. Read the
					questions, select the best answer of the
					four choices, and mark your answer on
					the answer sheet.
				</p>
				<p class="text-gray-700 leading-relaxed">
					Some questions may require you to select
					the best place to insert a sentence
					within a text. There are multiple
					questions for each text.
				</p>
				<p
					class="text-red-600 font-medium mt-6 pt-4 border-t border-gray-200">
					You will have 75 minutes to complete the
					entire Reading Section (100 questions).
				</p>
			</div>
		</div>
	</div>
</template>
