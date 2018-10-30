import { delay } from './util'
export function scanCard(params) {
    console.log('scanCard', JSON.stringify(params))
    if (params.data.from) {
        return delay({
            'active': {
                msg: '激活卡有效',
                sn: '123213213'
            },
            'safeguard': {
                msg: '激活卡有效',
                sn: '123'
            }
        })
    } else {
        return delay({
            'active': {
                msg: '激活卡有效',
                sn: '123213213'
            },
            'safeguard': {
                msg: '未检测到无忧计划卡',
                sn: ''
            }
        })
    }
}
export function getInitData(params) {
    console.log('getInitData', JSON.stringify(params))
    return delay({
        device: {
            avatar: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/upload/2018/05/31/5a224190bf3d248118fa7258025f5c8e.png?imageView2/0/w/100/h/1000&e=1843115169&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:U7-62pjXNVI3MF7gShX_OjS5Tf8=' || 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
            title: 'P20 2018款植保无人机',
            sn: 'P256162547',
            hasSafeguard: true
        },
        'active': {
            title: '',
            msg: '',
            sn: '',
            tip: ''
        },
        'safeguard': {
            title: '',
            msg: '',
            sn: '',
            tip: ''
        },
        api: {
            Active: 'isTest',
            SafeguardBuy: 'isTest',
            SafeguardDoc: 'isTest',
            ScanCard: 'isTest'
        }
    })
}
export function activeDevice(params) {
    console.log('activeDevice', JSON.stringify(params))
    return delay({
        href: '#/diyForm?isTest=1'
    })
}