import { createApp } from "vue";
import { vMaska } from "maska";

import App from "./App.vue";
import router from "./router";
import vuetify from "./vuetify";
import pinia from "./pinia";
import i18n from "./i18n";
import VRowSingle from "./components/VRowSingle.vue";

const app = createApp(App);

app.directive("maska", vMaska);
app.component("VRowSingle", VRowSingle);
app.use(vuetify);
app.use(router);
app.use(pinia);
app.use(i18n);

app.mount("#app");
