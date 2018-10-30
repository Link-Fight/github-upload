export const formComDefaultValue = {
    text() {
        return ''
    },
    score() {
        return ''
    },
    textarea() {
        return ''
    },
    radio() {
        return ''
    },
    radioGroup() {
        return ''
    },
    dropdown() {
        return ''
    },
    checkBox() {
        return []
    },
    imgUpload() {
        return []
    },
    switch() {
        return false
    },
    select() {
        return []
    },
    slider(cfg) {
        if (cfg.isRange === false) {
            return cfg.min
        }
        return [cfg.min, cfg.max]
    },
    area(cfg) {
        return []
    },
    latLng() {
        return {
            id: '',
            address: ''
        }
    },
    map() {
        return []
    },
    dateSelect() {
        return ''
    }
}
let typeFnRule = {
    string(cfg, val, msg) {
        if (!val && val !== 0) {
            return {
                result: false,
                msg: msg || '请完成填写'
            }
        } else {
            return {
                result: true,
                msg: ''
            }
        }
    },
    array(cfg, val) {
        if (!val) {
            return {
                result: false
            }
        } else if (val.length === 0) {
            return {
                result: false,
                msg: '请完成选择'
            }
        } else if (val.length < cfg.min) {
            return {
                result: false,
                msg: `请最少选择${cfg.min}项`
            }
        } else {
            return {
                result: true,
                msg: ''
            }
        }
    },
    object(cfg, val, key, msg) {
        if (val && val[key]) {
            return {
                result: true,
                msg: ''
            }
        } else {
            return {
                result: false,
                msg: msg || '请选择'
            }
        }
    }
}
export function formComVariableCheck(type) {
    let typeRule = {
        text() {
            return typeFnRule['string'](...arguments)
        },
        score() {
            return typeFnRule['string'](...arguments, '请选择')
        },
        textarea() {
            return typeFnRule['string'](...arguments)
        },
        radio() {
            return typeFnRule['string'](...arguments)
        },
        radioGroup() {
            return typeFnRule['string'](...arguments)
        },
        dropdown() {
            return typeFnRule['string'](...arguments, '请选择')
        },
        checkBox() {
            return typeFnRule['array'](...arguments)
        },
        imgUpload() {
            return typeFnRule['array'](...arguments)
        },
        switch() {
            return {
                result: true
            }
        },
        select() {
            return typeFnRule['array'](...arguments)
        },
        slider(cfg) {
            return {
                result: true
            }
        },
        area(cfg) {
            return typeFnRule['array'](...arguments)
        },
        map(cfg) {
            return typeFnRule['array'](...arguments)
        },
        latLng() {
            return typeFnRule['object'](...arguments, 'address')
        },
        dateSelect(cfg, val) {
            return typeFnRule['string'](...arguments, '请选择时间')
        }
    }
    return typeRule[type]
}
