import ggx from '@/net/ggx';
import store from '@/store';
import servicesStore from '../sub-views/services/store';
import GetRegistryInfoResp from '@/message/registry/GetRegistryInfoResp';
import GetRegistryInfoReq from '@/message/registry/GetRegistryInfoReq';

export default {
    namespaced: true,
    state: {
        services: [],
        groups: new Map(),
        selectedGroupId: undefined
    },
    mutations: {
        updateServices(state, data) {
            state.services = data || [];
            const groupsMap = new Map();
            state.services.forEach(e => {
                let group = groupsMap.get(e.serviceGroupId);
                if (!group) {
                    group = {
                        serviceGroupId: e.serviceGroupId,
                        serviceGroupDescName: e.serviceGroupDescName,
                        services: []
                    };
                    groupsMap.set(e.serviceGroupId, group);
                }
                group.services.push(e);
                if (!state.selectedGroupId) {
                    state.selectedGroupId = e.serviceGroupId;
                }
            });
            state.groups = groupsMap;
        },
        updateSelectedGroupId(state, data) {
            state.selectedGroupId = data;
        }
    },
    actions: {},
    getters: {},
    modules: {
        services: servicesStore
    }
};
