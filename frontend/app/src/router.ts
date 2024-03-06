import { ClientEvents } from "./plugins/ClientEvents";
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            component: AboutView
        }
    ]
});

router.beforeEach(async (_to, _from, next) => {
    await ClientEvents.emit("OnRouteLoad", true);
    await next();
});

router.beforeResolve(async (_to, _from, next) => {
    await ClientEvents.emit("OnRouteLoad", false);
    await next();
});

export default router;
