<template>
    <VApp>
        <VMain class="h-screen text-body-2" :class="layout" scrollable>
            <NavigationBar></NavigationBar>
            <RouterView />
        </VMain>
    </VApp>

    <NotificationView></NotificationView>
</template>

<script setup lang="ts">
import NotificationView from "./views/app/NotificationView.vue";
import NavigationBar from "./views/app/NavigationBar.vue";

const route = useRoute();

const layout = computed(() => {
    return route.meta.layout ?? "nav-left";
});
</script>

<style lang="scss">
@use "@/styles/settings";
@use "@/styles/global";

$header-height: 8px;
$container-padding: settings.$container-padding-x;

.v-main {
    &.nav-left {
        margin-left: $container-padding;
        width: calc(100% - $container-padding) !important;

        .v-navigation-drawer {
            &--left {
                margin-left: $container-padding;
                margin-top: $container-padding;
                height: calc(100% - $header-height - $container-padding * 2) !important;
            }
        }
    }

    &.nav-right {
        margin-right: $container-padding;
        width: calc(100% - #{$container-padding}) !important;

        .v-navigation-drawer {
            &--right {
                margin-right: $container-padding;
                margin-top: $container-padding;
                height: calc(100% - #{$header-height + $container-padding * 2}) !important;
            }
        }
    }

    &.nav-left.nav-right {
        width: calc(100% - #{$container-padding * 2}) !important;
    }
}
</style>
