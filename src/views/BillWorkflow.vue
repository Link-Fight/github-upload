<template>
<section class="xa-view">
    <StepNav @input="onStepChange" :value="stepsValue" :items="steps"/>
    <section class="xa-flex xa-container">
        <transition name="fade">
            <keep-alive>
                <component :is="componentId" :isChid="true" @submit="onSubmit" :dataSoure="dataSoure"></component>
            </keep-alive>
        </transition>
    </section>
    <div></div>
</section>
</template>
<script>
import StepNav from '@/components/StepNav'
const steps = [{
    txt: '选择',
    com: 'orderList'
}, {
    txt: '收货地址',
    com: 'addressList'
}, {
    txt: '发票抬头',
    com: 'billHeader'
}, {
    txt: '确认信息',
    com: 'result'
}]
export default {
    components: {
        StepNav,
        orderList: () => import('@/views/BillInfoOrderList.vue'),
        addressList: () => import('@/views/AddressList.vue'),
        billHeader: () => import('@/views/BillInfoHeaderList.vue'),
        result: () => import('@/views/BillInfoResult.vue')
    },
    data() {
        return {
            steps: steps,
            stepsValue: 0,
            componentId: '',
            dataSoure: null
        }
    },
    watch: {
        stepsValue(val) {
            this.componentId = this.steps[val].com
        }
    },
    methods: {
        onSubmit(result) {
            this.dataSoure.set(this.componentId, result)
            if (this.stepsValue < this.steps.length - 1) {
                this.stepsValue++
            }
        },
        onStepChange(value) {
            (value < this.stepsValue) && (this.stepsValue = value)
        }
    },
    beforeMount() {
        const { action } = this.$route.query
        if (action === 'appendInfo') {
            this.steps = steps.slice(1)
        }
    },
    mounted() {
        this.componentId = this.steps[0].com
        this.dataSoure = (function (list) {
            let database = {}
            list.reduce((total, cur) => (total[cur.com] = '') || total, database)
            return {
                clear() {
                    database = null
                },
                set(key, value) {
                    database[key] = value
                },
                get() {
                    return database
                }
            }
        }(this.steps))
    },
    beforeDestroy() {
        this.dataSoure = null
    }
}
</script>
<style scoped>
</style>
