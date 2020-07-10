export default [
    {
        name: 'test01',
        path: 'test01',
        redirect: 'test01/option01',
        component: () => import('../index.vue'),
        children: [...require('../sub-views/option01/routes').default]
    }
];
