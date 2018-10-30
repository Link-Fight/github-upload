let uuid = 0
let events = {}
const LOCATION_KEY = 'onLocation'
function addEventLister(name, cb) {
    if (!events[name]) {
        events[name] = []
    }
    events[name].push(cb)
}
function emitEvent(name, payload) {
    if (events[name]) {
        let listener = events[name]
        events[name] = []
        for (let index = 0; index < listener.length; index++) {
            const fn = listener[index]
            fn(payload)
        }
    }
}
function postMessage(msg) {
    msg.id = uuid++
    window.postMessage(JSON.stringify(msg), '*')
}
window.document.addEventListener('message', function (e) {
    console.log('message', JSON.stringify(e))
    try {
        let msg = JSON.stringify(e)
        let payload = null
        if (msg.name === LOCATION_KEY) {
            payload = msg.payload
            emitEvent(LOCATION_KEY, payload)
        }
    } catch (error) {

    }
})
export function getLocation(cb) {
    addEventLister(LOCATION_KEY, cb)
    postMessage({
        name: LOCATION_KEY
    })
}
