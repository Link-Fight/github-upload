export function getBillInfoList(guid) {
    return {
        url: '/wechat/mall/invoice/index',
        data: {
            guid
        },
        method: 'get'
    }
}

export function getDefaultBillInfo() {
    return {
        url: '/wechat/mall/invoice/index',
        data: {
            get_default: 1
        },
        method: 'get'
    }
}

export function deleteBillInfo(guid) {
    return {
        url: '/wechat/mall/invoice/delete_invoice',
        data: {
            guid
        },
        method: 'post'
    }
}

export function saveBillInfo(data) {
    return {
        url: '/wechat/mall/invoice/save_invoice',
        data,
        method: 'post'
    }
}
