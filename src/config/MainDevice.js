import { delay } from './util'
import { getDeviceListItem } from '@/config/DeviceListItem'
import { appBtnsInFooter } from '@/config/AppBtns'
import { FarmingInfo } from '../config/DetailComFactory'
export function getInitData(params) {
    let data = {
        header: [
            FarmingInfo,
            getDeviceListItem(1, 'header')
        ],
        tabs: [{
            txt: '数据统计',
            path: 'statistics',
            src: 'isTest',
            params: {
                id: '2333',
                name: '你好'
            }
        },
        {
            txt: '详细资料',
            path: 'diyDetail',
            src: 'isTest',
            params: {
                url: 'device',
                name: '你好'
            }
        },
        {
            txt: '设备详情',
            path: 'teamInfoForm',
            src: 'isTest',
            params: {
                url: 'device',
                name: '你好'
            }
        }],
        footer: appBtnsInFooter,
        title: '你想想'
    }
    return delay(data)
}