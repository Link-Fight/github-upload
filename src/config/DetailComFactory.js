import { delay } from './util'
import { baseLinkCellForImg, baseLinkCellGroup, linkCellForImg, detailInfoLinkCellGroup, detailStatusLinkCellGroup, getFoldLinkCell } from './LinkCellGroup'
import { InfoListItem } from './ViewInfoList'
import { getDeviceListItem } from './DeviceListItem'
import appImages from './AppImages'
import appTableFactory from './AppTable'
import { appBtnsInFooter, getActionForm } from './AppBtns'
import chart from './chart'
import UiStatu from './UiStatu'
import LocInfo from './LocInfo'

let geoImg = {
    type: 'GeoImg',
    config: {
        id: 3040,
        name: '广东省/广州市/天河区',
        'address': '暨南大学(广州石牌校区)内,暨南大学-会计学系附近30米',
        lat: 23.132725848626784,
        lng: 113.34296573731866,
        zoom: 12
    }
}

let IMG_SRC = [
    {
        'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
        'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
    }, {
        'url': 'https://images.unsplash.com/photo-1521043388745-6c3cb22e8550?ixlib=rb-0.3.5&q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max&ixid=eyJhcHBfaWQiOjcwOTV9&s=d223b3f5ee9f0e0712c0a7dbb5b51000',
        'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk='
    }, {
        'url': 'https://images.unsplash.com/photo-1476616853026-24c1f0309646?ixlib=rb-0.3.5&q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max&ixid=eyJhcHBfaWQiOjcwOTV9&s=14ff8a50632f980405f75de8da0e20be',
        'thumb_url': 'https://images.unsplash.com/photo-1476616853026-24c1f0309646?ixlib=rb-0.3.5&q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max&ixid=eyJhcHBfaWQiOjcwOTV9&s=14ff8a50632f980405f75de8da0e20be'
    }
]

function getDataShow() {
    return {
        type: 'dataShow',
        items: [
            {
                'title': 'title',
                'value': 'value',
                'color': '#42bd56',
                'bold': true,
                'status': UiStatu.slice(1, 3)
            },
            {
                'title': '您问您自己',
                'value': '你现在在干什么？你现在干的是你心中所想的吗？你为什么在这里，你心里有数不！哎不多说，搬砖',
                'color': '#42bd56',
                'bold': false,
                'status': UiStatu.slice(2, 3)
            },
            {
                title: '刘波',
                status: [{
                    title: '提交于：2018/04/24'
                }]
            },
            {
                title: '内容：',
                value: '进来看见了看见了的深刻发来得及了大概就是离开国际大驾光临倒计时了科技管理会计老顾客简单分类结果我仍记得发计划但凡事都发过来打飞机'
            }
        ],
        images: IMG_SRC
    }
}

const detailHeader = {
    avatar: IMG_SRC,
    icon: 'icon-rili',
    title: '新疆运营2队',
    bg: 'red',
    subTitle: '陈小林 32450亩',
    attrs: [],
    tags: [
        {
            txt: '倒腾',
            color: 'red'
        }
    ],
    btns: [],
    current: '',
    href: '#/detail?src=233',
    tip: ''
}

let StatisticeCells = {
    type: 'StatisticeCells',
    items: [
        {
            title: '英文10',
            value: '120.5(分)',
            status: true
        },
        {
            title: '数学',
            value: '120.5(分)',
            status: true
        },
        {
            title: '语文',
            value: '120.5(分)',
            status: true
        },
        {
            title: '物理',
            value: '120.5(分)',
            status: false
        }
    ]
}

const title = {
    type: 'title',
    title: '订单'
}

const chartLine = chart()
const chartBar = chart('bar')
const chartBarY = chart('barY')
const chartPie = chart('pie')
const chartMap = chart('map')
const chartMapGuangdong = chart('map', 'guangdong')
const chartMapXinjiang = chart('map', 'xinjiang')

const score = {
    type: 'score',
    title: '多少分',
    value: 5
}

const LinkCell = {
    type: 'LinkCell',
    icon: 'icon-add',
    title: '创建订单',
    access: false,
    href: '#/orderDetail?isTest=1&src=123'
}

const LinkCell1 = {
    type: 'LinkCell',
    icon: 'icon-add',
    title: '创建订单',
    access: '',
    href: '#/orderDetail?isTest=1&src=123'
}

const LinkCellGroup = {
    type: 'LinkCellGroup',
    title: '',
    items: [{
        icon: '',
        title: '#24545李保成',
        subTitle: '河南省周口市西华县',
        value: '120.5(亩)',
        href: '#/orderDetail?isTest=1&src=123'
    },
    {
        icon: '',
        title: '#100860水晓梅',
        subTitle: ['发布人:张向荣', '更新时间:2018-04-11 10:20'],
        value: '120.5(亩)',
        href: '#/orderDetail?isTest=1&src=987'
    }]
}

const LinkCellForImgGroup = {
    type: 'LinkCellForImgGroup',
    items: baseLinkCellForImg.items
}

const LinkCellGroupInfo = {
    type: 'LinkCellGroup',
    ...baseLinkCellGroup
}

const linkCellForTxt = {
    title: '人生的一点点小建议',
    type: 'LinkCellForTxt',
    content: '对极飞保障政策的建议。<br>一、现行政策存在的问题：<br>1.保障技术人员数量有限，在极飞植保机未全国推广时，还能满足保障需求，现在推广起来，全国各地都有飞机，保障人员明显不足，到农忙时，会激化矛盾，甚至引起冲突。<br>2.流动保障车收费问题会激化矛盾，本来需要技术人员到场就已经是比较大的事故了，现场农民情绪就很激动，结果极飞保障先把收费提在前面，于情于理都让人很难接受，情绪处理不好后果会很严重。<br>3.备用机不到位，耽误一季植保作业，造成农民损失的，后果谁来承担。<br><br>二、对保障政策的建议：改上门维修保障方案为代理点与保障中心联合保障方案。<br><br>三、主要做法：<br>1.维修点对所代理的植保机负责，常见故障自行排除，收取合理费用；<br>2.维修点根据代理机器的数量，申请相应比例的备用机，保障农忙季节的时效性作业，让农民无后顾之忧，避免耽误农时的事件发生；<br>3.代理点将无法修复的植保机集中后，邮寄或运送至保障中心统一维修；<br>4.维修中心对代理点有培训、技术支持、零备件供应及服务质量管理的责任和义务。<br><br>四、主要理由<br>1.代理点作为植保机销售和租赁的主体，直接面对农户，出现问题农户的第一时间是找代理点，代理点或上门或要求其送到门店，总之，必须把情况了解清楚之后才能决定是否需要保障车。代理点实际已经参与了保障过程。然而，现有政策未能规范代理点行为，也未能对代理点给予有效支持，全凭代理点的良心。代理点的作用不能有效发挥。<br>2.任何维修都需要时间，保障车再多，也不能第一时间到达，如遇到两地同时要求保障时，必将发生冲突，耽误农时。解决办法就是代理点有备用机。这前期看视乎投资大，实则是为民着想的大好事。而且为公司盘活了库存，避免了浪费。<br>3.代理点统一送修，将大大节约公司成本。盲目扩大维修人员和保障车辆，会给公司带来惊人浪费，还不能保证维修的质量和时效性。不如专心做好保障中心的建设，而且这样全国只需要较少的保障中心即可，可建设的标准高，维修质量好！综合效果会比上门服务更好！<br>4.将代理点纳入保障体系，会大大提高代理商的业务水平。<br>5.以上做法，可克服现有政策的全部缺点，并使极飞保障成为一个盈利点。<br>以上个人观点，供极飞决策者参考。'
}

const LinkImgInfo = {
    type: 'LinkImgInfo',
    imgs: IMG_SRC.map(item => item.thumb_url),
    title: '已成功报名10人、飞机12架',
    href: '#/orderDetail?isTest=1&src=123'
}

let tabCom = {
    type: 'tab',
    variable: 'tab1',
    items: [{
        title: '正常',
        key: 'zhengc'
    }, {
        title: '正常+1',
        key: 'zhengc1'
    }, {
        title: '异步',
        key: 'aync',
        src: 'isTest',
        params: {
            name: 'xiaohuan',
            time: '2017'
        }
    }]
}

let tabCom0 = {
    type: 'tab',
    variable: 'tab0',
    items: ['正常啊', '能不正常吗']
}

let AppImages = {
    type: 'images',
    ...appImages
}

export let FarmingInfo = {
    type: 'FarmingInfo',
    title: '李保成',
    address: '距我5.6km 河南省周口市西环线国营农场旁边',
    items: [
        {
            title: '玉米',
            value: '作物',
            href: 'https://wwww.bing.com'
        },
        {
            title: '2000亩',
            value: '面积'
        },
        {
            title: '10元',
            value: '亩单价'
        },
        {
            title: '03.20-03.31',
            value: '作业时间'
        }
    ],
    tags: [
        {
            title: '05-23 12:56更新'
        },
        {
            title: '完成',
            color: 'red'
        }
    ],
    status: [
        { txt: '工作餐', value: true },
        { txt: '住宿', value: true },
        { txt: '电池充电', value: false },
        { txt: '提供24小时热水', value: false },
        { txt: '提供停车场', value: false }
    ]
}

export function getFormDetailCom() {
    return [
        AppImages,
        StatisticeCells,
        InfoListItem,
        LinkCellGroup,
        LinkCellForImgGroup,
        linkCellForTxt
    ]
}

function getAllitems() {
    let data = [
        tabCom0,
        Object.assign({}, StatisticeCells, {
            show: {
                key: tabCom0.variable,
                value: '正常啊'
            }
        }),
        Object.assign({}, chartLine, {
            show: {
                key: tabCom0.variable,
                value: '正常啊'
            }
        }),
        Object.assign({}, chartBar, {
            show: {
                key: tabCom0.variable,
                value: '正常啊'
            }
        }),
        Object.assign({}, chartBarY, {
            show: {
                key: tabCom0.variable,
                value: '正常啊'
            }
        }),
        Object.assign({}, LinkCellGroup, {
            show: {
                key: tabCom0.variable,
                value: '能不正常吗'
            }
        }),
        Object.assign({}, appTableFactory('smallTable'), {
            show: {
                key: tabCom0.variable,
                value: '能不正常吗'
            }
        }),
        getDataShow(),
        score,
        geoImg,
        {
            type: 'empty',
            icon: 'icon-shezhi',
            txt: '没有数据'
        },
        FarmingInfo,
        {
            type: 'more',
            title: '加载更多',
            url: 'isTest'
        },
        AppImages,
        chartLine,
        appTableFactory('baseTable'),
        InfoListItem,
        LinkCellGroupInfo,
        tabCom,
        Object.assign({}, title, {
            show: {
                key: 'tab1',
                value: 'zhengc'
            }
        }),
        Object.assign({}, LinkCellGroup, {
            show: {
                key: 'tab1',
                value: 'zhengc'
            }
        }),
        Object.assign({}, LinkCellForImgGroup, {
            show: {
                key: 'tab1',
                value: 'zhengc1'
            }
        }),
        {
            type: 'title',
            title: '飞机',
            show: {
                key: 'tab1',
                value: 'aync'
            }
        },
        linkCellForTxt,
        {
            type: 'more',
            title: '加载更多',
            url: 'isTest'
        }
    ]
    return data
}

function getFarmingInit() {
    let tabCom = {
        type: 'tab',
        variable: 'tab0',
        items: [{
            title: '异步',
            key: 'aync',
            src: 'isTest',
            params: {
                name: 'xiaohuan',
                time: '2017'
            }
        },
            '详细信息', '作业订单', '作业数据',
        {
            title: '异步1',
            key: 'aync1',
            src: 'isTest',
            params: {
                name: 'xiaohuan',
                time: '2018'
            }
        }]
    }
    return [
        AppImages,
        LocInfo,
        tabCom,
        LinkImgInfo,
        LinkCell,
        LinkCell1,
        Object.assign({}, {
            ...FarmingInfo,
            ...getActionForm('FarmingInfo')
        }, {
                show: {
                    key: 'tab0',
                    value: '详细信息'
                }
            }),
        Object.assign({}, linkCellForImg, {
            show: {
                key: 'tab0',
                value: '详细信息'
            }
        }),
        Object.assign({}, appTableFactory('phoneTable'), {
            show: {
                key: 'tab0',
                value: '作业数据'
            }
        }),
        Object.assign({}, linkCellForTxt, {
            show: {
                key: 'tab0',
                value: '作业订单'
            }
        })
    ]
}

export function getDeviceDetail() {
    return [detailInfoLinkCellGroup, detailStatusLinkCellGroup]
}

export function getStatistics() {
    let tabCom = {
        type: 'tab',
        variable: 'tab0',
        items: ['图表', '表格']
    }
    let tabCom1 = {
        type: 'tab',
        variable: 'tab1',
        items: ['新访客', '老访客']
    }
    return [
        chartMap,
        chartMapGuangdong,
        chartMapXinjiang,
        chartPie,
        Object.assign({}, StatisticeCells, {
            items: [
                {
                    title: '作业面积',
                    value: '18.6万亩'
                },
                {
                    title: '作业飞机',
                    value: '210架'
                }
            ]
        }),
        tabCom,
        Object.assign({}, chartLine, {
            show: {
                key: tabCom.variable,
                value: '图表'
            }
        }),
        Object.assign({}, chartBarY, {
            show: {
                key: tabCom.variable,
                value: '图表'
            }
        }),
        Object.assign({}, appTableFactory('phoneTable'), {
            show: {
                key: tabCom.variable,
                value: '表格'
            }
        }),
        Object.assign({}, appTableFactory('smallTable'), {
            show: {
                key: tabCom.variable,
                value: '表格'
            }
        }),
        tabCom1,
        Object.assign({}, chartBar, {
            show: {
                key: tabCom1.variable,
                value: '新访客'
            }
        }),
        Object.assign({}, chartBarY, {
            show: {
                key: tabCom1.variable,
                value: '老访客'
            }
        })
    ]
}

const componentsMap = {
    table: appTableFactory,
    dataShow: () => [getDataShow(), appTableFactory('dataShowTable')],
    linkcell: getFoldLinkCell,
    empty: () => [
        {
            type: 'empty',
            icon: 'icon-shezhi',
            txt: '没有数据'
        }
    ],
    DeviceListItem: () => [getDeviceListItem(1, 'all'), getDeviceListItem(1, 'header'), getDeviceListItem(1, 'noAvator')],
    FarmingInfo: () => [FarmingInfo],
    InfoListItem: () => [InfoListItem],
    GeoImg: () => [geoImg],
    LocInfo: () => [LocInfo],
    StatisticeCells: () => [StatisticeCells, Object.assign({ title: 'theme:steps', theme: 'steps' }, StatisticeCells)],
    chart: () => [chartLine, chartBar, chartBarY, chartPie, chartMap, chartMapGuangdong, chartMapXinjiang],
    FormDetail: getFormDetailCom
}

export function getInitData(params) {
    let { url, data = {} } = params
    let { bodyonly, type } = data
    let title = '详情页'
    let header = detailHeader
    let footer = appBtnsInFooter
    let getItemFn = getAllitems
    let floatTip = ''
    if (params) {
        url = url || data.url
        if (componentsMap[url] || componentsMap[type]) {
            header = null
            getItemFn = componentsMap[url] || componentsMap[type]
            footer = null
        } else if (url === 'farming' || type === 'farming') {
            floatTip = '用户进入需求后需要申请加入，或者你也<br>可以分享需求到微信群或朋友圈'
            header = null
            getItemFn = getFarmingInit
        } else if (url === 'device' || type === 'device') {
            header = null
            getItemFn = getDeviceDetail
            footer = null
        } else if (url === 'Statistics' || type === 'Statistics') {
            header = null
            getItemFn = getStatistics
            footer = null
        }
    }
    let result = {
        title,
        floatTip,
        config: {
            header,
            body: getItemFn(),
            footer
        }
    }
    return delay(bodyonly ? result.config.body : result)
}

export function getQueryData(params) {
    console.log('DetailCom:queryData', JSON.stringify(params, null, 4))
    let data = {
        body: getStatistics()
    }
    return delay(data)
}

export function getAjaxTab() {
    console.log('DetailCom:异步获取tab')
    let data = [LinkCellGroup, LinkCellGroup]
    return delay(data)
}
export function getMoreData() {
    console.log('DetailCom:loadMore')
    let data = [chartLine]
    return delay(data)
}
