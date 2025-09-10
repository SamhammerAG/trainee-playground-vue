<template>
    <VNavigationDrawer
        permanent
        left
        @update:rail="(val) => (isHovering = !val)"
        class="text-primary"
        style="background: linear-gradient(0deg, #009ee3, 1px, #ffffff 70%)"
    >
        <template #prepend>
            <RouterLink :to="{ name: 'home' }" class="d-flex align-center justify-center mt-4 mb-6">
                <VImg height="25" :src="largeLogo"></VImg>
            </RouterLink>
        </template>

        <VList nav>
            <VListItem :to="{ name: 'home' }" class="rounded" :prependIcon="mdiHome" :title="$t('navigation.home')" />
            <VListItem :to="{ name: 'about' }" class="rounded" :prependIcon="mdiInformationOutline" :title="$t('navigation.about')" />
        </VList>
    </VNavigationDrawer>
</template>

<script setup lang="ts">
import largeLogo from "@/assets/Metis_Logo_large.svg";

const isHovering = ref(false);
</script>

<style lang="scss" scoped>
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
