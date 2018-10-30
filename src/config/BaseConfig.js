export default class {
    constructor(config = {}) {
        Object.assign(this, config)
    }
    setKeyValue(key, value) {
        this[key] = value
    }
    toString() {
        let keys = Object.keys(this)
        let config = {}
        keys.forEach(key => {
            config[key] = this[key]
        })
        return config
    }
}