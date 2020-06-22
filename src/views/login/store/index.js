import ggx from '@/net/ggx';
import LoginReq from '../../../message/login/LoginReq';
import LoginResp from '../../../message/login/LoginResp';
import router from '@/router';

export class Store {
    namespaced = true;

    constructor() {
        this.mutations.initMessageHandler(this.state, this);
    }

    state = {
        loading: false,
        username: null,
        password: null,
        logined: false
    };

    mutations = {
        initMessageHandler(state, data) {
            ggx.onMessage(
                LoginResp.ACTION_ID,
                data => {
                    console.log(data);
                    if (data.success) {
                        state.logined = true;
                        router.push('main');
                    }
                    state.loading = false;
                },
                LoginResp
            );
        },
        updateLoading(state, data) {
            state.loading = data;
        },
        submitLogin(state, data) {
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
    };
}

export default new Store();
