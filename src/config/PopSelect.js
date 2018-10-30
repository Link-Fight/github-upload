import { delay } from './util'
import appFilter from '../config/AppFilters'

// let avatar = 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='

function getItemCfg(index, disabled) {
    return {
        value: index,
        avatar: 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
        txt: `新疆运营${index}队`,
        disabled
    }
}
let baseDataItems = [
    getItemCfg(0),
    {
        avatar: '-',
        txt: '新疆运营3队',
        subTitle: '新疆运营2018小分队',
        color: 'red'
    },
    {
        type: 'more',
        title: '加载更多',
        url: 'isTest'
    }
]
let moreData = [
    getItemCfg(1),
    getItemCfg(2),
    getItemCfg(3),
    getItemCfg(4, true),
    getItemCfg(5),
    getItemCfg(6)
]
function getInitDataFn(title, subTitle, body = []) {
    return {
        title,
        subTitle,
        config: {
            filter: appFilter,
            queryApi: 'isTest',
            needSearch: true,
            body: body
        },
        emptyStatus: {
            txt: '你还没有团队!'
        }
    }
}
function getEnsureData() {
    return [
        {
            'value': '00-000-0001',
            'title': '测试物料【00-000-0001】',
            subTitle: ['应归还数量：2', '入库数量：1', '是否必须：必须', '归还日期：2018/5/2'],
            'formType': 1,
            items: baseDataItems.slice(0, 2)
        },
        { 'value': '01-003-00035', 'title': 'GPS天线【01-003-00035】', 'formType': 2, subTitle: '是个好东西' },
        { 'value': '01-003-00109', 'title': '900M天线【01-003-00109】[MAX:10]', 'formType': 1, MAX: 10 },
        { 'value': '01-003-00113', 'title': 'GPS天线-新【01-003-00113】', 'formType': 2 },
        { 'value': '01-027-00315', 'title': 'USB升级线【01-027-00315】', 'formType': 1 }, { 'value': '01-027-00363', 'title': '900M/GPS馈线【01-027-00363】', 'formType': 2 }, { 'value': '01-027-00388', 'title': '动力板与飞控连接线【01-027-00388】', 'formType': 1 }, { 'value': '01-027-00390', 'title': '流量计与水泵驱动板连接线【01-027-00390】', 'formType': 2 }, { 'value': '01-027-00391', 'title': '水泵与水泵驱动板连接线【01-027-00391】', 'formType': 1 }, { 'value': '01-027-00392', 'title': '水泵驱动板电源线【01-027-00392】', 'formType': 2 }]
}
export function getInitData(params) {
    let { data } = params
    console.log('Viw:getInitData', JSON.stringify(params, null, 4))
    let type = data && data.type
    let result = getInitDataFn('团队', '没经过认证的团队无法选择', baseDataItems)
    if (type === 'ensure') {
        result = getInitDataFn('选择物料', '', getEnsureData())
    }
    return delay(result)
}
export function getMoreData() {
    console.log('Viw:加载更多')
    return delay(moreData)
}
export function getQueryData(params) {
    console.log('Viw:搜索 参数', JSON.stringify(params))
    return delay([getItemCfg(0), getItemCfg(2), getItemCfg(3), getItemCfg(4)])
}
