<template>
<section class="xa-view" v-show="!isLoading">
    <PopPanel v-if="PopPanel.isShow" @close="onClose">
        <div slot="header" class="xa-bg-f6" style="padding:15px;">
            审核
        </div>
        <div class="xa-bg-f6" style="padding: 0 15px 15px;position:relative">
            <a style="position:absolute;right:22px;top:12px;" :href="'tel'+PopPanel.phone"> <i class="xa-txt-green iconfont icon-dianhua"></i> </a>
            <InfoListItem  :items="PopPanel.items" class="xa-com__space"/>
        </div>
        <AppBtns slot="footer" :items="PopPanel.btns"  @click="onBtnClick"/>
    </PopPanel>
    <section class="xa-container xa-flex xa-bg-f6">
        <transition-group name="list" tag="div">
            <InfoListItem class="list-item xa-com__space" v-for="(item) in config.body" :key="item.guid" @click="onItemClick(item)" :title="item.title" :items="item.items" :phone="item.phone"></InfoListItem>
        </transition-group>
        <template v-if="config.body.length===0">
            <section class="xa-cell xa-txt-center xa-txt-999">
                <p class="xa-flex">{{emptyStatus.txt}}</p>
            </section>
        </template>
    </section>
</section>
</template>
<script>
import baseView from './BaseView.js'
import InfoListItem from '../components/InfoListItem.vue'
// import { getInitData, getItem } from '../config/ViewInfoList.js'
function getTestServer(action) {
    return (params) => import('@/config/ViewInfoList.js').then((_) => _[action](params))
}
export default {
    name: 'InfoListView',
    extends: baseView,
    data() {
        return {
            isLoading: true,
            curItem: null,
            PopPanel: {
                isShow: false,
                title: '',
                phone: '',
                items: [],
                btns: []
            },
            config: {
                body: []
            },
            emptyStatus: {
                txt: '你还没有订单',
                btns: []
            }
        }
    },
    components: {
        InfoListItem
    },
    methods: {
        onClose() {
            setTimeout(() => {
                this.PopPanel.isShow = false
            }, 300)
        },
        onItemClick(item) {
            this.curItem = item
            let promise = item.src === 'isTest' ? getTestServer('getItem')() : this.$diyAction({ url: item.src })
            this.$promiseWithUi(promise).then(data => {
                this.PopPanel.isShow = true
                this.PopPanel.title = data.title
                this.PopPanel.items = data.items
                this.PopPanel.phone = data.phone
                this.PopPanel.btns = data.btns
            })
        },
        onBtnClick(btnCfg, event, com) {
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data) {
                    this.PopPanel.isShow = false
                    if (data.REFRESH === 1) {
                        return this.initFn()
                    }
                    let index = this.config.body.indexOf(this.curItem)
                    setTimeout(() => {
                        this.config.body.splice(index, 1)
                    }, 300)
                    this.$showToast('处理成功！')
                } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                    let rect = event.target.getBoundingClientRect()
                    let top = rect['top'] + rect['height'] + 4
                    let right = document.body.clientWidth - rect['width'] * 1.5 - rect['left']
                    this.$showPopBtns(btnCfg.items, {
                        top: top + 'px',
                        right: right + 'px'
                    }, rect['width'] - 6).then(btnCfg => {
                        this.onBtnClick(btnCfg, event, com)
                    })
                }
            })
        },
        initFn() {
            return this.baseRequest(this.$extractRouteInfo(), getTestServer('getInitData')).then(data => { Object.assign(this.$data, data) })
        }
    },
    created() {
        this.initFn().then(() => { this.isLoading = false })
    }
}
</script>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.5);
}
</style>
