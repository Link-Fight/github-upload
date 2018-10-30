
<script>
// import { teamListBadgeBtns } from '../config/AppBtns'
import { renderLinkCell } from './LinkCellRender'
export default {
    render(h) {
        if (this.child) {
            return renderLinkCell(h, this)
        } else {
            return h('div', { 'class': 'weui-cells' }, [renderLinkCell(h, this)])
        }
    },
    name: 'LinkCell',
    props: {
        icon: {
            type: String,
            default: ''
        },
        iconClass: String,
        subTitle: {
            type: [String, Array]
        },
        title: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number, Array],
            default: ''
        },
        href: {
            type: String,
            default: ''
        },
        access: {},
        child: {
            type: Boolean,
            default: false
        },
        phone: {
            type: String,
            default: ''
        },
        color: String,
        btns: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.weui-cells {
  margin-top: 0;
}
.weui-cell {
  padding: 12px 15px;
  font-size: 14px;
  color: #333;
}
.iconfont {
  margin-right: 8px;
  line-height: 20px;
}
.LinkCell-subTitle {
  margin-right: 1em;
  line-height: 20px;
}
</style>
