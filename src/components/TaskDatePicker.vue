<template>
  <div style="position:relative">
    <DatePickerLable  @onShowSelector="onPickerSelectorDisplay" @showTady="onShowTady" :dateLabel="displayDateLabel" :isTaday="isTaday" :btns="btns"></DatePickerLable>
    <div class="dateLabel-wrapper xa-bg-white xa-cell xa-txt-center">
        <div class="xa-flex" v-for="dateLable in dateLables" :key="dateLable">{{dateLable}}</div>
    </div>
    <div ref="wrap" class="datePick-wrappper xa-bg-white" :class="[!isDateOpenUp?'open':'close']">
        <DatePickerDate :value="query.date" @input="onDateInput" :year="query.year" :month="query.month"></DatePickerDate>
    </div>
    <div class="xa-bg-white xa-txt-green xa-txt-12 xa-line__top xa-txt-center" style="line-height:32px;" @click="onDateOpenUp">{{isDateOpenUp?'展开':'收起'}}</div>
    <transition name="fade">
        <DatePickerSelector
            v-show="isDatePickerSelectorShow"
            @onHidden="onPickerSelectorHidden"
            :displayType.sync="selector.displayType"
            :needTypeChange="false"
            :year.sync="selector.year"
            :month.sync="selector.month"
            :date.sync="selector.date"
            :dateLabel="selectorDateLabel"
            />
    </transition>
  </div>
</template>
<script>
import startMove from '@/util/startMove.js'
import DatePickerLable from './TaskDatePickerLable.vue'
import StatisticeDatePickerSelector from './StatisticeDatePickerSelector.vue'
import StatisticeDatePickerInDate from './StatisticeDatePickerInDate.vue'
function formateNum(num) {
    num = parseInt(num)
    if (num < 10) {
        return '0' + num
    }
    return num + ''
}
export default {
    name: 'TaskDatePicker',
    components: {
        DatePickerLable,
        DatePickerSelector: StatisticeDatePickerSelector,
        DatePickerDate: StatisticeDatePickerInDate
    },
    data() {
        return {
            dateLables: ['一', '二', '三', '四', '五', '六', '日'],
            isDatePickerSelectorShow: false,
            isDateOpenUp: true,
            taday: {
                year: 0,
                month: 3,
                date: 23
            },
            query: { // 请求的数据
                // displayType: 1,
                year: 2018,
                month: 3,
                date: 23
            },
            selector: { // 选择器里面的数据
                displayType: 1,
                year: 2018,
                month: 3,
                date: 23
            }
        }
    },
    props: {
        btns: Array
    },
    computed: {
        displayDateLabel() {
            return `${this.query.year}年${this.query.month}月`
        },
        selectorDateLabel() {
            return `${this.selector.year}年${this.selector.month}月`
        },
        isTaday() {
            return parseInt(this.query.year) === this.taday.year &&
                parseInt(this.query.month) === this.taday.month &&
                parseInt(this.query.date) === this.taday.date
        }
    },
    methods: {
        onShowTady() {
            Object.assign(this.query, this.taday)
            this.moveToActiveDate()
        },
        onDateInput(date) {
            this.query.date = date
            this.requestQueryData()
        },
        moveToActiveDate(time = 1000) {
            if (this.$refs.wrap) {
                setTimeout(() => {
                    let activeEle = this.$refs.wrap.querySelector('.st-date-pick-table__cell.active')
                    let rowIndex = activeEle.getAttribute('date-row')
                    // this.$refs.wrap.scrollTop = rowIndex * 30 + rowIndex * 12
                    startMove(this.$refs.wrap, {
                        scrollTop: rowIndex * 30 + rowIndex * 12
                    })()
                    // console.log('wrap', rowIndex, rowIndex * 30 + rowIndex * 12)
                }, time)
            }
        },
        onDateOpenUp() {
            if (this.isDateOpenUp === false) {
                this.moveToActiveDate()
            }
            this.isDateOpenUp = !this.isDateOpenUp
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
        },
        requestQueryData() {
            this.$emit('submit', {
                label: `${this.query.year}年${this.query.month}月${this.query.date}日`,
                time: `${this.query.year}/${formateNum(this.query.month)}/${formateNum(this.query.date)}`,
                num: `${this.query.year}/${formateNum(this.query.month)}/${formateNum(this.query.date)}`
            })
        }
    },
    mounted() {
        this.moveToActiveDate(0)
        this.requestQueryData()
    },
    created() {
        let taday = new Date()
        this.taday.year = this.query.year = taday.getFullYear()
        this.taday.month = this.query.month = taday.getMonth() + 1
        this.taday.date = this.query.date = taday.getDate()
    }
}
</script>
<style lang="scss" scoped>
.dateLabel-wrapper {
  padding: 28px 15px 0 10px;
}
.datePick-wrappper {
  transition: height 0.1s;
  padding: 0 15px 0 10px;
  height: 240px;
  overflow: auto;
}
.datePick-wrappper.close {
  box-sizing: border-box;
  position: relative;
  padding: 16px 15px 16px 10px;
  height: 62px;
  overflow: auto;
}
.datePick-wrappper.close::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 16px;
  background: #fff;
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
