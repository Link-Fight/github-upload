<template>
<!-- <transition name="fadeup"> -->
        <PopPanel  @close="$emit('close')">
            <div slot="header" class="xa-txt-center xa-bg-f6" style="padding:15px;">
                <p class="xa-txt-16">选择我的当前团队</p>
                <p class="xa-txt-999">说明:所有作业数据将计入当前团队</p>
            </div>
            <AppList class="xa-container xa-bg-f6"
                style="height:40vh;"
                itemsClass="weui-cell xa-bg-white"
                emptyTip="还没有可选的团队信息"
                :items="displayItems"
                :listenRefresh="false" >
                <template slot-scope="props">
                   <div @click="onItemClick(props.item)" class="xa-txt-14 xa-flex" :class="props.item.default&&'xa-txt-green'">
                       {{props.item.txt}}
                   </div>
                   <i v-if="props.item.default" class="iconfont icon-dui xa-txt-green xa-txt-14"></i>
                </template>
            </AppList>
            <AppBtns slot="footer" :items="btns" @click="onBtnClick"/>
        </PopPanel>
    <!-- </transition> -->
</template>
<script>
import { cancelOkBtns } from '../config/AppBtns'
export default {
    name: 'TeamSelector',
    data() {
        return {
            btns: cancelOkBtns,
            displayItems: [],
            oldItem: {},
            curItem: {}
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
        onBtnClick({ action }) {
            console.log(action, JSON.stringify(this.oldItem))
            if (action === 'ok' && this.oldItem.txt !== this.curItem.txt) {
                this.$emit('submit', {
                    newItems: this.displayItems,
                    curItem: this.curItem
                })
            } else {
                this.$emit('close')
            }
        },
        onItemClick(item) {
            this.displayItems.forEach(item => {
                item.default = false
            })
            item.default = true
            this.curItem = item
        }
    },
    mounted() {
        this.displayItems = JSON.parse(JSON.stringify(this.items))
        this.displayItems.forEach(item => {
            if (item.default) {
                this.oldItem = item
            }
        })
    }
}
</script>
<style lang="scss" scoped>

</style>
