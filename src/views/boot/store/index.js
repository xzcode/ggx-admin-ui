import ggx from '@/net/ggx';
import router from '@/router';
import rootStore from '@/store';

const store = {
    namespaced: true,
    state: {
        loading: false,
        username: null,
        password: null,
        logined: false
    },
    mutations: {},
    actions: {}
};

(function initMessageHandler() {})();

export default store;
