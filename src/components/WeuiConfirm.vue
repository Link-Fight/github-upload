<template>
    <transition name="fade">
        <div>
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd">
                    <strong class="weui-dialog__title" v-html="title"></strong>
                </div>
                <slot></slot>
                <div v-if="content" class="weui-dialog__bd" v-html="content"></div>
                <div class="weui-dialog__bd" v-if="needInput">
                    <input style="border-bottom:1px solid #42bd56;" :value="value" @input="$emit('input',$event.target.value)"  class="weui-input" type="text" :placeholder="placeholder">
                </div>
                <div class="weui-dialog__ft">
                    <a @click="$emit('close', 'cancel')" href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">{{canceltext}}</a>
                    <a @click="$emit('close', 'ok')" href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">{{comfirmtext}}</a>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        title: String,
        content: String,
        value: String,
        needInput: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请输入拒绝理由'
        },
        canceltext: {
            type: String,
            default: '取消'
        },
        comfirmtext: {
            type: String,
            default: '确定'
        }
    }
}
</script>
