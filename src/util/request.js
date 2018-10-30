import axios from 'axios'
import qs from 'qs'
import wx from 'weixin-js-sdk'
window.axios = axios
let gloableHeaderConfig = {}
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.interceptors.request.use(function (config) {
    config.method = config.method || 'get'
    if (config.method.toLowerCase() === 'get') {
        config.params = config.params || {}
        config.params.fromUrl = window.location.href
    } else if (config.method.toLowerCase() === 'post') {
        Object.assign(config.data, { fromUrl: window.location.href })
        config.data = qs.stringify(config.data)
    }
    return config
})

const codeMessage = {
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时'
}
function checkStatus(response) {
    let httpStatus = response.status
    if (httpStatus >= 200 && httpStatus < 300) {
        let status = response.data.status
        switch (status) {
            case 8888:
                if (response.data.data) {
                    if (response.data.data.indexOf('mini:') === 0) {
                        wx.miniProgram.redirectTo({ url: response.data.data })
                    } else {
                        window.location.href = response.data.data
                    }
                }
                break
            case 8899:
                window.history.go(-1)
                break
            case 4304:
                break
            case 4300:
                break
        }
    }
    return response
}
function checkHttpStatus(response) {
    let httpStatus = response.status
    if (httpStatus !== 200) {
        return {
            data: {
                status: httpStatus,
                message: (response.data && response.data.message) || codeMessage[httpStatus]
            }
        }
    }
    return response
}
export { axios }
export function setGlobelHeader(config = {}) {
    Object.assign(gloableHeaderConfig, config)
}
export default function request({ url, data = {}, method = 'get', type = 'json', config = {} }) {
    let baseCfg = Object.assign(Object.create(null), config)
    baseCfg.url = url
    baseCfg.method = method
    if (method === 'get') {
        baseCfg.params = data
    } else if (method === 'post') {
        baseCfg.data = data
    }
    baseCfg.responseType = type
    baseCfg.headers = Object.assign(gloableHeaderConfig, baseCfg.headers || {})
    return axios.request(baseCfg)
        .catch(({ response }) => checkHttpStatus(response))
        .then(checkStatus)
        .then(response => {
            if (response !== undefined) {
                if (response.data.status + '' === '8888') {
                    return new Promise(function () { })
                } else if (response.data.status !== undefined && response.data.status !== 200) {
                    let info = { message: response.message || response.data.message }
                    return Promise.reject(info)
                } else if (!response.data.data) {
                    return response.data
                }
                return response.data.data
            } else {
                return new Promise(function () { })
            }
        })
}
