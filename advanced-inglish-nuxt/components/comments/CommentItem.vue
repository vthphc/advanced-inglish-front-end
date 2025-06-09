<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import type { Comment } from "~/utils/types/comment";
import { useApi } from "~/composables/api/useApi";
import { Heart } from "lucide-vue-next";
import { Button } from "~/components/ui/buttons";

const props = defineProps<{
    comment: Comment;
}>();

const user = ref<any>(null);
</script>

<template>
    <div class="p-4 rounded-md">
        <div class="flex flex-row gap-x-4">
            <Avatar class="h-10 w-10">
                <AvatarImage
                    :src="user?.profile?.avatar || ''"
                    :alt="user?.profile?.name"
                />
                <AvatarFallback>
                    {{
                        comment.user
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")
                    }}
                </AvatarFallback>
            </Avatar>
            <div class="flex flex-col gap-y-2">
                <div class="flex items-center gap-x-2">
                    <span class="font-semibold">{{ comment.user }}</span>
                    <span class="text-sm text-muted-foreground">
                        {{ new Date(comment.createdAt).toLocaleDateString() }}
                    </span>
                </div>
                <p class="text-sm">{{ comment.content }}</p>
                <Button size="icon" variant="ghost"
                    ><Heart class="h-4 w-4"
                /></Button>
            </div>
        </div>
    </div>
</template>
