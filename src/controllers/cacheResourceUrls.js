import { getResourceUrls } from '@/apis/wx.js'
let dataBase = {}
// let result = [
//     {
//         "uid": "6EBDA0BBCC9628915C8CF8790697C9BC",
//         "url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/upload/2018/04/25/77b14c88a200a3861d7fa34aecb2ed32.gif?e=1524652168&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:vE1fsxwTvqvHJnMWazTxxDdIu1k=",
//         "thumb_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/upload/2018/04/25/77b14c88a200a3861d7fa34aecb2ed32.gif?imageView2/0/w/100/h/100&e=1524652168&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:AbPCm_9Fs1dSnNoPjv8g9z4Ef50=",
//         "uri": "v3/upload/2018/04/25/77b14c88a200a3861d7fa34aecb2ed32.gif"
//     }
// ]

function getRequireAction(requireAction, resids) {
    return requireAction(Object.assign(
        getResourceUrls,
        {
            data: { res_uids: resids }
        }
    ))
}

function getNoCacheAction(resids, action) {
    return getRequireAction(action, resids).then(imgs => imgs.map(img => { dataBase[img.uid] = img; return img }))
}
function getHasCacheAction(resids, cacheResult, action) {
    return getRequireAction(action, resids).then(imgs => {
        imgs.map(img => {
            dataBase[img.uid] = img
        })
        let j = 0
        for (var i = 0; i < cacheResult.length; i++) {
            if (cacheResult[i] === false) {
                cacheResult[i] = imgs[j]
                j++
            }
        }
        return cacheResult
    })
}

export function getCacheUrls(resids, requireAction) {
    let cacheCount = 0
    let newResids = []
    let cacheResult = resids.map(id => {
        if (dataBase[id]) {
            cacheCount++
            return dataBase[id]
        } else {
            newResids.push(id)
        }
        return false
    })
    if (cacheCount === resids.length) {
        return Promise.resolve(cacheResult)
    }
    return cacheCount === 0 ? getNoCacheAction(resids, requireAction) : getHasCacheAction(newResids, cacheResult, requireAction)
}

export function setCacheUrls(imgs) {
    if (Array.isArray(imgs)) {
        imgs.map(img => {
            dataBase[img.uid] = img
        })
    } else if (imgs.uid) {
        dataBase[imgs.uid] = imgs
    }
}