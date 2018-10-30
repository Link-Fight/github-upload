import LinkCell from './LinkCell'

export default class LinkCellForImg extends LinkCell {
    static explanin = {
        img: '用到的图片',
        title: '明显点的文字',
        subTitle: '没那么明显的文字',
        value: '右边的文字',
        href: '点击要跳转的地址'
    }
    constructor(cfg = {}) {
        super(cfg)
    }
}