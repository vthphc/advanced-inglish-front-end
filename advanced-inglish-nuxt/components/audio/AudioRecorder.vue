<template>
	<div class="audio-recorder">
		<h2>Máy Ghi Âm</h2>
		<p v-if="isRecording">Đang ghi âm...</p>

		<div class="controls">
			<Button :disabled="isRecording" @click="startRecording">
				Bắt Đầu Ghi Âm
			</Button>
			<Button
				:disabled="!isRecording"
				variant="ghost"
				@click="stopRecording">
				Dừng Ghi Âm
			</Button>
		</div>

		<div v-if="audioUrl" class="audio-playback">
			<h3>Bản Ghi Âm Của Bạn:</h3>
			<audio :src="audioUrl" controls />
			<a
				:href="audioUrl"
				:download="`recording-${new Date().toISOString()}.webm`"
				class="download-link">
				Tải Xuống Bản Ghi Âm
			</a>
		</div>

		<p v-if="error" class="error">{{ error }}</p>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { Button } from "../ui/buttons";

	// Reactive state variables
	const isRecording = ref(false);
	const mediaRecorder = ref(null);
	const audioChunks = ref([]);
	const audioUrl = ref(null);
	const error = ref(null);

	const emit = defineEmits(["answer"]);

	// --- Core Recording Logic ---

	const startRecording = async () => {
		error.value = null;
		audioUrl.value = null;
		try {
			// 1. Get user's microphone stream
			const stream =
				await navigator.mediaDevices.getUserMedia({
					audio: true,
				});

			// 2. Create a new MediaRecorder instance
			mediaRecorder.value = new MediaRecorder(stream);

			// 3. Set up event listeners
			mediaRecorder.value.ondataavailable = (event) => {
				// Push audio chunks to our array
				audioChunks.value.push(event.data);
			};

			mediaRecorder.value.onstop = () => {
				// Combine all chunks into a single Blob
				const audioBlob = new Blob(audioChunks.value, {
					type: "audio/webm",
				});

				// Create a URL for the Blob
				audioUrl.value = URL.createObjectURL(audioBlob);

				// Emit the audio URL as the answer
				emit("answer", audioUrl.value);

				// Clear the chunks array for the next recording
				audioChunks.value = [];

				// Stop the microphone stream tracks
				stream.getTracks().forEach((track) =>
					track.stop()
				);
			};

			// 4. Start recording
			mediaRecorder.value.start();
			isRecording.value = true;
		} catch (err) {
			console.error("Error accessing microphone:", err);
			if (err.name === "NotAllowedError") {
				error.value =
					"Quyền truy cập microphone bị từ chối. Vui lòng cho phép truy cập microphone trong cài đặt trình duyệt của bạn.";
			} else {
				error.value = `Lỗi khi truy cập microphone: ${err.message}`;
			}
		}
	};

	const stopRecording = () => {
		if (mediaRecorder.value && isRecording.value) {
			mediaRecorder.value.stop();
			isRecording.value = false;
		}
	};
</script>

<style scoped>
	.audio-recorder {
		max-width: 500px;
		margin: 2rem auto;
		padding: 1.5rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		font-family: sans-serif;
		text-align: center;
	}

	.controls {
		margin: 1rem 0;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.audio-playback {
		margin-top: 2rem;
	}

	audio {
		width: 100%;
		margin-top: 0.5rem;
	}

	.download-link {
		display: inline-block;
		margin-top: 1rem;
		color: #3498db;
		text-decoration: none;
	}

	.download-link:hover {
		text-decoration: underline;
	}

	.error {
		color: #e74c3c;
		margin-top: 1rem;
	}
</style>
