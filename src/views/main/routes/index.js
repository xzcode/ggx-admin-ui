

export default [
    {
        name: 'main-default',
        path: '/main',
        redirect: '/main/dashboard'
    },
    {
        name: 'main',
        path: '/main',
        component: () => import('@/views/main'),
        children: [
            ...require('../children/dashboard/routes').default,
            ...require('../children/system-config/routes').default,
        ]
    }

]
