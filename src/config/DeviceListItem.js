import locInfo from './LocInfo'
import UiStatus, { getStatu } from './UiStatu'
import { Btn } from './AppBtns'
let avatar = 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
export function getDeviceListItem(guid, type) {
    let other = {}
    if (type === 'all') {
        other = {
            address: locInfo.config.address,
            lat: locInfo.config.lat,
            lng: locInfo.config.lng
        }
    } else if (type === 'header') {
        other = {
            status: [getStatu('在线', '#42bd56', false)],
            address: locInfo.config.address,
            lat: locInfo.config.lat,
            lng: locInfo.config.lng,
            info: [],
            tags: [],
            btns: ''
        }
    } else if (type === 'noAvator') {
        avatar = '-'
    }
    return {
        type: 'DeviceListItem',
        guid: 'DeviceListItem' + guid,
        avatar,
        title: '钢铁侠浩克1号',
        subTitle: '序列号：4817460008',
        info: ['使用者：张晓辉', '拥有者：李林'],
        tags: UiStatus.slice(0, 2),
        btns: [
            new Btn({
                txt: '置顶',
                ajax: { api: '/wechat/wechat/check_login', confirm: '确实要这样吗？' }
            }),
            new Btn({
                txt: '取消置顶',
                ajax: { api: '/wechat/wechat/check_login', confirm: '确实要这样吗？' }
            })
        ],
        ...other
    }
}