<template>
  <div class="statistice-date-picker__wrap">
       <DatePickerDisplay
            @submit="onDisplayTypeChange"
            @onShowSelector="onPickerSelectorDisplay"
            @onShowPop="onPopBtnsShow"
            :dateLabel="displayDateLabel"
            :displayType="query.displayType"/>
        <transition name="fade">
            <PopBtns v-show="popBtns.isShow" @close="popBtns.isShow=false" @click="onPopBtnsSelect" :items="popBtns.items" >
                <div slot-scope="props" :class="{'xa-txt-green':props.item.key===defaultDisplayType}">
                    <i class="iconfont icon-quan"></i> {{props.item.txt}}
                </div>
            </PopBtns>
        </transition>
       <transition name="fade">
            <DatePickerSelector
                v-show="isDatePickerSelectorShow"
                @onHidden="onPickerSelectorHidden"
                :displayType.sync="selector.displayType"
                :year.sync="selector.year"
                :month.sync="selector.month"
                :date.sync="selector.date"
                :dateLabel="selectorDateLabel"
                />
        </transition>
  </div>
</template>
<script>
import StatisticeDatePickerDisplay from './StatisticeDatePickerDisplay.vue'
import StatisticeDatePickerSelector from './StatisticeDatePickerSelector.vue'
export default {
    name: 'StatisticeDatePicker',
    components: { DatePickerDisplay: StatisticeDatePickerDisplay, DatePickerSelector: StatisticeDatePickerSelector },
    data() {
        // displayType @arguments(Number): 0|1|2  year|month|date
        return {
            isDatePickerSelectorShow: false,
            defaultDisplayType: 1,
            query: { // 请求的数据
                displayType: 0,
                year: 2018,
                month: 3,
                date: 23
            },
            selector: { // 选择器里面的数据
                displayType: 0,
                year: -1,
                month: -1,
                date: -1
            },
            popBtns: {
                isShow: false,
                items: [
                    {
                        key: 2,
                        txt: '默认显示日'
                    },
                    {
                        key: 1,
                        txt: '默认显示月'
                    },
                    {
                        key: 0,
                        txt: '默认显示年'
                    }
                ]
            }
        }
    },
    props: {
        storageKey: {
            type: String,
            default: 'DatePick'
        },
        year: [String, Number],
        month: [String, Number],
        date: [String, Number]
    },
    watch: {
        defaultDisplayType(newVal, oldVal) {
            this.$util.setStorage(`${this.$options.name}_${this.storageKey}_defaultDisplayType`, newVal)
        }
    },
    computed: {
        displayDateLabel() {
            return this.getDisplayDateLabel(this.query.displayType, this.query)
        },
        selectorDateLabel() {
            return this.getDisplayDateLabel(this.selector.displayType, this.selector)
        }
    },
    methods: {
        getDisplayDateLabel(datePickDisplayType, data) {
            if (datePickDisplayType === 0) {
                return `${data.year}年`
            } else if (datePickDisplayType === 1) {
                return `${data.year}年${data.month}月`
            } else {
                return `${data.year}年${data.month}月${data.date}日`
            }
        },
        getQueryDate(datePickDisplayType = this.query.displayType, data = this.query) {
            if (datePickDisplayType === 0) {
                return `${data.year}`
            } else if (datePickDisplayType === 1) {
                return `${data.year}/${data.month}`
            } else {
                return `${data.year}/${data.month}/${data.date}`
            }
        },
        onDisplayTypeChange(type) {
            this.query.displayType = type
            this.requestQueryData()
        },
        onPickerSelectorDisplay() {
            this.isDatePickerSelectorShow = !this.isDatePickerSelectorShow
            Object.assign(this.selector, this.query)
        },
        onPickerSelectorHidden(action) {
            if (action === 'submit') {
                Object.assign(this.query, this.selector)
            }
            this.isDatePickerSelectorShow = !this.isDatePickerSelectorShow
            this.requestQueryData()
        },
        onPopBtnsShow() {
            this.popBtns.isShow = true
        },
        onPopBtnsSelect(selectItem) {
            this.defaultDisplayType = selectItem.key
            this.popBtns.isShow = false
            this.$showToast('修改显示为:' + selectItem.txt)
        },
        requestQueryData() {
            this.$emit('submit', this.getQueryDate())
        }
    },
    mounted() {
        this.requestQueryData()
    },
    created() {
        let storageVal = this.$util.getStorage(`${this.$options.name}_${this.storageKey}_defaultDisplayType`)
        if (storageVal !== undefined && storageVal !== null) {
            this.query.displayType = storageVal
            this.defaultDisplayType = storageVal
        }
        let taday = new Date()
        if (this.year) {
            this.query.displayType = 0
            taday.setFullYear(this.year)
        }
        if (this.month) {
            this.query.displayType = 1
            taday.setMonth(this.month - 1)
        }
        if (this.date) {
            this.query.displayType = 2
            taday.setDate(this.date)
        }
        this.query.year = taday.getFullYear()
        this.query.month = taday.getMonth() + 1
        this.query.date = taday.getDate()
    }
}
</script>
<style lang="scss" scoped>
.statistice-date-picker__wrap {
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
