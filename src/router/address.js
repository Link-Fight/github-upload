export default {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/AddressIndex.vue'),
    children: [
        {
            path: 'list',
            name: 'AddressList',
            component: () => import('@/views/AddressList.vue')
        },
        {
            path: 'form',
            name: 'AddressForm',
            component: () => import('@/views/AddressForm.vue')
        }
    ]
}
