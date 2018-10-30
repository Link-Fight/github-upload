export function getAddressList(guid) {
    return {
        url: '/wechat/account/address/address_list',
        data: {
            guid
        }
    }
}

export function deleteAddress(guid) {
    return {
        url: '/wechat/account/address/delete',
        data: {
            guid,
            type: 1
        },
        method: 'get'
    }
}
export function saveAddress(data) {
    return {
        url: '/wechat/account/address/save',
        data,
        method: 'post'
    }
}

export function getAddress(guid) {
    return {
        url: `/wechat/account/address/edit_page`,
        data: {
            guid
        }
    }
}
