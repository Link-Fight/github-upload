<template>
<transition name="fade">
  <DatePickerTable :items="dayItems" :checkActive="checkActive" @click="onClick"></DatePickerTable>
</transition>
</template>
<script>
import StatisticeDatePickerTable from './StatisticeDatePickerTable.vue'
class DatePickController {
    constructor(year, month, day) {
        year && (this.year = year)
        month && (this.month = this.formateNum(month))
        day && (this.data = this.formateNum(day))
    }
    update(newVal = {}) {
        Object.keys(newVal).forEach(key => newVal[key] && (this[key] = this.formateNum(newVal[key])))
    }
    static Cache = {}
    static getCache(key) { return DatePickController.Cache[key] && JSON.parse(DatePickController.Cache[key]) }
    static saveCache(key, data) { DatePickController.Cache[key] = JSON.stringify(data) }
    formateNum(num) {
        num = parseInt(num)
        if (num < 10) {
            return '0' + num
        }
        return num + ''
    }

    /** The day:0 will reset day:7
     */
    getMonthLastDateAndDay(year, month) {
        let day = new Date()
        day.setFullYear(year, month, 1)
        day.setDate(day.getDate() - 1)
        return {
            year: day.getFullYear(),
            month: this.formateNum(day.getMonth() + 1),
            date: day.getDate(),
            day: day.getDay() === 0 ? 7 : day.getDay()
        }
    }
    _pushDate(dayList, weekList, startIndex, endIndex, type, prevDate) {
        for (let startNum = startIndex; startNum <= endIndex; startNum++) {
            weekList.push({
                num: startNum,
                type,
                key: `${prevDate}/${startNum}`
            })
            if (weekList.length === 7) {
                dayList.push(Array.from(weekList))
                weekList.length = 0
            }
        }
        return dayList
    }
    /** 产生 7*6的二维日期数组
     */
    productDay() {
        let dayList = DatePickController.getCache(`${this.year}/${this.month}`)
        if (!dayList) {
            dayList = []
            let weekList = []
            let prevMonth = this.getMonthLastDateAndDay(this.year, parseInt(this.month) - 1)
            let curMonth = this.getMonthLastDateAndDay(this.year, this.month)
            let nextMonth = this.getMonthLastDateAndDay(this.year, parseInt(this.month) + 1)
            this._pushDate(dayList, weekList, prevMonth.date - prevMonth.day + 1, prevMonth.date, 'prev', `${prevMonth.year}/${prevMonth.month}`)
            this._pushDate(dayList, weekList, 1, curMonth.date, 'curr', `${curMonth.year}/${curMonth.month}`)
            this._pushDate(dayList, weekList, 1, (42 - (prevMonth.day - 1 + curMonth.date)), 'next', `${nextMonth.year}/${nextMonth.month}`)
            DatePickController.saveCache(`${this.year}/${this.month}`, dayList)
        }
        return dayList
    }
}
let datePickControl = new DatePickController('2018', '12', '1')
export default {
    name: 'StatisticeDatePickerInDate',
    components: { DatePickerTable: StatisticeDatePickerTable },
    data() {
        return {
            dayItems: []
        }
    },
    props: {
        year: [String, Number],
        month: [String, Number],
        value: {}
    },
    computed: {
        date() {
            return this.year + '' + this.month
        }
    },
    watch: {
        date(val) {
            this.initDayItems()
        },
        year(val) {
            this.initDayItems()
        },
        month(val) {
            this.initDayItems()
        }
    },
    methods: {
        checkChange() {
            console.log(this.month, this.year)
        },
        initDayItems() {
            datePickControl.update({ year: this.year, month: this.month })
            this.dayItems = datePickControl.productDay()
        },
        checkActive(item) {
            if (item.type === 'curr') {
                return parseInt(item.num) === parseInt(this.value)
            }
        },
        onClick(item) {
            if (item.type === 'curr') {
                this.$emit('input', item.num)
            }
        }
    },
    mounted() {
        this.initDayItems()
    }

}
</script>
