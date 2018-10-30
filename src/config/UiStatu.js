export default [
    {
        icon: 'icon-rili',
        title: '已结束',
        color: '#999',
        plain: true
    },
    {
        icon: 'icon-rili',
        title: '已结束',
        color: 'red'
    },
    {
        icon: 'icon-rili',
        title: '联盟',
        color: '#999999',
        plain: true
    },
    {
        icon: 'icon-rili',
        title: '已结束',
        color: 'red'
    }
]

export function getStatu(title, color, plain, icon) {
    return {
        title,
        color,
        plain,
        icon
    }
}