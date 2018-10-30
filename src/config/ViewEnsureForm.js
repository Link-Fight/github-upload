import { delay } from './util'
import { appBtnsInFooter } from './AppBtns'
export function asyncUpdate(params) {
    let { data } = params
    return delay({
        tip: '你好' + data.value.length + '件',
        disable: data.value.length < 2
    })
}
export function getInitData(data) {
    console.log(data)
    if (data.url === 'godownEntry') {
        return delay({
            title: '入库',
            mode: 'edit',
            config: {
                popSelectApi: {
                    url: 'isTest',
                    params: { type: 'ensure' }
                },
                checkInputApi: {
                    url: 'isTest',
                    key: 'sn',
                    params: { value: '' }
                },
                subBtns: appBtnsInFooter
            }
        })
    } else if (data.url === 'godownOut') {
        return delay({
            title: '出库',
            mode: 'edit',
            config: {
                popSelectApi: {
                    url: 'isTest',
                    params: { type: 'ensure' }
                },
                checkInputApi: {
                    url: 'isTest',
                    key: 'sn',
                    params: { value: '' }
                },
                checkSelectChangeApi: {
                    url: 'isTest',
                    params: { action: 'checkSelectChangeApi' },
                    default: '<text style="color:blue">你好</text>'
                },
                subBtns: appBtnsInFooter
            }
        })
    }
    return delay({
        title: '保障啊',
        mode: 'edit',
        config: {
            header: {
                title: '保障单10086',
                href: '#/diyDetail?isTest=1'
            },
            popSelectApi: {
                url: 'isTest',
                params: { type: 'ensure' }
            },
            checkInputApi: {
                url: 'isTest',
                key: 'sn',
                params: { value: '' }
            },
            subBtns: appBtnsInFooter
        },
        value: [{ 'value': '00-000-0001', 'title': '测试物料【00-000-0001】', 'formType': 1, 'num': 10, 'imgs': ['E11447456C4F0A47C019DF3AC9FFC352', '55DB440D1AA78569912A7FA4238EFFC0', '8605116EB5D378C32FBC40ECAA706F1F', '0490DFEDAB91FE102B3BB56C460ED671', '1B59D7218D727AD26B2202DCB6AF495C'] }, { 'value': '01-003-00035', formType: 2, 'title': 'GPS天线【01-003-00035】', 'sn': ['asdfsadfsadf', 'asdfasdfasdfsd', 'asdfsadfasdfsadf'], 'imgs': ['8784C8BE992EC6E68369E946EB2553CA', 'AEE23E4687B8385EB265B9C31E2BDF38'] }]
    })
}
