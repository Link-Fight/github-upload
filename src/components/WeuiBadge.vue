<template>
<div class="uibage-wrap xa-txt-center xa-txt-999" :class="!label&&'xa-cell'">
    <span v-if="icon" class="uibage-container">
        <i class="uibage-icon iconfont" :class="icon"></i>
        <span v-if="badge" class="uibage-num weui-badge" >{{badge}}</span>
    </span>
    <p v-if="label" class="uibage-label xa-txt-10">{{label}}</p>
</div>
</template>
<script>
export default {
  name: 'WeuiBadge',
  props: {
    icon: {
      type: String,
      default: ''
    },
    badge: {
      type: [Number, String],
      default: 0
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.uibage-wrap {
  // height: 40px;
  min-width: 24px;
}
.uibage-wrap.xa-cell {
  height: 24px;
}
.uibage-wrap + .uibage-wrap {
  margin-left: 18px;
}
.uibage-container {
  display: inline-block;
  position: relative;
}
.uibage-icon {
  position: relative;
  top: 3px;
  font-size: 22px;
  line-height: 22px;
}
.uibage-num {
  position: absolute;
  top: -1px;
  right: -11px;
  transform: scale(0.8);
}
// .uibage-label {
//   line-height: 40px;
// }
.uibage-container + .uibage-label {
  line-height: 18px;
}
</style>
