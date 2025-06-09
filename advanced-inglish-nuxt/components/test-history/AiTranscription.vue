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
        const response = await api.post<{ data: { transcript: string } }>(
            "/transcriptions/transcribe",
            {
                source: props.audioUrl,
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
        <DialogContent>
            <DialogHeader>
                <DialogTitle>AI Transcription</DialogTitle>
                <DialogDescription>
                    <div v-if="isTranscribeLoading" class="text-center py-4">
                        Đang xử lý audio...
                    </div>
                    <div v-else>
                        <p class="font-bold text-primary">
                            Audio gốc của bạn:
                            <audio controls class="mt-2 w-full">
                                <source :src="audioUrl" type="audio/mp3" />
                            </audio>
                        </p>
                        <p v-if="transcription" class="font-bold text-primary">
                            AI's Transcription: {{ transcription }}
                        </p>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>
