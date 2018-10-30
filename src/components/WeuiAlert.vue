<template>
    <transition name="fade">
        <div>
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd">
                    <strong class="weui-dialog__title" v-html="title"></strong>
                </div>
                <slot>
                    <div class="weui-dialog__bd" v-html="content"></div>
                </slot>
                <div class="weui-dialog__ft">
                    <a @click="$emit('close')" href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'WeuiAlert',
    props: {
        title: String,
        content: String
    }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>