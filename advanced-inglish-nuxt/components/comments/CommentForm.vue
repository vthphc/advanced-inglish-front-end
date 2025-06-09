<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "~/components/ui/buttons";
import { Send } from "lucide-vue-next";
import { useApi } from "~/composables/api/useApi";

const props = defineProps<{
    testId: string;
}>();

const authStore = useAuthStore();
const user = authStore.user;
const content = ref("");
const api = useApi();

const emit = defineEmits<{
    "comment-added": [];
}>();

const onSubmit = async () => {
    try {
        await api.post(`/tests/${props.testId}/comments`, {
            content: content.value,
            userId: authStore.user?._id,
        });
        content.value = ""; // Clear the form after successful submission
        emit("comment-added");
    } catch (error) {
        console.error("Error posting comment:", error);
    }
};
</script>

<template>
    <form
        @submit.prevent="onSubmit"
        class="flex flex-col gap-y-4 p-4 rounded-md bg-card"
    >
        <div class="flex flex-row gap-x-4 w-full">
            <Avatar class="h-10 w-10">
                <AvatarImage
                    :src="user?.profile?.avatar || ''"
                    :alt="user?.profile?.name"
                />
                <AvatarFallback>
                    {{
                        user?.profile?.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")
                    }}
                </AvatarFallback>
            </Avatar>
            <UTextarea v-model="content" class="w-full" />
        </div>
        <Button type="submit" size="icon" class="place-self-end rounded-full"
            ><Send class="h-5 w-5"
        /></Button>
    </form>
</template>
