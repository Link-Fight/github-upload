import { delay } from './util'

let initData = {}

export function getInitData() {
    console.log('View:初始化')
    return delay(initData)
}