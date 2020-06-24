import { router } from '@/router';
import rootStore from '@/store';
import dashboard from '../sub-views/dashboard/store';
import registry from '../sub-views/registry/store';
import screenfull from 'screenfull';
import ggx from '@/net/ggx';

const menus = [
    {
        name: '首页',
        path: '/main/dashboard',
        icon: 'el-icon-odometer',
        children: null
    },
    {
        name: '注册中心',
        path: '/main/registry',
        icon: 'el-icon-view',
        children: null
    },
    {
        name: '系统管理',
        path: '/main/system-config',
        icon: 'el-icon-s-tools',
        children: null
    },
    /* 
    {
        name: '测试01',
        path: '/main/test01',
        icon: 'el-icon-s-order',
        children: [
            {
                name: '选项1',
                path: '/main/test01/option01',
                children: null
            },
            {
                name: '选项2',
                path: '/main/test01/option02',
                children: null
            },
            {
                name: '选项3',
                path: '/main/test01/option03',
                children: null
            }
        ]
    },
    {
        name: '测试02',
        path: '/main/test02',
        icon: 'el-icon-star-on',
        children: null
    }
 */
];

function matchMenu(path: any, menus: any): any {
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

function makeFullname(pMenus: any[], fullnames: any[] = []): any {
    for (let i = 0; i < pMenus.length; i++) {
        const m = pMenus[i];
        m.fullnames = [...fullnames];
        m.fullnames.push(m.name);
        if (m.children) {
            return makeFullname(m.children, [...m.fullnames]);
        }
    }
}

makeFullname(menus);

const store = {
    namespaced: true,
    state: {
        menus,
        leftMenu: {
            isCollapse: false
        },
        activeMenu: menus[0].path,
        tabs: [],
        userInfo: {
            username: 'unknown',
            avatar: '',
            token: null,
            permissions: []
        },
        isFullscreen: false
    },

    mutations: {
        menuCollapse(state: any) {
            state.leftMenu.isCollapse = !state.leftMenu.isCollapse;
        },
        menuSelect(state: any, path: string) {
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

            const closeable = menus[0].path !== menu.path;

            selectedTab = {
                name: menu.name,
                path: menu.path,
                fullnames: menu.fullnames,
                closeable,
                active: true
            };

            state.tabs.push({ ...selectedTab });
        },
        tabRemove(state: any, path: any) {
            let index = 0;

            state.tabs.forEach((e: any, i: any) => {
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
            rootStore.commit('main/menuSelect', tab.path);
        },
        tabClick(state: any, path: any) {
            rootStore.commit('main/menuSelect', path);
            router.currentRoute.path !== path && router.push(path);
        },
        initMenu(state: any) {},
        hasTab(state: any, tabName: any) {
            for (const tab of state.tabs) {
                if (tab.name === tabName) {
                    return tab;
                }
            }
        },
        tabRemoveCurrent(state: any) {
            let index = 0;
            if (state.tabs.length === 1) {
                return;
            }
            state.tabs = state.tabs.filter((e: any, i: any) => {
                if (e.active) {
                    index = i;
                }
                return !e.active;
            });

            const selectedTab = state.tabs[index - 1];
            if (selectedTab) {
                rootStore.commit('main/menuSelect', selectedTab.path);
                router.currentRoute.path !== selectedTab.path &&
                    router.push(selectedTab.path);
            }
        },
        tabRemoveLeft(state: any) {
            let index = 0;
            let currentTab;
            state.tabs.every((e: any, i: number) => {
                if (e.active) {
                    index = i;
                    currentTab = e;
                    return false;
                }
                return true;
            });
            state.tabs = state.tabs.filter((e: any, i: any) => {
                return i === 0 || i >= index;
            });
            const path = (currentTab as any).path;
            rootStore.commit('main/menuSelect', path);
            router.currentRoute.path !== path && router.push(path);
        },
        tabRemoveRight(state: any) {
            let index = 0;
            let currentTab = null;
            state.tabs.every((e: any, i: any) => {
                if (e.active) {
                    index = i;
                    currentTab = e;
                    return false;
                }
                return true;
            });
            state.tabs = state.tabs.filter((e: any, i: any) => {
                return i <= index;
            });
            const path = (currentTab as any).path;
            rootStore.commit('main/menuSelect', path);
            router.currentRoute.path !== path && router.push(path);
        },
        tabRemoveAll(state: any) {
            state.tabs = [state.tabs[0]];
            const path = state.tabs[0].path;
            rootStore.commit('main/menuSelect', path);
            router.currentRoute.path !== path && router.push(path);
        },

        initTabs(state: any) {
            const menu = menus[0];
            const firstTabs = state.tabs.filter(
                (e: any) => e.path === menu.path
            );
            if (firstTabs && firstTabs.length > 0) {
                return;
            }
            state.activeMenu = menu;
            const tab = {
                name: menu.name,
                path: menu.path,
                fullnames: (menu as any).fullnames,
                closeable: false,
                active: true
            };
            state.tabs.push(tab);

            const initPath = router.currentRoute.path;

            if (initPath && initPath !== '') {
                rootStore.commit('main/menuSelect', initPath);
            }
        },
        triggerFullscreen(state: any) {
            state.isFullscreen = true;
            (screenfull as any).toggle();
        }
    },

    actions: {
        testAction(context: any) {}
    },

    getters: {},
    modules: {
        dashboard,
        registry
    }
};

(function initMessageHandler() {})();

export default store;
