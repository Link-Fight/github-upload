<template>
  <section class="xa-view land-map" :class="{'show-mask--area':showMask.area,'show-mask--id':showMask.id}">
      <section class="xa-flex" ref="map"></section>
      <!-- <div v-if="hasInit" class="right_panel">
          <div class="btn" @click="settingShow=!settingShow">
              <i class="iconfont icon-diaojieji"></i>
          </div>
          <div class="btn" @click="getCurInfo">
              <i class="iconfont icon-pingmukuaizhao"></i>
          </div>
      </div> -->
      <section v-show="hasInit" class="map_panel xa-bg-f2" :class="panelShow?'':'min'">
          <div class="panel-trigger-btn trigger-btn" @click="panelShow=!panelShow"> <i class="iconfont" :class="panelShow?'icon-xiangxia':'icon-xiangxia-copy'"></i> </div>
          <div @click="settingShow=!settingShow" class="setting-triiger-btn trigger-btn"> <i class="iconfont icon-shezhi"></i> </div>
          <div class="map_panel-content" v-show="!settingShow">
            <template v-if="landsPanelCreate">
                <landsPanel v-show="display.isLandsPanelShow"  @select="onLandCellSelect"  :curLandId="state.curSelectedLandId" :promise="landsPanelCreatePromise" @loadmore="onLoadMore"/>
                <!-- <LandsStatisticsPanel v-show="display.isLandsPanelShow"  @select="onLandCellSelect"  :curLandId="state.curSelectedLandId" :promise="landsPanelCreatePromise" @loadmore="onLoadMore"/> -->
            </template>
            <template v-if="display.isLandDetailShow">
                <landDetail :landId="state.curSelectedLandId" :promise="landDetailPromise"  @changeTab="onLandDetailChange" />
            </template>
            <template v-if="display.isLandFlylogsShow">
                <landFlylogs v-model="state.curAirLineIndex" :landId="state.curSelectedLandId" :promise="landDetailPromise" @changeTab="onLandDetailChange" />
            </template>
          </div>
          <div class="map_panel-setting" v-show="settingShow">
              <LandSetting @changeMark="onChangeMark"/>
          </div>
      </section>
  </section>
</template>
<script>
import { createSatelliteMap as createMap } from '@/controllers/map.js'
import { LandController, NewAirLineController } from '@/controllers/land.js'
import landsPanel from './LandsPanel.vue'
import LandsStatisticsPanel from './LandsStatisticsPanel.vue'
import landDetail from './landDetail.vue'
import landFlyLogsPanel from './landFlyLogsPanel.vue'
import LandSetting from './LandSetting.vue'
const loadLandFlightLogsStore = {}
let ViweMode = 1
// ajax：代表将发起异步请求，加载地块详情  fit:代表只是调到该地块
const LAND_SELECT_TYPE = {
    AJAX: 'ajax',
    FIT: 'fit'
}
export default {
    name: 'mapIndex',
    singleLandController: {},
    mapInstance: null,
    components: {
        landsPanel,
        LandsStatisticsPanel,
        landDetail,
        landFlylogs: landFlyLogsPanel,
        LandSetting
    },
    data() {
        return {
            showMask: {
                area: false,
                id: true
            },
            hasInit: false,
            panelShow: true,
            settingShow: false,
            state: {
                landCellSelectType: LAND_SELECT_TYPE.AJAX,
                curSelectedLandId: '',
                curAirlineController: null,
                curAirLineIndex: null
            },
            display: {
                isLandsPanelShow: true,
                isLandDetailShow: false,
                isLandFlylogsShow: false
            },
            displayState: 0,
            landsPanelCreate: false,
            landsPanelCreatePromise: null,
            landDetailPromise: null
        }
    },
    watch: {
        panelShow() {
            setTimeout(() => {
                this.$options.mapInstance.invalidateSize()
            }, 300)
        },
        'state.curAirLineIndex'(newIndex) {
            this.state.curAirlineController && this.state.curAirlineController.selectAirLineByIndex(newIndex)
        },
        displayState(val, oldVal) {
            if (ViweMode === 0) {
                return
            }
            let display = {}
            if (val === 0) {
                this.$options.singleLandController.selectLand()
                this.state.curAirlineController && this.state.curAirlineController.hidden()
                this.state.curAirLineIndex = -1
                display = {
                    isLandsPanelShow: true,
                    isLandDetailShow: false,
                    isLandFlylogsShow: false
                }
            } else if (val === 1) {
                this.state.curAirlineController && this.state.curAirlineController.hiddenAirLine()
                this.state.curAirLineIndex = -1
                display = {
                    isLandsPanelShow: false,
                    isLandDetailShow: true,
                    isLandFlylogsShow: false
                }
            } else if (val === 2) {
                this.state.curAirlineController && this.state.curAirlineController.displayAirLine()
                this.$options.singleLandController.hiddenCurIdMarker()
                display = {
                    isLandsPanelShow: false,
                    isLandDetailShow: false,
                    isLandFlylogsShow: true
                }
            }
            if (oldVal === 2) {
                this.$options.singleLandController.showCurIdMarker()
            }
            Object.assign(this.display, display)
        }
    },
    methods: {
        onChangeMark(newVal) {
            Object.assign(this.showMask, newVal)
        },
        // getCurInfo() {
        //     console.log(this.$options.mapInstance)
        //     let map = this.$options.mapInstance
        //     map.getCenter()
        //     map.getZoom()
        //     map.getBounds()
        //     map.getSize()
        //     map.getPixelBounds()
        //     map.getPixelOrigin()
        // },
        onLandDetailChange(tab) {
            console.log('onLandDetailChange', tab)
            this.displayState = tab
        },
        onLoadMore(lands) {
            console.log('lands.length', lands.length)
            this.initLands(lands)
        },
        initLands(lands) {
            console.log(lands)
            lands.forEach(land => {
                this.$options.singleLandController.addLand(land)
            })
            return lands
        },
        /**
         * 选择了地块
         */
        onLandCellSelect(land, type = this.state.landCellSelectType) {
            if (type === LAND_SELECT_TYPE.AJAX) {
                this.state.curAirlineController && this.state.curAirlineController.hidden()
            }
            if (this.displayState === 2) {
                this.$options.singleLandController.showCurIdMarker()
            }
            this.$options.singleLandController.selectLand(land.id)
            if (type === LAND_SELECT_TYPE.AJAX) {
                this.loadLandFlightLogs(land)
            }
            this.state.curSelectedLandId = land.id
        },
        /**
         * 显示具体地块的详细信息、飞行航线等
         * 由于是异步加载：
         * 1:没有加载过的，创建加载任务
         * 2:已经加载过的、直接显示
         * @param {Object} land 地块信息
         */
        loadLandFlightLogs(land) {
            if (ViweMode === 0) {
                return
            }
            if (land.flight_logs && land.flight_logs.url) {
                loadLandFlightLogsStore[land.id] = this.$diyAction({ url: land.flight_logs.url }).then(data => {
                    data.flyLogsLength = data.data.length
                    let newAirLineController = new NewAirLineController(this.$options.mapInstance, land, data)
                    window.newAirLineController = newAirLineController
                    this.$options.singleLandController.addAirLineController(land.id, newAirLineController)
                    return data
                })
                land.flight_logs = null
            } else {
                console.log('ToDo:showFlyLogs')
            }
            this.landDetailPromise = loadLandFlightLogsStore[land.id]
            if (this.displayState === 1) {
                this.display.isLandDetailShow = false
                this.$nextTick(function () {
                    this.display.isLandDetailShow = true
                })
            } else {
                this.displayState = 1
            }
            this.landDetailPromise.then(() => {
                if (land.id === this.state.curSelectedLandId) {
                    let airlineController = this.state.curAirlineController = this.$options.singleLandController.getCurAirLineController()
                    airlineController.displaySpray()
                }
            })
        }
    },
    created() {
        var app = document.querySelector('#app')
        app.classList.add('fullscreen')
    },
    mounted() {
        let { src, params } = this.$extractRouteInfo()
        let promise = this.$promiseWithUi(this.$diyAction({ url: src, data: params }).then(data => {
            this.$options.mapInstance = createMap(this.$refs.map)
            this.landsPanelCreate = true
            this.$setDocTitle(data.doc_title)
            // data.lands = data.lands // slice(0, data.lands.length / 2)
            this.$options.singleLandController = new LandController(this.$options.mapInstance)
            this.initLands(data.lands)
            this.$options.singleLandController.addToMap()
            this.$options.singleLandController.on('click', this.onLandCellSelect)
            this.hasInit = true
            return data
        }))
        this.landsPanelCreatePromise = function () {
            return promise
        }
    },
    beforeDestroy() {
        var app = document.querySelector('#app')
        app.classList.remove('fullscreen')
    }
}
</script>
<style lang="scss">
.land-map {
  .land-area {
    display: none;
  }
  .land-id {
    display: none;
  }
  .land_No {
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
  .land_No--finished {
    color: #6f0 !important;
  }
  .land_No--working {
    color: #ffc107 !important;
  }
}
.show-mask--area .land-area {
  display: initial;
}
.show-mask--id .land-id {
  display: initial;
}
.land-map .leaflet-transparentMask-pane {
  opacity: 0.5;
  z-index: 399;
}

.land-map .leaflet-transparentMask1-pane {
  opacity: 0.5;
  z-index: 399;
}
.right_panel {
  position: absolute;
  right: 0;
  top: 0;
  padding: 8px;
  z-index: 9999;
  .btn {
    width: 35px;
    height: 35px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    .iconfont {
      font-size: 20px;
    }
  }
  .btn + .btn {
    margin-top: 50%;
  }
}
.map_panel {
  position: relative;
  height: 260px;
  transition: all 0.3s ease;
  z-index: 9999;
  .map_panel-content,
  .map_panel-setting {
    height: 100%;
  }
  &.min {
    height: 0;
  }
  .trigger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    z-index: 10;
  }
  .panel-trigger-btn {
    left: 50%;
    top: -20px;
    transform: translate3d(-50%, 0, 0);
    width: 60px;
    height: 20px;
    border-radius: 10px 10px 0 0;
    .iconfont {
      font-size: 26px;
    }
  }
  .setting-triiger-btn {
    right: 12px;
    top: -30px;
    width: 30px;
    height: 30px;
    border-radius: 15px 15px 0 0;
    .iconfont {
      font-size: 20px;
    }
  }
}
.cross-point::before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 20px;
  background: red;
  transform: translate(-50%, -50%);
  z-index: 99999;
}

.cross-point::after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  height: 3px;
  width: 20px;
  background: red;
  transform: translate(-50%, -50%);
  z-index: 99999;
}
</style>
