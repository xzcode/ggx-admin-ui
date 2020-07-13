import ggx from '@/net/ggx';
import rootStore from '@/store';
import GetRegistryInfoResp from '@/message/registry/GetRegistryInfoResp';
import GetRegistryInfoReq from '@/message/registry/GetRegistryInfoReq';

const store = {
    namespaced: true,
    state: {
        services: [],
        groups: new Map()
    },
    mutations: {
        updateServices(state, data) {
            state.services = data || [];
            const groupsMap = new Map();
            state.services.forEach(e => {
                let group = groupsMap.get(e.serviceGroupId);
                if (!group) {
                    group = [];
                    groupsMap.set(e.serviceGroupId, group);
                }
                group.push(e);
                console.log(e,groupsMap)
            });
            state.groups = groupsMap;
        }
    },
    actions: {},
    getters: {}
};
export default store;
