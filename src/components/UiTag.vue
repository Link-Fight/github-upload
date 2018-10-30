<template>
<div class="uitag__wrapper" :class="size">
    <div class="uitag__content">{{content}}</div>
    <div class="uitag__shadow"></div>
</div>
</template>
<script>
// 列表项上左上角的一个状态
export default {
  name: 'UiTag',
  props: {
    content: String,
    size: String
  }
}
</script>
<style lang="scss">
.uitag {
  &__wrapper {
    position: absolute;
    height: 18px;
    font-size: 12px;
    line-height: 18px;
    color: #fff;
    margin-right: 9px;
    &::after {
      content: " ";
      position: absolute;
      right: -8px;
      top: 0;
      border: 9px solid;
      border-width: 9px 4px;
      border-color: #42bd56 transparent transparent #42bd56;
    }
  }
  &__content {
    position: relative;
    padding: 0 2px;
    background-color: #42bd56;
    z-index: 9;
  }
  &__shadow {
    position: absolute;
    top: 3px;
    right: -2px;
    bottom: -2px;
    left: 0;
    background-color: #8bea9b;
    z-index: 0;
    &::after {
      content: " ";
      position: absolute;
      right: -8px;
      top: 0;
      border: 9px solid;
      border-width: 9px 4px;
      border-color: #8bea9b transparent transparent #8bea9b;
    }
  }
}
.uitag__wrapper.small {
  height: 12px;
  line-height: 12px;
  .uitag__shadow {
    display: none;
  }
  .uitag__shadow::after {
    content: "";
    right: -6px;
    border-width: 6px 3px;
  }
  &::after {
    content: "";
    right: -6px;
    border-width: 6px 3px;
  }
}
</style>