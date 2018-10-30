const TYPE = {
    radio: 'radio',
    checkbox: 'checkbox',
    area: 'area'
}

const radioItem = {
    key: 'radioKey',
    type: TYPE.radio,
    title: '单选',
    items: [
        {
            text: '宝塔镇河妖',
            subTitle: '不简单',
            value: 'D5E40443-5F13-CE6D-A941-2F3-E613D8AD'
        },
        {
            text: '天龙盖地虎',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C90985'
        },
        {
            text: '天龙盖地1',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9091'
        },
        {
            text: '天龙盖地2',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9092'
        },
        {
            text: '天龙盖地3',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9093'
        },
        {
            text: '天龙盖地4',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9094'
        },
        {
            text: '天龙盖地5',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9095'
        },
        {
            text: '天龙盖地6',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9096'
        },
        {
            text: '天龙盖地7',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9097'
        },
        {
            text: '天龙盖地8',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9098'
        },
        {
            text: '天龙盖地9',
            value: '9C99472A-E0C4-2E71-0CC3-0D8532C9099'
        }
    ]
}
const areaItem = {
    key: 'areaKey',
    type: TYPE.area,
    level: 3,
    title: '地区'
}
const checkboxItem = {
    key: 'checkboxItem',
    type: TYPE.checkbox,
    title: '多选',
    items: [
        {
            text: '多选1',
            subTitle: '不容易',
            value: 1
        },
        {
            text: '多选2',
            value: 2
        },
        {
            text: '多选3',
            value: 3
        }
    ]
}

export default {
    items: [radioItem, checkboxItem, areaItem],
    result: {
        radioKey: '9C99472A-E0C4-2E71-0CC3-0D8532C90985',
        areaKey: {
            id: 289,
            name: '广州市'
        }
    }
}

export function getFilters(start = 0, end = 3) {
    let items = [radioItem, checkboxItem, areaItem]
    return {
        items: items.slice(start, end),
        result: {
            radioKey: '9C99472A-E0C4-2E71-0CC3-0D8532C90985',
            areaKey: {
                id: 289,
                name: '广州市'
            }
        }
    }
}