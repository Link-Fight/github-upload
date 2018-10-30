<script>
// import { teamListBadgeBtns } from '../config/AppBtns'
import { renderLinkCellForImg } from './LinkCellRender'
export default {
    name: 'LinkCellForImg',
    render(h) {
        if (this.child) {
            return renderLinkCellForImg(h, this)
        } else {
            return h('div', { 'class': 'weui-cells' + (this.size && ' LinkCell--' + this.size) }, [renderLinkCellForImg(h, this)])
        }
    },
    props: {
        img: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: [String, Array]
        },
        value: {
            type: [String, Array],
            default: ''
        },
        phone: String,
        href: {
            type: String,
            default: ''
        },
        btns: {
            type: Array,
            default() {
                return []/*  || teamListBadgeBtns.slice(0, 1) */
            }
        },
        // 没有对外开放
        child: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.LinkCell-img {
  width: 35px;
  height: 35px;
  background-color: #a3a3a3;
  margin-right: 10px;
  border-radius: 50%;
}
.LinkCell-subTitle {
  color: #a0a0a0;
  margin-right: 1em;
}
.LinkCell--large {
  & .LinkCell-img {
    width: 56px;
    height: 56px;
  }
}
.weui-cells {
  margin-top: 0;
  //   background: transparent;
}
.weui-cell {
  padding: 14px 15px;
  font-size: 14px;
  color: #333;
}
.weui-cell::before {
  content: "";
  left: 65px;
}
.weui-cell__ft {
  color: #333;
  font-size: 12px;
  font-weight: bold;
}
.weui-cell__bd {
  padding-right: 1em;
}
.iconfont {
  margin-right: 8px;
  color: #a3a3a3;
}
</style>
