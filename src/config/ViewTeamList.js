import { delay } from './util'
import { teamListBadgeBtns, TeamListItemBtns } from './AppBtns'
import UiStatus from './UiStatu'
import appFilter from '../config/AppFilters'

let avatar = 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
let id = 0
function getItemConfig(certificate, tags) {
    id++
    return {
        avatar,
        title: `新疆运营${id}队`,
        certificate,
        sub_title: '陈小林 32450亩',
        attrs: [
            {
                icon: 'icon-zuobiao',
                n: 12
            }
        ],
        tags: tags ? UiStatus.slice(0, 1) : [],
        btns: TeamListItemBtns,
        current: '地球最前',
        href: '#/teamDetail?src=233&isTest=1',
        tip: '当前团队说明：所有作业数据将计入当前团队'
    }
}
let initData = {
    title: '团队',
    config: {
        header: {
            title: '团队列表',
            btns: teamListBadgeBtns
        },
        filter: appFilter,
        body: [
            getItemConfig(1, true),
            getItemConfig(2),
            getItemConfig(0, true),
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
    getItemConfig(),
    getItemConfig()
]
let teamList = {
    body: [
        {
            key: 1,
            txt: '新疆运营1队',
            default: true
        },
        {
            key: 2,
            txt: '新疆运营2队',
            default: false
        },
        {
            key: 3,
            txt: '新疆运营3队',
            default: false
        },
        {
            key: 4,
            txt: '新疆运营4队',
            default: false
        },
        {
            key: 5,
            txt: '新疆运营5队',
            default: false
        },
        {
            key: 6,
            txt: '新疆运营6队',
            default: false
        },
        {
            key: 7,
            txt: '新疆运营7队',
            default: false
        },
        {
            key: 8,
            txt: '新疆运营8队',
            default: false
        }
    ],
    submitApi: '/wechat/wechat/check_login'
}
export function getInitData() {
    console.log('Viw:初始化')
    return delay(initData)
}
export function getMoreData() {
    console.log('Viw:加载更多')
    return delay(moreData)
}
export function getSelectDatas() {
    console.log('Viw:加载选择团队')
    return delay(teamList)
}
export function getQueryData(params) {
    console.log('Viw:搜索 参数', JSON.stringify(params))
    return delay([...moreData, ...moreData])
}