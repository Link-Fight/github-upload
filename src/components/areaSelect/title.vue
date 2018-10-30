<template>
    <div class="xa-cell xa-align_center">
        <div class=" weui_btn weui_btn_mini" @click="$emit('cancel')"><i  class="iconfont icon-fanhui"></i></div>
        <div class="xa-flex">
            <slot></slot>
        </div>
        <div  class="xa-txt-green weui_btn weui_btn_mini" @click="$emit('comfirm')"><i  class="iconfont icon-dui"></i></div>
    </div>
</template>
<style scoped>
.xa-cell {
  flex-shrink: 0;
  padding: 0 15px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #efefef;
  box-shadow: 0 0 8px #ccc;
  z-index: 1;
}

.action {
  line-height: 26px;
}
.weui-btn:after {
  content: "";
  border-width: 2px;
}
</style>