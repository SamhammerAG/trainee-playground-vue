<template>
    <VContainer>
        <VCard>
            <VCardTitle> {{ $t("about.headline") }} </VCardTitle>
            <VCardText>
                <VList>
                    <VListItem>
                        <VListItemTitle>{{ $t("about.date") }}</VListItemTitle>
                        <VListItemSubtitle>{{ buildDate }}</VListItemSubtitle>
                    </VListItem>
                    <VListItem>
                        <VListItemTitle>{{ $t("about.branch") }}</VListItemTitle>
                        <VListItemSubtitle>{{ branch }}</VListItemSubtitle>
                    </VListItem>
                </VList>
            </VCardText>
        </VCard>
    </VContainer>
</template>

<script setup lang="ts">
import { useDate } from "vuetify";
import dateAdapter from "@/plugins/DateAdapter";

const date = useDate();
const branch = import.meta.env.VITE_BRANCH;

const buildDate = computed(() => {
    const dateString = import.meta.env.VITE_BUILD_DATE;
    const dateValue = dateAdapter.parseISO(dateString);
    return date.format(dateValue, "fullDateTime24h");
});
</script>
