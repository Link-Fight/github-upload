import { delay } from './util'
import { TaskItems } from './LinkCellGroup'

export function getQueryData(params) {
    console.log('请求数据：', JSON.stringify(params, null, 4))
    return delay({
        body: TaskItems
    })
}
export function getInitData() {
    console.log('页面初始化：')
    let data = {
        title: '作业数据-新疆运营1队',
        btns: [{
            icon: 'icon-tongji',
            txt: '统计',
            href: '#/'
        }],
        queryApi: 'isTest'
    }
    return delay(data)
}