import Base from './BaseConfig'

export class Btn extends Base {
    static explain = {
        txt: '<String>显示的文本',
        icon: '<String>使用的icon',
        type: '<String>["",submit,cancel,alert,disable]:按钮的样式',
        badge: '<Init>小徽章：例如消息数量',
        ajax: '<Object>按钮的ajax请求',
        'ajax.api': '<String>按钮点击时候的ajax请求,以及action=[FORM,DETAIL]时请求的数据源',
        'ajax.params': '<Object>ajax请求时带上的参数对象,以及action=[FORM,DETAIL]时请求的数据参数',
        'ajax.confirm': '<String>按钮点击时候的确认弹窗中的提示内容',
        'ajax.cancel': '<Object:Btn|String> 弹窗按钮的 左边取消按钮 配置',
        'ajax.ok': '<Object：Btn|String> 弹窗按钮的 右边确认按钮  配置',
        'ajax.input': '<Object>弹窗里 如果需要用户输入备注信息 的配置',
        'ajax.cacheKey': '<String>当需要请求数据，这个字段可以拿来缓存请求数据',
        'input.key': '<String>备注信息将随ajax.api一起提交，该字段将指定提交的key',
        'input.placeholder': '<String>弹窗输入的 默认提示',
        'input.required': '<Boolean>弹窗输入的 是否必填',
        href: '<Object>({url})要跳转的地址，点击直接跳|请求后跳转的地址|请求后返回{href:“”}来跳转',
        items: '<Array>这个按钮点击后会张开更多的子按钮',
        action: '特殊功能[TeamCreate][TeamSelector][DOC][FORM][SCAN][DETAIL][SELECT]',
        color: '~底部按钮支持',
        bg: '~底部按钮支持'
        // 当action==='DOC'时候 ajax.api就是要打开的文档的地址
    }
    constructor(config = {}) {
        let btn = {
            txt: '',
            icon: '',
            type: '',
            badge: '',
            ajax: {},
            items: [],
            action: '',
            color: '',
            bg: ''
        }
        Object.assign(btn, config)
        super(btn)
    }
    addChildItem(btn) {
        this.items.push(btn)
    }
    setAjax(api, confirm) {
        this.ajax = {
            api,
            confirm
        }
    }
}
export function getActionForm(url) {
    return {
        action: 'FORM',
        ajax: {
            api: 'isTest',
            params: {
                url,
                name: 'kelin'
            }
        }
    }
}
export function getActionDetail(type) {
    return {
        action: 'DETAIL',
        ajax: {
            api: 'isTest',
            params: {
                name: '123456',
                type: type || 'linkcell'
            }
        }
    }
}
export function getActionSelect() {
    return {
        action: 'SELECT',
        ajax: {
            api: 'isTest',
            params: {
                name: 'kelin'
            }
        }
    }
}
let badgeBtn1 = new Btn({
    icon: 'icon-xuqiu',
    badge: 9,
    color: '#42bd56',
    ajax: {
        // api: '/wechat/wechat/check_login',
        // api: '/home/v3/4800',
        confirm: '确定要这样？'
    },
    href: {
        url: '#/detail'
    }
})
let badgeBtnMore = new Btn({
    icon: 'icon-gengduo'
})
badgeBtnMore.addChildItem(new Btn({
    icon: 'icon-add',
    txt: '创建团队',
    action: 'TeamCreate',
    ajax: {
        api: '/wechat/wechat/check_login'
    }
}))
badgeBtnMore.addChildItem(new Btn({
    icon: 'icon-shezhi',
    txt: '设置我的当前团队',
    ajax: {
        api: '/wechat/wechat/check_login'
    },
    action: 'TeamSelector'
}))
const teamDetailRemoveBtn = new Btn({
    icon: 'icon-gengduo'
})
teamDetailRemoveBtn.addChildItem(
    new Btn({
        icon: '',
        txt: '移除改队员',
        ajax: {
            api: '/wechat/wechat/check_login',
            confirm: '移除后，其作业数据也将移除！'
        }
    })
)
export const teamDetailBtns = [
    teamDetailRemoveBtn
]
export const teamListBadgeBtns = [
    badgeBtn1,
    badgeBtnMore
]
export const TeamListItemBtns = [
    new Btn({
        txt: '作业数据',
        icon: 'icon-rili',
        href: {
            url: '#/detail'
        }
    })
]
export const cancelOkBtns = [
    new Btn({
        txt: '取消',
        type: '',
        action: 'cancel'
    }),
    new Btn({
        txt: '确定',
        type: 'submit',
        action: 'ok',
        color: '#fff'
    })
]
export default [
    new Btn({
        txt: '邀请',
        type: 'submit'
    }),
    new Btn({
        txt: '更多操作'
    }),
    new Btn({
        txt: '取消',
        type: 'alert'
    }),
    new Btn({
        txt: '没有操作权限',
        type: 'disable'
    })
]

export const orderListHeaderBtns = []
orderListHeaderBtns.push(new Btn({
    txt: '申请',
    bage: 9,
    icon: 'icon-lishi'
}))
orderListHeaderBtns.push(new Btn({
    txt: '创建',
    bage: 0,
    icon: 'icon-add',
    items: [
        {
            icon: 'icon-saomiao',
            txt: '扫一扫',
            ajax: {
                api: '/wechat/wechat/check_login',
                input: {
                    key: 'sn'
                }
            },
            action: 'SCAN'
        },
        {
            icon: 'icon-bianji1',
            txt: '输入序列号',
            ajax: {
                api: '/wechat/wechat/check_login',
                confirm: '请输入设备序列号',
                input: {
                    key: 'sn',
                    placeholder: '输入点啥',
                    required: true
                }
            }
        }
    ]
}))
orderListHeaderBtns.push(new Btn({
    txt: '创建',
    bage: 0,
    icon: 'icon-help',
    action: 'DOC',
    ajax: {
        api: 'isTest'
    }
}))

export const InfoListItemBtns = []
InfoListItemBtns.push(new Btn({
    txt: '拒绝加入团队',
    color: 'red',
    ajax: {
        api: '/wechat/wechat/check_login',
        confirm: '确定要拒绝他吗？',
        input: {
            key: 'name',
            placeholder: '输入点啥',
            required: true
        }
    }
}))
InfoListItemBtns.push(new Btn({
    txt: '同意加入团队',
    type: 'submit',
    ajax: {
        api: '/wechat/wechat/check_login',
        confirm: '确定要接受他吗？'
    }
}))

export const appBtnsInFooter = []
appBtnsInFooter.push(new Btn({
    icon: 'icon-fabuxuqiu',
    txt: '表单',
    type: 'alert',
    // ajax: {
    //     confirm: '为什么老加班？有宵夜吗？'
    // },
    ...getActionForm('text')
}))
appBtnsInFooter.push(new Btn({
    txt: '调薪',
    type: 'submit',
    items: [
        {
            icon: '',
            txt: '作业数据',
            ajax: {
                confirm: '移除后，其作业数据也将移除！'
            }
        },
        {
            icon: '',
            txt: '作业方案',
            ajax: {
                confirm: '移除后，其作业数据也将移除！'
            }
        },
        {
            icon: '',
            txt: '作业任务',
            ajax: {
                confirm: '移除后，其作业数据也将移除！'
            }
        },
        {
            icon: '',
            txt: '锁定飞机',
            ajax: {
                confirm: '移除后，其作业数据也将移除！'
            }
        }
    ]
}))
