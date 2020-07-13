const routes = [
    {
        name: 'groups',
        path: '/main/registry/groups',
        menuName: '服务分组',
        isMenu: true,
        component: () => import('../')
    }
];
export default routes;
