<template>
    <VContainer>
        <VCard>
            <VCardTitle> {{ $t("home.headline") }} </VCardTitle>
            <VCardText v-if="text">
                {{ text }}
            </VCardText>
        </VCard>
    </VContainer>
</template>

<script setup lang="ts">
import HomeService from "@/services/HomeService";

const text = ref<string>();

onBeforeMount(async () => {
    text.value = await HomeService.get();
});
</script>
