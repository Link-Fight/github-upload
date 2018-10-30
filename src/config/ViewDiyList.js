import { delay } from './util'
import { orderListHeaderBtns } from './AppBtns'
import UiStatus from './UiStatu'
import appFilter, { getFilters } from '../config/AppFilters'
import { getDeviceListItem } from './DeviceListItem'
// const DiyListHeaderType = ['searchHeader', 'filterHeader']

let avatar = 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
let IMG_SRC = [
    {
        'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
        'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
    }, {
        'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/f5k58/6426367adab44aed0151718ab61c8701a18bfb04.jpg?imageView2/0/w/100/h/100&e=1517493632&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:sjk0BFxPPVl8Hay0v9a4ZCMlalw=',
        'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk='
    }, {
        'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/izsoq/385b6a74-ae62-35ce-a61f-4e72c2fc3874.gif?e=1517493664&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:9szXcYp0aBu11eIv2b46rN9D_bM=',
        'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/izsoq/385b6a74-ae62-35ce-a61f-4e72c2fc3874.gif?imageView2/0/w/100/h/100&e=1517493664&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:qW3uKsmERjjqDx5pe5CprBf8KqQ='
    }
]
let OrderListItem = {
    guid: 'OrderListItem_1',
    type: 'OrderListItem',
    avatar,
    title: '李全玉米',
    address: '河南省周口市华西县国营农场旁',
    info: '玉米 |',
    time: '02-21 23:21更新',
    href: '#/teamDetail?src=233&isTest=1',
    tips: ['面积：6540.04亩', '测绘:72.00亩', '完成率：23%']
}
let newOrderListItem = {
    guid: 'OrderListItem_11',
    type: 'OrderListItem',
    avatar: IMG_SRC,
    title: '李全玉米',
    info: '进来看见了看见了的深刻发来得及了大概就是离开国际大驾光临倒计时了科技管理会计老顾客简单分类结果我仍记得发计划但凡事都发过来打飞机',
    time: '02-21 23:21更新'
    // href: '#/teamDetail?src=233&isTest=1'
    // tips: ['面积：6540.04亩', '测绘:72.00亩', '完成率：23%']
}
let TeamListItem = {
    guid: 'TeamListItem_1',
    type: 'TeamListItem',
    avatar,
    title: '新疆运营2队',
    sub_title: '陈小林 32450亩',
    attrs: [
        {
            icon: 'icon-zuobiao',
            n: 12
        }
    ],
    tags: UiStatus.slice(0, 1),
    btns: orderListHeaderBtns.slice(0, 1),
    current: '地球',
    href: '#/teamDetail?src=233&isTest=1',
    tip: '当前团队说明：所有作业数据将计入当前团队'
}
let FarmingListItem = {
    guid: 'FarmingListItem_1',
    type: 'FarmingListItem',
    avatar,
    current: {
        'title': '地球',
        color: 'red'
    },
    title: '李保成 李保成 李保成 李保成 李保成 李保成 李保成 李保成 李保成 李保成',
    address: '距我5.6km 河南省周口市西环线国营农场旁边',
    status: UiStatus.slice(0, 2),
    items: [
        {
            title: '玉米',
            value: '作物'
        },
        {
            title: '2000亩',
            value: '面积'
        },
        {
            title: '10元',
            value: '亩单价'
        },
        {
            title: '03.20-03.31',
            value: '作业时间'
        }
    ],
    tips: {
        time: '2017-05-23 12:56发布',
        avatar,
        title: '王静'
    },
    href: '/diyDetail?isTest=1'
}
let FarmingListItemV2 = Object.assign({},
    FarmingListItem,
    {
        type: 'FarmingListItemV2',
        avatar: null,
        status: UiStatus.slice(2, 4)
    })
function initData(config, filter = appFilter) {
    return {
        title: '订单',
        floatTip: '快速了解农事服务使用流程',
        config: {
            queryApi: 'xxx/xx/xx',
            filter,
            header: {
                btns: orderListHeaderBtns,
                placeholder: '大爷！您要搜索点啥？',
                needSearch: true
            },
            floatBtns: orderListHeaderBtns.slice(1, 2),
            body: [
                getDeviceListItem(1),
                getDeviceListItem(2, 'all'),
                getDeviceListItem(3, 'header'),
                getDeviceListItem(4, 'noAvator'),
                TeamListItem,
                FarmingListItem,
                FarmingListItemV2,
                newOrderListItem,
                OrderListItem,
                {
                    type: 'more',
                    title: '加载更多',
                    url: '/'
                }
            ]
        },
        emptyStatus: {
            txt: '你还没有团队!',
            btns: [
                {
                    txt: '创建我的团队',
                    type: 'submit',
                    action: 'TeamCreate',
                    href: {
                        url: '#/diyDetail?isTest=1'
                    }
                }
            ]
        },
        ...config
    }
}
let moreData = [
    OrderListItem,
    OrderListItem
]
export function getInitData(queryData) {
    console.log('Viw:初始化', JSON.stringify(queryData, null, 4))
    let avg = []
    if (queryData.data) {
        if (queryData.data.header === 'filterHeader') {
            avg.push({ headerType: 'filterHeader' })
            avg.push(getFilters(0, 1))
        }
    }
    return delay(initData(...avg))
}
export function getMoreData() {
    console.log('Viw:加载更多')
    return delay(moreData)
}
export function getQueryData(params) {
    console.log('Viw:搜索 参数', JSON.stringify(params))
    return delay([...moreData, ...moreData])
}