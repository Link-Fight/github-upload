export default [
    {
        'name': '中国',
        'code': '86',
        'desp': 'CN',
        'reg': '^(86){0,1}1\\d{10}$',
        'lang': 'zh-cn'
    },
    {
        'name': '香港',
        'code': '852',
        'desp': 'HK',
        'reg': '^(00){0,1}(852){1}0{0,1}[1,5,6,9](?:\\d{7}|\\d{8}|\\d{12})$'
    },
    {
        'name': '澳门',
        'code': '853',
        'desp': 'MO',
        'reg': '^(00){0,1}(853){1}6\\d{7}$'
    },
    {
        'name': '台湾',
        'code': '886',
        'desp': 'TW',
        'reg': '^(00){0,1}(886){1}0{0,1}[6,7,9](?:\\d{7}|\\d{8}|\\d{10})$'
    },
    {
        'name': '美国',
        'code': '1',
        'desp': 'US',
        'reg': '^(00){0,1}(1){1}\\d{10,12}$',
        'lang': 'en'
    },
    {
        'name': '澳大利亚',
        'code': '61',
        'desp': 'AU',
        'reg': '^(00){0,1}(61){1}4\\d{8,9}$',
        'lang': 'en'
    },
    {
        'name': '泰国',
        'code': '66',
        'desp': 'TH',
        'reg': '^(00){0,1}(66){1}[13456789]\\d{7,8}$'
    },
    {
        'name': '日本',
        'code': '81',
        'desp': 'JP',
        'reg': '^(00){0,1}(81){1}0{0,1}[7,8,9](?:\\d{8}|\\d{9})$',
        'lang': 'ja'
    },
    {
        'name': '韩国',
        'code': '82',
        'desp': 'KR',
        'reg': '^(00){0,1}(82){1}0{0,1}[7,1](?:\\d{8}|\\d{9})$',
        'lang': 'ko'
    },
    {
        'name': '巴西',
        'code': '55',
        'desp': 'BR',
        'reg': '^(00){0,1}(55){1}\\d{6,12}$',
        'lang': 'en'
    },
    {
        'name': '印度',
        'code': '91',
        'desp': 'IN',
        'reg': '^(00){0,1}(91){1}\\d{6,12}$',
        'lang': 'en'
    },
    {
        'name': '厄瓜多尔',
        'code': '593',
        'desp': 'ECU',
        'reg': '',
        'lang': 'en'
    }
]

export function countDown(obj, json, endFn) {
    clearInterval(obj.IntervalTimer)
    obj.IntervalTimer = setInterval(function () {
        var bBtn = true
        for (var attr in json) {
            var iCur = 0
            iCur = obj[attr]
            var iSpeed = 1
            if (iCur !== json[attr]) {
                bBtn = false
                obj[attr] = iCur - iSpeed
            }
        }
        if (bBtn) {
            clearInterval(obj.IntervalTimer)
            if (endFn) {
                endFn.call(obj)
            }
        }
    }, 1000)
}