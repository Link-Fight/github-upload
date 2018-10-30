<template>
<section class="detail-wrap" :class="{'isTest':this.isTest}">
    <DiyDetailList v-if="this.isTest" />
    <section class="detail-container xa-view" :class="{'xa-default__bg':isLoading}">
        <template v-if="!isLoading">
            <DetailHeader v-if="config.header"
                :avatar="config.header.avatar"
                :title="config.header.title"
                :subTitle="config.header.subTitle"
                :tags="config.header.tags"
                :icon="config.header.icon"
                class="xa-com__space"/>
            <section class="xa-view xa-container">
                <DetailComFactory v-if="config.body.length" :cacheKey="cacheKey" :initCfg="config.body" @refresh="initFn"></DetailComFactory>
            </section>
            <AppBtns v-if="config.footer&&config.footer.length" class="xa-flex--shrink xa-line__top" @click="onBtnClick" :items="config.footer"/>
            <FloatTip v-if="isTipShow" @close="isTipShow=false" :content="floatTip"/>
        </template>
    </section>
</section>
</template>
<script>
import baseView from './BaseView.js'
import DetailHeader from '@/components/DetailHeader.vue'
import FloatTip from '@/components/DetailFloatTip.vue'
import DiyDetailList from '@/components/DiyDetailList.vue'
export default {
    name: 'DiyDetailView',
    extends: baseView,
    components: {
        DetailHeader,
        FloatTip,
        DiyDetailList
    },
    data() {
        return {
            isLoading: false,
            isTipShow: false,
            floatTip: '',
            cacheKey: '',
            config: {
                header: {
                    avatar: '',
                    title: '',
                    subTitle: '',
                    attrs: [],
                    tags: [],
                    btns: [],
                    current: '',
                    href: ''
                },
                body: [],
                footer: []
            }
        }
    },
    methods: {
        getTestServer(params) {
            return import('@/config/DetailComFactory.js').then(({ getInitData }) => getInitData(params))
        },
        onBtnClick(btnCfg, event) {
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data) {
                    this.initFn()
                } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                    this.$showPopBtnsBottom(btnCfg.items, event.target).then(btnCfg => this.onBtnClick(btnCfg, event))
                }
            })
        },
        initFn(route = this.$route) {
            this.isLoading = true
            let { src, params = {} } = this.curRoute || this.$extractRouteInfo()
            let cacheKey = src + JSON.stringify(params)
            Object.assign(this.$data, {
                cacheKey,
                header: {
                    avatar: '',
                    title: '',
                    subTitle: '',
                    attrs: [],
                    tags: [],
                    btns: [],
                    current: '',
                    href: ''
                },
                body: [],
                footer: []
            })
            let queryDataPromise = null
            if (this.$route.query.session) {
                queryDataPromise = this.baseSessionInitFn(window.location.href + '__' + cacheKey, this.getTestServer)
            } else {
                queryDataPromise = this.baseInitFn(this.getTestServer)
            }
            return queryDataPromise.then(data => {
                Object.assign(this.$data, data)
                this.isLoading = false
                return data
            })
        }
    },
    created() {
        if (this.isTest) {
            var app = document.querySelector('#app')
            app.classList.add('fullscreen')
        }
        this.initFn().then(data => {
            if (data.floatTip) {
                let storageValue = this.$util.getStorage(window.location.href + '__' + data.floatTip)
                if (storageValue === undefined || storageValue === null) {
                    this.isTipShow = true
                    this.$util.setStorage(window.location.href + '__' + data.floatTip, {})
                } else {
                    this.isTipShow = false
                }
            }
        })
    },
    beforeDestroy() {
        var app = document.querySelector('#app')
        app.classList.remove('fullscreen')
    }
}
</script>
<style lang="scss" scoped>
.detail-wrap.isTest {
  position: relative;
  padding-left: 260px;
  .detail-container {
    max-width: 640px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 540px) {
  .detail-wrap.isTest {
    padding-top: 40px;
    padding-left: 0;
  }
}
</style>
