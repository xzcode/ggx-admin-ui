import ggx from '@/net/ggx';
import LoginReq from '@/message/login/LoginReq';
import LoginResp from '@/message/login/LoginResp';
import router from '@/router';
import store from '@/store';
import net from '../net';

export default {
    namespaced: true,
    state: {
        loading: false,
        username: null,
        password: null,
        logined: false
    },
    mutations: {
        updateLoading(state, data) {
            state.loading = data;
        },
        submitLogin(state, data) {
            state.username = data.username;
            state.password = data.password;
            state.loading = true;

            net.sendLoginReq({
                username: data.username,
                password: data.password
            });
        }
    }
};
