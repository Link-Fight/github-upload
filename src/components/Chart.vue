<template>
  <div>
      <div style="position:relative;">
        <echarts v-if="show" ref="echarts" class="echarts-container xa-bg-white" :class="chartType"></echarts>
        <div v-show="loading" style="min-height:200px;" class="xa-cell xa-flex__center"><i class="weui-loading"></i>绘图中~</div>
      </div>
  </div>
</template>
<script>
import createChart from './echartsFactory.js'
let asynLoaderResolve = null
let asynLoaderPromise = new Promise(resolve => {
    asynLoaderResolve = resolve
})
export default {
    name: 'lineChart',
    components: {
        echarts: () => import(/* webpackChunkName: "coms/Echarts" */'@/components/Echarts.vue').then(_ => {
            asynLoaderResolve()
            return _
        })
    },
    data() {
        return {
            show: false,
            loading: true,
            timeout: null,
            chartType: ''
        }
    },
    props: {
        config: Object,
        title: String
    },
    methods: {
        setEchartsOptions(options) {
            return new Promise(resolve => {
                asynLoaderPromise.then(() => {
                    setTimeout(() => {
                        this.loading = false
                        this.$refs.echarts.setEchartsOptions(options)
                        resolve(this.$refs.echarts)
                    }, 0)
                })
            })
        },
        askContainerWidth() {
            this.chartType = this.config.type
            if (this.$el.getBoundingClientRect()['width']) {
                this.show = true
                this.setEchartsOptions(createChart(this.config, this.title, this.$store && this.$store.state.theme.isDark))
            } else {
                this.timeout = setTimeout(() => {
                    this.askContainerWidth()
                }, 1000)
            }
        }
    },
    mounted() {
        this.askContainerWidth()
    },
    beforeDestroy() {
        clearTimeout(this.timeout)
    }
}
</script>
<style scoped>
.echarts-container {
  height: 240px;
}
.echarts-container.map {
  height: 340px;
}
</style>