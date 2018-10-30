<template>
    <PopPanel  @close="$emit('close')">
        <div slot="header" class="xa-txt-center xa-bg-f6" style="padding:15px;">
            <p class="xa-txt-16">{{title}}</p>
            <p v-if="tip" class="xa-txt-12 xa-txt-999">{{tip}}</p>
        </div>
        <div class="xa-bg-f6" style="padding: 0 15px 15px;">
            <div class="weui-search-bar__box" style="padding: 8px 16px;background-color: #fff;border-radius: 5px;">
                <input type="search" v-focus="focus" v-model="value" class="weui-search-bar__input" :placeholder="placeholder" />
                <a href="javascript:" v-show="!!value" class="weui-icon-clear" @click="value=''" style="top:8px;"></a>
            </div>
        </div>
        <AppBtns slot="footer" :items="btns" @click="onBtnClick"/>
    </PopPanel>
</template>
<script>
import { cancelOkBtns } from '@/config/AppBtns'
export default {
    name: 'PopInput',
    data() {
        return {
            btns: cancelOkBtns,
            focus: false,
            value: ''
        }
    },
    props: {
        title: {
            type: String,
            default: '创建团队'
        },
        tip: String,
        placeholder: {
            type: String,
            default: '请输入'
        },
        defaultValue: {
            type: String
        }
    },
    methods: {
        onBtnClick({ action }) {
            if (action === 'ok') {
                if (this.value) {
                    this.$emit('submit', this.value)
                } else {
                    this.$showToast(this.placeholder)
                }
            } else {
                this.$emit('close')
            }
        }
    },
    mounted() {
        this.value = this.defaultValue
        this.focus = true
    }
}
</script>
<style lang="scss" scoped></style>