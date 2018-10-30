export const copy = function (val) {
    return JSON.parse(JSON.stringify(val))
}
export const delay = function (data, timeout = 1500) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(JSON.stringify(data, null, 4))
            resolve(copy(data))
        }, timeout)
    })
}