/* eslint-disable */
function evilFn(fn) {
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}

function hasArrayMixed(arr1, arr2) {
    let result = []
    let arrMap = {}
    arr1.forEach(item => arrMap[JSON.stringify(item)] = item)
    arr2.forEach(item => {
        let value = arrMap[JSON.stringify(item)]
        if (value !== undefined) {
            result.push(value)
        }
    })
    return result
}
function checkValue(variablesValue, controlValue) {
    let result
    if (Array.isArray(controlValue)) {
        if (Array.isArray(variablesValue)) {
            result = hasArrayMixed(controlValue, variablesValue).length !== 0
        } else {
            result = controlValue.indexOf(variablesValue) > -1
        }
    } else if (controlValue === undefined) {
        if (Array.isArray(variablesValue)) {
            result = variablesValue.length > 0
        } else {
            result = !!variablesValue
        }
    } else {
        if (Array.isArray(variablesValue)) {
            let target = variablesValue.find(value => JSON.stringify(value) == JSON.stringify(controlValue))
            result = !!target
        } else {
            result = controlValue == variablesValue
        }
    }
    return result
}
export default function eventShow(config = {}, variables = this.variables, variable) {
    // console.log('eventShow', JSON.stringify(config, null, 4))
    try {
        let strConfig = JSON.stringify(config);
        if (strConfig.length <= 4 || !config) {
            return true
        }
        var result = true;
        if (config.items && Array.isArray(config.items)) {
            var strFn = config.fn;
            var resultObj = {}
            config.items.forEach(item => {
                let variablesValue = variables[item.control_id]
                let controlValue = item.value
                resultObj = { key: item.control_id, result: checkValue(variablesValue, controlValue) }
                if (!!strFn) {
                    strFn = strFn.replace(resultObj.key, resultObj.result);
                }
            })
            if (config.items.length == 0) {
                result = resultObj.result
            } else {
                result = evilFn(strFn)
            }
        } else {
            var variablesValue = variables[config.control_id]
            let controlValue = config.value
            result = checkValue(variablesValue, controlValue)
        }
        if (variable) {
            let index = this.hiddenVariables.indexOf(variable)
            if (result) {
                if (index > -1) {
                    this.hiddenVariables.splice(index, 1)
                }
            } else {
                if (index === -1) {
                    this.hiddenVariables.push(variable)
                }
            }
        }
        return result
    } catch (e) {
        return true;
    }
}