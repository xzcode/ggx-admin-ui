export default [
    {
        name: 'main-default',
        path: '/main',
        redirect: '/main/dashboard'
    },
    {
        name: 'main',
        path: '/main',
        component: () => import('@/views/main/index.vue'),
        children: [
            ...require('../sub-views/dashboard/routes').default,
            ...require('../sub-views/system-config/routes').default,
            ...require('../sub-views/test01/routes').default
        ]
    }
];
