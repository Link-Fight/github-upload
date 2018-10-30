// var wx_api = DEBUG ? require("apis/tests/wx") : require("apis/wx");
/* eslint: glable wx */
import { getAppLocation, appScanQRCode, appShowImage, isApp } from './app.js'
import geo from './geo.js'
import wx from 'weixin-js-sdk'
// let wx_api = {}
const isWeixin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' // eslint-disable-line
const isWindowsWechat = navigator.userAgent.toLowerCase().match(/WindowsWechat/i) == 'windowswechat' // eslint-disable-line
function _getWxLocation(config) {
    var defaultOption = {
        type: config.type || 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success(res) {
            var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed // 速度，以米/每秒计
            var accuracy = res.accuracy // 位置精度
            console.log(latitude, longitude, speed, accuracy)
        }
    }
    if (config) {
        Object.assign(defaultOption, config)
    }
    wx.getLocation(defaultOption)
}
function _getNativeLocation(config) {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('getCurrentPosition', position)
            var data = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            config.success && config.success(data)
        }, config.fail, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            })
    } else {
        config.fail && config.fail('NO wx,NO H5 Location')
    }
}
function _getQQMapLocation(config) {
    try {
        geo.getLocation({ gpsType: config.type, success: config.success, fail: config.fail })
    } catch (e) {
        config.fail && config.fail('NO wx,NO H5 Location')
    }
}
function _wxScanQRCode(config) {
    var defaultOption = {
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success(res) {
            console.log(res.resultStr) // 当needResult 为 1 时，扫码返回的结果
        },
        fail(res) {
            alert(JSON.stringify(res))
        }
    }
    if (config) {
        Object.assign(defaultOption, config)
    }
    wx.scanQRCode(defaultOption)
}
let cacheConfigData = null
export default {
    /** 判断是否在微信的环境下
     * 不是 就直接执行cb
     * @param  {} cb
     */
    config(data) {
        return new Promise((resolve, reject) => {
            if (isWeixin) {
                cacheConfigData = data || cacheConfigData
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: cacheConfigData.appId, // 必填，公众号的唯一标识
                    timestamp: cacheConfigData.timestamp, // 必填，生成签名的时间戳
                    nonceStr: cacheConfigData.nonceStr, // 必填，生成签名的随机串
                    signature: cacheConfigData.signature, // 必填，签名，见附录1
                    jsApiList: ['chooseImage', 'previewImage', 'getLocalImgData', 'uploadImage', 'downloadImage', 'hideMenuItems', 'showMenuItems', 'scanQRCode', 'getLocation', 'openLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'getNetworkType'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
                wx.ready(function () {
                    resolve()
                })
                wx.error(function (res) {
                    reject(res)
                })
            } else {
                resolve()
            }
        })
    },
    ready(fun) {
        wx.ready(function (res) {
            fun && fun(res)
        })
    },
    error(fun) {
        wx.error(function (res) {
            fun && fun(res)
        })
    },
    chooseImage(options) {
        var localIds = []
        var count = (options && options.count) ? options.count : 9
        var sizeType = (options && options.sizeType) ? options.sizeType : ['original', 'compressed']
        var sourceType = (options && options.sourceType) ? options.sourceType : ['album', 'camera']
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: count, // 默认9张
                sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
                sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
                success(res) {
                    for (var i = 0; i < res.localIds.length; i++) {
                        localIds.push(res.localIds[i])
                    }
                    resolve(localIds)
                },
                fail(res) {
                    alert(JSON.stringify(res))
                }
            })
        })
    },
    // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1483682025_enmey
    getLocalImgData(localIds) {
        if (localIds.toString().indexOf('wxLocalResource') === -1) {
            return Promise.resolve(localIds)
        }
        return new Promise(resolve => {
            let i = 0
            let newIds = []
            function _getLocalImgData() {
                wx.getLocalImgData({
                    localId: localIds[i],
                    success(res) {
                        newIds[i] = res.localData
                        if (i < localIds.length - 1) {
                            _getLocalImgData(++i)
                        } else {
                            resolve(newIds)
                        }
                    },
                    fail(err) {
                        window.alert(JSON.stringify(err))
                    }
                })
            }
            _getLocalImgData()
        })
    },
    upload(localIds, isShowProgressTips) {
        isShowProgressTips = isShowProgressTips ? 1 : 0
        let i = 0
        let length = localIds.length
        let serverIds = []
        let finishResolve = null
        let finishReject = null
        function upload() {
            wx.uploadImage({
                isShowProgressTips: isShowProgressTips,
                localId: localIds[i],
                success(res) {
                    i++
                    serverIds.push(res.serverId)
                    if (i < length) {
                        setTimeout(() => {
                            upload()
                        }, 50)
                    } else {
                        finishResolve(serverIds)
                    }
                },
                fail(res) {
                    finishReject(JSON.stringify(res))
                }
            })
        }
        return new Promise((resolve, reject) => {
            finishResolve = resolve
            finishReject = reject
            upload()
        })
    },
    previewImage(current, urls = []) {
        if (isApp) {
            return appShowImage(current, urls)
        }
        if (urls.length === 0) {
            urls = [current]
        }
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        })
    },
    toOpenScan() {
        return new Promise((resolve, reject) => {
            this.scanQRCode({
                needResult: 1,
                success: (res) => {
                    resolve(res.resultStr)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        })
    },
    scanQRCode(config) {
        if (isApp) {
            this.scanQRCode = appScanQRCode
            return appScanQRCode(config)
        } else {
            this.scanQRCode = _wxScanQRCode
            return _wxScanQRCode(config)
        }
    },
    // v2 添加30秒的地理信息缓存
    getLocation: (function () {
        var locationCache = {}
        var LastModified
        var getLocationFn
        if (isApp) {
            getLocationFn = getAppLocation
        } else if (!isWeixin) {
            if (window.location.origin.indexOf('http://') > -1) {
                getLocationFn = _getNativeLocation || _getQQMapLocation
            } else {
                getLocationFn = _getNativeLocation
            }
        } else if (isWindowsWechat) {
            getLocationFn = _getNativeLocation
        } else {
            getLocationFn = _getWxLocation
        }
        return function (config, cache = true, maxAge = 30000) {
            var gpsType = config.type || '-'
            var oldSuccess = config.success
            var curTime = new Date()
            config.fail = config.fail || function () { }
            config.cancel = config.cancel || config.fail
            config.success = function (res) {
                locationCache[gpsType] = res
                LastModified = new Date()
                oldSuccess(res)
            }
            if (cache === true && locationCache[gpsType] && LastModified && (curTime.getTime() - LastModified.getTime() < maxAge)) {
                oldSuccess(locationCache[gpsType])
            } else {
                getLocationFn(config)
            }
        }
    })(),
    openLocation(config) {
        if (config.latitude < 0 || config.longitude < 0) {
            console.warn(`[wx:openLocation] need 'latitude','longitude'`)
            return false
        }
        var defaulConfig = {
            latitude: 0, // 纬度，浮点数，范围为90 ~ -90
            longitude: 0, // 经度，浮点数，范围为180 ~ -180。
            name: '', // 位置名
            address: '', // 地址详情说明
            scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        }
        Object.assign(defaulConfig, config)
        wx.openLocation(defaulConfig)
    },
    getShareOption() {
        return {
            // title: document.title.replace(' - 极飞农业', '') || Xa.lang.getText('极飞农业'),
            // desc: Xa.lang.getText('极飞运营管理系统是一个致力于帮助植保团队进行需求管理、资源调度、任务协同和团队运营的一站式服务平台。'),
            // link: window.location.href,
            // imgUrl: window.location.origin + '/pm/images/share_logo.png'
        }
    },
    toShareConfig(config) {
        wx.onMenuShareTimeline(config)
        wx.onMenuShareAppMessage(config)
        wx.onMenuShareQQ(config)
        wx.onMenuShareWeibo(config)
        wx.onMenuShareQZone(config)
    },
    geo,
    miniProgram() {
        return wx.miniProgram
    }
}
