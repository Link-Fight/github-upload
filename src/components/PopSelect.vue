<template>
    <PopPanel @close="$emit('close')">
        <div slot="header" class="pop-title xa-txt-center xa-bg-f6">
            <p class="xa-txt-16">{{title}}</p>
            <p class="xa-txt-999">{{subTitle}}</p>
        </div>
        <SearchBar v-if="needSearch" class="weui-flex__item" v-model="searchVal" :placeholder="placeholder" @submit="emitChange"></SearchBar>
        <AppList class="xa-container xa-bg-f6 xa-line__top"
            :class="['select-list--' + (size||'normal')]"
            itemsClass="weui-cell xa-bg-white"
            emptyTip="暂无相关数据"
            :filter="filter"
            :items="disItems"
            @filterSubmit="onFilterSubmit"
            :listenRefresh="false" >
            <template slot-scope="props">
                <div v-if="props.item.type=='more'" @click="onLoadMore(props.item)" class="xa-flex xa-btn xa-txt-center xa-txt-green" style="line-height:24px;">
                    {{props.item.title}}
                </div>
                <div v-else-if="props.item.type=='txt'" class="weui-loadmore weui-loadmore_line">
                    <span class="weui-loadmore__tips">已经加载所有数据</span>
                </div>
                <WeuiLoadMore v-else-if="props.item.type=='loading'"/>
                <PopSelectItem v-else-if="!props.item.type" :item="props.item" @itemclick="onItemClick" :type="type"/>
            </template>
                <section  slot="empty"  v-if="emptyStatus&&!searchVal" class="xa-flex xa-cell xa-flex__center">
                <div class="xa-flex xa-txt-center">
                    <i style="font-size:80px;margin-top:-40px;" class="xa-txt-999 iconfont" :class="emptyStatus.icon||'icon-zanwujilu'"></i>
                    <p class="xa-txt-999">{{emptyStatus.txt}}</p>
                </div>
            </section>
        </AppList>
        <AppBtns class="xa-line__top" slot="footer" :items="btns" @click="onBtnClick"/>
    </PopPanel>
</template>
<script>
import { cancelOkBtns } from '@/config/AppBtns'
import PopSelectItem from './PopSelectItem.vue'
export default {
    name: 'PopSelect',
    components: {
        PopSelectItem
    },
    data() {
        return {
            src: this.querySrc,
            btns: cancelOkBtns,
            searchVal: '',
            displayItems: [],
            filterResult: {},
            isactivated: true
        }
    },
    props: {
        querySrc: String,
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            default: 'radio'
            //  radio checkbox
        },
        filter: {
            type: Object,
            default() {
                return {}
            }
        },
        emptyStatus: {
            type: Object
        },
        needSearch: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: '请输入搜索内容'
        },
        size: {
            type: String,
            default: 'normal'
        }
    },
    watch: {
        items(val) {
            this.isactivated && this.initDisplayItems()
        }
    },
    computed: {
        disItems() {
            if (this.searchVal) {
                return this.displayItems.filter(item => JSON.stringify(item).indexOf(this.searchVal) > -1)
            }
            return this.displayItems
        }
    },
    methods: {
        onFilterSubmit(filterResult) {
            this.filterResult = filterResult
            this.emitChange()
        },
        emitChange() {
            let params = { keyword: this.searchVal }
            if (this.filterResult) {
                params = Object.assign(params, this.filterResult)
            }
            this.$emit('change', {
                src: this.src,
                params
            })
        },
        onLoadMore(item) {
            this.$emit('more', item)
        },
        onBtnClick({ action }) {
            if (action === 'ok') {
                this.$emit('submit', this.getSubmitResult())
            } else {
                this.$emit('close')
            }
        },
        getSubmitResult() {
            let result = []
            this.displayItems.forEach(item => {
                if (item.items) {
                    result = result.concat(item.items.filter(mItem => mItem.default))
                } else if (item.default) {
                    result.push(item)
                }
            })
            result = JSON.parse(JSON.stringify(result))
            result.forEach(item => delete item.default)
            return result
        },
        onItemClick(item) {
            if (item.disabled) {
                return
            }
            if (this.type === 'radio') {
                this.displayItems.forEach(item => {
                    item.default = false
                })
                item.default = true
            } else if (this.type === 'checkbox') {
                item.default = !item.default
            }
        },
        initDisplayItems() {
            let displayItems = JSON.parse(JSON.stringify(this.items))
            displayItems.forEach(item => {
                item.default = item.default || false
            })
            this.displayItems = displayItems
        }
    },
    mounted() {
        if (this.filter && this.filter.result) {
            this.filterResult = JSON.parse(JSON.stringify(this.filter.result))
        }
        this.initDisplayItems()
    }
}
</script>
<style lang="scss" scoped>
.pop-title {
  border-radius: 10px 10px 0px 0px;
  padding: 15px;
}
.item-status {
  justify-content: space-between;
}
.select-list--normal {
  height: 55vh;
}
.select-list--large {
  height: 70vh;
}
</style>
