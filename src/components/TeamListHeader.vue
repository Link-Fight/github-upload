<template>
<div class="weui-cell xa-bg-white">
  <slot>
    <div class="xa-flex">
      {{title}}
    </div>
  </slot>
  <div class="xa-cell">
    <WeuiBadge v-for="(badgeBtn,index) in btns" @click.native="onConfigBtnClick(badgeBtn,index)" :style="{'color':badgeBtn.color}" :key="index" :badge="badgeBtn.badge" :icon="badgeBtn.icon"></WeuiBadge>
  </div>
  <PopBtns style="z-index:9999" v-show="popBtns.isShow" top="40" right="8" :xDistince="popBtns.xDistince"  @close="popBtns.isShow=false" @click="onPopBtnsSelect" :items="popBtns.items" >
    <div slot-scope="props">
        <i class="iconfont" :class="props.item.icon"></i> {{props.item.txt}}
    </div>
  </PopBtns>
</div>
</template>
<script>
export default {
    name: 'TeamListHeader',
    data() {
        return {
            popBtns: {
                isShow: false,
                items: [],
                xDistince: 0
            }
        }
    },
    props: {
        title: {
            type: String,
            default: '我的团队'
        },
        btns: {
            typs: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        async onConfigBtnClick(btnCfg, btnIndex) {
            let data = await this.$onConfigBtnClick(btnCfg)
            if (data || btnCfg.action) {
                this.$emit('btnClick', btnCfg)
            } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                if (btnIndex !== undefined) {
                    btnIndex = this.btns.length - btnIndex
                    console.log('btnIndex', btnIndex)
                    this.popBtns.xDistince = btnIndex * 12 + (btnIndex - 1) * 24 + (btnIndex - 1) * 12
                }
                this.popBtns.isShow = true
                this.popBtns.items = btnCfg.items
            }
        },
        onPopBtnsSelect(btnCfg) {
            this.popBtns.isShow = false
            this.onConfigBtnClick(btnCfg)
        }
    }
}
</script>
<style lang="scss" scoped>
.weui-cell {
  line-height: 28px;
}
</style>
