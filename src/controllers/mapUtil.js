/* eslint-disable */
/*  global L */
let jsts = require('jsts')
window.jsts = jsts
var factory = new jsts.geom.GeometryFactory()
function getNeedDrawLines(airlines) {
    let needDrawAirLines = []
    let needDrawAirLinesIndexs = []
    for (var i = 1; i < airlines.length; i++) {
        if (airlines[i].spray) {
            if ((airlines[i - 1].lat == airlines[i].lat) && (airlines[i - 1].lng == airlines[i].lng)) {
                continue
            }
            needDrawAirLinesIndexs.push(i)
        } else {
            if (needDrawAirLinesIndexs.length) {
                needDrawAirLines.push(needDrawAirLinesIndexs)
                needDrawAirLinesIndexs = []
            }
        }
    }
    if (needDrawAirLinesIndexs.length) {
        needDrawAirLines.push(needDrawAirLinesIndexs)
    }
    return needDrawAirLines
}
function getProjectLatlngToCoordinate(latlng) {
    let _2dPoint = L.Projection.Mercator.project(latlng)
    return new jsts.geom.Coordinate(_2dPoint.x, _2dPoint.y)
}
function getUnprojectCoordinateToLatlng(coordinate) {
    return L.Projection.Mercator.unproject(coordinate)
}
function checkIsAgain(sprayAreaStore, { first, last }) {
    let isAgain = sprayAreaStore.find(sprayPointItem => {
        if (sprayPointItem.first.lat == first.lat && sprayPointItem.first.lng == first.lng) {
            if (sprayPointItem.last.lat == last.lat && sprayPointItem.last.lng == last.lng) {
                return true
            }
        }
        if (sprayPointItem.last.lat == first.lat && sprayPointItem.last.lng == first.lng) {
            if (sprayPointItem.first.lat == last.lat && sprayPointItem.first.lng == last.lng) {
                return true
            }
        }
        return false
    })
}
function drawSpray(airlines, option_width, featureGroup, sprayAreaStore) {
    let needDrawAirLines = getNeedDrawLines(airlines)
    needDrawAirLines.forEach(airlineIndex => {
        let coordinates = []
        let firstPoint = null
        let lastPoint = null
        for (let i = 0; i < airlineIndex.length; i++) {
            let index = airlineIndex[i]
            if (i == 0) {
                firstPoint = airlines[index - 1]
                coordinates.push(getProjectLatlngToCoordinate(firstPoint))
            }
            lastPoint = airlines[index]
            coordinates.push(getProjectLatlngToCoordinate(lastPoint))
        }
        let isAgain = checkIsAgain(sprayAreaStore, { first: firstPoint, last: lastPoint })
        sprayAreaStore.push({ first: firstPoint, last: lastPoint })
        var linestring = factory.createLineString(coordinates)
        var bufferOp = new jsts.operation.buffer.BufferOp(linestring)
        bufferOp.setEndCapStyle(jsts.operation.buffer.BufferParameters.JOIN_MITRE)
        var result = bufferOp.getResultGeometry(option_width / 2)
        var latlngs = result.getCoordinates().map(getUnprojectCoordinateToLatlng)
        var polyline = L.polyline(latlngs, { pane: isAgain ? 'transparentMask1' : 'transparentMask' })
        featureGroup.addLayer(polyline)
    })
}
const drawSprayAreaSimple = ({ airlines, option_width }, sprayFeatureGroup, sprayAreaStore) => {
    drawSpray(airlines, option_width, sprayFeatureGroup, sprayAreaStore)
}
let drawSprayArea = function (item) {

}
export {
    drawSprayArea,
    drawSprayAreaSimple
}