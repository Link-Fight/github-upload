import { delay } from './util'
import { safeguardDetailLinkCellGroup, insurancelnInfoLinkCellGroup, insurancelnDetailLinkCellGroup } from '@/config/LinkCellGroup'
import AppAgressBtn, { appBuyAgress } from '@/config/AppAgressBtn'
export function getInitData(params) {
    console.log('getInitData:参数', JSON.stringify(params))
    let { url } = params
    if (url === 'safeguard') {
        return delay({
            title: '无忧计划详情',
            config: {
                header: {
                    type: 'safeguard',
                    title: ['极飞P系列植保无人机', '无忧计划'],
                    subTitle: ['保障设备：P20155236666'],
                    active: true
                },
                body: [
                    safeguardDetailLinkCellGroup
                ],
                agressBtn: {
                    txt: '前往购买',
                    type: 'alert'
                }
            }
        })
    } else if (url === 'insurance') {
        return delay({
            title: '保险详情',
            config: {
                header: {
                    type: 'insurance',
                    img: 'https://images.unsplash.com/photo-1476616853026-24c1f0309646?ixlib=rb-0.3.5&q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max&ixid=eyJhcHBfaWQiOjcwOTV9&s=14ff8a50632f980405f75de8da0e20be',
                    title: ['极飞P系列植保无人机', '无忧计划'],
                    subTitle: ['众安保险承保 l 最高30万保额']
                },
                body: [
                    insurancelnDetailLinkCellGroup
                ],
                agressBtn: AppAgressBtn
            }
        })
    } else if (url === 'insuranced') {
        let tabCom = {
            type: 'tab',
            variable: 'tab0',
            items: ['保险信息', '保险详情']
        }
        return delay({
            title: '保险详情',
            config: {
                header: {
                    type: 'insurance',
                    title: ['极飞P20低空农用智能植保机', '三者责任险'],
                    subTitle: ['保单号：55415566666666', '由众安保险承保'],
                    active: false
                },
                body: [
                    tabCom,
                    Object.assign({}, insurancelnInfoLinkCellGroup, {
                        show: {
                            key: 'tab0',
                            value: '保险信息'
                        }
                    }),
                    Object.assign({}, insurancelnDetailLinkCellGroup, {
                        show: {
                            key: 'tab0',
                            value: '保险详情'
                        }
                    })
                ],
                agressBtn: appBuyAgress
            }
        })
    }
}