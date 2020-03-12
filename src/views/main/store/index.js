


import dashboard from '../children/dashboard/store'

const menus = [
    {
      name: "首页",
      path:'dashboard',
      icon: 'el-icon-odometer',
      children: null
    },
    {
        name: "系统管理",
        path:'system-config',
        icon: 'el-icon-s-tools',
        children: null
      },
    {
        name: "测试01",
        index:'test01',
        icon: 'el-icon-s-order',
        children: [
            {
                name: "选项1",
                path:'option01',
                children: null
            },
            {
                name: "选项2",
                path:'option03',
                children: null
            },
            {
                name: "选项3",
                path:'option03',
                children: null
            }
        ]
    },
    {
        name: "测试02",
        path:'test02',
        icon: 'el-icon-star-on',
        children: null
      },
  ]

const store = {
    namespaced: true,
    state: {
        menus,
        leftMenu: {
            isCollapse: false
        }
    },
    mutations: {
        menuCollapse(state) {
            state.leftMenu.isCollapse = !state.leftMenu.isCollapse;
        },
        menuOpen(state) {
        },
        menuClose(state) {
        }
    },
    actions: {},
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