import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
const TYPE = {
    satelliteTitleLayer: {
        url: 'http://agri-map.xaircraft.com/google/{z}/{x}/{y}.jpeg',
        baseCfg: { maxZoom: 19, zIndex: 0 }
    },
    locationNameTitleLayer: {
        url: 'http://t5.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}',
        baseCfg: { maxZoom: 19, minZoom: 1 }
    },
    darkTitleLayer: {
        url: 'http://{s}.tiles.mapbox.com/v3/spatialdev.map-c9z2cyef/{z}/{x}/{y}.png',
        baseCfg: { maxZoom: 19, zIndex: 10, subdomains: ['a', 'b', 'c'] }
    },
    gaodeTitleLayer: {
        url: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        baseCfg: { maxZoom: 18, zIndex: 10, subdomains: [1, 2, 3, 4] }
    },
    nornalGaodeTitleLayer: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        baseCfg: { maxZoom: 19, zIndex: 10 }
    },
    gaodeNormalTitleLayer: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        baseCfg: { maxZoom: 19, zIndex: 10 }
    }
}
// gcj02的
function _createMap(el) {
    return L.map(el, { renderer: L.canvas(), zoomControl: false, attributionControl: false, zoomAnimation: true }).setView([32.76880048488168, 97.119140625], 3)
}
export function createGeoMap(container) {
    let map = _createMap(container)
    L.tileLayer(TYPE.gaodeNormalTitleLayer.url, TYPE.gaodeNormalTitleLayer.baseCfg).addTo(map)
    return map
}
export function create2GeoMap(container) {
    let map = _createMap(container)
    L.tileLayer(TYPE.nornalGaodeTitleLayer.url, TYPE.nornalGaodeTitleLayer.baseCfg).addTo(map)
    return map
}

export function createSatelliteMap(container) {
    let map = _createMap(container)
    map.createPane('transparentMask')
    map.createPane('transparentMask1')
    let tileLayer = L.tileLayer(TYPE.satelliteTitleLayer.url, TYPE.satelliteTitleLayer.baseCfg)
    let tileLayer1 = L.tileLayer(TYPE.locationNameTitleLayer.url, TYPE.locationNameTitleLayer.baseCfg)
    tileLayer.addTo(map)
    tileLayer1.addTo(map)
    map.$curTitleLayer = [tileLayer, tileLayer1]
    return map
}

export function createMap(container) {
    let map = _createMap(container)
    let dayLayer = L.tileLayer(TYPE.satelliteTitleLayer.url, TYPE.satelliteTitleLayer.baseCfg).addTo(map)
    let darkLayer = L.tileLayer(TYPE.darkTitleLayer.url, TYPE.darkTitleLayer.basecfg)
    let gaoDeNormalLyer = L.tileLayer(TYPE.gaodeNormalTitleLayer.url, TYPE.gaodeNormalTitleLayer.baseCfg) // subdomains: ['1', '2', '3', '4']
    L.tileLayer(TYPE.locationNameTitleLayer.url, TYPE.locationNameTitleLayer.baseCfg).addTo(map)
    map.createPane('transparentMask')
    map.createPane('transparentMask1')
    map.layerControl = L.control.layers({ '卫星地图': dayLayer, '黑色地图': darkLayer, '标准地图': gaoDeNormalLyer }, {}, { autoZIndex: false, className: 'layer-control' }).addTo(map)
    return map
}

export function createGaodeGeoMap(container) {
    let map = _createMap(container)
    L.tileLayer(TYPE.gaodeTitleLayer.url, TYPE.gaodeTitleLayer.baseCfg).addTo(map)
    return map
}
export function changeTitleLayer(theme, map) {
    if (map.$curTitleLayer) {
        map.$curTitleLayer.forEach(layer => {
            layer.remove && layer.remove()
        })
    }
    map.$curTitleLayer = null
    if (theme === 'satellite') {
        map.$curTitleLayer = [L.tileLayer(TYPE.satelliteTitleLayer.url, TYPE.satelliteTitleLayer.baseCfg), L.tileLayer(TYPE.locationNameTitleLayer.url, TYPE.locationNameTitleLayer.baseCfg)]
    } else if (theme === 'dark') {
        map.$curTitleLayer = [L.tileLayer(TYPE.darkTitleLayer.url, TYPE.darkTitleLayer.baseCfg)]
    } else if (theme === 'normal') {
        map.$curTitleLayer = [L.tileLayer(TYPE.nornalGaodeTitleLayer.url, TYPE.nornalGaodeTitleLayer.baseCfg)]
    }
    map.$curTitleLayer && map.$curTitleLayer.forEach(item => item.addTo(map))
}
export default {
    TYPE
}
