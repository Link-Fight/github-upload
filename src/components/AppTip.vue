<template>
<transition name="fadeshow">
  <div v-if="isShow" class="xa-cell xa-txt-12 app-tip__wrapper">
      <div class="xa-flex"  v-html="tip"></div> <i @click="(isShow=false)||$emit('close')" class="xa-txt-14 iconfont icon-chacha1"></i>
  </div>
</transition>
</template>
<script>
export default {
    name: 'AppTip',
    data() {
        return {
            isShow: true
        }
    },
    props: {
        tip: String,
        theme: String
    }
}
</script>
<style lang="scss" scoped>
.app-tip__wrapper {
  line-height: 25px;
  padding: 5px 15px;
  background: #fff4c1;
  color: #f5ad3e;
}
.iconfont {
  border: 5px solid transparent;
  border-top-width: 0px;
  border-bottom-width: 0px;
}
</style>
<style>
.fadeshow-leave-active {
  transition: all 0.3s ease-in-out;
}
.fadeshow-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
</style>
