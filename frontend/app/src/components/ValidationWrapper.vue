<template>
    <Render />
</template>

<script setup lang="ts">
const props = defineProps<{
    data: unknown;
}>();

const emit = defineEmits<{
    (e: "dataChanged"): void;
}>();

watch(
    () => props.data,
    () => {
        emit("dataChanged");
    },
    { deep: true }
);
const Render = () => {
    return null;
};
</script>
