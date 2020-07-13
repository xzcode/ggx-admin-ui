import { router, routes } from '@/router';
import store from '@/store';
import dashboard from '../sub-views/dashboard/store';
import registry from '../sub-views/registry/store';
import screenfull from 'screenfull';
import ggx from '@/net/ggx';

function matchMenu(path, menus) {
    for (let i = 0; i < menus.length; i++) {
        const m = menus[i];
        if (m.path === path) {
            return m;
        }
        if (m.children) {
            const cm = matchMenu(path, m.children);
            if (cm) {
                return cm;
            }
        }
    }
}

export default {
    namespaced: true,
    state: {
        menus: [],
        leftMenu: {
            isCollapse: false
        },
        activeMenu: undefined,
        tabs: [],
        isFullscreen: false
    },

    mutations: {
        initMenus(state) {
            state.menus = routes.filter(
                e => e.isMenu && e.name === 'main'
            )[0].children;
            state.activeMenu = state.menus[0].path;
        },
        menuCollapse(state) {
            state.leftMenu.isCollapse = !state.leftMenu.isCollapse;
        },
        menuSelect(state, path) {
            const menu = matchMenu(path, state.menus);
            if (!menu) {
                return;
            }
            state.activeMenu = menu;
            let selectedTab = null;
            for (const tab of state.tabs) {
                if (tab.path === path) {
                    selectedTab = tab;
                } else {
                    tab.active = false;
                }
            }
            if (selectedTab) {
                selectedTab.active = true;
                return;
            }

            const closeable = state.menus[0].path !== menu.path;

            selectedTab = {
                name: menu.menuName,
                path: menu.path,
                fullnames: menu.fullnames,
                closeable,
                active: true
            };

            state.tabs.push({ ...selectedTab });
        },
        tabRemove(state, path) {
            let index = 0;

            state.tabs.forEach((e, i) => {
                if (path !== e.path) {
                    e.active = false;
                } else {
                    index = i;
                }
            });
            state.tabs.splice(index, 1);
            const tab = state.tabs[index - 1];
            if (tab) {
                tab.active = true;
            }
            router.currentRoute.path !== tab.path && router.push(tab.path);
            store.commit('main/menuSelect', tab.path);
        },
        tabClick(state, path) {
            store.commit('main/menuSelect', path);
            router.currentRoute.path !== path && router.push(path);
        },
        hasTab(state, tabName) {
            for (const tab of state.tabs) {
                if (tab.name === tabName) {
                    return tab;
                }
            }
        },
        tabRemoveCurrent(state) {
            let index = 0;
            if (state.tabs.length === 1) {
                return;
            }
            state.tabs = state.tabs.filter((e, i) => {
                if (e.active) {
                    index = i;
                }
                return !e.active;
            });

            const selectedTab = state.tabs[index - 1];
            if (selectedTab) {
                store.commit('main/menuSelect', selectedTab.path);
                router.currentRoute.path !== selectedTab.path &&
                    router.push(selectedTab.path);
            }
        },
        tabRemoveLeft(state) {
            let index = 0;
            let currentTab;
            state.tabs.every((e, i) => {
                if (e.active) {
                    index = i;
                    currentTab = e;
                    return false;
                }
                return true;
            });
            state.tabs = state.tabs.filter((e, i) => {
                return i === 0 || i >= index;
            });
            const path = currentTab.path;
            store.commit('main/menuSelect', path);
            router.currentRoute.path !== path && router.push(path);
        },
        tabRemoveRight(state) {
            let index = 0;
            let currentTab = null;
            state.tabs.every((e, i) => {
                if (e.active) {
                    index = i;
                    currentTab = e;
                    return false;
                }
                return true;
            });
            state.tabs = state.tabs.filter((e, i) => {
                return i <= index;
            });
            const path = currentTab.path;
            store.commit('main/menuSelect', path);
            router.currentRoute.path !== path && router.push(path);
        },
        tabRemoveAll(state) {
            state.tabs = [state.tabs[0]];
            const path = state.tabs[0].path;
            store.commit('main/menuSelect', path);
            router.currentRoute.path !== path && router.push(path);
        },

        initTabs(state) {
            const menu = state.menus[0];
            const firstTabs = state.tabs.filter(e => e.path === menu.path);
            if (firstTabs && firstTabs.length > 0) {
                return;
            }
            state.activeMenu = menu;
            const tab = {
                name: menu.menuName,
                path: menu.path,
                fullnames: menu.fullnames,
                closeable: false,
                active: true
            };
            state.tabs.push(tab);

            const initPath = router.currentRoute.path;

            if (initPath && initPath !== '') {
                store.commit('main/menuSelect', initPath);
            }
        },
        triggerFullscreen(state) {
            state.isFullscreen = true;
            screenfull.toggle();
        }
    },

    actions: {
        testAction(context) {}
    },

    getters: {},
    modules: {
        dashboard,
        registry
    }
};
