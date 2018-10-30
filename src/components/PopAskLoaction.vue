<template>
 <PopPanel :wrapStyle="{'backgroundColor':'#999'}" style="z-index:9999">
  <section class="xa-view pop-wrapper" style="height:100vh;">
     <div class="xa-view pop-content xa-bg-f6">
        <header class="xa-txt-18 xa-txt-bold xa-txt-center">
            开启农事服务
        </header>
        <p style="padding:8px">为了给您推荐附近的农事需求,需要以下权限：</p>
        <section class="pop-content__wrap xa-container xa-flex">
            <div class="xa-txt-center">
                <div style="width: 70px;height: 70px;margin: 0 auto;border: 2px solid;border-radius: 50%;margin-bottom: 16px;color: #42bd56;">
                    <i style="font-size:50px;line-height:55px;" class="xa-txt-green iconfont icon-Area"></i>
                </div>
                <p>位置信息</p>
            </div>
        </section>
        <footer class="xa-btn xa-btn_submit xa-txt-center" @click="$emit('close')">
            下一步
        </footer>
     </div>
  </section>
 </PopPanel>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.pop-wrapper {
  justify-content: center;
  padding: 0 32px;
}
.pop-content {
  border-radius: 5px;
  padding: 15px;
  max-width: 300px;
  margin: 0 auto;
}
.pop-content__wrap {
  padding: 8px 8px 32px;
}
</style>