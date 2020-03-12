
import dashboardRoutes from '../children/dashboard/routes'

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
            ...dashboardRoutes
        ]
    }

]
