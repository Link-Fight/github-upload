<template>
  <div class="weui-flex xa-txt-center xa-bg-white">
      <template v-for="(item,index) in items">
        <AppBtnsItem class="weui-flex__item" :style="itemStyle" :item="item" :key="index" @click="$emit('click',arguments[0],arguments[1])" />
      </template>
  </div>
</template>
<script>
import AppBtnsItem from './AppBtnsItem.vue'
export default {
    name: 'AppBtns',
    components: {
        AppBtnsItem
    },
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        },
        itemStyle: Object,
        theme: {
            type: String
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .xa-btn_default + .xa-btn_default {
  position: relative;
}
/deep/ .xa-btn_default + .xa-btn_default::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background-color: #e5e5e5;
  transform: scaleX(0.5);
}
</style>
