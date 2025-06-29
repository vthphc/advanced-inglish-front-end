<script setup lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
	} from "~/components/ui/dialog";
	import { useApi } from "~/composables/api/useApi";

	interface Props {
		audioUrl: string;
		isOpen: boolean;
	}

	interface AiResponse {
		correctness: string;
		clarity: string;
		grammar: string;
		vocabulary: string;
		suggestions: string;
		overallScore: string;
	}

	interface TranscriptionResponse {
		data: {
			transcript: string;
			aiResponse: AiResponse;
		};
	}

	const props = defineProps<Props>();
	const emit = defineEmits<{
		(e: "update:isOpen", value: boolean): void;
	}>();

	const isTranscribeLoading = ref(true);
	const api = useApi();
	const transcription = ref("");
	const aiResponse = ref<AiResponse | null>(null);

	const handleTranscribe = async () => {
		isTranscribeLoading.value = true;
		try {
			const response = await api.post<TranscriptionResponse>(
				"/transcriptions/transcribe",
				{
					source: props.audioUrl,
				}
			);
			transcription.value = response.data.transcript;
			aiResponse.value = response.data.aiResponse;
		} catch (error) {
			console.error("Error transcribing audio:", error);
		} finally {
			isTranscribeLoading.value = false;
		}
	};

	onMounted(() => {
		if (props.isOpen) {
			handleTranscribe();
		}
	});

	watch(
		() => props.isOpen,
		(newValue) => {
			if (newValue) {
				handleTranscribe();
			}
		}
	);
</script>

<template>
	<Dialog
		:open="isOpen"
		@update:open="(value) => emit('update:isOpen', value)">
		<DialogContent class="max-w-2xl max-h-[80vh] overflow-y-auto">
			<DialogHeader>
				<DialogTitle
					>AI Transcription & Review</DialogTitle
				>
				<DialogDescription>
					<div
						v-if="isTranscribeLoading"
						class="text-center py-4">
						Đang xử lý audio...
					</div>
					<div v-else class="space-y-4">
						<div>
							<p
								class="font-bold text-primary mb-2">
								Audio gốc của
								bạn:
							</p>
							<audio
								controls
								class="w-full">
								<source
									:src="
										audioUrl
									"
									type="audio/mp3" />
							</audio>
						</div>

						<div v-if="transcription">
							<p
								class="font-bold text-primary mb-2">
								AI's
								Transcription:
							</p>
							<p
								class="text-sm bg-gray-50 p-3 rounded-md">
								{{
									transcription
								}}
							</p>
						</div>

						<div
							v-if="aiResponse"
							class="space-y-4">
							<div
								class="border-t pt-4">
								<h3
									class="font-bold text-lg text-primary mb-3">
									AI
									Review
								</h3>

								<div
									class="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div
										class="space-y-3">
										<div>
											<h4
												class="font-semibold text-sm text-gray-700">
												Correctness
											</h4>
											<p
												class="text-sm text-gray-600">
												{{
													aiResponse.correctness
												}}
											</p>
										</div>
										<div>
											<h4
												class="font-semibold text-sm text-gray-700">
												Clarity
											</h4>
											<p
												class="text-sm text-gray-600">
												{{
													aiResponse.clarity
												}}
											</p>
										</div>
										<div>
											<h4
												class="font-semibold text-sm text-gray-700">
												Grammar
											</h4>
											<p
												class="text-sm text-gray-600">
												{{
													aiResponse.grammar
												}}
											</p>
										</div>
										<div>
											<h4
												class="font-semibold text-sm text-gray-700">
												Vocabulary
											</h4>
											<p
												class="text-sm text-gray-600">
												{{
													aiResponse.vocabulary
												}}
											</p>
										</div>
									</div>

									<div
										class="space-y-3">
										<div>
											<h4
												class="font-semibold text-sm text-gray-700">
												Overall
												Score
											</h4>
											<div
												class="flex items-center space-x-2">
												<span
													class="text-2xl font-bold text-primary"
													>{{
														aiResponse.overallScore
													}}</span
												>
												<span
													class="text-sm text-gray-500"
													>/
													100</span
												>
											</div>
										</div>
									</div>
								</div>

								<div
									class="mt-4">
									<h4
										class="font-semibold text-sm text-gray-700 mb-2">
										Suggestions
										for
										Improvement
									</h4>
									<p
										class="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
										{{
											aiResponse.suggestions
										}}
									</p>
								</div>
							</div>
						</div>
					</div>
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	</Dialog>
</template>
