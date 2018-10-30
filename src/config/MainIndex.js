import { delay } from './util'
export let tabItems = [
    {
        txt: '团队',
        title: '作业统计',
        icon: 'icon-xiezuo',
        activeicon: 'icon-xiezuo',
        path: 'teamList',
        src: 'isTest',
        params: {
            id: '2333',
            name: '你好'
        }
    },
    {
        txt: '作业',
        title: '作业统计',
        icon: 'icon-fabuxuqiu',
        activeicon: 'icon-fabuxuqiu1',
        path: 'statistics',
        src: 'isTest',
        params: {
            id: '2333',
            name: '你好'
        }
    }
]
export let allTabItems = [
    {
        txt: '团队',
        title: '作业统计',
        icon: 'icon-xiezuo',
        activeicon: 'icon-xiezuo',
        path: 'teamList',
        src: 'isTest',
        params: {
            id: '2333',
            name: '你好'
        }
    },
    {
        txt: '作业',
        title: '作业统计',
        icon: 'icon-fabuxuqiu',
        activeicon: 'icon-fabuxuqiu1',
        path: 'statistics',
        src: 'isTest',
        params: {
            id: '2333',
            name: '你好'
        }
    },
    {
        txt: '作业2',
        title: '作业2统计',
        icon: 'icon-wodexuqiu',
        activeicon: 'icon-wodexuqiu1',
        path: 'diyDetail',
        src: 'isTest',
        params: {
            id: '2333',
            name: '你好'
        }
    },
    {
        txt: '订单',
        icon: 'icon-xuqiudating',
        activeicon: 'icon-xuqiudating1',
        path: 'orderList',
        src: 'isTest',
        params: {
            id: 'orderList',
            name: '你好'
        }
    },
    {
        txt: '应用',
        title: '应用',
        icon: 'icon-tianjiahaoyou1',
        path: 'application',
        src: 'isTest',
        params: {
            id: 'teamList',
            name: '你好'
        }
    },
    {
        txt: '统计',
        icon: 'icon-wode2',
        path: 'task',
        src: 'isTest',
        params: {
            id: 'task',
            name: '你好'
        }
    },
    {
        txt: '我的',
        title: '我的',
        icon: 'icon-touxiang',
        path: 'user',
        src: 'isTest',
        params: {
            id: 'teamDetail',
            name: '你好'
        }
    }
]
function getRudderTab() {
    return delay({
        tabs: tabItems,
        rudderBtn: {
            txt: '发布',
            icon: 'icon-add',
            href: '#/diyForm?isTest=1'
        }
    })
}
function getRudderMoreTab() {
    return delay({
        tabs: tabItems,
        rudderBtn: {
            icon: 'icon-add',
            items: [
                {
                    txt: '发布啊',
                    icon: 'icon-fabuxuqiu',
                    href: '#/diyForm?isTest=1'
                },
                {
                    txt: '发布哎',
                    icon: 'icon-fabuxuqiu',
                    href: '#/diyForm?isTest=1'
                },
                {
                    txt: '发布哎',
                    icon: 'icon-fabuxuqiu',
                    href: '#/diyForm?isTest=1'
                },
                {
                    txt: '发布哎',
                    icon: 'icon-fabuxuqiu',
                    href: '#/diyForm?isTest=1'
                },
                {
                    txt: '发布哎',
                    icon: 'icon-fabuxuqiu',
                    href: '#/diyForm?isTest=1'
                },
                {
                    txt: '发布哎',
                    icon: 'icon-fabuxuqiu',
                    href: '#/diyForm?isTest=1'
                }
            ]
        }
    })
}
export function getInitData(params) {
    console.log('底部Tab:初始化', params)
    if (params.url) {
        if (params.url === 'farming') {
            return getRudderTab()
        } else if (params.url === 'more') {
            return getRudderMoreTab()
        }
    }
    return delay(allTabItems)
}