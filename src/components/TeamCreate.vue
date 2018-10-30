<template>
<!-- <transition name="fadeup"> -->
        <PopPanel  @close="$emit('close')">
            <div slot="header" class="xa-txt-center xa-bg-f6" style="padding:15px;">
                <p class="xa-txt-16">创建团队</p>
            </div>
            <div class="xa-bg-f6" style="padding: 0 15px 15px;">
                <div class="weui-search-bar__box" style="padding: 8px 16px;background-color: #fff;border-radius: 5px;">
                    <input type="search" v-focus="focus" v-model="name" class="weui-search-bar__input" placeholder="请您为团队起个名称" />
                    <a href="javascript:" v-show="!!name" class="weui-icon-clear" @click="name=''" style="top:8px;"></a>
                </div>
            </div>
            <AppBtns slot="footer" :items="btns" @click="onBtnClick"/>
        </PopPanel>
    <!-- </transition> -->
</template>
<script>
import { cancelOkBtns } from '../config/AppBtns'
export default {
    name: 'TeamCreate',
    data() {
        return {
            btns: cancelOkBtns,
            focus: false,
            name: ''
        }
    },
    methods: {
        onBtnClick({ action }) {
            if (action === 'ok') {
                if (this.name) {
                    this.$emit('submit', this.name)
                } else {
                    this.$showToast('请输入您为团队起的名称')
                }
            } else {
                this.$emit('close')
            }
        }
    },
    mounted() {
        this.focus = true
    }
}
</script>
<style lang="scss" scoped>

</style>