<template>
  <section class="map-wrapper" :style="{'height':client.height+'px','width':client.width+'px'}">
        <div v-if="isAreaSelectShow||isSelectionShow" class="weui-mask"></div>
        <transition name="fadeup">
            <AppFilterArea class="filter-panel-wrap xa-bg-white" v-show="isAreaSelectShow" @close="isAreaSelectShow=false" @submit="onFilterAreaSubmit" :needPath="true" :level="2"/>
        </transition>
        <transition name="fadeup">
            <Selection class="filter-panel-wrap xa-bg-white" v-show="isSelectionShow" @close="isSelectionShow=false" @submit="onSelectionSubmit"/>
        </transition>
        <section ref="map"></section>
        <div class="panel-wrap">
            <div class="content-container">
                <div class="xa-flex filter-info xa-line__bottom">
                    <p @click="onFilterShow('area')" class="xa-cell"><i class="xa-txt-green iconfont icon-zuobiao"></i>{{variables.area?variables.area.name:area.name}}</p>
                    <div class="panel-arrow" @click="needShowPanelLarge=!needShowPanelLarge">
                        <i class="iconfont" :class="needShowPanelLarge?'icon-xiangxia':'icon-xiangxia-copy'"></i>
                    </div>
                    <p @click="onFilterShow('select')" class="xa-cell"><i class="xa-txt-green iconfont icon-gengduo1"></i>{{variables.select.label}}</p>
                </div>
                <div class="display-items-wrap" :class="{'xa-isloading':loading,'large':needShowPanelLarge}">
                    <InfoItem v-show="!loading" v-for="(item,index) in displayItems" :class="'_map_item_'+item.id+''" :key="index" :chooseResult="chooseResult" :item="item" @itemclick="onDisplyItemClick(item)" @chose="onChooseItem(item)" />
                    <section class="content-empty xa-txt-center xa-txt-999 xa-txt-20" v-if="!displayItems.length&&!loading">
                        没有相关数据
                    </section>
                </div>
            </div>
            <div class="xa-cell btn-wrap">
                <div @click="onCancel()" class="submit-btn btn_cancel xa-flex">取消</div>
                <div @click="onSubmit()" class="submit-btn btn_primary xa-flex xa-bg-green">确认</div>
            </div>
        </div>
  </section>
</template>
<script>
import { create2GeoMap as createMap } from '@/controllers/map.js'
import AppFilterArea from '../AppFilterArea.vue'
import Selection from './Selection.vue'
// import mock from './mock.js'
import { handleDraw } from './controller.js'
import InfoItem from './InfoItem.vue'
let STORE = {}
window.STORE = STORE
let CACHEREQUEST = {}
export default {
    featureGroup: null,
    currentLayer: null,
    components: {
        AppFilterArea,
        InfoItem,
        Selection
    },
    data() {
        return {
            client: {
                height: '',
                width: ''
            },
            isAreaSelectShow: false,
            isSelectionShow: false,
            needShowPanelLarge: false,
            loading: false,
            displayItems: [],
            chooseResult: {},
            variables: {
                area: null,
                select: {
                    'value': '0',
                    'label': '智能距离'
                }
            }
        }
    },
    props: {
        value: Object,
        chooseMap: Object,
        src: {
            type: Object,
            default() {
                return {
                    url: 'isTest',
                    params: { 'name': 'kelin' }
                }
            }
        },
        area: {
            type: Object,
            default() {
                return {
                    id: 289,
                    name: '请选择区域'
                }
            }
        },
        child: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onChooseItem(item) {
            this.chooseResult[item.id] = !this.chooseResult[item.id]
            this.setLayerChechStatus(item.id)
        },
        getLayer(id) {
            return this.$options.layerIdMap[id]
        },
        onDisplyItemClick(item) {
            this.setLayerCurrent(item.id)
        },
        moveToCurrentInfoItem(id) {
            let targetEl = this.$el.querySelector('._map_item_' + id)
            targetEl && (targetEl.parentNode.scrollTop = targetEl.offsetTop)
        },
        setLayerChechStatus(id) {
            let layer = this.getLayer(id)
            if (layer) {
                layer.hasCheck = this.chooseResult[id]
                layer.setStyle(this.chooseResult[id] ? layer.status.checked : layer.status.unchecked)
            }
        },
        setLayerCurrent(id) {
            if (this.$options.currentLayer) {
                let curLayer = this.$options.currentLayer
                curLayer.setStyle(curLayer.hasCheck ? curLayer.status.checked : curLayer.status.unchecked)
            }
            let layer = this.getLayer(id)
            if (layer) {
                this.$options.$map.flyToBounds(layer.getBounds(), { padding: [90, 90] })
                layer.bringToFront()
                layer.setStyle(layer.status.current)
                this.$options.currentLayer = layer
            }
        },
        onFilterShow(action) {
            if (this.loading) return
            action === 'area' ? (this.isAreaSelectShow = true) : (this.isSelectionShow = true)
        },
        onFilterAreaSubmit(data) {
            if (this.variables.id !== data.id) {
                this.variables.area = {
                    id: data.id,
                    name: data.pathName
                }
            }
            this.isAreaSelectShow = false
            this.requestData()
        },
        onSelectionSubmit(e) {
            this.isSelectionShow = false
            this.variables.select = e
            this.requestData()
        },
        getSubmitData() {
            let reuslt = []
            for (let id in this.chooseResult) {
                if (this.chooseResult[id]) {
                    reuslt.push(STORE[id])
                }
            }
            return reuslt
        },
        onSubmit() {
            let reuslt = this.getSubmitData()
            if (!reuslt.length) {
                this.$showToast('请选择！')
                return
            }
            if (this.child) {
                this.$emit('submit', reuslt)
                this.$emit('close')
            } else if (this.$route.query.from) {
                let gotoUrl = this.$route.query.from + (this.$route.query.from.indexOf('?') > 1 ? '&' : '?')
                this.$router.replace(gotoUrl + 'pickMap=' + JSON.stringify(reuslt))
            } else {
                this.$router.go(-1)
            }
        },
        onCancel() {
            this.child ? this.$emit('close') : this.$router.go(-1)
        },
        initData(items = []) {
            let chooseResult = {}
            let displayItems = items.map(item => {
                STORE[item.id] = item
                chooseResult[item.id] = false
                return {
                    id: item.id,
                    title: item.title,
                    items: item.items && item.items.length ? JSON.parse(JSON.stringify(item.items)) : null
                }
            })
            if (this.chooseMap) {
                Object.assign(chooseResult, this.chooseMap)
            }
            this.displayItems = displayItems
            this.chooseResult = chooseResult
        },
        requestDataAsync() {
            let data = Object.assign({}, this.src.params, {
                area_id: this.variables.area ? this.variables.area : this.src.params.area_id,
                distance: this.variables.select.value
            })
            let cacheKey = this.src.url + JSON.stringify(data)
            if (CACHEREQUEST[cacheKey]) {
                return JSON.parse(CACHEREQUEST[cacheKey])
            } else {
                return this.$diyAction({ url: this.src.url, data }).then(data => {
                    CACHEREQUEST[cacheKey] = JSON.stringify(data)
                    return data
                })
            }
        },
        requestData: async function () {
            if (this.loading) {
                return
            }
            if (this.$options.featureGroup) {
                this.$options.featureGroup.remove()
                this.chooseResult = {}
                this.displayItems = []
            }
            this.loading = true
            try {
                let mock = await this.requestDataAsync()
                this.initData(mock.options)
                let { featureGroup, layerIdMap } = handleDraw(mock.options || [], this.$options.$map)
                this.$options.featureGroup = featureGroup
                this.$options.layerIdMap = layerIdMap
                this.loading = false
                featureGroup.on('click', e => {
                    this.setLayerCurrent(e.layer.options.id)
                    this.moveToCurrentInfoItem(e.layer.options.id)
                })
                for (var id in this.chooseResult) {
                    if (this.chooseResult[id]) {
                        this.setLayerChechStatus(id)
                    }
                }
                this.loading = false
                return mock
            } catch (error) {
                this.$showAlert(error.message)
                this.loading = false
            }
        }
    },
    mounted() {
        this.$options.$map = createMap(this.$refs.map)
        if (this.src.params && this.src.params.area_id) {
            this.variables.area = this.src.params.area_id
        }
        setTimeout(() => {
            this.client.height = document.body.clientHeight
            this.client.width = this.child ? this.$el.clientWidth : document.body.clientWidth
            this.requestData()
        }, 500)
    }
}
</script>
<style scoped lang="scss">
.map-wrapper {
  position: relative;
}
.filter-panel-wrap {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 9999;
}
.panel-wrap {
  position: fixed;
  left: 8px;
  right: 8px;
  bottom: 8px;
  z-index: 500;
}
.panel-wrap > div {
  max-width: 500px;
  margin: 0 auto;
}
.content-container {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 4px;
  padding: 4px 8px;
  line-height: 42px;
  & .content-empty {
    line-height: 10vh;
  }
}
.btn-wrap {
  border-radius: 0 0 4px 4px;
  border-top: 1px solid #eee;
  overflow: hidden;
}
.btn_cancel {
  background: #fff;
}
.btn_primary {
  color: #fff;
}
.submit-btn {
  line-height: 42px;
  text-align: center;
}
.filter-info {
  display: flex;
  justify-content: space-between;
}
.display-items-wrap {
  position: relative;
  min-height: 10vh;
  max-height: 20vh;
  overflow-y: auto;
  line-height: 32px;
  transition: all 0.3s;
  &.large {
    max-height: 80vh;
  }
}
</style>
<style>
.map-wrapper .land_No {
  color: white;
  font-size: 16px;
  display: block;
  white-space: nowrap;
  text-shadow: 1px 3px 8px black;
  margin-left: -30px !important;
  width: 60px !important;
  height: 20px !important;
  text-align: center;
  line-height: 20px;
  margin-top: -10px !important;
  pointer-events: none;
}
</style>
