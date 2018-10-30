export default function (type, other) {
    //  type : ['line', 'bar','pie', 'map']
    let config = {
        datas: [
            {
                legend: '预期',
                data: [320, 482, 701, 434, 290, 640, 680, 530, 660, 750, 880]
            },
            {
                legend: '同期',
                data: [220, 432, 601, 334, 190, 630, 610, 430, 610, 700, 780]
            },
            {
                legend: '上周',
                data: [120, 132, 101, 134, 90, 230, 210, 130, 210, 300, 180]
            },
            {
                legend: '昨日',
                data: [220, 282, 201, 234, 290, 430, 410, 230, 123, 400, 234]
            },
            {
                legend: '今日',
                data: [1220, 1282, 1201, 1234, 1290, 1430, 1410, 1230, 1123, 1400, 1234]
            }
        ],
        x: ['10.1', '10.4', '10.6', '10.8', '10.10', '10.12', '10.14', '10.16', '10.18', '10.20', '10.22']
    }
    if (type === 'pie') {
        let datas = config.datas.map(item => ({
            name: item.legend,
            value: item.data.reduce((a, b) => a + b)
        }))
        config = {
            datas
        }
    } else if (type === 'map') {
        // #region
        let datas = [{
            'name': '新疆',
            'value': 2223
        },
        {
            'name': '江苏',
            'value': 955
        },
        {
            'name': '浙江',
            'value': 640
        },
        {
            'name': '江西',
            'value': 1342
        },
        {
            'name': '湖北',
            'value': 1402
        },
        {
            'name': '甘肃',
            'value': 438
        },
        {
            'name': '山西',
            'value': 371
        },
        {
            'name': '内蒙古',
            'value': 469
        },
        {
            'name': '福建',
            'value': 578
        },
        {
            'name': '贵州',
            'value': 255
        },
        {
            'name': '广东',
            'value': 380
        },
        {
            'name': '青海',
            'value': 825
        },
        {
            'name': '西藏',
            'value': 430
        },
        {
            'name': '四川',
            'value': 910
        },
        {
            'name': '宁夏',
            'value': 36
        },
        {
            'name': '海南',
            'value': 104
        },
        {
            'name': '台湾',
            'value': 744
        }]
        // #endregion
        if (other === 'guangdong') {
            datas = [
                {
                    name: '广州市',
                    value: 5301
                },
                {
                    name: '深圳市',
                    value: 5321
                },
                {
                    name: '佛山市',
                    value: '4333'
                },
                {
                    name: '东莞市',
                    value: '4030'
                },
                {
                    name: '中山市',
                    value: '3830'
                },
                {
                    name: '茂名市',
                    value: '3730'
                },
                {
                    name: '珠海市',
                    value: '3630'
                }
            ]
        } else if (other === 'xinjiang') {
            datas = []
        }
        config = {
            geo: other || 'china',
            datas
        }
    }
    return {
        type: 'Chart',
        title: type || 'line',
        config: {
            type,
            ...config
        }
    }
}