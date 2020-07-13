import ggx from '@/net/ggx';
import store from '@/store';
import router from '@/router';
import GetRegistryInfoResp from '@/message/registry/GetRegistryInfoResp';
import GetRegistryInfoReq from '@/message/registry/GetRegistryInfoReq';

const net = {
    inited: false,
    init() {
        if (this.inited) {
            return;
        }
        ggx.onMessage(GetRegistryInfoResp, message => {
            store.commit('main/registry/updateServices', message.data.services);
        });
        this.getRegistryInfo();
        net.inited = true;
    },
    getRegistryInfo() {
        ggx.send(GetRegistryInfoReq.create());
    }
};

export default net;
