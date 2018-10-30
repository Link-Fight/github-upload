import { delay } from './util'
import { appBtnsInFooter } from './AppBtns'
import UiStatus from './UiStatu'
import { teamDetailLinkCellFormImg } from './LinkCellGroup'
let avatar = 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
let itemCfg = {
    avatar,
    title: '新疆运营2队',
    bg: 'red',
    subTitle: '陈小林 32450亩',
    icon: '',
    attrs: [],
    tags: UiStatus,
    btns: [],
    current: '',
    href: '#/detail?src=233',
    tip: ''
}
export function getInitData(data) {
    console.log('getInitData', JSON.stringify(data, null, 4))
    return delay({
        title: '队伍详情',
        config: {
            header: itemCfg,
            body: [
                {
                    type: 'LinkCellGroup',
                    title: '',
                    items: [{
                        icon: '',
                        title: '团队订单',
                        subTitle: ['23434 | 2343243', '23434 | 2343243'],
                        value: '20',
                        href: '#/teamDetail?src=/api/team1&params={"name":789}&isTest=1'
                    },
                    {
                        icon: '',
                        title: '作业数据',
                        subTitle: '',
                        value: '',
                        href: '#/teamDetail?src=/api/team1&params={"name":123}&isTest=1'
                    },
                    {
                        icon: '',
                        title: '导出',
                        subTitle: '',
                        value: '',
                        href: '#/detail?src=/api/team1&params={name:123}&isTest=1'
                    }
                    ]
                },
                {
                    type: 'LinkCellForImgGroup',
                    title: teamDetailLinkCellFormImg.title,
                    items: teamDetailLinkCellFormImg.items
                }
            ],
            footer: appBtnsInFooter
        }
    })
}