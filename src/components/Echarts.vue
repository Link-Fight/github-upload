<template>
<div class="echarts-wrapper" ref="chart"></div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/geo'
export default {
    data() {
        return {
            loading: false
        }
    },
    props: {
        options: Object
    },
    methods: {
        loadGeoJson(geoName = 'china') {
            if (!echarts.getMap(geoName)) {
                return this.$diyAction({ url: `./static/geoJson/${geoName}.json` }).then(data => {
                    echarts.registerMap(geoName, data)
                })
            }
            return Promise.resolve()
        },
        on(type, fun) {
            this.$refs.chart.instance.on(type, fun)
        },
        setEchartsOptions: async function (options) {
            if (options._geo) { // 拿来判断需要加载GeoJson
                await this.loadGeoJson(options._geo)
            }
            this.$nextTick(function () {
                this.$refs.chart.instance.setOption(options)
                this.$refs.chart.instance.hideLoading()
            })
        },
        showLoading() {
            this.$refs.chart.instance.showLoading({
                text: '',
                color: '#67bd59'
            })
        }
    },
    mounted() {
        this.$refs.chart.instance = echarts.init(this.$refs.chart)
        if (this.options) {
            this.setEchartsOptions(this.options)
        } else {
            this.showLoading()
        }
    }
}
</script>