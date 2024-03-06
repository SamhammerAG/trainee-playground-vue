<template>
    <VRow>
        <VCol :class="colClass">
            <slot></slot>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
const { colClass } = defineProps<{
    colClass?: string;
}>();
</script>
