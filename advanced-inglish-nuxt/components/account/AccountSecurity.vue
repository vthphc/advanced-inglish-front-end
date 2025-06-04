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
import { ChevronRight, ArrowRight, LockKeyhole } from "lucide-vue-next";

const navigation = [
    // { name: "Trang chủ", href: "/" },
    {
        name: "Đổi mật khẩu",
        href: "/account/change-password",
        icon: LockKeyhole,
    },
    { name: "Đăng xuất", href: "/logout", icon: ArrowRight },
];

const router = useRouter();
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Bảo mật</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-col gap-2">
                <Button
                    v-for="item in navigation"
                    :key="item.href"
                    variant="ghost"
                    class="w-full font-normal justify-between cursor-pointer hover:scale-101 transition-all duration-200"
                    :to="item.href"
                >
                    <div class="flex items-center gap-2 font-semibold">
                        <div class="p-2 rounded-md bg-gray-200">
                            <component
                                :is="item.icon"
                                class="text-primary h-5 w-5"
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
