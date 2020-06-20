import Vue from "vue";
import Vuex from "vuex";

import loginStore from "../views/login/store";
import mainStore from "../views/main/store";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        login: loginStore,
        main: mainStore
    }
});
