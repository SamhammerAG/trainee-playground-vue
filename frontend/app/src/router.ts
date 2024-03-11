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

export default router;
