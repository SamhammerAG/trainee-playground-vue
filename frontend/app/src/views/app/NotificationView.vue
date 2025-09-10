<template>
    <VSnackbar v-model="visible" :color="color">
        {{ translation }}
        <template #actions>
            <VIcon @click="visible = false" icon="$close"></VIcon>
        </template>
    </VSnackbar>
</template>

<script setup lang="ts">
import useNotification from "@/composables/notification";

const { visible, color, translation } = useNotification();
</script>
