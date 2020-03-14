
export default [
    {
        name: 'test01',
        path: 'test01',
        component: () => import('../'),
        children: [
            ...require('../children/option01/routes').default,
        ]
    }

]
