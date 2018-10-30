<template>
  <section class="xa-view xa-container">
    <template v-if="lands.length>0">
        <panelHeader v-show="!showSearch" class="xa-cell">
            <RollTip class="xa-flex xa-txt-green" v-if="subTitle.length" :items="subTitle"/>
            <!-- <AppTab class="xa-txt-12" style="width:90px;" v-model="displayType" theme="light" :items="['3列','2列','1列']"></AppTab> -->
            <i @click="triggerSearchBar" class="iconfont icon-sousuo"></i>
        </panelHeader>
        <panelHeader v-show="showSearch">
            <SearchBar class="xa-cell" :value="searchKey" @input="onSearchInput" placeholder="请输入地块相关信息">
                <span @click="triggerSearchBar" style="margin-left:8px;" class="xa-txt-green">取消</span>
            </SearchBar>
        </panelHeader>
        <section class="xa-container cell-wrapper" v-show="displayLands.length" :class="'col_'+displayType" v-on:scroll.passive="onScroll">
            <transition-group name="flip-list" tag="div">
                <div v-for="(land) in displayLands" :key="land.id" class="cell-container" :class="'cell_'+land.id">
                    <Cell :selected="curLandId==land.id"  @click.native="$emit('select',land)" :title="land.id" :checkBoxStatus="land.checkBoxStatus" :subTitles="land.subTitles" :type="land.type" :loading="land.loading" />
                </div>
            </transition-group>
            <WeuiLoadMore style="width:100%;" v-if="isMoreLoading"></WeuiLoadMore>
        </section>
    </template>
    <section class="xa-cell xa-flex__center xa-txt-999" v-if="displayLands.length == 0">
        <i style="margin-right:3px;" class="iconfont icon-cuowutishi"></i>
        <span>{{showSearch?'没有匹配的地块信息':'您的农田未完成测绘，暂无地块信息'}}</span>
    </section>
  </section>
</template>
<script>
/* eslint-disable */
import startMove from '@/util/startMove.js'
import panelHeader from './panelHeader.vue'
import Cell from './LandsPanelCell.vue'
import RollTip from './RollTip.vue'
import { loadMore } from '../../config/ViewMap'
export default {
    name: 'landsPanel',
    components: {
        Cell,
        panelHeader,
        RollTip
    },
    data() {
        return {
            showSearch: false,
            searchKey: '',
            lands: [],
            subTitle: [],
            moreApi: 'isTest',
            isMoreLoading: false,
            displayType: 0
        }
    },
    props: {
        promise: Function,
        curLandId: String
    },
    watch: {
        curLandId(newId, oldId) {
            console.log('curLandId', newId, oldId)
            this.moveToItem(newId)
        }
    },
    computed: {
        displayLands() {
            if (this.showSearch) {
                return this.lands.filter(item => {
                    return JSON.stringify(item).indexOf(this.searchKey) > -1
                })
            } else {
                return this.lands
            }
        }
    },
    methods: {
        triggerSearchBar() {
            this.showSearch = !this.showSearch
        },
        onSearchInput(key) {
            this.searchKey = key
        },
        moveToItem(id) {
            if (id) {
                this.scrollToItem('.cell-container.cell_' + id)
            }
        },
        scrollToItem(className) {
            if (className) {
                let el = this.$el.querySelector(className)
                el && el.offsetParent && startMove(el.offsetParent, { scrollTop: el.offsetTop })()
            }
        },
        onScroll(e) {
            if (this.isMoreLoading === false && this.moreApi) {
                if (e.target.scrollHeight <= e.target.scrollTop + e.target.offsetHeight + 50) {
                    console.log('more')
                    this.loadMore()
                }
            }
        },
        loadMore() {
            this.isMoreLoading = true
            let { src, params } = this.$extractRouteInfo()
            let promise = this.$diyAction || loadMore
            return this.$promiseWithUi(promise({
                url: src, data: params
            }), { toast: false }).then(({ moreApi, lands }) => {
                console.log('moewApi')
                lands = lands.slice(lands.length / 2, lands.length)
                this.moreApi = moreApi
                this.$emit('loadmore', lands)
                this.lands.push(...lands)
                this.isMoreLoading = false
            })
        }
    },
    created() {
        this.promise().then(({ lands, sub_title, moreApi }) => {
            this.lands = JSON.parse(JSON.stringify(lands))
            this.subTitle = sub_title ? JSON.parse(JSON.stringify(sub_title)) : []
            this.moreApi = moreApi
        })
    }
}
</script>
<style lang="scss" scoped>
.cell-wrapper {
  flex-wrap: wrap;
}
.cell-container {
  display: inline-block;
  min-width: 33.33%;
  width: 33.33%;
  max-width: 33.33%;
}
.cell-wrapper.col_1 {
  .cell-container {
    min-width: 50%;
    width: 50%;
    max-width: 50%;
  }
}
.cell-wrapper.col_2 {
  .cell-container {
    min-width: 100%;
    width: 100%;
    max-width: 100%;
  }
}
/deep/ div.xa-searchBar {
  background-color: transparent;
  padding: 0;
}
</style>
