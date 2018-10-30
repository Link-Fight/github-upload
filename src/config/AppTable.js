export const baseTable = {
    type: 'table',
    title: 'title',
    items: [
        ['航线', '高度', '速度', '流速', '喷幅', '面积', '耗时', '类型', '范围', '开始', '结束'],
        ['第1条', '1.5 m', '4 m/s', '889 ml/亩', '3 m', '0 亩', '49秒', '往返航线', '19 - 20', '2017-06-22 18:47:39', '2017-06-22 18:48:28'],
        ['第2条', '2.5 m', '4 m/s', '889 ml/亩', '3 m', '0 亩', '49秒', '往返航线', '19 - 20', '2017-06-22 18:47:39', '2017-06-22 18:48:28']
    ]
}
export const smallTable = {
    type: 'table',
    title: '',
    items: [
        ['时间', '测绘', '作业'],
        ...Array.from({ length: 10 }).map((_, i) => [`2018-03-${i}`, `${i * 25}亩`, `${i * 25}亩`])
    ]
}
export const phoneTable = {
    type: 'table',
    title: '带phone的table',
    items: [
        ['名称', '车辆', '参与飞机', '参与人数', '_PHONE'],
        ['刘备', '100台', '100架', '10人', ''],
        ...Array.from({ length: 2 }).map((_, i) => [`刘晓皇`, `3台`, `10架`, '2人', '15915797485'])
    ]
}

export const dataShowTable = {
    type: 'table',
    title: 'type:dataShow 在diyDetal模板有效',
    items: [
        ['参数', '类型', '说明'],
        ['type', 'String', 'type:dataShow'],
        ['items', 'Array<Object>', '{title,value,color,bold,status}'],
        ['items[].title', 'String', '相对(value)左边的文字'],
        ['items[].value', 'String', '相对(title)右边的文字'],
        ['items[].color', '颜色 eg:#0f0', 'title的颜色'],
        ['items[].bold', 'Boolean', '字体是否加粗'],
        ['items[].status', 'Array<Object>', '{icon,title,color,plain}'],
        ['...status[].icon', 'iconfont', '字体图标'],
        ['...status[].title', 'String', '字'],
        ['...status[].color', '颜色 eg:#0f0', '主题色'],
        ['...status[].plain', 'Boolean', 'true:则color控制字，边框颜色，false:则color控制背景色'],
        ['images', 'Array<String/Object>', '需要显示的图片'],
        ['1:images', 'Array<String>', '直接是图片地址数组'],
        ['2:images', 'Array<Object>', '{url,thumb_url}数组对象包括:原图、缩略图']
    ]
}
const MAP = {
    baseTable,
    smallTable,
    phoneTable,
    dataShowTable
}
export default function (type) {
    return MAP[type] || [baseTable, smallTable, phoneTable, dataShowTable]
}
