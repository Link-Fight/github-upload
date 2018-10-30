import Base from './BaseConfig'

export default class LinkCell extends Base {
    static explanin = {
        icon: '用到的icon',
        title: '明显点的文字',
        subTitle: '没那么明显的文字',
        value: '右边的文字',
        href: '点击要跳转的地址',
        access: '',
        phone: '',
        color: '',
        btns: ''
    }
    constructor(cfg = {}) {
        let linkCell = {
            icon: '',
            title: '',
            subTitle: '',
            value: '',
            href: ''
        }
        Object.assign(linkCell, cfg)
        super(linkCell)
    }
}
