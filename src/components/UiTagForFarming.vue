<template>
<div class="uitag__wrapper" :style="{'background':theme}">
   {{content}}
</div>
</template>
<script>
// 列表项上左上角的一个状态  比UiTag的小一些 也没有阴影  同时颜色可控
export default {
  name: 'UiTagForFarming',
  props: {
    content: String,
    theme: String
  }
}
</script>
<style lang="scss" scoped>
.uitag__wrapper {
  position: absolute;
  box-sizing: border-box;
  padding: 1px 6px 0 2px;
  height: 12px;
  font-size: 10px;
  line-height: 12px;
  color: #fff;
  background: #42bd56;
  &::after {
    content: " ";
    position: absolute;
    right: 0px;
    top: 0;
    border: 9px solid;
    border-width: 6px 3px;
    border-color: transparent #fff #fff transparent;
    z-index: 100;
  }
}
</style>