import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const getPrefix = () => {
    return "playground";
};

const pinia = createPinia();
const persistedstate = createPersistedState({ key: (id) => `${getPrefix()}-${id}` });
pinia.use(persistedstate);

export default pinia;
