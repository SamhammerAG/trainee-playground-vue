<template>
    <VApp>
        <VAppBar color="#009EE3" height="8" v-show="!showRouteLoading"></VAppBar>
        <VProgressLinear color="#009EE3" height="8" :indeterminate="showRouteLoading"></VProgressLinear>

        <VMain class="h-screen text-body-2 nav-left" scrollable>
            <NavigationBar></NavigationBar>
            <RouterView />
        </VMain>
    </VApp>

    <NotificationView></NotificationView>
</template>

<script setup lang="ts">
import NotificationView from "./views/app/NotificationView.vue";
import NavigationBar from "./views/app/NavigationBar.vue";
import { ClientEvents } from "./plugins/ClientEvents";
import { refDelayed } from "./plugins/RefDelayed";

const isRouteLoading = ref(false);
const showRouteLoading = refDelayed(isRouteLoading, import.meta.env.VITE_ROUTE_PROGRESS_DELAY_MS);

onMounted(() => {
    ClientEvents.on("OnRouteLoad", onRouteLoad);
});

onBeforeUnmount(() => {
    ClientEvents.off("OnRouteLoad", onRouteLoad);
});

const onRouteLoad = (value: boolean) => {
    isRouteLoading.value = value;
};
</script>

<style lang="scss">
@use "@/styles/settings";
@import "@/styles/global";

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
}
</style>
