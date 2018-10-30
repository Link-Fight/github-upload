import { delay } from './util'
import { orderListHeaderBtns, TeamListItemBtns } from './AppBtns'
import appFilter from '../config/AppFilters'

let avatar = 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
let OrderListItem = {
    type: 'OrderListItem',
    avatar,
    title: '李全玉米',
    address: '河南省周口市华西县国营农场旁',
    info: '玉米 |',
    time: '02-21 23:21更新',
    href: '#/teamDetail?src=233&isTest=1',
    tips: ['面积：6540.04亩', '测绘:72.00亩', '完成率：23%']
}
let TeamListItem = {
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
    tags: [
        {
            txt: '倒腾',
            color: ''
        }
    ],
    btns: TeamListItemBtns,
    current: '地球最前',
    href: '#/teamDetail?src=233&isTest=1',
    tip: '当前团队说明：所有作业数据将计入当前团队'
}
let FarmingListItem = {
    type: 'FarmingListItem',
    avatar,
    title: '李保成',
    address: '距我5.6km 河南省周口市西环线国营农场旁边',
    status: [
        {
            title: '已结束',
            color: 'green'
        }
    ],
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
    }
}
let initData = {
    title: '订单',
    config: {
        queryApi: 'xxx/xx/xx',
        filter: appFilter,
        header: {
            btns: orderListHeaderBtns
        },
        body: [
            OrderListItem || TeamListItem,
            OrderListItem || FarmingListItem,
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
                action: 'TeamCreate'
            }
        ]
    }
}
let moreData = [
    OrderListItem,
    OrderListItem
]

export function getInitData() {
    console.log('Viw:初始化')
    return delay(initData)
}
export function getMoreData() {
    console.log('Viw:加载更多')
    return delay(moreData)
}

export function getQueryData(params) {
    console.log('Viw:搜索 参数', JSON.stringify(params))
    return delay([...moreData, ...moreData])
}