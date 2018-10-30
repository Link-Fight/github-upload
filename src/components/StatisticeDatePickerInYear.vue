<template>
<transition name="fade">
    <div class="date-pick-year">
        <DatePickerTable :items="yearItems" @click="$emit('input',arguments[0].num)" :checkActive="checkActive" activeClass="dt-select--active"></DatePickerTable>
    </div>
</transition>
</template>
<script>
import StatisticeDatePickerTable from './StatisticeDatePickerTable.vue'
export default {
    name: 'StatisticeDatePickYear',
    components: { DatePickerTable: StatisticeDatePickerTable },
    data() {
        return {
            yearItems: [
                [
                    {
                        num: 2015
                    },
                    {
                        num: 2016
                    },
                    {
                        num: 2017
                    },
                    {
                        num: 2018
                    }
                ]
            ]
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

<style lang="scss">
.date-pick-year {
  .dt-select--active {
    color: #42bd56;
    font-weight: bold;
  }
}
</style>