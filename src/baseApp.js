import { install as weuiToastInstall } from './components/WeuiToast'
import { install as weuiAlertInstall } from './components/WeuiAlert'
import { install as weuiConfirmInstall } from './components/WeuiConfirm'
import { install as popActionSheetInstall } from './components/PopActionSheet'
import { install as popBtnsInstall } from './components/PopBtns'
import { install as popInputInstall } from './components/PopInput'
import { install as popSelectInstall } from './components/PopSelect'
import { install as popDocInstall } from './components/PopDoc'
import { install as popAskLoactionInstall } from './components/PopAskLoaction'
import { install as popFormInstall } from './components/PopForm'
import { install as popDetailInstall } from './components/PopDetail'
export default function (Vue) {
    let wrap = document.createElement('div')
    document.body.appendChild(wrap)
    wrap.style.position = 'relative'
    wrap.style.zIndex = 9999
    let popActionSheetInstance = popActionSheetInstall(Vue, wrap)
    let weuiConfirmInstance = weuiConfirmInstall(Vue, wrap)
    let popBtnsInstance = popBtnsInstall(Vue, wrap)
    let popInputInstance = popInputInstall(Vue, wrap)
    let popSelectInstance = popSelectInstall(Vue, wrap)
    let popDocInstance = popDocInstall(Vue, wrap)
    let weuiToastInstance = weuiToastInstall(Vue, wrap)
    let weuiAlertInstance = weuiAlertInstall(Vue, wrap)
    let popAskLoactionInstance = popAskLoactionInstall(Vue, wrap)
    let popFormInstance = popFormInstall(Vue, wrap)
    let popDetailInstance = popDetailInstall(Vue, wrap)
    return {
        watch: {
            $route() {
                console.log('baseApp', '$route')
                popBtnsInstance.hiddenPopBtns()
                popInputInstance.hiddenPopInput()
                popSelectInstance.hiddenPopSelect()
                popDocInstance.hiddenPopDoc()
            }
        },
        created() {
            Vue.prototype.$showToast = weuiToastInstance.showToast
            Vue.prototype.$hiddenToast = weuiToastInstance.hiddenToast
            Vue.prototype.$showAlert = weuiAlertInstance.showAlert
            Vue.prototype.$hiddenAlert = weuiAlertInstance.hiddenAlert
            Vue.prototype.$showConfirm = weuiConfirmInstance.showConfirm
            Vue.prototype.$hiddenConfirm = weuiConfirmInstance.hiddenConfirm
            Vue.prototype.$showPopActionSheet = popActionSheetInstance.showPopActionSheet
            Vue.prototype.$showPopBtns = popBtnsInstance.showPopBtns
            Vue.prototype.$showPopBtnsBottom = popBtnsInstance.showPopBtnsBottom
            Vue.prototype.$showPopInput = popInputInstance.showPopInput
            Vue.prototype.$showPopSelect = popSelectInstance.showPopSelect
            Vue.prototype.$showPopDoc = popDocInstance.showPopDoc
            Vue.prototype.$showPopAskLoaction = popAskLoactionInstance.showPopAskLoaction
            Vue.prototype.$showPopForm = popFormInstance.showPopForm
            Vue.prototype.$showPopDetail = popDetailInstance.showPopDetail
        }
    }
}
