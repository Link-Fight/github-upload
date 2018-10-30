/* 基于 AppBtns.js
添加 agress: {txt:'',api:'' }
*/
export default {
    txt: '免费领取',
    type: 'submit',
    agress: {
        txt: 'xxx协议条款',
        api: 'isTest'
    },
    ajax: {
        confirm: '输入sn码',
        api: '/wechat/wechat/check_login',
        input: {
            key: 'sn',
            placeholder: '输入sn码啊',
            required: true
        }
    }
}

export const appBuyAgress = {
    txt: '免费领取',
    type: 'submit',
    agress: {
        txt: 'xxx协议条款',
        api: 'isTest'
    },
    buyTip: '￥1000元',
    ajax: {
        confirm: '输入sn码',
        api: '/wechat/wechat/check_login',
        input: {
            key: 'sn',
            placeholder: '输入sn码啊',
            required: true
        }
    }
}