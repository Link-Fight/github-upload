
const applicationComponent = resolve => require.ensure([], require => resolve(require('../views/Application.vue')), 'views/Application')
const userComponent = resolve => require.ensure([], require => resolve(require('../views/User.vue')), 'views/User')
const diyListCom = resolve => require.ensure([], require => resolve(require('../views/DiyList.vue')), 'views/DiyList')
const diyDetailCom = resolve => require.ensure([], require => resolve(require('../views/DiyDetail.vue')), 'views/DiyDetail')
const taskCom = resolve => require.ensure([], require => resolve(require('../views/Task.vue')), 'views/Task')
const infoListCom = resolve => require.ensure([], require => resolve(require('../views/InfoList.vue')), 'views/InfoList')
const orderListCom = resolve => require.ensure([], require => resolve(require('../views/OrderList.vue')), 'views/OrderList')
const statisticsCom = resolve => require.ensure([], require => resolve(require('../views/Statistics.vue')), 'views/Statistics')
const teamListCom = resolve => require.ensure([], require => resolve(require('../views/TeamList.vue')), 'views/TeamList')
const teamDetailCom = resolve => require.ensure([], require => resolve(require('../views/TeamDetail.vue')), 'views/TeamDetail')
const teamInfoFormCom = resolve => require.ensure([], require => resolve(require('../views/TeamInfoForm.vue')), 'views/teamInfoForm')

export const childRouter = [
    {
        path: 'diyList',
        name: 'MainDiyList',
        meta: {
            title: ''
        },
        component: diyListCom
    },
    {
        path: 'diyDetail',
        name: 'MainDiyDetail',
        meta: {
            title: ''
        },
        component: diyDetailCom
    },
    {
        path: 'task',
        name: 'MainTask',
        meta: {
            title: '记录'
        },
        component: taskCom
    },
    {
        path: 'infoList',
        name: 'MainInfoList',
        meta: {
            title: ''
        },
        component: infoListCom
    },
    {
        path: 'orderList',
        name: 'MainOrderList',
        meta: {
            title: '订单'
        },
        component: orderListCom
    },
    {
        path: 'orderDetail',
        name: 'MainOrderDetail',
        meta: {
            title: ''
        },
        component: diyDetailCom
    },
    {
        path: 'user',
        name: 'MainUser',
        component: userComponent
    },
    {
        path: 'application',
        name: 'MainApplication',
        component: applicationComponent
    },
    {
        path: 'team',
        name: 'MaintTeam',
        meta: {
            title: ''
        },
        component: (resolve) => {
            require.ensure([], require => resolve(require('../views/team.vue')), 'views/team')
        }
    },
    {
        path: 'statistics',
        name: 'MainStatistics',
        meta: {
            title: '统计?'
        },
        component: statisticsCom
    },
    {
        path: 'teamList',
        name: 'MainTeamList',
        meta: {
            title: ''
        },
        component: teamListCom
    },
    {
        path: 'teamDetail',
        name: 'MainTeamDetail',
        meta: {
            title: ''
        },
        component: teamDetailCom
    },
    {
        path: 'teamInfoForm',
        name: 'MainTeamInfoForm',
        meta: {
            title: ''
        },
        component: teamInfoFormCom
    }
]

export default [
    {
        path: '/diyList',
        name: 'DiyList',
        meta: {
            title: ''
        },
        component: diyListCom
    },
    {
        path: '/diyDetail',
        name: 'DiyDetail',
        meta: {
            title: ''
        },
        component: (resolve) => {
            require.ensure([], require => resolve(require('../views/DiyDetail.vue')), 'views/DiyDetail')
        }
    },
    {
        path: '/task',
        name: 'Task',
        meta: {
            title: '记录'
        },
        component: taskCom
    },
    {
        path: '/infoList',
        name: 'InfoList',
        meta: {
            title: ''
        },
        component: infoListCom
    },
    {
        path: '/orderList',
        name: 'OrderList',
        meta: {
            title: ''
        },
        component: orderListCom
    },
    {
        path: '/orderDetail',
        name: 'OrderDetail',
        meta: {
            title: ''
        },
        component: (resolve) => {
            require.ensure([], require => resolve(require('../views/OrderDetail.vue')), 'views/OrderDetail')
        }
    },
    {
        path: '/team',
        name: 'team',
        meta: {
            title: ''
        },
        component: (resolve) => {
            require.ensure([], require => resolve(require('../views/team.vue')), 'views/team')
        }
    },
    {
        path: '/statistics',
        name: 'Statistics',
        meta: {
            title: '统计?'
        },
        component: statisticsCom
    },
    {
        path: '/teamList',
        name: 'TeamList',
        meta: {
            title: ''
        },
        component: teamListCom
    },
    {
        path: '/teamDetail',
        name: 'TeamDetail',
        meta: {
            title: ''
        },
        component: teamDetailCom
    },
    {
        path: '/teamInfoForm',
        name: 'TeamInfoForm',
        meta: {
            title: ''
        },
        component: teamInfoFormCom
    },
    {
        path: '/application',
        name: 'Application',
        component: applicationComponent
    },
    {
        path: '/application/:action',
        name: 'ApplicationAction',
        component: applicationComponent
    },
    {
        path: '/user',
        name: 'User',
        component: userComponent
    },
    {
        path: '/userCard',
        name: 'UserCard',
        component: (resolve) => {
            require.ensure([], require => resolve(require('../views/UserCard.vue')), 'views/User')
        }
    },
    {
        path: '/userForm',
        name: 'UserForm',
        component: (resolve) => {
            require.ensure([], require => resolve(require('../views/UserForm.vue')), 'views/User')
        }
    }
]
