import ggx from '@/net/ggx';
import rootStore from '@/store';
import GetRegistryInfoResp from '@/message/registry/GetRegistryInfoResp';
import GetRegistryInfoReq from '@/message/registry/GetRegistryInfoReq';

const store = {
    namespaced: true,
    state: {
        services: []
    },
    mutations: {
        updateServices(state, data) {
            state.services = data;
        }
    },
    actions: {},
    getters: {}
};
(function initMessageHandler() {
    setInterval(() => {
        ggx.send(GetRegistryInfoReq.create());
    }, 5000);
})();
export default store;
