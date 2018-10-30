import { delay } from './util'
import { InfoListItemBtns } from './AppBtns'

export let InfoListItem = {
    type: 'InfoListItem',
    title: '申请加入团队：李保成的团队',
    src: 'isTest',
    phone: '15915797485',
    items: [
        { txt: '申请人', value: '张小勇' },
        { txt: '邀请人', value: '李建辉' },
        { txt: '申请原因', value: '求大佬提携 ' },
        { txt: '申请时间', value: '2018-05-23 10:20' }
    ]
}
function getItemCfg(index) {
    return {
        type: 'InfoListItem',
        guid: index,
        title: index + '申请加入团队：李保成的团队',
        src: 'isTest',
        phone: '15915797485',
        items: [
            { txt: '申请人', value: '张小勇' },
            { txt: '邀请人', value: '李建辉' },
            { txt: '申请原因', value: '求大佬提携 ' },
            { txt: '申请时间', value: '2018-05-23 10:20' }
        ]
    }
}
let initData = {
    title: '订单',
    config: {
        body: [
            getItemCfg(1),
            getItemCfg(2),
            getItemCfg(3),
            getItemCfg(4),
            getItemCfg(5)
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
let itemData = {
    title: '审核',
    items: InfoListItem.items,
    btns: InfoListItemBtns
}

export function getInitData() {
    console.log('View:初始化')
    return delay(initData)
}

export function getItem() {
    console.log('view：加载某项')
    return delay(itemData)
}