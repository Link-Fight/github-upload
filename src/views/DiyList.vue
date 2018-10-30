<template>
<section class="xa-view" v-show="!isLoading">
    <DiyListHeader v-if="headerType=='searchHeader'&&config.header" class="xa-line__bottom" @submit="onSearchSubmit" @refresh="initFn" :needSearch="config.header.needSearch" :placeholder="config.header.placeholder" :btns="config.header.btns"></DiyListHeader>
    <DiyListFiltersHeader v-else-if="headerType=='filterHeader'" class="xa-line__bottom" @filterSubmit="onFilterSubmit" @submit="onSearchSubmit" @refresh="initFn" :filter="config.filter" :btns="config.header.btns"></DiyListFiltersHeader>
    <AppList
        ref="appList"
        class="xa-container"
        :filter="headerType==='filterHeader'?{}:config.filter"
        :items="config.body"
        @touchEvent="onTouchEvent"
        @filterSubmit="onFilterSubmit"
        paddingTop="8">
        <template slot-scope="props">
            <div v-if="props.item.type=='more'" @click="onLoadMore(props.item)" class="xa-btn xa-txt-green xa-txt-center">
                {{props.item.title}}
            </div>
            <div v-else-if="props.item.type=='txt'" class="weui-loadmore weui-loadmore_line">
                <span class="weui-loadmore__tips">已经加载所有数据</span>
            </div>
            <WeuiLoadMore v-else-if="props.item.type=='loading'" class="xa-txt-999"></WeuiLoadMore>
            <OrderListItem v-else-if="!props.item.type||props.item.type==='OrderListItem'" class="xa-line xa-com__space"
                :class="{'history-new':props.item.isNew}"
                @click.native="onGotoHref(props.item)"
                :avatar="props.item.avatar"
                :title="props.item.title"
                :address="props.item.address"
                :info="props.item.info"
                :time="props.item.time"
                :tips="props.item.tips"
                />
            <TeamListItem v-else-if="props.item.type==='TeamListItem'" class="xa-line xa-com__space"
                :avatar="props.item.avatar"
                :certificate="props.item.certificate"
                :title="props.item.title"
                :subTitle="props.item.sub_title"
                :attrs="props.item.attrs"
                :tags="props.item.tags"
                :btns="props.item.btns"
                :badge="props.item.current"
                :href="props.item.href"
                :tip="props.item.tip"
            />
            <FarmingListItem v-else-if="props.item.type==='FarmingListItem'"
                :class="{'history-new':props.item.isNew}"
                @click.native="onGotoHref(props.item)"
                :config="props.item"
                class="xa-line xa-com__space"/>
            <FarmingListItemV2 v-else-if="props.item.type==='FarmingListItemV2'"
                :class="{'history-new':props.item.isNew}"
                @click.native="onGotoHref(props.item)"
                :config="props.item"
                class="xa-line xa-com__space"/>
            <DeviceListItem v-else-if="props.item.type==='DeviceListItem'"
                :class="{'history-new':props.item.isNew}"
                @click.native="onGotoHref(props.item)"
                :config="props.item"
                @refresh="initFn"
                class="xa-line xa-com__space"/>
        </template>
        <section v-if="emptyStatus" class="xa-flex xa-cell xa-flex__center" slot="empty">
            <div class="xa-flex xa-txt-center">
                <i style="font-size:80px;margin-top:-40px;" class="xa-txt-999 iconfont" :class="emptyStatus.icon||'icon-zanwujilu'"></i>
                <p class="xa-txt-999">{{emptyStatus.txt}}</p>
                <AppBtns class="empty-btns" :items='emptyStatus.btns' @click="onConfigBtnClick"/>
            </div>
        </section>
    </AppList>
    <div class="float-btns" v-if="config.floatBtns">
        <div class="float-btns__item xa-bg-green xa-txt-center" v-for="(btn,index) in config.floatBtns" :key="index" @click="onFloatBtnClick(btn,$event)">
            <i class="iconfont xa-txt-bold" style="font-size:26px;" :class="btn.icon"></i>
            <p class="xa-txt-12" style="margin-top:-6px;">{{btn.txt}}</p>
        </div>
    </div>
    <FloatTip v-if="isTipShow" @close="isTipShow=false" :content="floatTip"/>
</section>
</template>
<script>
import baseView from './BaseView.js'
import FloatTip from '@/components/DiyListFloatTip'
import DeviceListItem from '@/components/DeviceListItem'
const storageKey = window.location.pathname + '/diyList_history'
export default {
    name: 'DiyListView',
    extends: baseView,
    components: {
        FloatTip,
        DeviceListItem
    },
    data() {
        return {
            isLoading: true,
            isTipShow: false,
            floatTip: '',
            headerType: 'searchHeader',
            config: {
                keyword: '',
                queryApi: '',
                filter: null,
                header: {
                    needSearch: true,
                    placeholder: '',
                    bts: []
                },
                body: [],
                floatBtns: [],
                footer: []
            },
            emptyStatus: {
                txt: '没有数据',
                btns: []
            },
            historyMap: {},
            curHistoryMap: {}
        }
    },
    methods: {
        getTestServer(action) {
            return (params) => import('@/config/ViewDiyList.js').then((_) => _[action](params))
        },
        onConfigBtnClick() {
            this.$onConfigBtnClick.apply(this, arguments)
        },
        onFloatBtnClick(btnCfg, event) {
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data) {
                    this.initFn()
                } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                    let rect = event.currentTarget.getBoundingClientRect()
                    let style = {
                        top: rect['top'] - 5,
                        left: rect['left'],
                        right: rect['right'] - 60
                    }
                    this.$showPopBtnsBottom(btnCfg.items, style, { x: 36, align: 'right' }).then(btnCfg => this.$onConfigBtnClick(btnCfg))
                }
            })
        },
        onSearchSubmit(keyword) {
            this.config.keyword = keyword
            this.getQueryData()
        },
        onFilterSubmit(result) {
            this.config.filter.result = result
            this.getQueryData()
        },
        getQueryData() {
            let params = { keyword: this.config.keyword }
            if (this.config.filter && this.config.filter.result) {
                params = Object.assign(params, this.config.filter.result)
            }
            params.bodyonly = true
            let promise = this.isTest ? this.getTestServer('getQueryData')(params) : this.$diyAction({ url: this.config.queryApi || this.$route.query.src, data: params })
            this.$promiseWithUi(promise).then(body => {
                this.config.body = body
            })
        },
        onTouchEvent({ action }) {
            if (action === 'needRefresh') {
                this.initFn()
            }
        },
        onLoadMore(item) {
            item.type = 'loading'
            let promise = this.isTest ? this.getTestServer('getMoreData')() : this.$diyAction({ url: item.url, data: { bodyonly: true } })
            this.$promiseWithUi(promise, { toast: false }).then(body => {
                if (body.length === 0) {
                    item.type = 'txt'
                } else {
                    let index = this.config.body.indexOf(item)
                    this.config.body.splice(index, 1)
                    body.forEach(item => {
                        if (item.guid) {
                            item.isNew = !this.historyMap[item.guid]
                        }
                    })
                    this.$nextTick(function () {
                        this.config.body.push(...body)
                    })
                }
            })
        },
        initFn() {
            return this.baseInitFn(this.getTestServer('getInitData')).then(data => {
                this.isLoading = false
                data.config.keyword = data.config.keyword || ''
                if (data.config && data.config.body) {
                    data.config.body.forEach(item => {
                        if (item.guid) {
                            item.isNew = !this.historyMap[item.guid]
                        }
                    })
                }
                Object.assign(this.$data, {
                    floatTip: '',
                    headerType: 'searchHeader',
                    config: {
                        keyword: '',
                        queryApi: '',
                        filter: null,
                        header: {
                            needSearch: true,
                            placeholder: '',
                            bts: []
                        },
                        body: [],
                        floatBtns: [],
                        footer: []
                    }
                }, data)
                return data
            })
        },
        onGotoHref(cfg) {
            if (cfg.action) {
                return this.$onConfigBtnClick(cfg)
            }
            if (cfg.guid) {
                cfg.isNew = false
                let oldType = cfg.type
                cfg.type = '-'
                this.$nextTick(function () {
                    cfg.type = oldType
                })
                this.historyMap[cfg.guid] = 1
                this.$util.setStorage(storageKey, this.historyMap)
            }
            this.$refs.appList.keepScrollTop()
            if (cfg.href) {
                this.$gotoHref(cfg.href)
            }
        }
    },
    created() {
        this.historyMap = this.$util.getStorage(storageKey) || {}
        this.curHistoryMap = Object.assign({}, this.historyMap)
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
    }
}
</script>
<style lang="scss" scoped>
.float-btns {
  position: absolute;
  bottom: 20px;
  right: 16px;
  color: #fff;
  z-index: 10;
  &__item {
    box-sizing: border-box;
    padding-top: 5px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
    & + & {
      margin-top: 12px;
    }
  }
}
.history-new {
  //   box-shadow: 0 -1px 0 rgba(66, 189, 86, 0.33);
}
</style>
<style>
.empty-btns.weui-flex {
  display: block;
  margin-top: 16px;
  background-color: transparent;
}
.empty-btns.weui-flex .xa-btn {
  padding: 0 16px;
  display: inline-block;
  border-radius: 20px;
}
.empty-btns.weui-flex .xa-btn + .xa-btn {
  margin-left: 16px;
}
</style>
