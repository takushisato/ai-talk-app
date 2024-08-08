import { defineStore } from 'pinia';

export const useLayoutStore = defineStore({
    id: 'layout',
    state: () => ({
        error: {
            errorMessage: '',
            isError: false,
        },
    }),
    getters: {},
    actions: {},
});
