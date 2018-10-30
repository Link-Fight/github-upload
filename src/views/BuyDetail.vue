<template>
    <section class="xa-view" v-show="!isLoading">
         <section class="xa-flex xa-container">
            <TouchEvent @change="onTouchChange"/>
            <SafeguardInfo v-if="config.header.type==='safeguard'" :title="config.header.title" :subTitle="config.header.subTitle" :active="config.header.active" />
            <InsuranceInfo v-if="config.header.type==='insurance'" :title="config.header.title" :subTitle="config.header.subTitle" :active="config.header.active" :img="config.header.img" :hasIcon="false"/>
            <DetailComFactory style="margin-top:8px;" v-if="config.body.length" :initCfg="config.body"></DetailComFactory>
         </section>
         <footer class="xa-view">
            <div class="buy-btn_wrap" v-if="config.toBtn">
                <div class="buy-btn_content" @click="onBtnClick(config.toBtn)" :style="{'color':config.toBtn.color}">
                     <i class="iconfont" :class="config.toBtn.icon"></i>
                    <span>{{config.toBtn.txt}}</span>
                </div>
            </div>
            <div v-if="config.agressBtn">
                <AppAgressBtn :item="config.agressBtn" @click="onBtnClick" />
            </div>
         </footer>
    </section>
</template>
<script>
import baseView from './BaseView.js'
import AppAgressBtn from '@/components/AppAgressBtn.vue'
import SafeguardInfo from '@/components/SafeguardInfo.vue'
import InsuranceInfo from '@/components/InsuranceInfo.vue'
function getTestServer(params) {
    return import('@/config/ViewBuyDetail.js').then(({ getInitData }) => getInitData(params))
}
export default {
    name: 'BuyDetail',
    extends: baseView,
    components: {
        AppAgressBtn,
        SafeguardInfo,
        InsuranceInfo
    },
    data() {
        return {
            isLoading: false,
            config: {
                header: {},
                body: [],
                toBtn: {},
                agressBtn: {}
            }
        }
    },
    methods: {
        onBtnClick(cfg) {
            this.$onConfigBtnClick(cfg)
        },
        onTouchChange({ action }) {
            if (action === 'needRefresh') {
                this.initFn(true)
            }
        },
        // refresh =<Router/Boolean>：
        // 当通过 watch $route 发现需要请求页面时候 refresh = toRouter
        // 当通过下拉刷新来触发请求页面时候 refresh = Boolean
        initFn(refresh = false) {
            let { src, params = {} } = this.curRoute || this.$extractRouteInfo()
            let cacheKey = src + JSON.stringify(params)
            this.isLoading = true
            this.config.body = []
            let queryDataPromise = null
            if (this.$route.query.session) {
                if (refresh === true) {
                    queryDataPromise = this.baseSessionUpdateFn(window.location.href + '__' + cacheKey, getTestServer)
                } else {
                    queryDataPromise = this.baseSessionInitFn(window.location.href + '__' + cacheKey, getTestServer)
                }
            } else {
                queryDataPromise = this.baseInitFn(getTestServer)
            }
            queryDataPromise.then(data => {
                Object.assign(this.$data, data)
                this.isLoading = false
            })
        }
    },
    created() {
        this.initFn()
    }
}
</script>
<style lang="scss" scoped>
.buy-btn {
  &_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 20px;
  }
  &_content {
    padding: 0 1em;
    line-height: 26px;
    border-radius: 13px;
    border: 1px solid;
  }
}
</style>
