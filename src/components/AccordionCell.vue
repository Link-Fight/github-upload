<template>
 <div class="accordion-wrap xa-bg-white" :class="{'close':needClose}">
    <div class="accordion-container">
        <slot></slot>
    </div>
    <div class="accordion-footer xa-cell" @click="needClose=!needClose">
        <div class="close-arrow xa-cell xa-txt-green">
            <i class="iconfont xa-txt-20" :class="needClose?'icon-xiangxia':'icon-xiangxia-copy'"></i>
            <span class="xa-txt-nowrap">{{needClose?'展开':'收起'}}</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            needClose: false
        }
    }
}
</script>
<style lang="scss" scoped>
.accordion-wrap {
  position: relative;
  .accordion-container {
    transition: all 0.3s;
    max-height: 100vh;
  }
  &.close .accordion-container {
    max-height: 0;
    overflow: hidden;
  }
  .accordion-footer {
    height: 32px;
    justify-content: center;
  }
  .iconfont {
    width: 25px;
  }
}
</style>
