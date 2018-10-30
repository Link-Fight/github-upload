<template>
<section class="xa-view" :class="{'xa-default__bg':isLoading}">
    <StatisticeDatePicker v-show="!isLoading"
        :year="defaultTime.year"
        :month="defaultTime.month"
        :date="defaultTime.date"
        class="xa-com__space"
        @submit="onDatePickerSubmit"
        style="z-index:10"></StatisticeDatePicker>
    <section v-show="!isLoading" class="xa-flex xa-container">
        <DetailComFactory v-if="coms.length" :initCfg="coms"></DetailComFactory>
    </section>
</section>
</template>
<script>
import baseView from './BaseView.js'
export default {
    name: 'StatisticsView',
    extends: baseView,
    data() {
        return {
            isTest: !!this.$route.query.isTest,
            isLoading: false,
            title: this.$route.query.title,
            defaultTime: {
                year: '',
                month: '',
                date: ''
            },
            coms: []
        }
    },
    methods: {
        getTestServer(params) {
            return import('@/config/DetailComFactory.js').then(({ getQueryData }) => getQueryData(params))
        },
        onDatePickerSubmit(time) {
            this.queryData({ time })
        },
        queryData(query) {
            let { src, params } = this.$extractRouteInfo()
            if (this.curRoute) {
                if (this.curRoute.src === 'isTest') {
                    this.isTest = true
                } else {
                    src = this.curRoute.src
                    params = this.curRoute.params
                }
            }
            query = Object.assign({}, params, query)
            let promise = this.isTest ? this.getTestServer : this.$diyAction
            this.$promiseWithUi(promise({ url: src, data: query })).then(({ body }) => {
                this.coms = []
                this.$nextTick(() => {
                    this.coms = body
                    this.isLoading = false
                })
            })
        }
    },
    created() {
        this.isLoading = true
        if (this.$route.query.time) {
            let time = this.$route.query.time
            let [year, month, date] = time.split('-')
            this.defaultTime.year = year
            this.defaultTime.month = month
            this.defaultTime.date = date
        }
        this.title && this.$setDocTitle(this.title)
    }
}
</script>