<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import Input from "~/components/ui/inputs/Input.vue";
import Button from "~/components/ui/buttons/Button.vue";
import Label from "~/components/ui/labels/Label.vue";
import { useApi } from "~/composables/api/useApi";
import { z } from "zod";
import type { AuthResponse } from "~/utils/types/user";
import { useToast } from "#imports";
import { useRouter } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";

const authStore = useAuthStore();
const api = useApi();
const toast = useToast();
const user = computed(() => authStore.getUser);
const isSubmitting = ref(false);
const error = ref<string | null>(null);
const router = useRouter();

// Define validation schema
const formSchema = z.object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    dob: z.string().min(1, "Ngày sinh là bắt buộc"),
});

type FormField = {
    id: "name" | "email" | "dob";
    label: string;
    type: "text" | "email" | "date";
    disabled: boolean;
};

type FormData = z.infer<typeof formSchema>;

const formData = ref<FormData>({
    name: user.value?.profile.name || "",
    email: user.value?.email || "",
    dob: user.value?.profile.dob
        ? new Date(user.value.profile.dob).toISOString().split("T")[0]
        : "",
});

const formFields: FormField[] = [
    {
        id: "name",
        label: "Tên người dùng",
        type: "text",
        disabled: false,
    },
    {
        id: "email",
        label: "Email",
        type: "email",
        disabled: true,
    },
    {
        id: "dob",
        label: "Ngày sinh",
        type: "date",
        disabled: false,
    },
];

const handleSubmit = async () => {
    try {
        isSubmitting.value = true;
        error.value = null;

        // Validate form data
        const validatedData = formSchema.parse(formData.value);

        // Convert dob from YYYY-MM-DD to DD/MM/YYYY before submitting
        // const [year, month, day] = validatedData.dob.split("-");
        // const submitData = {
        // 	...validatedData,
        // 	dob: `${day}/${month}/${year}`,
        // };

        // Make API request
        const response = await api.put<AuthResponse>(
            "/auth/profile",
            validatedData
        );

        // Update user data in store
        if (response.user) {
            authStore.user = response.user;
        }

        toast.add({
            title: "Thành công",
            description: "Hồ sơ đã được cập nhật thành công.",
            color: "success",
        });
    } catch (err) {
        console.error("Error updating profile:", err);
        if (err instanceof z.ZodError) {
            error.value = err.errors[0].message;
        } else {
            error.value =
                "Có lỗi xảy ra khi cập nhật hồ sơ. Vui lòng thử lại sau.";
        }
        toast.add({
            title: "Lỗi",
            description: error.value,
            color: "error",
        });
    } finally {
        isSubmitting.value = false;
    }
};

const handleCancel = () => {
    // Reset form to original values
    formData.value = {
        name: user.value?.profile.name || "",
        email: user.value?.email || "",
        dob: user.value?.profile.dob
            ? new Date(user.value.profile.dob).toISOString().split("T")[0]
            : "",
    };
    error.value = null;

    // Navigate to account page
    router.push("/account");
};
</script>

<template>
    <div class="mx-auto p-4 max-w-[900px]">
        <Button @click="handleCancel" class="mb-4" size="icon"
            ><ChevronLeft
        /></Button>
        <h1 class="text-3xl text-primary font-bold mb-6">Chỉnh sửa hồ sơ</h1>

        <form class="mx-auto" @submit.prevent="handleSubmit">
            <div class="space-y-4">
                <div
                    v-for="field in formFields"
                    :key="field.id"
                    class="space-y-2"
                >
                    <Label :for="field.id" class="block font-bold">{{
                        field.label
                    }}</Label>
                    <Input
                        :id="field.id"
                        v-model="formData[field.id]"
                        class="py-4"
                        :type="field.type"
                        :disabled="field.disabled || isSubmitting"
                    />
                </div>

                <!-- Error message -->
                <div v-if="error" class="text-red-500 text-sm mt-2">
                    {{ error }}
                </div>

                <div class="flex justify-end space-x-4 mt-6">
                    <Button
                        variant="ghost"
                        size="lg"
                        type="button"
                        :disabled="isSubmitting"
                        @click="handleCancel"
                    >
                        Hủy
                    </Button>
                    <Button
                        size="lg"
                        class="rounded-lg"
                        type="submit"
                        :loading="isSubmitting"
                        :disabled="isSubmitting"
                    >
                        {{ isSubmitting ? "Đang lưu..." : "Lưu hồ sơ" }}
                    </Button>
                </div>
            </div>
        </form>
    </div>
</template>
