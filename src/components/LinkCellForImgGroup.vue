<template>
<div class="xa-bg-white">
    <slot name="title">
        <a v-if="title" class="xa-line__bottom link-group-title xa-txt-14 weui-cell">
          <i v-if="icon" class="xa-txt-26 xa-txt-333 iconfont" :class="icon" style="margin-right:8px;"></i>
          <span class="xa-flex">{{title}}</span>
          <i v-if="showFlod" :class="{'needFlod':!needFlod}" @click="needFlod=!needFlod" class="xa-txt-24 xa-txt-333 iconfont icon-xiangxia"></i>
        </a>
    </slot>
    <transition-group name="fadeup" tag='div'>
        <LinkCellForImg
            v-if="!needFlod"
            @btnClick="$emit('btnClick',arguments[0])"
            @click.native="$emit('itemClick',item)"
            v-for="(item,index) in items" :key="index"
            :img="item.img"
            :btns="item.btns"
            :title="item.title"
            :subTitle="item.subTitle"
            :value="item.value"
            :phone="item.phone"
            :href="item.href"
            :size="size"
            :child="true"/>
            <p v-if="tips&&!needFlod" key="-1" class="tips-wrap" v-html="tips"></p>
    </transition-group>
</div>
</template>
<script>
export default {
    name: 'LinkCellForImgGroup',
    data() {
        return {
            showFlod: false,
            needFlod: false
        }
    },
    props: {
        title: String,
        icon: String,
        tips: String,
        flod: {
            type: [Boolean, String]
        },
        items: {
            type: Array,
            default() {
                return []
            }
        },
        size: {
            type: String,
            default: ''
        }
    },
    created() {
        if (this.flod !== undefined) {
            this.showFlod = true
            this.needFlod = this.flod
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
