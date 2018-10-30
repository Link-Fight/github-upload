<template>
   <div class="xa-cell xa-bg-white xa-flex-wrap">
        <div v-if="item.agress" @click="isAgress=!isAgress"  :class="agressClass" style="padding:0 1em;">
           <i style="margin-right:0.5em;" class="iconfont" :class="isAgress?'icon-xuanze xa-txt-blue':'icon-choose'"></i>同意<span @click.stop="onShowDoc" class="xa-txt-blue">《{{item.agress.txt}}》</span>
        </div>
        <AppBtnsItem class="xa-btn xa-flex" style="padding: 0 1em;" v-if="item.buyTip">
            价格 <span class="xa-txt-bold">{{item.buyTip}}</span>
        </AppBtnsItem>
        <AppBtnsItem :class="[!item.agress&&!item.buyTip?'xa-flex xa-txt-center':'']" style="padding:0 1em;" @click="onClick" :item="item" />
    </div>
</template>
<script>
import AppBtnsItem from './AppBtnsItem.vue'
export default {
    data() {
        return {
            isAgress: false
        }
    },
    components: {
        AppBtnsItem
    },
    props: {
        item: Object
    },
    computed: {
        agressClass() {
            if (this.item.buyTip) {
                return 'xa-btn--small xa-line__bottom btn-full'
            } else {
                return 'xa-flex'
            }
        }
    },
    methods: {
        onClick(cfg, event) {
            if (this.isAgress || !this.item.agress) {
                this.$emit('click', cfg, event)
            } else {
                this.$showToast('请先同意相关条款')
            }
        },
        onShowDoc() {
            this.$showPopDoc(this.item.agress.api)
        }
    }
}
</script>
<style lang="scss" scoped>
.btn-full {
  width: 100%;
}
</style>
