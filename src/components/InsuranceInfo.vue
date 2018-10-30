<template>
    <div class="com-insurance info-wrap xa-cell xa-flex-center" :class="[img?'active':'']" :style="{'backgroundImage':img?'url('+img+')':''}">
        <div class="xa-flex">
            <textList class="info-title xa-txt-bold xa-txt-20" :texts="title" />
            <textList class="info-subtitle" :texts="subTitle" />
        </div>
        <i v-if="!img" class="info-icon iconfont" :class="[active?'icon-baozhangzhong xa-txt-green':'icon-yiguoqi xa-txt-red']"></i>
    </div>
</template>
<script>
import SafeguardInfo from './SafeguardInfo.vue'
export default {
  mixins: [SafeguardInfo],
  props: {
    img: String
  }
}
</script>
<style lang="scss" scoped>
.info {
  &-wrap {
    padding: 25px 15px 10px;
    background-size: cover;
    background-color: #fff;
    &.active {
      padding: 55px 15px 10px;
      text-shadow: 1px 1px 1px #353535;
      & .info-title,
      & .info-subtitle,
      & .iconfont {
        color: #fff;
      }
    }
  }
  &-title {
    font-size: 20px;
    line-height: 23px;
    min-height: 46px;
    margin-bottom: 23px;
  }
  &-icon {
    position: relative;
    top: -10px;
    // right: 15px;
    // bottom: 50px;
    font-size: 80px;
    height: 80px;
  }
}
</style>