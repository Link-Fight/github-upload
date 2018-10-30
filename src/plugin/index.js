import request, { setGlobelHeader } from '@/util/request.js'
import wxAction from '@/controllers/wx.js'
import * as util from '@/util/index.js'
import { wechatSignature } from '@/apis/wx'
// import uploader from '@/components/uploader.vue'
const isWeixin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' // eslint-disable-line
const isApp = navigator.userAgent.toLowerCase().indexOf('xaircraft') > -1
let Store = {
    isWeixin,
    noWxConfig: true,
    wxConfigPromise: null,
    hasLocation: false
}
export default {
    install(Vue) {
        // Vue.component('uploader', uploader)
        Vue.directive('focus', {
            inserted(el, binding) {
                if (binding.value) el.focus()
            },
            update(el, binding) {
                if (binding.value) el.focus()
            }
        })
        Vue.filter('T', function (text, lang, options) {
            console.log('text', text)
        })
        Vue.filter('itemsCountFilter', function (count, length) {
            let lastCount = count + 10
            if (lastCount > length) {
                return ''
            }
            return (count + 1) + '-' + (lastCount > length ? length : lastCount) + '条'
        })
        Vue.prototype.$isWeixin = isWeixin
        Vue.prototype.$isApp = isApp
        Vue.prototype.$diyAction = request
        Vue.prototype.$configDiyActionHeader = setGlobelHeader
        Vue.prototype.$wxAction = wxAction
        Vue.prototype.$promiseWithUi = function (promise, { toast = true, alert = true } = {}) {
            toast && this.$showToast('正在请求', 'loading')
            return promise.then(data => {
                toast && this.$hiddenToast()
                return data
            }).catch(error => {
                toast && this.$hiddenToast()
                if (alert) {
                    this.$showAlert(error.message)
                }
                return Promise.reject(error)
            })
        }
        Vue.prototype.$setDocTitle = function (title, subtitle = '') {
            if (subtitle && (title + '').indexOf(subtitle) === -1) {
                title = `${title}-${subtitle}`
            }
            document.title = title
            if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
                var iframe = document.createElement('iframe')
                iframe.style.display = 'none'
                iframe.src = '/static/loading_data.gif'
                iframe.onload = () => {
                    setTimeout(() => {
                        document.body.removeChild(iframe)
                    }, 0)
                }
                document.body.appendChild(iframe)
            }
        }
        Vue.prototype.$wxConfig = function () {
            if (Store.isWeixin && Store.noWxConfig) {
                if (!Store.wxConfigPromise) {
                    let wechatSignatureData = null
                    if (wechatSignatureData && wechatSignatureData instanceof Object) {
                        return wxAction.config(wechatSignatureData).then(() => {
                            Store.noWxConfig = false
                        }, err => console.log(err))
                    } else {
                        Store.wxConfigPromise = request(wechatSignature)
                            .then(data => {
                                // util.setSessionStorage('wechatSignature', data)
                                return wxAction.config(data)
                            })
                            .then(() => (Store.noWxConfig = false), err => console.log(err))
                    }
                }
                return Store.wxConfigPromise
            } else {
                return Promise.resolve()
            }
        }
        Vue.prototype.$gotoHref = function (href, { replace } = {}) {
            if (href && typeof href === 'string') {
                if (href.indexOf('http') > -1) {
                    window.location.href = href
                } else {
                    if (href.indexOf('mini:') === 0) {
                        href = href.replace('mini:', '')
                        let miniProgram = this.$wxAction.miniProgram()
                        miniProgram.redirectTo({ url: href })
                    } else if (href.indexOf('#') > -1) {
                        window.location.href = href
                    } else {
                        replace ? this.$router.replace(href) : this.$router.push(href)
                    }
                }
            }
        }
        // 基本以 @/config/Appbtns.js中的配置为执行依据
        Vue.prototype.$onConfigBtnClick = async function (config, $event) {
            let { action, ajax } = config
            if (action === 'DOC') {
                return this.$showPopDoc(ajax.api)
            } else if ((['SELECT', 'FORM', 'DETAIL'].indexOf(action) > -1) && (ajax && ajax.api)) {
                let actionMap = {
                    SELECT: '$showPopSelect',
                    FORM: '$showPopForm',
                    DETAIL: '$showPopDetail'
                }
                return this[actionMap[action]](ajax.api, ajax.params, ajax.cacheKey, '')
            } else if (action === 'SCAN') {
                let ajax = config.ajax
                ajax.params = ajax.params || {}
                let result = await wxAction.toOpenScan()
                Object.assign(ajax.params, { [ajax.input.key || 'key']: result })
            }
            if (config.ajax) {
                let ajax = config.ajax
                let confirmResult = 'ok'
                let ajaxData = config.ajax.params || {}
                if (ajax.confirm) { // 有询问
                    let { action, value, btn } = await this.$showConfirm(ajax.confirm, ajax.input, ajax.cancel, ajax.ok)
                    confirmResult = action
                    ajaxData = Object.assign(ajaxData, value)
                    if (btn) {
                        if (btn.ajax) {
                            btn.ajax.params = Object.assign(btn.ajax.params || {}, ajaxData)
                        }
                        return this.$onConfigBtnClick(btn)
                    }
                }
                // action: TeamCreate、TeamSelector 没有在这里处理
                if (ajax.api && confirmResult === 'ok' && (config.action === 'SCAN' || !config.action)) { // 有接口请求
                    return this.$promiseWithUi(this.$diyAction({
                        url: ajax.api,
                        data: ajaxData,
                        method: ajax.type
                    })).then((result = {}) => {
                        if (result.href || config.href) {
                            this.$gotoHref(result.href || config.href.url || config.href)
                        } else {
                            return result
                        }
                    })
                } else if (config.href && confirmResult === 'ok') {
                    this.$gotoHref(config.href.url || config.href)
                } else {
                    return {
                        config,
                        confirmResult,
                        ajaxData
                    }
                }
            } else if (config.href) {
                this.$gotoHref(config.href.url || config.href)
            }
        }
        Vue.prototype.$extractRouteInfo = function (route = this.$route) {
            let params = route.query.params ? JSON.parse(route.query.params) : {}
            let src = route.query.src
            if (route.query.location !== undefined) {
                params.location = params.location || route.query.location
            }
            return { src, params }
        }
        Vue.prototype.$getLocation = async function (config = {}) {
            console.log('$getLocation')
            let key = window.location.origin + '/' + window.location.pathname + '__hasLocation'
            if (Store.hasLocation === false) {
                let storageValue = this.$util.getStorage(key)
                if (!storageValue) {
                    await this.$showPopAskLoaction()
                } else {
                    Store.hasLocation = true
                }
            }
            return new Promise((resolve, reject) => {
                this.$wxAction.getLocation(
                    Object.assign(config, {
                        success: data => {
                            if (Store.hasLocation === false) {
                                Store.hasLocation = true
                                this.$util.setStorage(key, 1)
                            }
                            resolve(data)
                        },
                        fail: err => {
                            this.$util.setStorage(key, 0)
                            reject(err)
                        }
                    })
                )
            })
        }
        Vue.prototype.$copyObject = function (target) {
            if (target instanceof Object) {
                return JSON.parse(JSON.stringify(target))
            }
            return target
        }
        Vue.prototype.$util = util
    }
}
