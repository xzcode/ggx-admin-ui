import ggx from '@/net/ggx';
import rootStore from '@/store';
import GetServicesResp from '@/message/registry/GetServicesResp';
import GetServicesReq from '@/message/registry/GetServicesReq';

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
        ggx.send(GetServicesReq.ACTION_ID);
    }, 5000);
    ggx.onMessage(
        GetServicesResp.ACTION_ID,
        data => {
            rootStore.commit('main/registry/updateServices', data.services);
        },
        GetServicesResp
    );
})();
export default store;
