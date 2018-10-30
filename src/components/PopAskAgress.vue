<template>
<PopPanel  @close="$emit('close')">
    <div slot="header" class="xa-txt-center xa-txt-bold xa-bg-f6" style="padding:15px;">
        <p class="xa-txt-16">提醒</p>
    </div>
    <div class="xa-bg-white">
        <slot></slot>
        <label for="weuiAgree" class="weui-agree">
            <input id="weuiAgree" type="checkbox" v-model="isAgress" class="weui-agree__checkbox">
            <span class="xa-txt-333 xa-txt-bold weui-agree__text">{{label}}</span>
        </label>
    </div>
    <AppBtns class="xa-line__top" slot="footer" @click="onBtnClick" :items="submitBtns" />
</PopPanel>
</template>
<script>
export default {
    name: 'PopAskAgress',
    data() {
        return {
            isAgress: false
        }
    },
    props: {
        title: String,
        label: String,
        resolve: Function
    },
    computed: {
        submitBtns() {
            if (this.isAgress) {
                return [{ txt: '取消', action: 'cancel' }, { txt: '确定', type: 'submit', action: 'comfirm' }]
            } else {
                return [{ txt: '取消', action: 'cancel' }, { txt: '确定', type: 'disable' }]
            }
        }
    },
    methods: {
        onBtnClick(btn) {
            if (btn.action === 'cancel') {
                this.$emit('close')
            } else if (btn.action === 'comfirm') {
                if (this.resolve) {
                    this.resolve()
                } else {
                    this.$emit('comfirm')
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
