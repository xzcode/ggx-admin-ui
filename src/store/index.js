import Vue from 'vue';
import Vuex from 'vuex';

import userStore from './user';
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
        user: userStore,
        login: loginStore,
        main: mainStore
    }
});
