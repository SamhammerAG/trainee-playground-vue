<template>
    <VDialog v-model="dialog" :activator="activator" width="auto">
        <VCard>
            <VCardText>
                {{ message }}
                <slot></slot>
            </VCardText>
            <VCardActions>
                <VSpacer></VSpacer>
                <div v-if="buttons">
                    <template v-for="button in buttons" :key="button.text">
                        <VBtn color="primary" @click="buttonClicked(button)">{{ button.text }}</VBtn>
                    </template>
                </div>
                <VBtn color="primary" v-else @click="emit('defaultAction')">{{ $t("confirmationDialog.confirm") }}</VBtn>
                <VBtn color="primary" @click="dialog = false">{{ $t("confirmationDialog.cancel") }}</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>

<script setup lang="ts">
import type { ConfirmationDialogButton } from "@/models/ConfirmationDialogOptions";

const {
    message,
    buttons,
    activator = "parent"
} = defineProps<{
    message?: string;
    buttons?: ConfirmationDialogButton[];
    activator?: string;
}>();

const emit = defineEmits<{
    (e: "defaultAction"): void;
}>();

const { dialog = ref(false) } = defineModels<{
    dialog?: boolean;
}>();

const buttonClicked = (button: ConfirmationDialogButton) => {
    dialog.value = false;
    button.callback();
};
</script>
