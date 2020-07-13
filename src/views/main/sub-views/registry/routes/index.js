export default [
    {
        name: 'registry',
        path: 'registry',
        redirect: '/main/registry/groups',
        menuName: '注册中心',
        menuIcon: 'el-icon-view',
        isMenu: true,
        component: () => import('../'),
        children: [
            ...require('../sub-views/groups/routes').default,
            ...require('../sub-views/services/routes').default
        ]
    }
];
