import { delay } from './util'

function productItem(id) {
    return {
        'id': '##' + id,
        'title': '胡建刚三仙湖1',
        'type': '1',
        'sub_title': '16.93亩',
        'complete_percent': 194,
        'center': {
            'lng': '112.34308283093',
            'lat': '29.169544337274'
        },
        'bound': [
            {
                'lat': 29.16912753464,
                'lng': 112.342941387,
                'alt': 9.8678355690092
            },
            {
                'lat': 29.168995564959,
                'lng': 112.34335298193,
                'alt': 10.536717921309
            },
            {
                'lat': 29.16932635475,
                'lng': 112.34338787197,
                'alt': 9.6904352668673
            },
            {
                'lat': 29.1698082296,
                'lng': 112.34378989717,
                'alt': 9.6010231588036
            },
            {
                'lat': 29.170076037353,
                'lng': 112.34330476681,
                'alt': 9.6343364937231
            },
            {
                'lat': 29.170307997426,
                'lng': 112.34286537917,
                'alt': 9.4615524707362
            },
            {
                'lat': 29.169490811399,
                'lng': 112.34229035882,
                'alt': 9.9416549623013
            },
            {
                'lat': 29.169222168065,
                'lng': 112.34273000455,
                'alt': 9.4854009335861
            }
        ],
        'barriers': [],
        'fields': [],
        'flight_logs': {
            'url': '/wechat/mars/map/contract_land_flight_logs?contract_uid=cceda39a-541f-4aae-92f8-c1e20a0d42b5&land_uid=4c35178a-f521-4a89-85ff-a18538ca1a07'
        }
    }
}

export function loadMore() {
    return delay({
        moreApi: 'isTest',
        lands: [
            productItem(parseInt(Math.random() * 1000)),
            productItem(parseInt(Math.random() * 1000)),
            productItem(parseInt(Math.random() * 1000)),
            productItem(parseInt(Math.random() * 1000))
        ]
    })
}