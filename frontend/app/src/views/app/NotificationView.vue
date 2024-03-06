<template>
    <VSnackbar v-model="notify.visible" :color="notify.color">
        {{ notify.translation }}
    </VSnackbar>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/stores/notificationStore";

const notify = useNotificationStore();
</script>
