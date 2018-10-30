let datas = {
    datas: [
        {
            legend: '总租金',
            data: [120, 132, 101, 134, 90, 230, 210, 130, 210, 300, 180]
        },
        {
            legend: '已收租金',
            data: [220, 282, 201, 234, 290, 430, 410, 230, 123, 400, 234]
        }
    ],
    x: ['10.1', '10.4', '10.6', '10.8', '10.10', '10.12', '10.14', '10.16', '10.18', '10.20', '10.22']
}

function getBaseChartCfg(color, title, dark = false) {
    let baseColor = ['#67bd59', '#F0C000', '#C1232B', '#27727B', '#E87C25', '#B5C334',
        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0']
    return {
        color: color ? color.concat(baseColor) : baseColor,
        title: {
            text: title,
            left: 8,
            top: 8,
            textStyle: dark ? {
                fontSize: 16,
                fontWeight: 400,
                color: '#eee'
            } : {
                    fontSize: 16,
                    fontWeight: 400
                }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [],
            top: 10,
            right: 8,
            textStyle: {
                color: dark ? '#eee' : '#333'
            }
        },
        grid: {
            left: 14,
            right: 18,
            top: 60,
            bottom: 12,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            min: 'dataMin',
            max: 'dataMax',
            boundaryGap: false,
            data: [],
            axisLabel: {
                color: '#666',
                fontSize: 10
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#000'
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#666',
                formatter(value) {
                    if (value > 1000) {
                        return value / 1000 + 'k'
                    }
                    return `${value}`
                }
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#f2f2f2'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: []
    }
}

function getLineSeriesConfig(data = [], name = '') {
    return {
        name,
        type: 'line',
        symbol: 'circle',
        symbolSize: 7,
        showAllSymbol: true,
        lineStyle: {
            normal: {
                width: 1
            }
        },
        data
    }
}

function getBarSeriesConfig(data = [], name = '') {
    return {
        name,
        type: 'bar',
        barMaxWidth: 50,
        barGap: '0',
        data
    }
}

function getBarYSeriesConfig(data = [], name = '') {
    return {
        name,
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data
    }
}

function getPieSeriesConfig(datas, title) {
    return {
        name: title,
        type: 'pie',
        radius: ['60%', '80%'],
        avoidLabelOverlap: true,
        label: {
            // normal: {
            //     show: false,
            //     position: 'center'
            // },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            }
        },
        // labelLine: {
        //     normal: {
        //         show: false
        //     }
        // },
        data: datas
    }
}

/**
 *
 * @param {Object} echartsDatas
 *
 * @return {Object}
 */
export function createLineChart(echartsDatas = datas, title, dark) {
    let { color } = echartsDatas
    let baseConfig = getBaseChartCfg(color, title, dark)
    baseConfig.xAxis.data = echartsDatas.x
    echartsDatas.datas.forEach(data => {
        baseConfig.legend.data.push(data.legend)
        baseConfig.series.push(getLineSeriesConfig(data.data, data.legend))
    })
    return baseConfig
}

export function createBarChart(echartsDatas, title, dark) {
    let { color } = echartsDatas
    let baseConfig = getBaseChartCfg(color, title, dark)
    baseConfig.tooltip.axisPointer = {
        type: 'shadow'
    }
    baseConfig.xAxis.data = echartsDatas.x
    baseConfig.xAxis.boundaryGap = true
    echartsDatas.datas.forEach(data => {
        baseConfig.legend.data.push(data.legend)
        baseConfig.series.push(getBarSeriesConfig(data.data, data.legend))
    })
    return baseConfig
}
export function createBarYChart(echartsDatas, title, dark) {
    let { color } = echartsDatas
    let baseConfig = getBaseChartCfg(color, title, dark)
    baseConfig.tooltip.axisPointer = {
        type: 'shadow'
    }
    baseConfig.xAxis.data = echartsDatas.x
    baseConfig.xAxis.boundaryGap = true
    let temp = baseConfig.xAxis
    baseConfig.xAxis = baseConfig.yAxis
    baseConfig.yAxis = temp
    echartsDatas.datas.forEach(data => {
        baseConfig.legend.data.push(data.legend)
        baseConfig.series.push(getBarYSeriesConfig(data.data, data.legend))
    })
    return baseConfig
}

export function createPieChart(echartsDatas, title, dark) {
    let { color } = echartsDatas
    let baseConfig = getBaseChartCfg(color, title, dark)
    baseConfig.legend.orient = 'vertical'
    baseConfig.legend.top = 38
    baseConfig.legend.left = 8
    baseConfig.legend.data = echartsDatas.datas.map(data => data.name)
    baseConfig.series.push(getPieSeriesConfig(echartsDatas.datas, title))
    return baseConfig
}

export function createMapChart(echartsDatas, title, dark) {
    let { color, geo } = echartsDatas
    let baseConfig = getBaseChartCfg(color, title, dark)
    delete baseConfig.xAxis
    delete baseConfig.yAxis
    delete baseConfig.legend
    echartsDatas.datas.sort((a, b) => (b.value - a.value))
    if (echartsDatas.datas.length) {
        baseConfig.visualMap = {
            min: 0,
            max: echartsDatas.datas[0].value,
            itemHeight: 220,
            itemWidth: 16,
            left: 'center',
            top: 'bottom',
            calculable: true,
            orient: 'horizontal',
            color: color || ['#42bd56', '#f2f2f2'],
            textStyle: {
                color: dark ? '#eee' : '#333'
            }
        }
    }
    baseConfig.tooltip = {
        trigger: 'item',
        formatter(item = {}) {
            return item.name + (isNaN(item.value) ? '' : ':' + item.value)
        }
    }
    baseConfig.series = {
        name: '',
        type: 'map',
        mapType: geo,
        roam: true,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: true
            }
        },
        data: echartsDatas.datas
    }
    baseConfig._geo = geo || 'china' // 不是echarts的配置 而是为了方便后面的程序拿来判断加载geoJson
    return baseConfig
}

export default function (cfg, dark = false) {
    if (cfg.type === 'bar') {
        return createBarChart.apply(null, arguments)
    } else if (cfg.type === 'barY') {
        return createBarYChart.apply(null, arguments)
    } else if (cfg.type === 'pie') {
        return createPieChart.apply(null, arguments)
    } else if (cfg.type === 'map') {
        return createMapChart.apply(null, arguments)
    }
    return createLineChart.apply(null, arguments)
}