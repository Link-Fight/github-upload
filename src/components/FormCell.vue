<template>
<div @click="onClick" class="xa-bg-white weui-cell" :class="access!==undefined&&access!==false&&'weui-cell_access'">
    <i v-if="icon" class="iconfont" :class="icon" style="padding-right:4px;"></i>
    <div v-if="label">{{label}}</div>
    <div class="weui-cell__bd">
        <slot></slot>
    </div>
    <slot name="right"></slot>
    <div class="weui-cell__ft"></div>
</div>
</template>
<script>
export default {
    name: 'FormCell',
    props: {
        icon: String,
        label: String,
        access: {},
        href: String
    },
    methods: {
        onClick() {
            this.href && this.$gotoHref(this.href)
        }
    }
}
</script>
<style lang="scss" scoped>
.weui-cell {
  line-height: 22px;
}
</style>