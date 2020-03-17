


import { router } from '@/router'
import dashboard from '../sub-views/dashboard/store'
import screenfull from 'screenfull'

const menus = [
    {
        name: "首页",
        path: '/main/dashboard',
        icon: 'el-icon-odometer',
        children: null
    },
    {
        name: "系统管理",
        path: '/main/system-config',
        icon: 'el-icon-s-tools',
        children: null
    },
    {
        name: "测试01",
        path: '/main/test01',
        icon: 'el-icon-s-order',
        children: [
            {
                name: "选项1",
                path: '/main/test01/option01',
                children: null
            },
            {
                name: "选项2",
                path: '/main/test01/option02',
                children: null
            },
            {
                name: "选项2",
                path: '/main/test01/option02',
                children: null
            }
        ]
    },
    {
        name: "测试02",
        path: '/main/test02',
        icon: 'el-icon-star-on',
        children: null
    },
]

const matchMenu = function (path, menus) {
    for (let i = 0; i < menus.length; i++) {
        const m = menus[i];
        if (m.path == path) {
            return m;
        }
        if (m.children) {
            let cm = matchMenu(path, m.children);
            if (cm) {
                return cm;
            }

        }
    }
}

const makeFullname = function (pMenus, fullnames = []) {
    for (let i = 0; i < pMenus.length; i++) {
        const m = pMenus[i];
        m.fullnames = [...fullnames];
        m.fullnames.push(m.name);
        if (m.children) {
            return makeFullname(m.children, [...m.fullnames]);
        }
    }
}

makeFullname(menus)

const makeTestTabData = function (num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(
            {
                name: 'xxxxx',
                path: 'xxxxxxx',
                fullnames: 'xxxxxxx',
                closeable: true
            }
        )
    }
    return arr;
}

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
        menuCollapse(state) {
            state.leftMenu.isCollapse = !state.leftMenu.isCollapse;
        },
        menuSelect(state, path) {
            let menu = matchMenu(path, state.menus);
            if (!menu) {
                return;
            }
            state.activeMenu = menu;
            let selectedTab = null;
            for (const tab of state.tabs) {
                if (tab.path == path) {
                    selectedTab = tab;
                } else {
                    tab.active = false;
                }
            }
            if (selectedTab) {
                selectedTab.active = true;
                return;
            }

            let closeable = menus[0].path != menu.path;

            selectedTab = {
                name: menu.name,
                path: menu.path,
                fullnames: menu.fullnames,
                closeable,
                active: true,
            }

            state.tabs.push({ ...selectedTab });
        },
        tabRemove(state, path) {
            let index = 0;

            state.tabs.forEach((e, i) => {
                if (path != e.path) {
                    e.active = false;
                } else {
                    index = i;
                }
            });
            state.tabs.splice(index, 1);
            let tab = state.tabs[index - 1];
            if (tab) {
                tab.active = true;
            }
            router.currentRoute.path != tab.path && router.push(tab.path);
            this.commit('main/menuSelect', tab.path)

        },
        tabClick(state, path) {
            this.commit('main/menuSelect', path)
            router.currentRoute.path != path && router.push(path);

        },
        initMenu(state) {


        },
        hasTab(state, tabName) {
            for (const tab of state.tabs) {
                if (tab.name == tabName) {
                    return tab;
                }
            }
        },
        tabRemoveCurrent(state) {
            let index = 0;
            state.tabs = state.tabs.filter((e, i) => {
                if (e.active) {
                    index = i;
                }
                return !e.active
            });
            let selectedTab = state.tabs[index - 1];
            if (selectedTab) {
                this.commit('main/menuSelect', selectedTab.path);
                router.currentRoute.path != selectedTab.path && router.push(selectedTab.path);
            }


        },
        tabRemoveLeft(state) {
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
                return i === 0 || i >= index;
            });
            let path = currentTab.path;
            this.commit('main/menuSelect', path);
            router.currentRoute.path != path && router.push(path);
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
            let path = currentTab.path;
            this.commit('main/menuSelect', path);
            router.currentRoute.path != path && router.push(path);
        },
        tabRemoveAll(state) {
            state.tabs = [state.tabs[0]];
            let path = state.tabs[0].path;
            this.commit('main/menuSelect', path);
            router.currentRoute.path != path && router.push(path);
        },

        initTabs(state) {
            let menu = menus[0];
            let firstTabs = state.tabs.filter(e => e.path == menu.path);
            if (firstTabs && firstTabs.length > 0) {
                return;
            }
            state.activeMenu = menu;
            let tab = {
                name: menu.name,
                path: menu.path,
                fullnames: menu.fullnames,
                closeable: false,
                active: true
            }
            state.tabs.push(tab)

            let initPath = router.currentRoute.path;

            if (initPath && initPath != '') {
                this.commit('main/menuSelect', initPath)
            }

        },
        triggerFullscreen(state) {
            state.isFullscreen = true;
            screenfull.toggle();
        },
    },
    actions: {
        testAction(context) {

        },
    },
    getters: {},
    modules: {
        dashboard
    }
}



export const mappedComponent = {

    computed: {
    }

}


export default store