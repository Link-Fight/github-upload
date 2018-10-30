import Base from './BaseConfig'
import LinkCell from './LinkCell'
import LinkCellForImg from './LinkCellForImg'
import { teamDetailBtns, getActionForm, getActionDetail, getActionSelect } from './AppBtns'
export default class LinkCellGroup extends Base {
    constructor(cfg = {}) {
        super(cfg)
        this.title = cfg.title || {}
        this.items = cfg.items || []
        this.icon = cfg.icon
        if (cfg.flod !== undefined) {
            this.flod = cfg.flod
        }
    }
    addChildItem(linkCell) {
        this.items.push(linkCell)
    }
}

export const linkCellForImg = new LinkCellForImg({
    type: 'LinkCellForImg',
    img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
    title: '语文',
    subTitle: '教你吟诗作对',
    value: '120.5(分)',
    phone: '15915797485'
    // href: 'wwww.baidu.com'
})

// #region baseLinkCellForImg
export const baseLinkCellForImg = new LinkCellGroup({ title: 'LinkCellGroup', icon: 'icon-shezhi', flod: true })
baseLinkCellForImg.addChildItem(new LinkCellForImg({
    img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
    title: '语文',
    subTitle: '教你吟诗作对',
    value: '120.5(分)',
    phone: '15915797485',
    href: 'wwww.baidu.com'
}))
baseLinkCellForImg.addChildItem(new LinkCellForImg({
    title: '数学',
    subTitle: '让你happy',
    value: '120.5(分)',
    href: 'wwww.baidu.com'
}))
baseLinkCellForImg.addChildItem(new LinkCellForImg({
    title: '英语',
    value: '120.5(分)',
    href: 'wwww.baidu.com'
}))
baseLinkCellForImg.addChildItem(new LinkCellForImg({
    title: '化学',
    value: '120.5(分)'
}))
baseLinkCellForImg.addChildItem(new LinkCellForImg({
    img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
    value: '修改图片'
}))
baseLinkCellForImg.addChildItem(new LinkCellForImg({
    title: '物理',
    href: 'wwww.baidu.com'
}))
// #endregion

// #region teamDetailLinkCellFormImg
export const teamDetailLinkCellFormImg = new LinkCellGroup({
    title: '队员列表(10名)'
})
teamDetailLinkCellFormImg.addChildItem(new LinkCellForImg({
    img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
    title: '打开popDetail',
    subTitle: ['新疆运营1队', '区域第一'],
    value: '管理员、队长',
    href: '',
    ...getActionDetail()
}))
teamDetailLinkCellFormImg.addChildItem(new LinkCellForImg({
    img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
    title: '小林',
    subTitle: '新疆运营1队',
    value: '',
    href: '',
    btns: teamDetailBtns
}))
// #endregion

// #region baseLinkCellGroup
export const baseLinkCellGroup = new LinkCellGroup({
    title: 'LinkCellGroup:{flod,icon}',
    icon: 'icon-shezhi'
})
baseLinkCellGroup.addChildItem(new LinkCell({
    icon: 'icon-weixin',
    title: 'icon,title,subTitle,phone',
    subTitle: '一行subTitle',
    phone: '15915797485'
}))
baseLinkCellGroup.addChildItem(new LinkCell({
    icon: 'icon-weixin',
    title: 'icon,title,subTitle[],value',
    subTitle: ['一行subTitle', '二行subTitle'],
    value: '一行value'
}))
baseLinkCellGroup.addChildItem(new LinkCell({
    icon: 'icon-weixin',
    title: 'icon,title,subTitle[],value[],color',
    subTitle: ['一行subTitle', '二行subTitle'],
    value: ['一行value', '二行value'],
    color: '#42bd56'
}))
baseLinkCellGroup.addChildItem(new LinkCell({
    title: 'title,subTitle[],value,href',
    subTitle: ['天骄一号', '拥有者：小环'],
    value: '120.5(分)',
    href: '#/'
}))
baseLinkCellGroup.addChildItem(new LinkCell({
    icon: '',
    title: '打开PopSelect,access,{action:"SELECT"}',
    subTitle: '15:58更新',
    value: '200亩',
    access: '',
    ...getActionSelect()
}))
baseLinkCellGroup.addChildItem(new LinkCell({
    icon: '',
    title: '打开PopForm,access,{action:"FORM"}',
    subTitle: '15:58更新',
    value: ['测绘：120.5(亩)', '作业：120.5(亩)'],
    access: '',
    ...getActionForm()
}))
baseLinkCellGroup.addChildItem(new LinkCell({
    icon: '',
    title: '打开PopDetail,access,{action:"DETAIL"}',
    subTitle: '15:58更新',
    value: '200亩',
    access: '',
    ...getActionDetail()
}))
// #endregion

export const TaskItems = [
    {
        icon: '',
        title: '测绘面积',
        subTitle: '15:58更新',
        value: '200亩',
        href: 'wwww.baidu.com'
    },
    {
        icon: '',
        title: '自动飞行',
        subTitle: '15:58更新',
        value: '200亩',
        href: '#/'
    },
    {
        icon: '',
        title: '手动飞行',
        subTitle: '15:58更新',
        value: '200亩',
        href: 'wwww.baidu.com'
    }
]

export const detailInfoLinkCellGroup = {
    type: 'LinkCellGroup',
    theme: 'small',
    items: [{
        title: '拥有者',
        value: '郑晓欢(15915797485)',
        phone: '15915797485'
    },
    {
        title: '管理者',
        value: '郑晓欢(15915797485)',
        phone: '15915797485'
    },
    {
        title: '使用者',
        value: '郑晓欢(15915797485)',
        phone: '15915797485'
    },
    {
        title: '设备信号',
        value: 'P30 2018款质保无人机'
    },
    {
        title: '生产日期',
        value: '2017-08-04 11:06:52'
    },
    {
        title: '激活日期',
        value: '2017-08-04 11:06:52'
    },
    {
        title: '绑定日期',
        value: '2017-08-04 11:06:52'
    },
    {
        title: 'FC-SN',
        value: '234785359'
    },
    {
        title: 'FC-ID',
        value: '2349328493243209482'
    }
    ]
}

export const detailStatusLinkCellGroup = {
    type: 'LinkCellGroup',
    items: [{
        icon: 'icon-x_protection1',
        title: '无忧计划',
        value: '剩下300天',
        color: '#f90',
        href: '#/orderDetail?isTest=1&src=123'
    },
    {
        icon: 'icon-x_protection1',
        title: '设备管理者',
        value: '剩下300天',
        color: '#f90',
        href: '#/orderDetail?isTest=1&src=987'
    },
    {
        icon: 'icon-x_protection1',
        title: '报账单',
        href: '#/orderDetail?isTest=1&src=987'
    }]
}

export const deviceSettingLinkCellGroup = {
    type: 'LinkCellGroup',
    title: '基础设置',
    items: [{
        title: '修改设备名称',
        value: '雷霆战机一号',
        href: '#/orderDetail?isTest=1&src=123'
    },
    {
        title: '设备管理者',
        value: '李建辉',
        href: '#/orderDetail?isTest=1&src=987'
    },
    {
        title: '更多设置',
        href: '#/orderDetail?isTest=1&src=987'
    }]
}

export const safeguardDetailLinkCellGroup = {
    type: 'LinkCellGroup',
    items: [{
        title: '保障周期',
        value: '2017/08/04到2018/08/04'
    },
    {
        title: '保障金额',
        value: '50000元'
    },
    {
        title: '剩余金额',
        value: '12000元',
        color: '#f90'
    },
    {
        title: '已保次数',
        value: '3次'
    },
    {
        title: '剩余时间',
        value: '还剩80天',
        color: '#f90'
    }
    ]
}
export const insurancelnInfoLinkCellGroup = {
    type: 'LinkCellGroup',
    items: [{
        title: '被保险人',
        value: '李建辉'
    },
    {
        title: '保险额度',
        value: '30万元'
    },
    {
        title: '保险期限',
        value: '2018-05-20到2019-05-20'
    },
    {
        title: '剩余时间',
        value: '剩余300天'
    }]
}
export const insurancelnDetailLinkCellGroup = {
    type: 'LinkCellGroup',
    title: '保障项目',
    theme: 'small total',
    tips: '在保险期间内，被保险无人机或从被保险无人机上坠落的任何物品造成第三者的人身伤亡和财产损失，依照中华人民共和国法律（不包含港澳台地区法律）应由被保险人承担的经济赔偿责任，保险人按照本保险合同约定负责赔偿。',
    items: [{
        title: '每次事故第三者人身伤亡赔偿限额',
        value: '200、000元'
    },
    {
        title: '每次事故第三者财产损失赔偿限额',
        value: '100、000元'
    },
    {
        title: '年度累计赔偿限额',
        value: '300、000元',
        color: '#f90'
    }
    ]
}

export function getFoldLinkCell() {
    return [
        {
            type: 'LinkCell',
            value: '只设置了value,color>>',
            color: 'red'
        },
        {
            type: 'LinkCell',
            ...baseLinkCellGroup.items[3]
        },
        {
            type: 'LinkCellForImg',
            ...teamDetailLinkCellFormImg.items[0]
        },
        {
            type: 'LinkCellGroup',
            flod: true,
            ...baseLinkCellGroup,
            title: 'LinkCellGroup:{flod:true}'
        },
        {
            type: 'LinkCellGroup',
            flod: false,
            ...baseLinkCellGroup,
            title: 'LinkCellGroup:{flod:false}'
        },
        {
            type: 'LinkCellGroup',
            ...baseLinkCellGroup,
            title: 'LinkCellGroup:{}'
        },
        {
            type: 'LinkCellForImgGroup',
            flod: true,
            ...teamDetailLinkCellFormImg
        },
        {
            type: 'LinkCellForImgGroup',
            flod: false,
            ...teamDetailLinkCellFormImg
        },
        {
            type: 'LinkCellForImgGroup',
            ...teamDetailLinkCellFormImg
        }
    ]
}

export function getLinkCell() {
    return baseLinkCellGroup.items
}
