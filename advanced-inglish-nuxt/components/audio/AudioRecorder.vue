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
			<Button
				:disabled="!isRecording || isPaused"
				variant="ghost"
				@click="pauseRecording">
				Tạm Dừng
			</Button>
			<Button
				:disabled="!isRecording || !isPaused"
				variant="ghost"
				@click="resumeRecording">
				Tiếp Tục
			</Button>
			<Button
				:disabled="!audioUrl && !isRecording"
				variant="ghost"
				@click="resetRecording">
				Reset
			</Button>
		</div>

		<!-- <div v-if="audioUrl">
			<Button @click="console.log(audioUrl)"
				>Console log the link</Button
			>
		</div> -->

		<div v-if="audioUrl" class="audio-playback">
			<h3>Bản Ghi Âm Của Bạn:</h3>
			<audio ref="audioElement" :src="audioUrl" controls />
			<a
				:href="audioUrl"
				:download="`recording-${new Date().toISOString()}.mp3`"
				class="download-link">
				Tải Xuống Bản Ghi Âm
			</a>
		</div>

		<p v-if="error" class="error">{{ error }}</p>
	</div>
</template>

<script setup>
	import { ref, onUnmounted } from "vue";
	import { Button } from "../ui/buttons";
	import { useRuntimeConfig } from "#app";

	// Reactive state variables
	const isRecording = ref(false);
	const isPaused = ref(false);
	const isUploading = ref(false);
	const mediaRecorder = ref(null);
	const audioChunks = ref([]);
	const audioUrl = ref(null);
	const finalUrl = ref(null);
	const error = ref(null);
	const audioElement = ref(null);
	const config = useRuntimeConfig();
	const CLOUDINARY_CLOUD_NAME = config.public.cloudinaryCloudName;
	const CLOUDINARY_UPLOAD_PRESET = config.public.cloudinaryUploadPreset;

	const emit = defineEmits(["answer"]);

	// --- Core Recording Logic ---

	const startRecording = async () => {
		error.value = null;

		// Stop any existing audio playback
		if (audioElement.value) {
			audioElement.value.pause();
			audioElement.value.currentTime = 0;
		}

		// Revoke the old audio URL to free up memory
		if (audioUrl.value) {
			URL.revokeObjectURL(audioUrl.value);
		}

		audioUrl.value = null;
		finalUrl.value = null;
		isPaused.value = false;
		try {
			// 1. Get user's microphone stream
			const stream =
				await navigator.mediaDevices.getUserMedia({
					audio: true,
				});

			// 2. Create a new MediaRecorder instance
			mediaRecorder.value = new MediaRecorder(stream, {
				mimeType: "audio/webm",
			});

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

				// Clear the chunks array for the next recording
				audioChunks.value = [];

				// Stop the microphone stream tracks
				stream.getTracks().forEach((track) =>
					track.stop()
				);

				// Upload to Cloudinary and emit the secure URL
				uploadToCloudinary(audioBlob);
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
			isPaused.value = false;
		}
	};

	const pauseRecording = () => {
		if (
			mediaRecorder.value &&
			isRecording.value &&
			!isPaused.value
		) {
			mediaRecorder.value.pause();
			isPaused.value = true;
		}
	};

	const resumeRecording = () => {
		if (
			mediaRecorder.value &&
			isRecording.value &&
			isPaused.value
		) {
			mediaRecorder.value.resume();
			isPaused.value = false;
		}
	};

	const resetRecording = () => {
		// Stop any ongoing recording
		if (mediaRecorder.value && isRecording.value) {
			mediaRecorder.value.stop();
		}

		// Stop audio playback if it's playing
		if (audioElement.value) {
			audioElement.value.pause();
			audioElement.value.currentTime = 0;
		}

		// Revoke the old audio URL to free up memory before clearing it
		if (audioUrl.value) {
			URL.revokeObjectURL(audioUrl.value);
		}

		// Reset all state variables
		isRecording.value = false;
		isPaused.value = false;
		audioChunks.value = [];
		audioUrl.value = null;
		finalUrl.value = null;
		error.value = null;
	};

	const uploadToCloudinary = async (audioBlob) => {
		isUploading.value = true;
		error.value = null;

		const formData = new FormData();
		formData.append("file", audioBlob, "recording.webm");
		formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
		formData.append("resource_type", "video");

		try {
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				const errData = await response.json();
				throw new Error(
					errData.error.message || "Upload failed"
				);
			}

			const data = await response.json();

			// Update the UI to show the final result
			finalUrl.value = data.secure_url;

			// Emit the Cloudinary URL as the answer
			emit("answer", data.secure_url);

			console.log(
				"✅ Upload successful! Link:",
				data.secure_url
			);
		} catch (err) {
			console.error("Error uploading to Cloudinary:", err);
			error.value = `Upload failed: ${err.message}`;
		} finally {
			isUploading.value = false;
		}
	};

	// Cleanup on unmount
	onUnmounted(() => {
		// Revoke any remaining audio URLs to free up memory
		if (audioUrl.value) {
			URL.revokeObjectURL(audioUrl.value);
		}
	});
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
