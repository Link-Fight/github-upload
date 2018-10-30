<template>
<section class="xa-view" :class="{'xa-default__bg':isLoading}">
    <TeamListHeader v-show="!isLoading" class="xa-line__bottom" :title="config.header.title" :btns="config.header.btns" @btnClick="onBtnClick"></TeamListHeader>
    <AppList v-show="!isLoading" class="xa-container"
        :filter="config.filter"
        :items="config.body"
        @touchEvent="onTouchEvent"
        @filterSubmit="onFilterSubmit"
        paddingTop="8">
        <template slot-scope="props">
            <div v-if="props.item.type=='more'" @click="onLoadMore(props.item)" class="xa-btn xa-txt-green xa-txt-center">
                {{props.item.title}}
            </div>
            <div v-if="props.item.type=='txt'" class="weui-loadmore weui-loadmore_line">
                <span class="weui-loadmore__tips">已经加载所有数据</span>
            </div>
            <WeuiLoadMore v-if="props.item.type=='loading'"></WeuiLoadMore>
            <TeamListItem v-if="!props.item.type||props.item.type==='TeamListItem'" class="xa-line xa-com__space"
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
        </template>
        <section v-if="emptyStatus" class="xa-flex xa-cell xa-flex__center" slot="empty">
            <div class="xa-flex xa-txt-center">
                <i style="font-size:80px;margin-top:-40px;" class="xa-txt-999 iconfont" :class="emptyStatus.icon||'icon-zanwujilu'"></i>
                <p class="xa-txt-999">{{emptyStatus.txt}}</p>
                <AppBtns class="empty-btns" :items='emptyStatus.btns' @click="onBtnClick"/>
            </div>
        </section>
    </AppList>
</section>
</template>
<script>
import baseView from './BaseView.js'
export default {
    name: 'TeamListView',
    extends: baseView,
    data() {
        return {
            isLoading: false,
            TeamSelector: {
                submitApi: '', // 由选择团队列表接口返回的'submitApi' 指定
                curItem: null,
                items: null
            },
            config: {
                header: {
                    title: '',
                    btns: []
                },
                filter: null,
                body: []
            },
            emptyStatus: {
                txt: '你还没有团队',
                btns: [
                    {
                        txt: '创建我的团队',
                        type: 'submit',
                        action: 'TeamCreate'
                    }
                ]
            }
        }
    },
    methods: {
        getTestServer(action) {
            return (params) => import('@/config/ViewTeamList.js').then((_) => _[action](params))
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
            let requestPromise = this.isTest ? this.getTestServer('getQueryData') : this.$diyAction
            this.$promiseWithUi(requestPromise({ url: this.$route.query.src, data: params })).then(body => {
                this.config.body = body
            })
        },
        onTeamSelectorSubmit(data) {
            if (this.TeamSelector.curItem && this.TeamSelector.curItem.key === data.key) {
                return
            }
            if (this.TeamSelector.submitApi) {
                this.$promiseWithUi(this.$diyAction({
                    url: this.TeamSelector.submitApi,
                    data: {
                        key: data.key
                    },
                    method: 'post'
                })).then(() => {
                    this.TeamSelector.items.forEach(item => {
                        item.default = item.key === data.key
                    })
                    this.TeamSelector.curItem = data
                    this.$showToast('修改当前团队成功！')
                    setTimeout(() => {
                        this.initFn()
                    }, 1500)
                })
            }
        },
        onTeamCreateSubmit(name, { api, params }) {
            this.$promiseWithUi(this.$diyAction({ url: api, data: Object.assign({}, { name: name }, params), method: 'post' })).then(() => {
                this.$showToast('创建新团队成功！')
                setTimeout(() => {
                    this.initFn()
                    this.TeamSelector.items = null
                }, 1500)
            })
        },
        onTouchEvent({ action }) {
            if (action === 'needRefresh') {
                this.initFn()
            }
        },
        onBtnClick(cfg) {
            if (cfg.action === 'TeamSelector') {
                let promiseData = null
                if (this.TeamSelector.items === null) {
                    if (cfg.ajax && cfg.ajax.api) {
                        promiseData = this.isTest ? this.getTestServer('getSelectDatas')() : this.$diyAction({ url: cfg.ajax.api, data: cfg.ajax.params })
                        promiseData.then(data => {
                            this.TeamSelector.items = data.body || []
                            this.TeamSelector.curItem = data.body.find(item => item.default)
                            this.TeamSelector.submitApi = data.submitApi
                        })
                    }
                } else {
                    promiseData = new Promise(resolve => {
                        setTimeout(() => {
                            resolve()
                        }, 300)
                    })
                }
                this.$promiseWithUi(promiseData).then(() => {
                    this.$showPopSelect({
                        items: this.TeamSelector.items,
                        title: '选择我的当前团队',
                        subTitle: '说明：所有作业数据将计入当前团队'
                    }).then(data => this.onTeamSelectorSubmit(data[0]))
                })
            } else if (cfg.action === 'TeamCreate') {
                this.$showPopInput('创建团队', '', '', '请您为团队起个名称').then(value => this.onTeamCreateSubmit(value, cfg.ajax))
            }
        },
        onLoadMore(item) {
            item.type = 'loading'
            let requestPromise = this.isTest ? this.getTestServer('getMoreData') : this.$diyAction
            this.$promiseWithUi(requestPromise({ url: item.url }), { toast: false }).then(body => {
                if (body.length === 0) {
                    item.type = 'txt'
                } else {
                    let index = this.config.body.indexOf(item)
                    this.config.body.splice(index, 1)
                    this.$nextTick(function () {
                        this.config.body.push(...body)
                    })
                }
            })
        },
        initFn() {
            return this.baseInitFn(this.getTestServer('getInitData')).then(data => {
                Object.assign(this.$data, data)
            })
        }
    },
    created() {
        this.isLoading = true
        this.initFn().then(() => {
            this.isLoading = false
        })
    }
}
</script>
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
