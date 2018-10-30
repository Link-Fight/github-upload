/* global L */
/* eslint-disable */
let iconStatus = {
    unchecked: new L.divIcon({ className: 'point_1', iconAnchor: [15, 40], popupAnchor: [0, -40] }),
    checked: new L.divIcon({ className: 'point_2', iconAnchor: [15, 40], popupAnchor: [0, -40] }),
    current: new L.divIcon({ className: 'point_3', iconAnchor: [15, 40], popupAnchor: [0, -40] })
};
let lineStatus = {
    unchecked: { color: '#3399FF', opacity: 1, fillOpacity: 0.1, weight: 2 },
    checked: { color: '#ef3338', opacity: 1, fillOpacity: 0.5, weight: 2 },
    current: { color: '#ea8010', opacity: 1, fillOpacity: 0.5, weight: 2 }
};
let circleStatus = {
    unchecked: { color: '#3399FF', opacity: 1, fillOpacity: 0.1, weight: 1 },
    checked: { color: '#ef3338', opacity: 1, fillOpacity: 0.5, weight: 2 },
    current: { color: '#ea8010', opacity: 1, fillOpacity: 0.5, weight: 2 }
}
export function handleDraw(options, map) {
    let layerIdMap = {}
    let featureGroup = L.featureGroup([])
    let layer = null
    options.forEach((item, index) => {
        let { type, id } = item
        switch (type) {
            case 1:
                layer = L.marker(item.points[0], { icon: iconStatus.unchecked, id })
                layer.status = iconStatus
                layer.type = 'point'
                layer.hasCheck = false
                featureGroup.addLayer(layer)
                break
            case 2:
                layer = L.polygon(item.points, { id, ...lineStatus.unchecked })
                layer.status = lineStatus
                layer.type = 'polygon'
                layer.hasCheck = false
                featureGroup.addLayer(layer)
                // setTimeout(() => {
                // let center = layer.getCenter()
                featureGroup.addLayer(L.marker(item, {
                    icon: L.divIcon({ className: 'land_No', html: id }),
                    interactive: false
                }))
                // }, 0)
                break
            case 3:
                featureGroup.addLayer(L.marker(item.points, {
                    icon: L.divIcon({ className: 'land_No', html: id }),
                    interactive: false
                }))
                layer = L.circle(item.points, Object.assign({ radius: item.points.radius, id }, circleStatus.unchecked))
                layer.status = circleStatus
                layer.type = 'circle'
                layer.hasCheck = false
                featureGroup.addLayer(layer)
                break
        }
        if (layer) {
            layerIdMap[id] = layer
        }
    })
    featureGroup.addTo(map)
    featureGroup.getLayers().length && map.fitBounds(featureGroup.getBounds())
    return { featureGroup, layerIdMap }
}
