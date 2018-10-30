export default {
    path: '/billInfo',
    component: () => import('@/views/BillInfoIndex.vue'),
    children: [
        {
            path: 'workflow',
            component: () => import('@/views/BillWorkflow.vue')
        },
        {
            path: 'headerlist',
            component: () => import('@/views/BillInfoHeaderList.vue')
        },
        {
            path: 'form',
            component: () => import('@/views/BillInfoForm.vue')
        },
        {
            path: 'orderList',
            component: () => import('@/views/BillInfoOrderList.vue')
        },
        {
            path: 'result',
            component: () => import('@/views/BillInfoResult.vue')
        }
    ]
}
