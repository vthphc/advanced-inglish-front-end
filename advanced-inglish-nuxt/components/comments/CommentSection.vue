<script setup lang="ts">
import CommentForm from "./CommentForm.vue";
import CommentItem from "./CommentItem.vue";
import type { Comment } from "~/utils/types/comment";
import { useApi } from "~/composables/api/useApi";

const props = defineProps<{
    testId: string;
}>();

const api = useApi();
const comments = ref<Comment[]>([]);

const fetchComments = async () => {
    try {
        const data = await api.get<Comment[]>(
            `/tests/${props.testId}/comments`
        );
        comments.value = data.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
        console.log(data);
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
};

// Fetch comments when component is mounted
onMounted(() => {
    fetchComments();
});
</script>

<template>
    <div class="flex flex-col gap-y-4">
        <CommentForm :testId="testId" @comment-added="fetchComments" />
        <div class="flex flex-col gap-y-4">
            <CommentItem
                v-for="comment in comments"
                :key="comment._id"
                :comment="comment"
            />
        </div>
    </div>
</template>
