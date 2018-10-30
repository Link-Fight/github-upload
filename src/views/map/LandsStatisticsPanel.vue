<template>
  <section class="xa-view xa-container xa-bg-white">
    <panelHeader class="xa-cell" v-show="!isDatePickerShow">
        <div class="xa-flex" @click="isDatePickerShow=true"><i style="margin-right:2px;" class="iconfont icon-rili"></i>{{displayDate}}<i class="iconfont icon-xiala"></i></div>
        <div v-if="lands.length" :class="isInStatistics&&'xa-txt-green'" @click="triggerStatistics">统计</div>
    </panelHeader>
    <section v-show="!isDatePickerShow&&!isInStatistics" class="xa-container xa-cell cell-wrapper" :class="'col_'+displayType" v-on:scroll.passive="onScroll">
        <div v-for="(land,index) in lands" :key="index" class="cell-container" :class="'cell_'+land.id">
            <Cell :selected="curLandId==land.id" @click.native="$emit('select',land)" :title="land.id" :checkBoxStatus="land.checkBoxStatus" :subTitles="land.subTitles" :type="land.type" :loading="land.loading" />
        </div>
        <WeuiLoadMore style="width:100%;" v-if="isMoreLoading"></WeuiLoadMore>
    </section>
    <section v-show="!isDatePickerShow" class="xa-cell xa-flex__center xa-txt-999" v-if="lands.length == 0">
        <i style="margin-right:3px;" class="iconfont icon-cuowutishi"></i>
        <span>{{'暂无地块信息'}}</span>
    </section>
    <LandsStatisticsLand :curLandId="curLandId" @select="onStatisticsSelect" v-if="isInStatistics" :values="lands" />
    <DatePicker v-if="isDatePickerShow"  @close="isDatePickerShow=false" :value="datePicker.value" @input="onDatePickerInput"/>
  </section>
</template>
<script>
/* eslint-disable */
import startMove from '@/util/startMove.js'
import panelHeader from './panelHeader.vue'
import Cell from './LandsPanelCell.vue'
import RollTip from './RollTip.vue'
import LandsStatisticsLand from './LandsStatisticsLand.vue'
import { loadMore } from '../../config/ViewMap'
import DatePicker from '../../components/DatePicker.vue'
export default {
    name: 'landsPanel',
    components: {
        Cell,
        panelHeader,
        RollTip,
        LandsStatisticsLand,
        DatePicker
    },
    data() {
        return {
            isDatePickerShow: false,
            isInStatistics: false,
            datePicker: {
                value: this.defaultDate
            },
            lands: [],
            subTitle: [],
            moreApi: 'isTest',
            isMoreLoading: false,
            displayType: 0
        }
    },
    computed: {
        displayDate() {
            return this.datePicker.value[1] + '月' + this.datePicker.value[2] + '日'
        }
    },
    props: {
        promise: Promise,
        curLandId: String,
        defaultDate: {
            type: Array,
            default() {
                return (new Date().toLocaleDateString()).split('/')
            }
        }
    },
    watch: {
        isDatePickerShow() {
            this.isInStatistics = false
        },
        curLandId(newId, oldId) {
            console.log('curLandId', newId, oldId)
            this.moveToItem(newId)
        }
    },
    methods: {
        onStatisticsSelect(land) {
            this.$emit('select', land, 'fit')
        },
        triggerStatistics() {
            this.isInStatistics = !this.isInStatistics
        },
        onDatePickerInput(newValue) {
            this.datePicker.value = newValue
            this.isDatePickerShow = false
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
        window.P = this
        this.promise.then(({ lands, sub_title }) => {
            this.lands = lands
            this.subTitle = sub_title || []
        })
    }
}
</script>
<style lang="scss" scoped>
.cell-wrapper {
  flex-wrap: wrap;
}
.cell-container {
  flex: 1;
  flex-shrink: 0;
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
</style>
