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
    topic: string;
}

interface TranscriptionResponse {
    data: {
        transcript: string;
    };
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "update:isOpen", value: boolean): void;
}>();

const isTranscribeLoading = ref(true);
const api = useApi();
const transcription = ref("");

const handleTranscribe = async () => {
    isTranscribeLoading.value = true;
    try {
        const response = await api.post<TranscriptionResponse>(
            "/transcriptions/transcribe",
            {
                source: props.audioUrl,
                topic: props.topic,
            }
        );
        transcription.value = response.data.transcript;
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
        @update:open="(value) => emit('update:isOpen', value)"
    >
        <DialogContent class="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>AI Audio Transcription</DialogTitle>
                <DialogDescription>
                    <div v-if="isTranscribeLoading" class="text-center py-4">
                        Đang xử lý audio...
                    </div>
                    <div v-else class="space-y-4">
                        <div>
                            <p class="font-bold text-primary mb-2">
                                Audio gốc của bạn:
                            </p>
                            <audio controls class="w-full">
                                <source :src="audioUrl" type="audio/mp3" />
                            </audio>
                        </div>

                        <div v-if="transcription">
                            <p class="font-bold text-primary mb-2">
                                AI's Transcription:
                            </p>
                            <p class="text-sm bg-gray-50 p-3 rounded-md">
                                {{ transcription }}
                            </p>
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>
