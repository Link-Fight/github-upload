<template>
<div class="xa-bg-white">
    <!-- <FormCell label="设置"/> -->
    <div class="xa-cell theme-box">
        <div v-for="(item,index) in [{ label: '卫星地图', theme: 'satellite' }, { label: '标准地图', theme: 'normal' }, { label: '黑夜地图', theme: 'dark' }]" :key="index" @click="onChangeMapType(item)" :tip="item.label" class="theme-item" :class="'theme-item--' + item.theme +' '+(mapType==item.theme?'active':'')"></div>
    </div>
    <FormSwitch v-model="needMark" label="显示地块标识"/>
    <FormRadio v-show="needMark" v-model="markType" label="标识类型" :options="[{label:'地块编号',value:1},{label:'地块面积',value:0}]"/>
    <!-- <FormCell icon="icon-bianji" label="设置地块标识信息"/>
    <FormCell icon="icon-tianqi" label="查询地图中心点的天气"/>
    <FormCell icon="icon-gongzuo" label="切换地图显示图层"/>
    <FormCell icon="icon-sousuo" label="查询当前地图范围内的地块"/>
    <FormCell icon="icon-zuobiao" label="显示当前定位"/> -->
</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { changeTitleLayer } from '@/controllers/map.js'
import FormSwitch from '@/components/FormSwitch.vue'
import FormRadio from '@/components/FormRadio.vue'
export default {
    components: {
        FormSwitch,
        FormRadio
    },
    data() {
        return {
            mapType: 'satellite',
            needMark: true,
            markType: 1
        }
    },
    computed: {
        ...mapState({
            isDark: state => state.theme.isDark
        })
    },
    watch: {
        'needMark'(value) {
            this.updateMapMarkerStatus()
        },
        markType(value) {
            this.updateMapMarkerStatus()
        }
    },
    methods: {
        ...mapMutations(
            {
                updateTheme: 'theme/update'
            }
        ),
        updateMapMarkerStatus() {
            let msg = this.needMark ? {
                area: this.markType === 0,
                id: this.markType === 1
            } : {
                    area: false,
                    id: false
                }
            this.$emit('changeMark', msg)
        },
        onChangeMapType(theme) {
            changeTitleLayer(theme.theme, this.$parent.$options.mapInstance)
            this.mapType = theme.theme
            this.updateTheme({
                isDark: theme.theme === 'dark'
            })
        }
    },
    mounted() {
        console.log('mounted')
    }
}
</script>
<style lang="scss" scoped>
.theme-box {
  justify-content: space-between;
  padding: 15px 15px;
  .theme-item {
    position: relative;
    width: 60px;
    height: 60px;
    background-position: top;
    border-radius: 4px;
    overflow: hidden;
    border: 2px solid #999;
  }
  .theme-item::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: attr(tip);
    background-color: #999;
    color: #fff;
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
  }
  .theme-item.active {
    border: 2px solid #42bd56;
  }
  .theme-item.active::after {
    background-color: #42bd56;
  }
  .theme-item--satellite {
    background-image: url("/pm/v4/static/min_dark.png");
  }
  .theme-item--normal {
    background-image: url("/pm/v4/static/min_normal.png");
  }
  .theme-item--dark {
    background-image: url("/pm/v4/static/min_sate.png");
  }
}
</style>
