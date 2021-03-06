/* eslint-disable */
const geo = {
}
// 已经请求并且加载完成的脚本
let cacheURL = []
// 正在请求的脚本，同时记录在期间对该脚本的调用，并在脚本请求成功后回调里面的方法。
let pendingURL = Object.create(null)
const MAP_TYPES = {
    QQMAP: {
        type: 'QQ',
        app_key: 'IXABZ-HRBWX-ZGZ4S-7SMUE-Z7CHK-J2BUQ',
        app_name: 'XA'
    }
}

function register(appInfo = MAP_TYPES.QQMAP) {
    let mapKey = Object.keys(MAP_TYPES)
    let targetMap = mapKey.filter((item) => {
        return MAP_TYPES[item].type === appInfo.type
    })[0]
    MAP_TYPES[targetMap] = {
        app_key: appInfo.app_key,
        app_name: appInfo.app_name
    }
}

const GSP_TYPE = {
    WGS84: 'WGS84',
    GCJ02: 'GCJ02'
}

function getLocation({ mapType = MAP_TYPES.QQMAP.type, success, fail, gpsType = GSP_TYPE.WGS84, option = {} }) {
    if (mapType.toUpperCase() === MAP_TYPES.QQMAP.type) {
        function _successFn(geoData) {
            // console.log(geoData);
            if (gpsType.toUpperCase() === GSP_TYPE.WGS84) {
                var resuleData = gcj02ToWgs84(geoData)
                geoData.latitude = resuleData.lat
                geoData.longitude = resuleData.lng
                success(geoData)
            } else {
                geoData.latitude = geoData.lat
                geoData.longitude = geoData.lng
                success(geoData)
            }
        }
        _QQMapLocation(_successFn, fail, option)
    }
}

let QQMap_geo
function _QQMapLocation(successFn, errorFn, option) {
    _getScript('//3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js').then(() => {
        QQMap_geo = QQMap_geo || new qq.maps.Geolocation(MAP_TYPES.QQMAP.app_key, MAP_TYPES.QQMAP.app_name)
        option.timeout = option.timeout || 20000
        QQMap_geo.getLocation(successFn, errorFn || null, option)
    })
}

export function getQQMapImage({ lat, lng }, zoom = 12, size, maptype = 'roadmap') {
    var latlng = wgs84ToGcj02({ lat, lng })
    lat = latlng.lat
    lng = latlng.lng
    if (size === undefined) {
        size = document.body.clientWidth + '*200'
    }
    return `http://apis.map.qq.com/ws/staticmap/v2/?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=${maptype}&scale=2&markers=size:large|color:red|${lat},${lng}&key=${MAP_TYPES.QQMAP.app_key}`
}
export function getGaodeMapImage({ lat, lng }, zoom = 16, size) {
    var latlng = wgs84ToGcj02({ lat, lng })
    lat = latlng.lat
    lng = latlng.lng
    if (size === undefined) {
        size = document.body.clientWidth + '*200'
    }
    return `http://restapi.amap.com/v3/staticmap?location=${lng},${lat}&zoom=${zoom}&size=${size}&markers=large,0xFF0000,0:${lng},${lat}&scale=2&key=06931c736797e74f9af6e87e307d8b96`
}

function _getScript(scriptUrl) {
    return new Promise((resolve, reject) => {
        for (var i = 0, len = cacheURL.length; i < len; i++) {
            if (cacheURL[i] === scriptUrl) {
                resolve()
                break
            }
        }
        if (pendingURL[scriptUrl]) {
            pendingURL[scriptUrl].push(function () {
                resolve()
            })
            return
        } else {
            pendingURL[scriptUrl] = []
            pendingURL[scriptUrl].push(function () {
                resolve()
            })
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = scriptUrl
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
                pendingURL[scriptUrl].forEach(item => item())
                script.onload = script.onreadystatechange = null
                pendingURL[scriptUrl] = []
                cacheURL.push(scriptUrl)
            }
        }
        script.onerror = function (err) {
            reject(err)
            script.onerror = null
        }
        document.body.appendChild(script)
    })
}

var RANGE_LON_MAX = 137.8347
var RANGE_LON_MIN = 72.004
var RANGE_LAT_MAX = 55.8271
var RANGE_LAT_MIN = 0.8293
var jzA = 6378245.0  // r of Earth
var jzEE = 0.00669342162296594323
function LAT_OFFSET_0(x, y) { return -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x)) }
function LAT_OFFSET_1(x) { return (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0 }
function LAT_OFFSET_2(y) { return (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0 }
function LAT_OFFSET_3(y) { return (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0 }

function LON_OFFSET_0(x, y) { return 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x)) }
function LON_OFFSET_1(x) { return (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0 }
function LON_OFFSET_2(x) { return (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0 }
function LON_OFFSET_3(x) { return (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0 }

function transformLat(x, y) { // :(double)x bdLon:(double)y
    var ret = LAT_OFFSET_0(x, y)
    ret += LAT_OFFSET_1(x)
    ret += LAT_OFFSET_2(y)
    ret += LAT_OFFSET_3(y)
    return ret
}

function transformLon(x, y) { // :(double)x bdLon:(double)y
    var ret = LON_OFFSET_0(x, y)
    ret += LON_OFFSET_1(x)
    ret += LON_OFFSET_2(x)
    ret += LON_OFFSET_3(x)
    return ret
}

function outOfChina(lat, lon) { // :(double)lat bdLon:(double)lon
    if (lon < RANGE_LON_MIN || lon > RANGE_LON_MAX)
        return true
    if (lat < RANGE_LAT_MIN || lat > RANGE_LAT_MAX)
        return true
    return false
}

function transform({ lat, lon }) { // double lat, double lon
    if (outOfChina(lat, lon)) {
        return { lat, lng: lon }
    }
    var dLat = transformLat(lon - 105.0, lat - 35.0)
    var dLon = transformLon(lon - 105.0, lat - 35.0)

    var radLat = lat / 180.0 * Math.PI
    var magic = Math.sin(radLat)
    magic = 1 - jzEE * magic * magic
    var sqrtMagic = Math.sqrt(magic)

    dLat = (dLat * 180.0) / ((jzA * (1 - jzEE)) / (magic * sqrtMagic) * Math.PI)
    dLon = (dLon * 180.0) / (jzA / sqrtMagic * Math.cos(radLat) * Math.PI)

    var mgLat = lat + dLat
    var mgLon = lon + dLon
    return { lat: mgLat, lng: mgLon }
}

export function gcj02ToWgs84({ lat, lng }) {
    var gps = transform({ lat, lon: lng })
    var dLng = lng * 2 - gps.lng
    var dLat = lat * 2 - gps.lat
    return { lat: dLat, lng: dLng }
}

export function wgs84ToGcj02({ lat, lng }) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    return transform({ lat, lon: lng });
}

var QQCityService = {};
QQCityService.searchCityByLatLng = _QQCityService_searchCityByLatLng;
QQCityService.searchCityByAreaCode = _QQCityService_searchCityByAreaCode;
function getQQMapApiServer() {
    _getScript('//map.qq.com/api/js?v=2.exp&key=' + MAP_TYPES.QQMAP.app_key)
}
function _QQCityService_searchCityByLatLng({ lat, lng }, callback) {
    if (!!window.qq && !!window.qq.maps && !!window.qq.maps.CityService) {
        var cs = new qq.maps.CityService(callback);
        cs.searchCityByLatLng(new qq.maps.LatLng(lat, lng));
    } else {
        document.write = function (e) {
            var promise = analysisUrl(e);
            if (!promise) {
                !!callback && callback("no")
            }
            promise.then(() => {
                _QQCityService_searchCityByLatLng({ lat, lng }, callback);
            });
        };
        getQQMapApiServer()
    }
}
function _QQCityService_searchCityByAreaCode(areaCode, callback) {
    if (!!window.qq && !!window.qq.maps && !!window.qq.maps.CityService) {
        var cs = new qq.maps.CityService(callback);
        cs.searchCityByAreaCode(areaCode);
    } else {
        document.write = function (e) {
            var promise = analysisUrl(e);
            if (!promise) {
                !!callback && callback("no")
            }
            promise.then(() => {
                _QQCityService_searchCityByAreaCode(areaCode, callback);
            });
        };
        getQQMapApiServer()
    }
}

var QQGeocoder = {};
QQGeocoder.getLocation = _QQGeocoder_getLocation;
QQGeocoder.getAddress = _QQGeocoder_getAddress;

function _QQGeocoder_getLocation(locationName, callback) {
    if (!!window.qq && !!window.qq.maps && !!window.qq.maps.Geocoder) {
        var cs = new qq.maps.Geocoder(callback);
        cs.getLocation(locationName);
    } else {
        document.write = function (e) {
            var promise = analysisUrl(e);
            if (!promise) {
                !!callback && callback("no")
            }
            promise.then(() => {
                _QQGeocoder_getLocation(locationName, callback);
            });
        };
        getQQMapApiServer()
    }
}

function _QQGeocoder_getAddress({ lat, lng }, callback) {
    if (!!window.qq && !!window.qq.maps && !!window.qq.maps.Geocoder) {
        var geocoder = new qq.maps.Geocoder()
        geocoder.getAddress(new qq.maps.LatLng(lat, lng))
        geocoder.setComplete(callback)
    } else {
        document.write = function (e) {
            var promise = analysisUrl(e);
            if (!promise) {
                !!callback && callback("no")
            }
            promise.then(() => {
                _QQGeocoder_getAddress({ lat, lng }, callback)
            });
        };
        getQQMapApiServer()
    }
}

function analysisUrl(script_url) {
    var result = script_url.match(/(http)[.\/-zA-Z0-9]+/g);
    if (result) {
        // console.info("[script_url]" + result[0])
        return _getScript(result[0]);
    }
    return null;
}

export default {
    register,
    getLocation,
    getGaodeMapImage,
    QQCityService,
    QQGeocoder,
    gcj02ToWgs84
}