import ggx from "@/net/ggx";

export default {
    namespaced: true,
    state: {
        formData: {
            username: null,
            password: null
        }
    },
    mutations: {
        updateFormData(state, data) {
            state.formData = data;
        },
        updatePassword(state, data) {
            state.formData.password = data;
        }
    },
    actions: {},
    getters: {},
    modules: {}
};
