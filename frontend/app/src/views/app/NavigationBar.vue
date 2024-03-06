<template>
    <VNavigationDrawer
        permanent
        left
        expandOnHover
        :rail="collapsed"
        @update:rail="(val) => (isHovering = !val)"
        class="text-primary"
        style="background: linear-gradient(0deg, #009ee3, 1px, #ffffff 70%)"
    >
        <template #prepend>
            <RouterLink :to="{ name: 'home' }" class="d-flex align-center justify-center mt-4 mb-6">
                <VImg height="25" :src="!collapsed || isHovering ? largeLogo : smallLogo"></VImg>
            </RouterLink>
        </template>

        <template #default>
            <VListItem :to="{ name: 'about' }">
                <template #prepend><VIcon>mdi-information-outline</VIcon></template>
                <VListItemTitle>{{ $t("navigation.about") }}</VListItemTitle>
            </VListItem>
        </template>

        <template #append>
            <div class="text-right">
                <VBtn style="opacity: 0.75" size="x-small" height="32" width="32" @click="collapsed = !collapsed">
                    <VIcon>{{ collapsed ? "mdi-pin-outline" : "mdi-pin-off-outline" }}</VIcon>
                    <VTooltip activator="parent" location="top">{{ collapsed ? $t("navigation.expand") : $t("navigation.collapse") }}</VTooltip>
                </VBtn>
            </div>
        </template>
    </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useNavigationBarStore } from "@/stores/navigationBarStore";
import smallLogo from "@/assets/Metis_Logo_small.svg";
import largeLogo from "@/assets/Metis_Logo_large.svg";

const navigationBarStore = useNavigationBarStore();

const { collapsed } = storeToRefs(navigationBarStore);
const isHovering = ref(false);
</script>

<style lang="scss" scoped>
@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
}

.blink {
    animation: blink normal 1.5s infinite ease-in-out;
}

.v-list-item {
    :deep(.v-icon) {
        opacity: 1;
    }

    &--active {
        :deep(.v-icon) {
            color: white;
        }

        :deep(.v-list-item__content) {
            z-index: 1;
            color: white;
        }

        :deep(.v-list-item__overlay) {
            opacity: 1;
        }

        &:hover {
            :deep(.v-list-item__overlay) {
                opacity: 0.7;
            }
        }
    }
}
</style>
