<template>
<transition name="fade">
  <DatePickerTable :items="monthItems" :checkActive="checkActive" @click="$emit('input',arguments[0].num)"></DatePickerTable>
</transition>
</template>
<script>
import StatisticeDatePickerTable from './StatisticeDatePickerTable.vue'
let monthItems = [[], []]
for (let i = 1; i <= 6; i++) {
    monthItems[0].push({
        num: i,
        key: '1' + i
    })
    monthItems[1].push({
        num: i + 6,
        key: '2' + i
    })
}
export default {
    name: 'StatisticeDatePickerInMonth',
    components: { DatePickerTable: StatisticeDatePickerTable },
    data() {
        return {
            monthItems
        }
    },
    props: {
        value: {}
    },
    methods: {
        checkActive(item) {
            return parseInt(item.num) === parseInt(this.value)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>