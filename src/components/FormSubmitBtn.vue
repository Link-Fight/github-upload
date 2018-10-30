<template>
<div class="form-btn" :class="'form-btn__' + item.theme">
   <AppAgressBtn :item="item" @click="$emit('click', arguments[0],arguments[1])"></AppAgressBtn>
</div>
</template>
<script>
import AppAgressBtn from './AppAgressBtn.vue'
export default {
    components: {
        AppAgressBtn
    },
    props: {
        item: Object
    }
}
</script>
<style lang="scss" scoped>
.form-btn {
  margin: 32px 15px 0;
  border-radius: 5px;
}
.form-btn__buy {
  position: relative;
  height: 45px;
  z-index: 999;
  & > div {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #e5e5e5;
  }
}
@media all and (height: 812px) and (width: 375px) {
  .form-btn__buy > div {
    padding-bottom: 8px;
  }
}
@media all and (min-height: 724px) and (width: 375px) {
  .form-btn__buy > div {
    padding-bottom: 12px;
  }
}
</style>
