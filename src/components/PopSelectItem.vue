<template>
<div class="xa-flex">
    <div class="xa-cell xa-flex" :class="{'xa-txt-ccc':item.disabled}" @click="onItemClick(item)">
        <div class="xa-cell xa-txt-14 xa-flex" :class="item.default&&'xa-txt-green'">
            <AppAvatar v-if="item.avatar" size="28" style="margin-right:8px;" :avatar="item.avatar" />
            <div>
                <p>{{item.txt||item.title||item.label}}</p>
                <template v-if="item.subTitle">
                    <p v-if="!item.subTitle.push" class="xa-txt-999 xa-txt-12" :style="item">{{item.subTitle}}</p>
                    <div v-else class="xa-cell xa-flex-wrap item-status">
                        <UiStatu v-for="subTitle in item.subTitle" :statu="{title:subTitle}" :key="subTitle"/>
                    </div>
                </template>
            </div>
        </div>
        <i v-if="item.items&&item.items.length" class="iconfont xa-txt-16" :class="item.default?'icon-xiangxia-copy':'icon-xiangxia'"></i>
        <i v-else :style="{'visibility':item.default?'visible':'hidden'}" class="iconfont icon-dui xa-txt-green xa-txt-14"></i>
    </div>
    <template v-if="item.items">
        <div class="popselec-item-wrap" :class="{'hidden':!item.default}">
            <item class="xa-line__bottom" v-for="(item,index) in item.items" :item="item" :key="index" @click.native="childitemClick(item)" />
        </div>
    </template>
</div>
</template>
<script>
export default {
    name: 'item',
    props: {
        item: Object,
        type: String
    },
    methods: {
        onItemClick(item) {
            if (item.items) {
                item.default = !item.default
            } else {
                this.$emit('itemclick', item)
            }
        },
        childitemClick(item) {
            debugger
            if (!item.default && this.type === 'radio') {
                this.item.items.forEach(m => {
                    m.default = false
                })
            }
            item.default = !item.default
        }
    }
}
</script>
<style lang="scss" scoped>
.popselec-item-wrap {
  position: relative;
  padding-top: 10px;
  max-height: 100vh;
  transition: all 0.3s;
  overflow-y: hidden;
}
.popselec-item-wrap.hidden {
  max-height: 0;
  padding-top: 0px;
}
.popselec-item-wrap > div {
  padding: 10px 0;
}
</style>
