import { delay } from './util'
import createCemand from './DiyForm/create_demand'
import applyDemand from './DiyForm/apply_demand'
const submitBtn = {
    'href': {
        'url': '/diyList?isTest=1',
        'params': []
    },
    ajax: {
        api: '/wechat/wechat/check_login',
        confirm: '确定要保存吗？'
    },
    'type': 'submit',
    'icon': 'icon-rili',
    'txt': '提交啊'
}
let buySubmitBtn = {
    theme: 'buy',
    buyTip: '￥2000元',
    agress: {
        txt: 'xxx协议条款',
        api: 'isTest'
    },
    'href': {
        'url': '/diyList?isTest=1',
        'params': []
    },
    ajax: {
        api: '/wechat/wechat/check_login',
        confirm: '确定要保存吗？'
    },
    'type': 'submit',
    'icon': 'icon-rili',
    'txt': '提交'
}
const ComMap = {
    dateSelect: getDateSelect,
    text: getText,
    FarmingInfo: getDetailFarmingInfo,
    createDemand: () => createCemand,
    applyDemand: () => applyDemand,
    showRule: getShowRuleDemo
}

function getDetailFarmingInfo() {
    return [
        getText('title', 'title', 'string'),
        getText('address', 'address', 'string')
    ]
}
function getShowRuleDemo() {
    return [{
        'require': false,
        'mode': 'edit',
        'options': [{
            'value': '1',
            'label': '设备激活卡'
        },
        {
            'value': '2',
            'label': '无忧计划'
        }
        ],
        'type': 'radio',
        'label': '激活卡类型',
        'variable': 'type'
    },
    {
        'placeholder': '请选择',
        'require': true,
        'mode': 'edit',
        'options': [{
            'value': '0',
            'label': '无'
        },
        {
            'value': 1,
            'label': 'P20 2017款2k一年'
        },
        {
            'value': 2,
            'label': 'C2000 一年版'
        },
        {
            'value': 8,
            'label': 'P20 RTK2018款'
        },
        {
            'value': 6,
            'label': 'P10 GPS2018款'
        },
        {
            'value': 7,
            'label': 'P10 RTK2018款'
        },
        {
            'value': 9,
            'label': 'P30 RTK2018款'
        }
        ],
        'type': 'dropdown',
        'tips': 'Tip: 生成设备激活卡时可同时生成无忧计划卡',
        'label': '无忧计划',
        'variable': 'safeguard_type',
        'showRule': {
            'fn': 'type',
            'immediateClear': true,
            'items': [{
                'control_id': 'type',
                'value': [
                    '1'
                ]
            }]
        }
    },
    {
        'placeholder': '请选择',
        'require': true,
        'mode': 'edit',
        'options': [{
            'value': 1,
            'label': 'P20 2017款2k一年'
        },
        {
            'value': 2,
            'label': 'C2000 一年版'
        },
        {
            'value': 8,
            'label': 'P20 RTK2018款'
        },
        {
            'value': 6,
            'label': 'P10 GPS2018款'
        },
        {
            'value': 7,
            'label': 'P10 RTK2018款'
        },
        {
            'value': 9,
            'label': 'P30 RTK2018款'
        }
        ],
        'type': 'dropdown',
        'label': '无忧计划',
        'variable': 'safeguard_type',
        'showRule': {
            'fn': 'type',
            'immediateClear': true,
            'items': [{
                'control_id': 'type',
                'value': [
                    '2'
                ]
            }]
        }
    },
    {
        'placeholder': '请选择',
        'require': true,
        'mode': 'edit',
        'type': 'text',
        'label': '保险金额',
        'variable': 'safeguard_money',
        'showRule': {
            'fn': 'type',
            'immediateClear': true,
            'items': [{
                'control_id': 'type'
            }]
        }
    },
    {
        'placeholder': '请选择',
        'require': true,
        'mode': 'edit',
        'type': 'text',
        'label': '无忧计划金额',
        'variable': 'safeguard_money_type',
        'showRule': {
            'fn': 'type&&safeguard_money',
            'immediateClear': true,
            'items': [{
                'control_id': 'type'
            }, {
                'control_id': 'safeguard_money'
            }]
        }
    }
    ]
}
function getDateSelect() {
    let viewModes = ['year', 'month', 'day', 'hour', 'minute']
    function getDateSelectComs(config) {
        return Object.assign({
            type: 'dateSelect',
            variable: 'dateSelect_year',
            label: 'year',
            viewMode: 'year',
            placeholder: '选择吧少年',
            tips: '[viewMode:year/month/day/hour/minute](默认：day)选择时间：将打开地图，点选地点'
        }, config)
    }
    return viewModes.map(viewMode =>
        getDateSelectComs({
            variable: `dateSelect_` + viewMode,
            viewMode,
            label: viewMode
        })
    )
}
function getText(...avg) {
    let dateTypes = ['init', 'float', 'string']
    function getTextCfg(label, variable, dataType, placeholder, require, unit) {
        return {
            type: 'text', label, variable, dataType, placeholder, require, unit
        }
    }
    function getDateTypes() {
        return dateTypes.map(type => getTextCfg(`text:${type}`, 'text_' + type, type, '按要求输入', true))
    }
    if (avg.length > 1) {
        return getTextCfg(...avg)
    }
    return [...getDateTypes(), submitBtn]
}
let initData = {
    diy_form_guid: 'test',
    title: '这不是个简单的表单',
    needRequireTip: true,
    header: {
        title: '创建个表单吧', // 大佬！大佬别跑，这里有好东西，不好不收钱，收人民币还你多隆。
        icon: '',
        action: 'DOC',
        autoShow: true,
        ajax: {
            api: 'isTest'
        },
        href: '',
        color: 'white',
        bg: '#DAA520'
    },
    variables: {
        slider1: 10,
        slider2: [50, 150],
        checkBox: [1],
        area_id: {
            id: '289',
            name: '广东省/广州市'
        }
    },
    items: [
        {
            'multiple': true,
            'src': {
                'url': 'isTest'
            },
            'type': 'select',
            'variable': 'account_ids',
            'tips': '注：运营系统账号',
            'label': '开放账号',
            'require': true
        },
        {
            type: 'score',
            label: '[score]',
            variable: 'score',
            mode: 'edit',
            require: true,
            tips: "{mode:'edit'}"
        },
        {
            type: 'score',
            label: '[score]',
            variable: 'score',
            mode: 'view',
            tips: "{mode:'edit'}"
        },
        {
            type: 'dropdown',
            variable: 'FormDropdown',
            label: '[dropdown]',
            options: [
                {
                    'value': 0,
                    'label': '组队'
                },
                {
                    'value': 1,
                    'label': '团队'
                },
                {
                    'value': 2,
                    'label': '联盟'
                }
            ],
            tips: '单选框'
        },
        {
            type: 'dateSelect',
            variable: 'dateSelect_year',
            label: '选下时间吧',
            viewMode: '',
            placeholder: '选择吧少年',
            tips: '[viewMode:year/month/day/hour/minute](默认：day)选择时间：将打开地图，点选地点'
        },
        {
            type: 'latLng',
            variable: 'latLngs',
            label: '经纬度选择',
            placeholder: '选择吧少年',
            tips: '选择经纬度：将打开地图，点选地点'
        },
        {
            type: 'map',
            variable: 'maps',
            label: '禁飞区',
            placeholder: '选择下吧',
            src: {
                url: '/wechat/noflyzone/home/no_fly_zone_list',
                params: { area_id: '' }
            },
            tips: '打开地图：选择下几何图像<a class="xa-txt-blue" href="http://www.baidu.com">打开百度</>'
        },
        {
            type: 'area',
            variable: 'area',
            label: '地区选择',
            placeholder: '选择吧少年',
            multiple: false,
            tips: '选择地区：选择省，市，区'
        },
        {
            type: 'area',
            variable: 'area_multiple',
            label: '地区选择',
            placeholder: '多选来吧',
            multiple: true,
            max: 5,
            min: 2,
            tips: '选择地区{multiple:true}：选择省，市，区'
        },
        {
            type: 'slider',
            variable: 'slider1',
            min: 0,
            max: 100,
            unit: '',
            isRange: false,
            require: true,
            tips: '滑块：选择需要的值'
        },
        {
            type: 'slider',
            variable: 'slider2',
            step: 50,
            min: 0,
            max: 200,
            unit: 'm',
            isRange: true,
            require: true,
            tips: '滑块：选择需要的值的范围'
        },
        {
            type: 'text',
            variable: 'text_ini',
            dataType: 'int',
            unit: '元',
            label: 'text:int',
            placeholder: '请输入整数',
            require: true
        },
        {
            type: 'text',
            variable: 'text_ini',
            dataType: 'int',
            unit: '元',
            label: 'mode:view',
            placeholder: '请输入整数',
            mode: 'view'
        },
        {
            type: 'text',
            variable: 'text_float',
            dataType: 'float',
            unit: '',
            label: 'text:float',
            placeholder: '请输入数字',
            require: true
        },
        {
            type: 'text',
            variable: 'text_string',
            dataType: 'string',
            unit: '',
            label: 'text:string',
            placeholder: '请输入',
            require: true,
            tips: '文本输入[dateType]指定输入类型[int/float/string]'
        },
        {
            type: 'title',
            title: '详细地址'
        },
        {
            type: 'textarea',
            variable: 'address',
            placeholder: '请填写详细地址',
            require: true,
            tips: '多行文本输入:平平凡凡'
        },
        {
            type: 'select',
            variable: 'select',
            label: 'select',
            multiple: false,
            placeholder: '请选择你爱的人',
            src: {
                url: 'isTest',
                params: { address: '' }
            },
            // max: 5,
            // min: 2,
            require: true,
            tips: '列表选择：将打开一个可以具有搜索、筛选功能的列表来进行单选或多选'
        },
        {
            type: 'select',
            variable: 'select1',
            label: 'select',
            multiple: false,
            placeholder: '你爱的人',
            src: {
                url: 'isTest'
            },
            require: true,
            tips: '列表选择：将打开一个可以具有搜索、筛选功能的列表来进行单选或多选'
        },
        {
            type: 'title',
            title: '备注说明:showRule',
            showRule: {
                'show': {
                    'fn': 'select',
                    'items': [
                        {
                            'control_id': 'select'
                        }
                    ]
                }
            }
        },
        {
            type: 'radio',
            variable: 'radio',
            label: '发布到：radio',
            options: [
                {
                    'value': 0,
                    'label': '组队'
                },
                {
                    'value': 1,
                    'label': '团队'
                },
                {
                    'value': 2,
                    'label': '联盟'
                }
            ],
            require: true,
            tips: '单选框'
        },
        {
            type: 'radioGroup',
            variable: 'radioGroup',
            label: '发布到：radioGroup',
            options: [
                {
                    'value': 0,
                    'label': '组队'
                },
                {
                    'value': 1,
                    'label': '团队'
                },
                {
                    'value': 2,
                    'label': '联盟'
                }
            ],
            require: true,
            tips: '单选框'
        },
        {
            type: 'select',
            variable: 'select_multiple',
            label: 'select',
            multiple: true,
            placeholder: '请选择你爱的人',
            src: {
                url: 'isTest',
                params: {
                    select: ''
                }
            },
            max: 5,
            min: 2,
            require: true,
            // showRule: {
            //     'fn': 'select',
            //     'immediateClear': true,
            //     'items': [
            //         {
            //             'control_id': 'select'
            //         }
            //     ]
            // },
            tips: '列表选择：将打开一个可以具有搜索、筛选功能的列表来进行单选或多选'
        },
        {
            type: 'checkBox',
            variable: 'checkBox',
            label: '喜欢谁',
            options: [
                {
                    'value': 0,
                    'label': '程序员'
                },
                {
                    'value': 1,
                    'label': '产品经理'
                },
                {
                    'value': 2,
                    'label': '测试'
                },
                {
                    'value': 3,
                    'label': '美工'
                }
            ],
            require: true,
            tips: '多选框'
        },
        {
            type: 'switch',
            variable: 'switch',
            label: '是否同意',
            subLabel: '是否同意?是否同意?',
            require: false,
            tips: '开关？'
        },
        {
            type: 'slider',
            variable: 'slider3',
            min: 0,
            max: 10,
            unit: '',
            isRange: false,
            require: true,
            showRule: {
                'show': {
                    'fn': 'switch',
                    // 'immediateClear': true,
                    'items': [
                        {
                            'control_id': 'switch'
                        }
                    ]
                }
            },
            tips: '滑块：选择需要的值'
        },
        {
            type: 'switch',
            variable: 'switch_2',
            label: '是否同意',
            subLabel: '是否同意?是否同意?',
            require: false,
            tips: '开关？',
            showRule: {
                'show': {
                    'fn': 'switch',
                    'items': [
                        {
                            'control_id': 'switch'
                        }
                    ]
                }
            }
        },
        {
            type: 'slider',
            label: '选择高度：单位(m/s)',
            variable: 'slider4',
            step: 50,
            min: 100,
            max: 300,
            unit: 'm',
            isRange: true,
            require: true,
            showRule: {
                'show': {
                    'fn': 'switch',
                    // 'immediateClear': true,
                    'items': [
                        {
                            'control_id': 'switch'
                        }
                    ]
                }
            },
            tips: '滑块：选择需要的值的范围'
        },
        {
            type: 'title',
            title: '上传图片'
        },
        {
            type: 'imgUpload',
            variable: 'pics',
            showRule: {
                control_id: 'checkBox',
                value: 1
            },
            max: 5,
            require: true,
            tips: '上传图片'
        },
        {
            type: 'imgUpload',
            variable: 'original',
            max: 5,
            require: true,
            sizeType: 'original',
            tips: 'original'
        },
        {
            type: 'imgUpload',
            variable: 'pics4',
            showRule: {
                control_id: 'checkBox',
                value: 1
            },
            max: 5,
            require: true,
            gps: true,
            gpsCascade: 'latLngs1',
            tips: '上传图片哎'
        },
        {
            type: 'latLng',
            variable: 'latLngs1',
            label: '作业地址',
            placeholder: '上传图片后自动获取地址',
            require: true,
            tips: '选择经纬度：将打开地图，点选地点'
        },
        submitBtn,
        buySubmitBtn
    ]
}
// initData.items = initData.items.slice(0, 1)
// initData.items.push(submitBtn)
export function getInitData(params) {
    console.log('Viw:初始化', JSON.stringify(params))
    if (params.url) {
        let comType = params.url
        if (comType === 'isTest') {
            comType = params.data.url
        }
        if (ComMap[comType]) {
            let result = ComMap[comType](params.data)
            if (Array.isArray(result)) {
                return delay({
                    items: result
                })
            } else {
                return delay(result)
            }
        }
    }
    return delay(initData)
}
