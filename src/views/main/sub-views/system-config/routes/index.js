export default [
    {
        name: 'system-config',
        path: '/main/system-config',
        menuName: '系统管理',
        menuIcon: 'el-icon-s-tools',
        isMenu: true,
        component: () => import('../index.vue')
    }
];
