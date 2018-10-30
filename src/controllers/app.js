export let isApp = navigator.userAgent.toLowerCase().indexOf('xaircraft') > -1

class Observer {
    constructor() {
        this.subscribers = {}
    }
    addSubscriber(event, fn) {
        let subs = this.subscribers[event] || (this.subscribers[event] = [])
        subs.push(fn)
    }
    removeSubscriber(event, fn) {
        let subs = this.subscribers[event]
        if (subs === undefined || subs.length === 0) {
            return
        }
        subs.splice(subs.indexOf(fn), 1)
    }
    publich(event) {
        let subs = Array.from(this.subscribers[event])
        console.log('subs:' + subs.length)
        while (subs.length) {
            (typeof subs[0] === 'function') && subs[0].apply(null, arguments)
            subs.pop()
        }
    }
}

let app = new Observer()
let uid = 0
;(function (globl, observer) {
    globl.onAppScanCompleted = function (message) {
        console.log('onScanComplete:' + message)
        observer.publich('onScan', message)
    }
    globl.onAppLocationChanged = function (message) {
        console.log('onLocationChange' + message)
        observer.publich('onLocation', message)
    }
})(isApp ? window : {}, app)

export function getAppLocation(config) {
    var event = function (event, msg) {
        app.removeSubscriber('onLocation', event)
        try {
            msg = JSON.parse(msg)
            msg.latitude = msg.lat
            msg.longitude = msg.lng
            if (parseInt(msg.status_code) === 200) {
                config.success({
                    latitude: msg.data.lat,
                    longitude: msg.data.lng,
                    addr: msg.data.address,
                    street: msg.data.street,
                    city: msg.data.city,
                    province: msg.data.province
                })
            } else {
                config.fail(msg)
            }
        } catch (e) {
            config.fail(e)
        }
    }
    app.addSubscriber('onLocation', event)
    window.android.getLastLocation(uid++, '')
}
export function appScanQRCode(config) {
    var event = function (event, msg) {
        app.removeSubscriber('onScan', event)
        try {
            console.log('msg:' + msg)
            msg = JSON.parse(msg)
            if (parseInt(msg.status_code) === 200) {
                config.success({
                    resultStr: msg.data.qrCode
                })
            } else {
                config.fail(msg)
            }
        } catch (e) {
            config.fail(e)
        }
    }
    app.addSubscriber('onScan', event)
    window.android.scan(uid++, {})
}
export function appShowImage(current, urls = []) {
    urls = Array.from(urls)
    if (current) {
        if (urls.indexOf(current) === -1) {
            urls.unshift(current)
        }
    }
    window.android.showImage(urls)
}