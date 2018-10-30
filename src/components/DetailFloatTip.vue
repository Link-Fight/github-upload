<template>
<div class="tip-wrapper">
    <div class="weui-mask" @click="$emit('close')"></div>
    <div class="animate-bounce-up tip-content xa-bg-green" v-html="content"></div>
</div>
</template>
<script>
export default {
  props: {
    content: String
  }
}
</script>
<style lang="scss" scoped>
.tip-wrapper {
  .weui-mask {
    background-color: transparent;
    z-index: 10;
  }
  .tip-content {
    position: absolute;
    left: 10px;
    bottom: 60px;
    height: 50px;
    padding: 5px 16px;
    line-height: 20px;
    color: #fff;
    z-index: 1000;
    box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.18);
    &::after {
      content: "";
      position: absolute;
      display: block;
      bottom: -24px;
      left: 90px;
      transform: translateX(-18px);
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 12px 18px;
      border-color: #42bd56 transparent transparent;
    }
  }
}
.animate-bounce-up {
  animation: bounce-up 1.4s linear infinite;
}
@keyframes bounce-up {
  25% {
    transform: translateY(5px);
  }
  50%,
  100% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-5px);
  }
}
</style>
