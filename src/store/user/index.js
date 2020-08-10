import ggx from '@/net/ggx';
import router from '@/router';
import rootStore from '@/store';

const store = {
    namespaced: true,
    state: {
        userInfo: {
            username: 'unknown',
            avatar: undefined,
            token: null,
            authed: false,
            permissions: []
        }
    },
    mutations: {
        updateAuthed(state, data) {
            state.userInfo.authed = data;
        }
    },
    actions: {}
};

(function initMessageHandler() {

})();

export default store;
