import ggx from '@/net/ggx';
import LoginReq from '@/message/login/LoginReq';
import LoginResp from '@/message/login/LoginResp';
import router from '@/router';

const store = {
    namespaced: true,
    state: {
        loading: false,
        username: null,
        password: null,
        logined: false
    },
    mutations: {
        updateLoading(state: any, data: any) {
            state.loading = data;
        },
        submitLogin(state: any, data: any) {
            state.username = data.username;
            state.password = data.password;
            state.loading = true;

            ggx.send(
                LoginReq.ACTION_ID,
                LoginReq.create({
                    username: state.username,
                    password: state.password
                })
            );
        }
    }
};

(function initMessageHandler() {
    ggx.onMessage(
        LoginResp.ACTION_ID,
        data => {
            console.log(data);
            if (data.success) {
                store.state.logined = true;
                router.push('main');
            }
            store.state.loading = false;
        },
        LoginResp
    );
})();

export default store;
