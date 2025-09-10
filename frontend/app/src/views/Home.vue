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
import useNotification from "@/composables/notification";
import HomeService from "@/services/HomeService";

const notify = useNotification();

const text = ref<string>();

onBeforeMount(async () => {
    loadText();
});

const loadText = async () => {
    try {
        text.value = await HomeService.get();
    } catch (e) {
        console.error("Failed to load text", e);
        notify.error("error.default");
    }
};
</script>
