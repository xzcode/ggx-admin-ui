import ggx from '@/net/ggx';
import store from '@/store';
import router from '@/router';
import LoginResp from '@/message/login/LoginResp';
import LoginReq from '@/message/login/LoginReq';

const net = {
    init() {
        ggx.onMessage(LoginResp, resp => {
            console.log(resp.data.success)
            if (resp.data.success) {
                store.commit('user/updateAuthed', true);
                router.push('/main');
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
