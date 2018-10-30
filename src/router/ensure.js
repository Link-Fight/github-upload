let EnsureForm = () => import('@/views/EnsureForm.vue')
export default [
    {
        path: '/ensureForm',
        name: 'EnsureForm',
        component: EnsureForm
    },
    {
        path: '/ensureForm/:action',
        name: 'EnsureFormActioin',
        component: EnsureForm
    }
]