import { delay } from './util'
export function getInitData() {
    return delay({
        title: '我的',
        'id': '账号ID.3',
        setting_url: '#/orderDetail?src=/wechat/v4/profile/setting',
        code_url: '#/qrcode?src=/wechat/v4/profile/home/my_qr_code',
        qr: '#/qrcode?isTest=1',
        position: '浪里个浪',
        phone: '156069589885',
        email: '15915823432@qq.com',
        'name': '郑晓欢',
        'identification': 1,
        'avatar': {
            'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?e=1525663097&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dIDy4S7ghIW8OFSNr97X1LYloPE=',
            'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
        },
        'status': [
            {
                'title': '极飞保障先锋',
                'color': ''
            },
            {
                'title': 'C2000教员',
                'color': 'rgb(232, 194, 55)'
            },
            {
                'title': '植保机教员',
                'color': '#67BD59'
            }
        ],
        'licence': [
            {
                'index': 1,
                'title': '测绘无人机教员证',
                'href': '',
                'active': 1,
                'code': '671E1638'
            },
            {
                'index': 1,
                'title': '植保无人机教员证',
                'href': '',
                'active': 1,
                'code': 'EB4860F1'
            },
            {
                'index': 4,
                'title': '植保无人机许可证',
                'href': '',
                'active': 1,
                'code': 'B427BD16'
            },
            {
                'index': 2,
                'title': '测绘无人机许可证',
                'href': '',
                'active': 1,
                'code': 'B245E8DF'
            },
            {
                'index': 5,
                'title': '保障先锋证',
                'href': '',
                'active': 1,
                'code': 'F0B96C54'
            }
        ],
        titles: [
            {
                title: '总作业面积',
                value: '2000亩'
            },
            {
                title: '作业年限',
                value: '2.4年'
            },
            {
                title: '作物种类',
                value: '20种'
            }
        ]
    })
}