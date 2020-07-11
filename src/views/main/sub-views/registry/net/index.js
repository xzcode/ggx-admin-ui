import ggx from '@/net/ggx';
import store from '@/store';
import router from '@/router';
import GetRegistryInfoResp from '@/message/registry/GetRegistryInfoResp';

const net = {
    init() {
        ggx.onMessage(GetRegistryInfoResp, data => {
            store.commit('main/registry/updateServices', data.services);
        });
    },
    sendMessage(myReqData) {}
};

export default net;
