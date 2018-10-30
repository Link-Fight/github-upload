export function formatNumer(n) {
    return n > 9 ? n : '0' + n
}

export function formatTime(seconds) {
    return formatNumer(Math.floor(seconds / 60)) + ':' + formatNumer(seconds % 60)
}

export function setStorage(key, value, type = 'localStorage') {
    window[type].setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
}

export function getStorage(key, type = 'localStorage') {
    var value = window[type].getItem(key)
    if (value) {
        try {
            return JSON.parse(value)
        } catch (error) {
            return value
        }
    }
    return value
}

export function copy(obj) {
    return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj
}

export function setSessionStorage(key, value) {
    setStorage(key, value, 'sessionStorage')
}

export function getSessionStorage(key) {
    return getStorage(key, 'sessionStorage')
}

export function urlQueryString(url, params) {
    let querys = []
    for (let key in params) {
        let value = params[key]
        if (value !== undefined && value !== null) querys.push(`${key}=${value}`)
    }
    return url + (querys.length ? '?' + querys.join('&') : '')
}