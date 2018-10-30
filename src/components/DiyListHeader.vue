<template>
<div class="weui-flex xa-bg-white">
    <slot>
        <div class="xa-cell" v-if="title">
            <span style="line-height:40px;margin-left:10px;">{{title}}</span>
        </div>
        <SearchBar v-if="needSearch" class="xa-flex" v-model="searchVal" :placeholder="placeholder||'输入搜索内容'" @submit="$emit('submit',searchVal)" :onFocus_="onFocusHandler" :onBlur_="onBlurHandler"></SearchBar>
        <div v-else class="xa-flex"></div>
    </slot>
    <div class="xa-cell btns__wrap" :class="{'btns__wrap-hidden':!isBtnShow}">
          <div class="xa-cell">
            <WeuiBadge v-for="(badgeBtn,index) in btns" @click.native="onConfigBtnClick(badgeBtn,index)" :key="index" :style="{'color':badgeBtn.color}" :badge="badgeBtn.badge" :icon="badgeBtn.icon" :label="badgeBtn.txt"></WeuiBadge>
         </div>
    </div>
    <PopBtns style="z-index:9999" v-show="popBtns.isShow" top="40" right="8" :xDistince="popBtns.xDistince"  @close="popBtns.isShow=false" @click="onPopBtnsSelect" :items="popBtns.items" >
        <div slot-scope="props">
            <i class="iconfont" :class="props.item.icon"></i> {{props.item.txt}}
        </div>
    </PopBtns>
</div>
</template>
<script>
import DiyListHeaderProps from './DiyListHeaderProps'
export default {
    name: 'DiyListHeader',
    mixins: [DiyListHeaderProps],
    data() {
        return {
            searchVal: '',
            isBtnShow: true,
            popBtns: {
                isShow: false,
                items: [],
                xDistince: 0
            }
        }
    },
    methods: {
        onFocusHandler() {
            this.isBtnShow = false
        },
        onBlurHandler() {
            this.isBtnShow = true
        },
        onConfigBtnClick(btnCfg, btnIndex) {
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data || btnCfg.action) {
                    console.log('toTo:refresh')
                    // this.$emit('refresh')
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
            })
        },
        onPopBtnsSelect(btnCfg) {
            this.popBtns.isShow = false
            this.onConfigBtnClick(btnCfg)
        }
    }
}
</script>
<style lang="scss" scoped>
.weui-flex {
  padding: 4px;
}
.btns__wrap {
  padding-right: 12px;
  transition: all 0.3s ease-in-out;
}
.btns__wrap-hidden {
  width: 0;
  padding-right: 0;
  opacity: 0.5;
  overflow: hidden;
}
</style>
