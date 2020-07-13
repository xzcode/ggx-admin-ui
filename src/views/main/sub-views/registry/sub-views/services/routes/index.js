const routes = [
    {
        name: 'services',
        path: '/main/registry/services',
        menuName: '全部服务',
        isMenu: true,
        component: () => import('../')
    }
];
export default routes;
