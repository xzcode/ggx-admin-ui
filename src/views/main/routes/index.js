export default [
    {
        name: 'main',
        path: '/main',
        redirect: '/main/dashboard',
        menuName: '首页',
        menuIcon: 'el-icon-odometer',
        isMenu: true,
        component: () => import('@/views/main/index.vue'),
        children: [
            ...require('../sub-views/dashboard/routes').default,
            ...require('../sub-views/registry/routes').default,
            ...require('../sub-views/system-config/routes').default
        ]
    }
];
