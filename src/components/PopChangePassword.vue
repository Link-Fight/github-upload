<template>
    <PopPanel  @close="onBtnClick({})">
        <div slot="header" class="xa-txt-center xa-bg-f6" style="padding:15px;">
            <p class="xa-txt-16">{{title}}</p>
            <p v-if="tip" class="xa-txt-12 xa-txt-999">{{tip}}</p>
        </div>
        <div class="xa-bg-f6" style="padding: 0 15px 15px;">
            <div class="weui-search-bar__box">
                <input type="password"  v-model="value" class="weui-search-bar__input" placeholder="输入新密码" />
                <a href="javascript:" v-show="!!value" class="weui-icon-clear" @click="value=''" style="top:8px;"></a>
            </div>
            <div class="weui-search-bar__box">
                <input type="password"  v-model="againvalue" class="weui-search-bar__input" placeholder="再次输入新密码" />
                <a href="javascript:" v-show="!!againvalue" class="weui-icon-clear" @click="againvalue=''" style="top:8px;"></a>
            </div>
        </div>
        <AppBtns slot="footer" :items="btns" @click="onBtnClick"/>
    </PopPanel>
</template>
<script>
import { cancelOkBtns } from '@/config/AppBtns'
export default {
    name: 'PopChangePassword',
    data() {
        return {
            btns: cancelOkBtns,
            value: '',
            againvalue: ''
        }
    },
    props: {
        title: String,
        tip: String,
        resolve: Function,
        reject: Function
    },
    methods: {
        onBtnClick({ action }) {
            if (action === 'ok') {
                if (!this.value) {
                    return this.$showToast('请输入')
                } else if (this.value !== this.againvalue) {
                    return this.$showToast('两次输入不一致')
                }
                this.resolve ? this.resolve(this.value) : this.$emit('submit', this.value)
            } else {
                this.reject ? this.reject() : this.$emit('close')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.weui-search-bar__box {
  padding: 8px 16px;
  background-color: #fff;
  border-radius: 5px;
}
.weui-search-bar__box + .weui-search-bar__box {
  margin-top: 8px;
}
</style>