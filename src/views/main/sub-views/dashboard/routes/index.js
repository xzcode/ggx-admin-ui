export default [
    {
        name: 'dashboard',
        path: '/main/dashboard',
        menuName: '首页',
        menuIcon: 'el-icon-odometer',
        isMenu: true,
        component: () => import('../index.vue')
    }
];
