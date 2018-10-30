<template>
  <Picker ref="picker" @cancel="$emit('close')" title="选择日期" :data="pickdata" :selectedIndex="selectedIndex" @value-change="onValueChange" @change="onChange"/>
</template>
<script>
import Picker from './Picker.vue'
const MonthDays = {
    0: 31,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}
function getDay(dayCount) {
    let result = []
    for (var i = 1; i <= dayCount; i++) {
        result.push({ text: i + '日', value: i })
    }
    return result
}
function getYear(min, max) {
    let result = []
    for (var i = min; i <= max; i++) {
        result.push({ text: i + '年', value: i })
    }
    return result
}
function getMonth(min = 1, max = 12) {
    let result = []
    for (var i = min; i <= max; i++) {
        result.push({ text: i + '月', value: i })
    }
    return result
}
function isLeapYear(year) {
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
}
export default {
    components: {
        Picker
    },
    data() {
        return {
            year: -1,
            pickdata: [],
            selectedIndex: []
        }
    },
    props: {
        value: {
            type: Array,
            default() {
                return (new Date().toLocaleDateString()).split('/')
            }
        },
        min: {
            type: Array,
            default() {
                return [2010]
            }
        },
        max: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        onValueChange(val) {
            console.log(val)
            this.$emit('input', val)
        },
        onChange(val, index) {
            this.selectedIndex[val] = index
            if (val === 0) {
                this.year = this.pickdata[0][index].value
            } else if (val === 1) {
                let daysCount = this.getCurMonthDayCount(val)
                if (this.pickdata[2].length !== daysCount) {
                    this.pickdata.pop()
                    this.pickdata.push(getDay(daysCount))
                    if (this.selectedIndex[2] >= daysCount) {
                        this.selectedIndex.pop()
                        this.selectedIndex.push(daysCount - 1)
                    }
                }
            }
        },
        getCurMonthDayCount(month) {
            let daysCount = MonthDays[month]
            if (daysCount === undefined) {
                if (isLeapYear(this.year)) {
                    daysCount = 29
                } else {
                    daysCount = 28
                }
            }
            return daysCount
        }
    },
    created() {
        let minYear = this.min[0] || 2010
        let maxYear = this.max[0]
        let curYear = parseInt(this.value[0])
        if (maxYear === undefined) {
            maxYear = curYear + 5
        }
        this.year = curYear
        this.selectedIndex[0] = curYear - minYear
        this.selectedIndex[1] = parseInt(this.value[1]) - 1
        this.selectedIndex[2] = parseInt(this.value[2]) - 1
        this.pickdata = [getYear(minYear, maxYear), getMonth(), getDay(this.getCurMonthDayCount(parseInt(this.value[1]) - 1))]
    },
    mounted() {
        this.$refs.picker.show()
    }
}
</script>
