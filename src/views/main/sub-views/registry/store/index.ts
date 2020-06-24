import ggx from '@/net/ggx';
import RegistryDataResp from '@/message/registry/RegistryDataResp';

const store = {
    namespaced: true,
    state: {
        registryData: []
    },
    mutations: {
        updateProp1(state: any, data: any) {
            state.prop1 = data;
        }
    },
    actions: {},
    getters: {}
};
(function initMessageHandler() {
    ggx.onMessage(
        RegistryDataResp.ACTION_ID,
        data => {
            store.state.registryData = data;
        },
        RegistryDataResp
    );
})();
export default store;
