<script setup lang="ts">
import { Button } from "@/components/ui/buttons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Pen } from "lucide-vue-next";

const navigation = [
    // { name: "Trang chủ", href: "/" },
    { name: "Chỉnh sửa hồ sơ", href: "/tests", icon: Pen },
];
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-col gap-2">
                <Button
                    v-for="item in navigation"
                    :key="item.href"
                    variant="ghost"
                    class="w-full font-normal justify-between"
                    :to="item.href"
                >
                    <div class="flex items-center gap-2">
                        <div class="p-1 rounded-md bg-gray-200">
                            <component
                                :is="item.icon"
                                class="h-4 w-4 text-primary"
                            />
                        </div>
                        <span>{{ item.name }}</span>
                    </div>
                    <ChevronRight class="h-4 w-4" />
                </Button>
            </div>
        </CardContent>
    </Card>
</template>
