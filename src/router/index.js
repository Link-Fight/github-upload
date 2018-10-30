import Vue from 'vue'
import VueRouter from 'vue-router'
import MainIndex from '@/views/MainIndex.vue'
import mainRouter, { childRouter } from './main'
import billInfo from './billInfo'
import address from './address'
import ensureRouter from './ensure'
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        billInfo,
        address,
        {
            path: '/',
            name: 'HelloWorld',
            meta: {
                title: 'XAG'
            },
            component: () => import('@/components/HelloWorld.vue')
        },
        {
            path: '/nofly',
            name: 'nofly',
            component: () => import('@/components/pickMap/index.vue')
        },
        {
            path: '/main',
            name: 'MainIndex',
            component: MainIndex,
            children: childRouter
        },
        {
            path: '/main/:action',
            name: 'MainIndexAction',
            component: MainIndex
        },
        {
            path: '/mainDevice',
            name: 'MainDevice',
            component: resolve => require.ensure([], require => resolve(require('../views/MainDevice.vue')), 'views/MainDevice')
        },
        {
            path: '/mainCache/:child',
            name: 'MainCache',
            component: resolve => require.ensure([], require => resolve(require('../views/MainCache.vue')), 'views/MainCache')
        },
        {
            path: '/map',
            name: 'Map',
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/map/index.vue')), 'views/map')
            }
        },
        {
            path: '/imgsMap',
            name: 'ImgsMap',
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/ImgsMap.vue')), 'views/ImgsMap')
            }
        },
        {
            path: '/demo',
            name: 'Demo',
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/Demo.vue')), 'views/demo')
            }
        },
        ...ensureRouter,
        ...mainRouter,
        {
            path: '/qrcode',
            name: 'Qrcode',
            meta: {
                title: '二维码'
            },
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/Qrcode.vue')), 'views/Qrcode')
            }
        },
        {
            path: '/farmingQr',
            name: 'FarmingQr',
            meta: {
                title: '二维码'
            },
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/FarmingQr.vue')), 'views/FarmingQr')
            }
        },
        {
            path: '/diyForm',
            name: 'DiyForm',
            meta: {
                title: ''
            },
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/DiyForm.vue')), 'views/DiyForm')
            }
        },
        {
            path: '/join',
            name: 'Join',
            meta: {
                title: '加入'
            },
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/Join.vue')), 'views/Join')
            }
        },
        {
            path: '/pickLatlng',
            name: 'pickLatlng',
            meta: {
                title: '选择地区'
            },
            component: (resolve) => {
                require.ensure([], require => resolve(require('../components/pickLatlng/index.vue')), 'views/pickLatlng')
            }
        },
        {
            path: '/diyDoc',
            name: 'DiyDoc',
            meta: {
                title: '文档'
            },
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/DiyDoc.vue')), 'views/diyDoc')
            }
        },
        {
            path: '/deviceActive',
            name: 'DeviceActive',
            component: (resolve) =>
                require.ensure([], require => resolve(require('../views/DeviceActive.vue')), 'views/DeviceActive')
        },
        {
            path: '/deviceBind',
            name: 'DeviceBind',
            component: (resolve) =>
                require.ensure([], require => resolve(require('../views/DeviceBind.vue')), 'views/DeviceBind')
        },
        {
            path: '/deviceUser',
            name: 'DeviceUser',
            component: (resolve) =>
                require.ensure([], require => resolve(require('../views/DeviceUser.vue')), 'views/DeviceUser')
        },
        {
            path: '/buyDetail',
            name: 'BuyDetail',
            component: (resolve) =>
                require.ensure([], require => resolve(require('../views/BuyDetail.vue')), 'views/BuyDetail')
        },
        {
            path: '/addressDemo',
            name: 'AddressDemo',
            component: (resolve) =>
                require.ensure([], require => resolve(require('../views/Address.vue')), 'views/Address')
        },
        {
            path: '/vconsole',
            name: 'Vconsole',
            meta: {
                title: 'XAG'
            },
            component: (resolve) => {
                require.ensure([], require => resolve(require('../views/Vconsole.vue')), 'views/Vconsole')
            }
        }
    ]
})
