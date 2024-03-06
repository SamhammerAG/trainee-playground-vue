export const useNavigationBarStore = defineStore(
    "navigationBar",
    () => {
        const collapsed = ref(false);
        return { collapsed };
    },
    {
        persist: true
    }
);
