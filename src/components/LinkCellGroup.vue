<template>
  <div class="weui-cells" :class="theme?'linkcell-group--'+theme:''" style="margin-top:0;">
      <slot name="title">
        <a v-if="title" class="xa-line__bottom link-group-title xa-txt-16 weui-cell xa-txt-999">
          <i v-if="icon" class="xa-txt-26 xa-txt-333 iconfont" :class="icon" style="margin-right:8px;"></i>
          <span class="xa-flex">{{title}}</span>
          <i v-if="showFlod" :class="{'needFlod':!needFlod}" @click="needFlod=!needFlod" class="cell-flod-icon xa-txt-24 xa-txt-333 iconfont icon-xiangxia"></i>
        </a>
      </slot>
      <transition-group name="fadeup" tag='div'>
        <LinkCell
          v-if="!needFlod"
          @btnClick="$emit('btnClick',arguments[0])"
          @click.native="$emit('itemClick',item)"
          v-for="(item,index) in items" :key="index"
          :icon="item.icon"
          :btns="item.btns"
          :title="item.title"
          :subTitle="item.subTitle"
          :value="item.value"
          :access="item.EDIT?true:undefined"
          :phone="item.phone"
          :color="item.color"
          :href="item.href"
          :child="true"/>
        <p v-if="tips&&!needFlod" key="-1" class="tips-wrap" v-html="tips"></p>
      </transition-group>
  </div>
</template>
<script>
export default {
    name: 'LinkCellGroup',
    data() {
        return {
            showFlod: false,
            needFlod: false
        }
    },
    props: {
        title: String,
        theme: String,
        tips: String,
        icon: String,
        flod: {
            type: [Boolean, String]
        },
        items: {
            type: Array,
            default() {
                return []
            }
        }
    },
    created() {
        if (this.flod !== undefined) {
            this.showFlod = true
            this.needFlod = this.flod
        }
    }
}
</script>
<style lang="scss">
.linkcell-group--small {
  & a.weui-cell {
    padding: 0px 15px;
    margin: 6px 0;
  }
  & .weui-cell:before {
    content: "";
    display: none;
  }
  & .link-group-title.xa-line__bottom::after {
    content: "";
    display: none;
  }
  & .iconfont {
    margin-right: 0;
  }
}
.linkcell-group--small.total .weui-cell:last-of-type {
  padding: 8px 15px 9px 0px;
  margin-left: 15px;
  border: 1px dashed #e4e4e4;
  border-left: none;
  border-right: none;
}
.tips-wrap {
  padding: 10px 15px;
  font-size: 12px;
  color: #999;
}
.link-group-title {
  padding: 12px 15px;
  line-height: 20px;
}
.link-group-title.xa-line__bottom::after {
  content: " ";
  left: 15px;
}
.cell-flod-icon {
  position: relative;
  right: -16px;
  transition: all 0.3s;
  transform-origin: center 48%;
}
.needFlod.iconfont {
  transform: rotateX(180deg);
}
</style>
