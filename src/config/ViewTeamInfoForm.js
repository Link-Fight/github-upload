import { delay } from './util'
import appBtns from './AppBtns'
import DetailForm, { deviceForm } from './DetailForm'
import { getDeviceDetail } from './DetailComFactory'
export function getInitData(params) {
    console.log('teamInfoForm:getInitData', JSON.stringify(params))
    if (params.data) {
        if (params.data.url === 'device') {
            return delay({
                config: {
                    body: getDeviceDetail().concat(deviceForm)
                }
            })
        }
    }
    return delay({
        title: '队伍详情',
        config: {
            body: DetailForm,
            submitApi: '/wechat/wechat/check_login',
            footer: appBtns.slice(0, 2)
        }
    })
}