<template>
  <section class="map-wrapper" :style="{'height':client.height+'px','width':client.width+'px'}">
        <!-- <div class="map-tip">
            警告：确定位置后不能再修改，请务必确保无误
        </div> -->
        <div v-if="isAreaSelectShow" class="weui-mask"></div>
        <transition name="fadeup">
            <AppFilterArea class="filter-area__wrap xa-bg-white" v-show="isAreaSelectShow" @close="isAreaSelectShow=false" @submit="onFilterAreaSubmit" :needPath="true" :level="0"/>
        </transition>
        <section ref="map"></section>
        <div  class="pick-action xa-cell xa-align_center xa-justify_center" :class="{'disable':!pickReady}">
            <i style="font-size: 28px; position: relative;top: -10px;" class="iconfont icon-zuobiao"></i>
        </div>
        <div v-if="isLocShow" class="loc-wrap" @click="fitToLoc">
            <i class="xa-txt-20 iconfont icon-dingwei"></i>
        </div>
        <div class="label-wrap">
            <div class="label-info xa-cell xa-align_center">
                <div style="margin-right:4px;min-width:26px;">
                    <i v-if="!loading" style="font-size: 24px;" class="iconfont icon-zuobiao"></i>
                    <i v-if="loading" class="weui-loading"></i>
                </div>
                <div class="xa-flex location-info">
                    <p @click="onFilterAreaShow" class="xa-cell" style="border-bottom:1px solid #eee;font-weight:bold">{{variables.name}} <i v-show="!loading" class="xa-txt-green iconfont icon-daiban2"></i> </p>
                    <p class="input-wrap">
                        <input v-model="variables.address" class="weui-input" placeholder="输入详细地址">
                        <i v-if="variables.address" @click="variables.address=''" class="weui-icon-clear"></i>
                    </p>
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
/* global L */

import { createGaodeGeoMap as createMap } from '@/controllers/map.js'
import gps from '@/util/gps.js'
import AppFilterArea from '../AppFilterArea.vue'
function getLatLng(latLng) {
    return {
        lat: latLng.lat || latLng.latitude,
        lng: latLng.lng || latLng.longitude
    }
}
export default {
    name: 'pickLatlng',
    components: {
        AppFilterArea
    },
    data() {
        return {
            client: {
                height: '',
                width: ''
            },
            isLocShow: false,
            isAreaSelectShow: false,
            pickReady: true,
            loading: false,
            variables: {
                id: '',
                name: '...',
                address: '',
                lat: '',
                lng: ''
            },
            locLatLng: null,
            timestamp: 0
        }
    },
    props: {
        value: Object,
        child: {
            type: Boolean
        }
    },
    watch: {
        pickReady(val) {
            if (val === true) {
                this.getInfo(this.$options.$map.getCenter())
            }
        }
    },
    methods: {
        fitToLoc() {
            this.$options.$map.setView(this.locLatLng, 15)
        },
        onFilterAreaShow() {
            if (this.loading) return
            this.isAreaSelectShow = true
        },
        onFilterAreaSubmit(data) {
            if (this.variables.id !== data.id) {
                this.$wxAction.geo.QQGeocoder.getLocation(data.pathName, {
                    error: (result) => {
                        this.$showToast('请缩小选择范围！')
                    },
                    complete: (results) => {
                        if (results) {
                            if (results.detail.location) {
                                var latlng = this.$wxAction.geo.gcj02ToWgs84({ lat: results.detail.location.lat, lng: results.detail.location.lng })
                                this.variables.lat = latlng.lat
                                this.variables.lng = latlng.lng
                                this.$options.$map.setView(latlng, 15)
                                this.variables.id = data.id
                                this.variables.name = results.detail.address
                                this.getInfo(latlng)
                            }
                        }
                    }
                })
            }
            this.isAreaSelectShow = false
        },
        getInfo(latlang) {
            let timestamp = this.timestamp = (new Date()).getTime()
            let { lat, lon } = gps.gcj_decrypt(latlang.lat, latlang.lng)
            this.getLocationInfo({
                lat: lat, lng: lon
            }, timestamp)
        },
        getLocationInfo(latlang, timestamp) {
            this.loading = true
            latlang.lat += ''
            latlang.lng += ''
            this.$diyAction({ url: '/common/area/location_detail', data: latlang }).then(data => this.setLocationInfo(Object.assign(data, latlang), timestamp))
        },
        setLocationInfo(info, timestamp) {
            if (this.timestamp === timestamp) {
                if (info.id) {
                    this.variables.id = info.id
                    this.variables.name = info.name
                    this.variables.address = info.address
                    this.variables.lat = info.lat
                    this.variables.lng = info.lng
                }
                this.loading = false
            }
        },
        initMapEvent() {
            this.$options.$map.on('move', () => {
                this.pickReady = false
            })
            this.$options.$map.on('zoom', () => {
                this.pickReady = false
            })
            this.$options.$map.on('moveend', () => {
                this.pickReady = true
            })
            this.$options.$map.on('zoomend', () => {
                this.pickReady = true
            })
        },
        initDefaultPoint(defaultValue) {
            let needInitPoint = true
            if (this.$route.query.params) {
                let params = JSON.parse(this.$route.query.params)
                if (params && params.lat && params.lng) {
                    this.setDefaultPointByParams(params)
                    needInitPoint = false
                }
            }
            if (defaultValue && needInitPoint) {
                if (defaultValue.lat && defaultValue.lng) {
                    let { lat, lon } = gps.gcj_encrypt(defaultValue.lat, defaultValue.lng)
                    this.$options.$map.setView({ lat, lng: lon }, 14)
                    needInitPoint = false
                }
            }
            this.setDefaultPointByGetLocation(needInitPoint)
        },
        setDefaultPointByGetLocation(needInitPoint) {
            this.$showToast({
                content: '正在获取定位',
                type: 'loading'
            })
            this.$getLocation({
                type: 'gcj02'
            })
                .then(data => {
                    this.locLatLng = getLatLng(data)
                    this.isLocShow = true
                    if (needInitPoint) {
                        this.$options.$map.setView({ lat: this.locLatLng.lat, lng: this.locLatLng.lng }, 15)
                        this.getInfo(this.locLatLng)
                    }
                    L.marker(this.locLatLng, { icon: L.divIcon({ className: 'location-marker location-move' }) }).addTo(this.$options.$map)
                }).finally(this.$hiddenToast)
        },
        setDefaultPointByParams(params) {
            Object.assign(this.variables, params)
            this.$options.$map.setView(this.variables, 14)
        },
        onSubmit() {
            if (this.variables.id) {
                if (!this.variables.address) {
                    return this.$showAlert('请输入详细地址信息')
                }
                if (this.child) {
                    this.$emit('submit', this.variables)
                    this.$emit('close')
                } else if (this.$route.query.from) {
                    let gotoUrl = this.$route.query.from + (this.$route.query.from.indexOf('?') > 1 ? '&' : '?')
                    this.$router.replace(gotoUrl + 'pickLocation=' + JSON.stringify(this.variables))
                } else {
                    this.$router.go(-1)
                }
            }
        },
        onCancel() {
            this.child ? this.$emit('close') : this.$router.go(-1)
        }
    },
    mounted() {
        if (this.value && this.value.id) {
            Object.assign(this.variables, this.value)
        }
        this.$options.$map = createMap(this.$refs.map)
        this.initDefaultPoint(this.value)
        this.initMapEvent()
        setTimeout(() => {
            this.client.height = document.body.clientHeight
            this.client.width = this.child ? this.$el.clientWidth : document.body.clientWidth
        }, 500)
    }
}
</script>
<style scoped>
.map-wrapper {
  position: relative;
}
.filter-area__wrap {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 9999;
}
.pick-action {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 28px;
  height: 44px;
  color: red;
  z-index: 500;
  transition: all 0.5s ease;
}
.pick-action.disable {
  color: #999;
  transform: translate(-50%, -60%);
}
.map-tip {
  position: absolute;
  /* top: 8px; */
  left: 8px;
  bottom: 156px;
  right: 8px;
  padding: 0 8px;
  background-color: #ff4d4d;
  color: #fff;
  line-height: 30px;
  border-radius: 4px;
  z-index: 10000;
  font-size: 13px;
}
.loc-wrap,
.label-wrap {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  z-index: 500;
}
.label-wrap {
  position: fixed;
}
.label-wrap div {
  max-width: 500px;
  margin: 0 auto;
}
.loc-wrap {
  width: 36px;
  height: 36px;
  bottom: 160px;
  background: rgba(255, 255, 255, 0.82);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}
.label-info {
  background-color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  line-height: 42px;
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
.location-info {
  text-indent: 0.5em;
}
.input-wrap {
  position: relative;
  padding: 0 28px 0 0px;
  margin: 8px 0;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  background: #f2f2f2;
  line-height: 32px;
}
.weui-icon-clear {
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 32px;
}
</style>
<style>
.map-wrapper .location-marker {
  width: 24px !important;
  height: 24px !important;
  margin-left: -12px !important;
  margin-top: -12px !important;
  background-size: 100% !important;
  background: url("../../assets/loc.png") 0 0 no-repeat;
}
</style>
