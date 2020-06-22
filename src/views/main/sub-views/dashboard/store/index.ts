import ggx from '@/net/ggx';

export default {
    namespaced: true,
    state: {
        prop1: false
    },
    mutations: {
        updateProp1(state: any, data: any) {
            state.prop1 = data;
        }
    },
    actions: {},
    getters: {}
};
