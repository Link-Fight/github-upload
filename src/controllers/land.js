/* global L */

import {
    // drawSprayArea,
    drawSprayAreaSimple
} from './mapUtil'

export class LandController {
    static barriersOption = { color: 'red', opacity: 1, weight: 1, fillOpacity: 0.5 }
    static landNnfinished = { color: 'white', opacity: 1, fillOpacity: 0, weight: 2, clickable: true }
    static landFinished = { color: '#6f0', opacity: 1, fillOpacity: 0, weight: 2, dashArray: '1,1', clickable: true }
    static landWorking = { className: 'polygon__breath', color: '#FFC107', opacity: 1, fillOpacity: 0, weight: 2, dashArray: '1,1', clickable: true }
    static landNoSelect = {
        landPolygonStyle: { opacity: 0.33 },
        landBarriersStyle: { opacity: 0.33, fillOpacity: 0.1 },
        landMarkerStyle: 0.33
    }
    static landHasSelect = {
        landPolygonStyle: { opacity: 1 },
        landBarriersStyle: { opacity: 1, fillOpacity: 0.4 },
        landMarkerStyle: 1
    }
    static extraLandCompleteState = (land) => {
        land.complete_percent = parseFloat(land.complete_percent)
        if (land.complete_percent === 0) return 0
        if (land.complete_percent > 0 && land.complete_percent < 100) return 1
        return 2
    }
    static getLandOption(type) {
        let option
        switch (type) {
            case 0:
                option = LandController.landNnfinished
                break /* 未完成 */
            case 1:
                option = LandController.landWorking
                break /* 正在作业 */
            case 2:
                option = LandController.landFinished
                break /* 已经完成 */
            default:
                option = LandController.landNnfinished
                break
        }
        return option
    }
    /**
     * 把数据中的 title,sub_title,complete_percent 组成数据的subTitles 字段
     * 并把数据填写到statistics_num字段
     */
    static extraLandSubTitle = (land) => {
        return [
            {
                lt: land.title
            },
            {
                lt: land.sub_title.replace(/[\d.]+/g, function (num) {
                    land.statistics_num = parseFloat(num)
                    if (num > 0) {
                        return `<span class="xa-txt-green">${num}</span>`
                    }
                    return num
                }),
                rt: land.complete_percent
            }
        ]
    }
    constructor(map) {
        this.landPolygonFeatureGroup = L.featureGroup() // 地块轮廓
        this.landBarrierFeatureGroup = L.featureGroup() // 地块障碍物
        this.landIdMarkerFeatureGroup = L.featureGroup() // 地块中心点
        this.airLineControllers = {}
        this.map = map
        this.eventListenter = {}
        this.landIdList = []
        this.landBoundsMap = {}
        this.landPolygonMap = {}
        this.landBarriersMap = {}
        this.landMarkerMap = {}
        this.lastSelectedLandId = -1
        this.curMapZoom = map.getZoom()
        this.curSelectLandId = -1
        map.on('zoomend', (avg) => {
            this.curMapZoom = map.getZoom()
            if (map.getZoom() < 16) {
                map.removeLayer(this.landIdMarkerFeatureGroup)
            } else {
                this.landIdMarkerFeatureGroup.addTo(map)
            }
        })
    }
    on(type, fun) {
        let listenter = this.eventListenter[type] || (this.eventListenter[type] = [])
        if (listenter.indexOf(fun) === -1) {
            listenter.push(fun)
        }
    }
    publish(type, ...params) {
        let listenter = this.eventListenter[type]
        if (listenter) {
            listenter.forEach(fun => {
                fun(...params)
            })
        }
    }
    selectLand(id) {
        this.curSelectLandId = id
        if (id) {
            let landStyle = null
            this.landIdList.forEach(landId => {
                if (landId !== id) {
                    landStyle = LandController.landNoSelect
                } else {
                    landStyle = LandController.landHasSelect
                }
                this._setLandStyle(landId, landStyle)
            })
            this._fitToLandBounds(id)
        } else {
            this.landIdList.forEach(landId => this._setLandStyle(landId, LandController.landHasSelect))
        }
    }
    _setLandStyle(landId, { landPolygonStyle, landBarriersStyle, landMarkerStyle }) {
        this.landPolygonMap[landId].setStyle(landPolygonStyle)
        this.landBarriersMap[landId] && this.landBarriersMap[landId].forEach(barriers => barriers.setStyle(landBarriersStyle))
        this.landMarkerMap[landId].setOpacity(landMarkerStyle)
    }
    _fitToLandBounds(id) {
        let mapAction = 'fitBounds'
        this.map[mapAction](this._getLandBounds(id))
    }
    _getLandBounds(id) {
        return this.landBoundsMap[id]
    }
    hiddenCurIdMarker() {
        this.curSelectLandId && this.landMarkerMap[this.curSelectLandId].remove()
    }
    showCurIdMarker() {
        this.curSelectLandId && this.landMarkerMap[this.curSelectLandId].addTo(this.map)
    }
    addLand(land) {
        land.subTitles = LandController.extraLandSubTitle(land)
        land.completeState = LandController.extraLandCompleteState(land)
        if (land.center) {
            let markerClassName
            if (land.completeState === 0) {
                markerClassName = 'land_No'
            } else if (land.completeState === 1) {
                markerClassName = 'land_No land_No--working'
            } else {
                markerClassName = 'land_No land_No--finished '
            }
            let idMarker = L.marker(land.center, {
                icon: L.divIcon({
                    className: markerClassName, html: '<span class="land-id">#' + land.id + '</span><span class="land-area">' + land.sub_title + '</span>'
                }),
                interactive: false
            })
            this.landMarkerMap[land.id] = idMarker
            this.landIdMarkerFeatureGroup.addLayer(idMarker)
            delete land.center
        }
        if (land.barriers && land.barriers.length) {
            this.landBarriersMap[land.id] = []
            land.barriers.forEach(barrier => {
                let barrierPolygon = L.polygon(barrier.points, Object.assign({ id: land.id }, LandController.barriersOption))
                this.landBarriersMap[land.id].push(barrierPolygon)
                barrierPolygon.addTo(this.map)
            })
            delete land.barriers
        }
        if (land.bound) {
            let option = LandController.getLandOption(land.completeState)
            let polygon = L.polygon(land.bound, Object.assign({ id: land.id, smoothFactor: 2 }, option))
            polygon.on('click', (e) => {
                if (!polygon.options.clickable) {
                    return
                }
                this.publish('click', land)
            })
            this.landBoundsMap[land.id] = polygon.getBounds()
            this.landPolygonMap[land.id] = polygon
            this.landPolygonFeatureGroup.addLayer(polygon)
            delete land.bound
        }
        this.landIdList.push(land.id)
    }
    addAirLineController(landId, controller) {
        this.airLineControllers[landId] = controller
    }
    getCurAirLineController() {
        return this.airLineControllers[this.curSelectLandId]
    }
    addToMap() {
        this.landPolygonFeatureGroup.addTo(this.map)
        setTimeout(() => {
            this.map.fitBounds(this.landIdMarkerFeatureGroup.getBounds())
        }, 200)
    }
}

export class NewAirLineController {
    static transparent = { opacity: 0, fillOpacity: 0, clickable: false, interactive: false }
    static sprayArea = { fill: true, color: '#6f0', opacity: 1, fillOpacity: 1, weight: 1.8, clickable: false, interactive: false }
    static airline = { color: '#fff', opacity: 0.33, weight: 2 }
    static airCircel = { color: '#6f0', opacity: 0.5, fillOpacity: 0.25, weight: 1 }
    static referenceCircel = { color: '#fff', opacity: 0.50, fillOpacity: 0, weight: 1 }
    constructor(map, land, flyLogs) {
        this.map = map
        this.airlinesIdList = []
        this.airlinesMap = {}
        this.airlinesFeatureGroup = L.featureGroup([])
        this.sprayFeatureGroup = null
        this.referenceCircleFeatureGroup = null
        this.curAirLines = []
        this.type = flyLogs.type
        this.mode = 'radio' // checkbox
        this.init(land, flyLogs)
    }
    init(land, flyLogs) {
        if (flyLogs.type === 1 || flyLogs.type === 3) {
            let sprayFeatureGroup = L.featureGroup([])
            let sprayAreaStore = []
            flyLogs.data.forEach(item => {
                this.airlinesIdList.push(item.id)
                let polyline = L.polyline(item.airlines, NewAirLineController.airline)
                this.airlinesFeatureGroup.addLayer(polyline)
                this.airlinesMap[item.id] = polyline
                if (!item.not_spray) {
                    drawSprayAreaSimple(item, sprayFeatureGroup, sprayAreaStore, this.map)
                }
            })
            sprayFeatureGroup.setStyle(NewAirLineController.sprayArea)
            this.sprayFeatureGroup = sprayFeatureGroup
        } else if (flyLogs.type === 2) {
            console.log('toDo画圆圈')
            this._initType2land(land, flyLogs)
        }
    }
    _initType2land(land, flyLogs) {
        let flightsLogMap = {}
        if (Array.isArray(flyLogs.data) && flyLogs.data.length) {
            flyLogs.data.forEach(flightLog => {
                this.airlinesIdList.push(flightLog.id)
                this.airlinesMap[flightLog.id] = L.featureGroup([])
                let latlngs = []
                flyLogs.spirals.forEach(spiral => {
                    if (flightLog.spiral_uids.indexOf(spiral.id) > -1) {
                        flightsLogMap[spiral.id] === undefined ? flightsLogMap[spiral.id] = 1 : flightsLogMap[spiral.id]++
                        let circle = L.circle(spiral, Object.assign({}, NewAirLineController.airCircel, { radius: spiral.radius, id: spiral.id }))
                        let selectedCircle = L.circle(spiral, Object.assign({}, { radius: spiral.radius / 3, id: spiral.id, color: '#fff', fillOpacity: 1 }))
                        this.airlinesMap[flightLog.id].addLayer(selectedCircle)
                        this.airlinesFeatureGroup.addLayer(circle)
                        latlngs.push(spiral)
                    }
                })
                if (latlngs.length) {
                    this.airlinesMap[flightLog.id].addLayer(L.polyline(latlngs, { color: 'white', opacity: 0.8, fillOpacity: 0, weight: 1, clickable: false }))
                }
            })
        }
        if (Array.isArray(flyLogs.spirals) && flyLogs.spirals.length) {
            this.referenceCircleFeatureGroup = L.featureGroup([])
            flyLogs.spirals.forEach(spiral => {
                if (flightsLogMap[spiral.id] === undefined) {
                    this.referenceCircleFeatureGroup.addLayer(L.circle(spiral, Object.assign(NewAirLineController.referenceCircel, { radius: spiral.radius, id: spiral.id })))
                }
            })
        }
        console.log(this.airlinesIdList, flightsLogMap)
    }
    hidden() {
        this.hiddenAirLine()
        this.hiddenSpary()
    }
    displaySpray() {
        this.sprayFeatureGroup && this.sprayFeatureGroup.addTo(this.map)
        this.referenceCircleFeatureGroup && this.referenceCircleFeatureGroup.addTo(this.map)
        if (this.type === 2) {
            this.airlinesFeatureGroup && this.airlinesFeatureGroup.addTo(this.map)
        }
    }
    hiddenSpary() {
        console.log('hiddenSpary')
        this.sprayFeatureGroup && this.sprayFeatureGroup.remove()
        this.referenceCircleFeatureGroup && this.referenceCircleFeatureGroup.remove()
        if (this.type === 2) {
            this.airlinesFeatureGroup && this.airlinesFeatureGroup.remove()
        }
    }
    displayAirLine() {
        if (this.type === 2) {
            return
        }
        this.airlinesFeatureGroup.addTo(this.map)
    }
    hiddenAirLine() {
        if (this.type === 2) {
            return
        }
        this.curAirLines.forEach(lineId => {
            this._setAirLineStyle(lineId, { opacity: 0.33 })
        })
        this.airlinesFeatureGroup.remove()
    }
    selectAirLine(lineId) {
        if (this.mode === 'radio') {
            let lastLineId = this.curAirLines.pop()
            if (lastLineId) {
                if (this.type === 2) {
                    this.airlinesMap[lastLineId].remove()
                } else {
                    this._setAirLineStyle(lastLineId, { opacity: 0.33 })
                }
            }
        }
        if (lineId) {
            if (this.type === 2) {
                this.airlinesMap[lineId].addTo(this.map)
            } else {
                this._setAirLineStyle(lineId, { opacity: 1 })
            }
            this.curAirLines.push(lineId)
        }
    }
    selectAirLineByIndex(index) {
        let lineId = this.airlinesIdList[index]
        this.selectAirLine(lineId)
    }
    _setAirLineStyle(lineId, style) {
        this.airlinesMap[lineId].setStyle(style)
    }
}
