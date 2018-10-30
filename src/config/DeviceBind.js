import { delay } from './util'
import { appBtnsInFooter } from './AppBtns'
export function getInitData(params) {
    console.log('getInitData', JSON.stringify(params))
    return delay({
        device: {
            avatar: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
            title: 'P20 2018款植保无人机',
            sn: 'P256162547'
        },
        'user': {
            avatar: 'http://121.40.178.51/XCT/%E8%BF%90%E8%90%A5%E7%AE%A1%E7%90%86V4%E5%8E%9F%E5%9E%8B/images/%E6%BF%80%E6%B4%BB___%E7%BB%91%E5%AE%9A%E8%AE%BE%E5%A4%87/u8185.png',
            name: 'phd',
            phone: '1591591591597'
        },
        btns: appBtnsInFooter
    })
}