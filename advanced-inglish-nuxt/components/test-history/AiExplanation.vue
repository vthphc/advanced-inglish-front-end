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
    questionId: string;
    isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "update:isOpen", value: boolean): void;
}>();

const isExplanationLoading = ref(true);
const api = useApi();
const explanation = ref("");

const handleGetExplanation = async () => {
    isExplanationLoading.value = true;
    try {
        const response = await api.post<{ explanation: string }>(
            "/questions/explain",
            {
                questionId: props.questionId,
            }
        );
        explanation.value = response.explanation;
    } catch (error) {
        console.error("Error getting explanation:", error);
    } finally {
        isExplanationLoading.value = false;
    }
};

onMounted(() => {
    if (props.isOpen) {
        handleGetExplanation();
    }
});

watch(
    () => props.isOpen,
    (newValue) => {
        if (newValue) {
            handleGetExplanation();
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
                <DialogTitle>AI Explanation</DialogTitle>
                <DialogDescription>
                    <div
                        v-if="isExplanationLoading"
                        class="text-primary text-bold text-center py-4"
                    >
                        Đang tạo giải thích...
                    </div>
                    <div v-else>
                        <p v-if="explanation" class="">
                            {{ explanation }}
                        </p>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>
