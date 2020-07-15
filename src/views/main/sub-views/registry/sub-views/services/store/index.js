import ggx from '@/net/ggx';
import router from '@/router';

const store = {
    namespaced: true,
    state: {
        selectedGroupId: undefined
    },
    mutations: {
        updateSelectedGroupId(state, data) {
            state.selectedGroupId = data;
        }
    },
    actions: {}
};

export default store;
