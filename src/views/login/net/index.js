import ggx from '@/net/ggx';
import store from '@/store';
import router from '@/router';
import LoginResp from '@/message/login/LoginResp';
import LoginReq from '@/message/login/LoginReq';

const net = {
    init() {
        ggx.onMessage(LoginResp, data => {
            if (data.success) {
                store.commit('userinfo/updateAuthed', true);
                router.push('main');
            }
            store.commit('login/updateLoading', false);
        });
    },
    /**
     * 发送登录请求
     * @param {*} loginReqData 登录数据
     */
    sendLoginReq(loginReqData) {
        ggx.send(LoginReq.create(loginReqData));
    }
};

export default net;
