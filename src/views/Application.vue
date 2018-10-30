<template>
<section class="xa-view v-application" v-show="applicationInfo.hasInit">
     <transition name="fadeshow">
        <div v-if="mode==='edit'" class="xa-com__space">
            <FormCell>
                <span class="xa-txt--nowrap xa-txt-bold">
                    应用模块
                </span>
                <div v-if="!changing" slot="right">
                    <transition-group class="xa-cell" name="fadeShow" tag="div">
                      <div v-for="(btn) in actionBtns" :key="btn.text" @click="onActionBtnClick(btn)" class="weui-btn weui-btn_mini" :class="btn.class">{{btn.text}}</div>
                    </transition-group>
                </div>
                <i slot="right" v-if="changing" class="weui-loading"></i>
            </FormCell>
            <transition name="fadeShow">
                <FormCell v-if="actionStatus!==0">
                    <p v-if="actionStatus===1">关闭模块开关或应用开关后，应用首页将不再显示，但可在全部应用内看到，首页隐藏的应用带隐藏标识。</p>
                    <p v-if="actionStatus===2">点击右侧上下箭头完成模块排序</p>
                </FormCell>
            </transition>
        </div>
    </transition>
    <transition-group class="xa-flex xa-container" name="flip-list" tag="section">
        <section v-if="mode==='view'" class="xa-container xa-flex" key="view">
            <div class="app-grids-top xa-cell xa-bg-white xa-txt-center">
                <div v-for="(item,index) in applicationInfo.topItems" :key="index"  @click="$gotoHref(item.url)" class="xa-flex weui-grid">
                    <div class="weui-grid__icon">
                        <i class="iconfont xa-txt-32" :class="item.icon"></i>
                    </div>
                    <p class="weui-grid__label xa-txt-000 xa-txt-16" style="margin-top:20px">{{item.title}}</p>
                </div>
            </div>
            <transition-group name="flip-list" tag="div">
                <ApplicationGrids v-for="(item) in applicationInfo.items" v-if="item.visible" :key="item.key" :config="item"  @click="$gotoHref(arguments[0].url)" />
            </transition-group>
            <div class="xa-txt-center" style="padding:20px;" @click="$gotoHref('#/application/all'+(isTest?'?isTest=1':''))">
                <p class="btn-all xa-bg-white">查看全部</p>
            </div>
        </section>
        <section  class="xa-container xa-flex" v-if="mode==='edit'" key="edit">
            <template v-if="actionStatus===0||actionStatus===1">
                <transition-group class="xa-view xa-container" name="flip-list" tag="div">
                    <ApplicationGrids v-for="(item) in displayItems" :status="actionStatus===0?'view':'edit'" :key="item.key" :config="item" />
                </transition-group>
            </template>
            <template v-if="actionStatus===2">
                <transition-group name="flip-list" tag="div">
                    <FormCell v-for="(item) in sortItems" :key="item.title" :label="item.title" class="xa-com__space"><i @click="sortUp(item)" slot="right" style="padding: 0 4px;" class="iconfont icon-up xa-txt-999"></i><i @click="sortDown(item)" slot="right" style="margin-left:8px;padding: 0 4px;" class="iconfont icon-down xa-txt-999"></i></FormCell>
                </transition-group>
            </template>
        </section>
    </transition-group>
</section>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import ApplicationGrids from '@/components/ApplicationGrids.vue'
import baseView from './BaseView.js'
export default {
    name: 'application',
    extends: baseView,
    components: {
        ApplicationGrids
    },
    watch: {
        $route(newRoute) {
            this.init()
            this.actionStatus = 0
        }
    },
    data() {
        return {
            changing: false,
            mode: 'view',
            actionStatus: 0,
            displayItems: [],
            editMap: null,
            sortItems: []
        }
    },
    computed: {
        ...mapState({
            applicationInfo: state => state.application
        }),
        actionBtns() {
            if (this.actionStatus === 0) {
                return [
                    {
                        class: 'weui-btn_default',
                        text: '编辑首页应用',
                        action: 'toEdit'
                    },
                    {
                        class: 'weui-btn_default',
                        text: '编辑排序',
                        action: 'toSort'
                    }
                ]
            } else {
                return [
                    {
                        class: 'weui-btn_default',
                        text: '取消',
                        action: 'cancel'
                    },
                    {
                        class: 'weui-btn_primary',
                        text: '完成',
                        action: 'ok'
                    }
                ]
            }
        }
    },
    methods: {
        ...mapMutations(
            {
                update: 'application/update'
            }
        ),
        getTestServer(action) {
            return (params) => import('@/config/ViewApplication.js').then((_) => _[action](params))
        },
        onActionBtnClick({ action }) {
            switch (action) {
                case 'toEdit':
                    this.actionStatus = 1
                    this.toEdit()
                    break
                case 'toSort':
                    this.actionStatus = 2
                    this.toSort()
                    break
                case 'cancel':
                    this.actionStatus = 0
                    this.displayItems = this.applicationInfo.items
                    break
                case 'ok':
                    if (this.actionStatus === 1) {
                        this.finishEdit()
                    } else {
                        this.finishSort()
                    }
                    break
            }
        },
        toEdit() {
            this.displayItems = JSON.parse(JSON.stringify(this.applicationInfo.items))
            this.editMap = this.getKeyMap(this.applicationInfo.items, 'visible')
        },
        toSort() {
            this.sortItems = this.applicationInfo.items.map((item, index) => {
                let mItem = JSON.parse(JSON.stringify(item))
                delete mItem.items
                mItem.oldIndex = mItem.index = index
                return mItem
            })
        },
        finishEdit() {
            let diffMap = this.diffMap(this.getKeyMap(this.displayItems, 'visible'), this.editMap)
            if (diffMap) {
                let actionPromise = this.isTest ? this.getTestServer('visiableChange') : this.$diyAction
                this.finishAction(actionPromise({
                    url: this.applicationInfo.visibleApi,
                    data: { data: diffMap },
                    method: 'post'
                })).then(result => {
                    this.update({
                        items: this.displayItems
                    })
                })
            } else {
                this.actionStatus = 0
            }
        },
        finishSort() {
            let sortResult = this.sortItems.map(item => item.index).join('')
            let oldSortResult = ''
            for (var i = 0; i < this.sortItems.length; i++) {
                oldSortResult += i
            }
            let newItems = []
            if (oldSortResult !== sortResult) {
                let sortMap = {}
                newItems = this.sortItems.map((item, newIndex) => {
                    let newItem = this.applicationInfo.items[item.index]
                    sortMap[newItem['key']] = newIndex
                    return newItem
                })
                let actionPromise = this.isTest ? this.getTestServer('sortChange') : this.$diyAction
                this.finishAction(actionPromise({
                    url: this.applicationInfo.sortApi,
                    data: { data: sortMap },
                    method: 'post'
                })).then(result => {
                    this.update({
                        items: newItems
                    })
                    this.displayItems = newItems
                })
            } else {
                this.actionStatus = 0
            }
        },
        finishAction(promise) {
            this.changing = true
            return this.$promiseWithUi(promise, { toast: false })
                .then(result => {
                    this.actionStatus = 0
                    this.$showToast('设置成功！')
                    return result
                }).finally(() => {
                    this.changing = false
                })
        },
        sortUp(item) {
            let index = this.sortItems.indexOf(item)
            if (index > 0) {
                this.sortItems.splice(index, 1)
                this.sortItems.splice(index - 1, 0, item)
            }
        },
        sortDown(item) {
            let index = this.sortItems.indexOf(item)
            if (index < this.sortItems.length - 1) {
                this.sortItems.splice(index, 1)
                this.sortItems.splice(index + 1, 0, item)
            }
        },
        initData() {
            if (this.applicationInfo.hasInit) {
                this.displayItems = this.applicationInfo.items
                return
            }
            return this.baseInitFn(this.getTestServer('getInitData')).then(data => {
                this.update(data)
                this.displayItems = this.applicationInfo.items
            })
        },
        init() {
            if (this.$route.name === 'ApplicationAction') {
                if (!this.applicationInfo.hasInit) {
                    return window.history.go(-1)
                }
                this.mode = 'edit'
            } else {
                this.mode = 'view'
            }
            return this.initData()
        },
        toUpdateValue() {
            let maps = this.getUpdateValueMap(this.applicationInfo.items)
            let keys = Object.keys(maps)
            if (keys.length) {
                let actionPromise = this.isTest ? this.getTestServer('valueChange') : this.$diyAction
                actionPromise({
                    url: this.applicationInfo.valueApi,
                    data: { data: maps },
                    method: 'post'
                }).then(values => {
                    this.getCollection(this.applicationInfo.items, (item) => {
                        if (item.key in values) {
                            item.value = values[item.key]
                        }
                    })
                })
            }
        },
        getUpdateValueMap(items) {
            let map = {}
            this.getCollection(items, (item) => {
                if (item['visible'] && item['update']) {
                    map[item.key] = 1
                }
            })
            return map
        },
        diffMap(newMap, oldMap) {
            let diffMap = {}
            let diffCount = 0
            for (let key in newMap) {
                if (newMap[key] !== oldMap[key]) {
                    diffMap[key] = newMap[key]
                    diffCount++
                }
            }
            if (diffCount) {
                return diffMap
            }
        },
        getKeyMap(items, key) {
            let map = {}
            this.getCollection(items, (item) => {
                map[item.key] = item[key]
            })
            return map
        },
        getCollection(items, cb) {
            items.forEach((item) => {
                cb(item)
                item.items.forEach(i => {
                    cb(i)
                })
            })
        }
    },
    activated() {
        this.toUpdateValue()
    },
    created() {
        this.init()
    }
}
</script>
<style lang="scss">
.v-application {
  .fadeShow-enter-active {
    transition: opacity 0.3s linear, transform 0.3s ease-in-out;
  }
  .fadeShow-leave-active {
    opacity: 0;
  }
  .fadeShow-enter {
    opacity: 0.1;
    transform: translateY(50%);
  }
  .iconfont {
    height: 16px;
    width: 16px;
  }
  .app-grids-top {
    padding-top: 6px;
  }
  .btn-all {
    display: inline-block;
    line-height: 28px;
    border: 1px solid #ebebeb;
    padding: 0 15px;
    border-radius: 15px;
  }
  .weui-grid__icon {
    width: 100%;
  }
  .weui-cell::before,
  .weui-grids::after,
  .weui-grid::after,
  .weui-grid::before {
    content: "";
    display: none;
  }
  .weui-btn + .weui-btn {
    margin: 0;
    margin-left: 8px;
  }
  .weui-btn_mini {
    padding: 0 8px;
    line-height: 27px;
  }
  @media screen and (min-width: 360px) {
    .weui-grid {
      width: 25%;
    }
  }
}
</style>