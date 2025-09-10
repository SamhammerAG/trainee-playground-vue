<template>
    <VApp>
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
</script>

<style lang="scss">
@use "@/styles/settings";
@use "@/styles/global";
</style>
