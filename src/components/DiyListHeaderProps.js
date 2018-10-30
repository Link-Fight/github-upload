// import { orderListHeaderBtns } from '../config/AppBtns'
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        needSearch: {
            type: Boolean,
            default: true
        },
        btns: {
            type: Array,
            default() {
                return []
            }
        },
        placeholder: {
            type: String,
            default: '搜索订单名称、电话'
        }
    }
}
