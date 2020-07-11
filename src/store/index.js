import Vue from 'vue';
import Vuex from 'vuex';

import userinfoStore from './userinfo/store';
import loginStore from '../views/login/store';
import mainStore from '../views/main/store';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {
        updateLoading(state, data) {
            this.loading = data;
        }
    },
    actions: {},
    modules: {
        userinfo: userinfoStore,
        login: loginStore,
        main: mainStore
    }
});
