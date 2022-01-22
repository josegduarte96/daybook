export default {
    name: 'auth',
    component: () => import('../../auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import('../../auth/views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../../auth/views/Register.vue')
        }
    ]
}