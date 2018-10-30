/* eslint-disable prefer-promise-reject-errors,no-unused-vars  */
export default function (config) {
    const validatorKey = Object.keys(config.data)
    return function (postData) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < validatorKey.length; i++) {
                let key = validatorKey[i]
                if (config.data[key].required || config.data[key].validator instanceof Function) {
                    if (!postData[key]) {
                        let message = config.data[key].requiredMsg || config.data[key].validator(postData[key]) || key + '是必须字段'
                        reject({ message })
                        return
                    } else if (config.data[key].validator) {
                        let message = config.data[key].validator(postData[key])
                        if (message) {
                            reject({ message })
                            return
                        }
                    }
                }
            }
            resolve(Object.assign({}, config, { data: postData }))
        })
    }
}