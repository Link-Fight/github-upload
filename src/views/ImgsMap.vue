<template>
  <section class="xa-view">
      <section class="xa-flex" ref="map"></section>
      <div style="height:100px">
          <input class="weui_btn weui_btn--primary" ref="qiinput" type="file" accept="image/*" @change="onFileChange">
          <div class="xa-cell">
            <template v-for="(img,index) in imgs">
                <div class="map-imgs__item xa-default__img" :key="index" :style="{'backgroundImage':'url('+img.url+')'}"></div>
            </template>
          </div>
      </div>
  </section>
</template>
<script>

/* global L */

import { createSatelliteMap as createMap } from '@/controllers/map.js'
import EXIF from 'exif-js'
let uptokenPromise = null
function getfn(gps) {
    return gps[0] + gps[1] / 60 + gps[2] / 3600
}
export default {
    data() {
        return {
            map: null,
            imgs: []
        }
    },
    methods: {
        onFileChange() {
            let input = this.$refs.qiinput
            if (input.files && input.files.length) {
                Array.from(input.files).forEach((file, index) => {
                    this.getEXIFInfo(file).then(data => {
                        console.log(data)
                        this.addMarker(data)
                        this.getFileDataUrl(file).then(img => this.imgs.push({
                            ...data,
                            url: img
                        }))
                    }, e => this.$showToast('没有定位信息'))
                })
            }
        },
        getFileDataUrl(file) {
            return new Promise(resolve => {
                var reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function (e) {
                    resolve(this.result)
                }
            })
        },
        getEXIFInfo(file) {
            return new Promise((resolve, reject) => {
                EXIF.getData(file, function () {
                    let exifdata = this.exifdata
                    if (exifdata['GPSLatitude']) {
                        var lat = getfn(exifdata['GPSLatitude'])
                        var lng = getfn(exifdata['GPSLongitude'])
                        resolve({ lat, lng, ...exifdata })
                    } else {
                        reject(new Error('NOGPS'))
                    }
                })
            })
        },
        addMarker(latlng) {
            L.marker(latlng, { icon: L.divIcon({ className: 'station-marker_default' }) }).addTo(this.map)
        }
    },
    created() {
        if (!uptokenPromise) {
            uptokenPromise = this.$diyAction({ url: '/common/qiniu/up_token', data: { normal: 1 } }).then(data => data.uptoken)
        }
    },
    mounted() {
        this.map = createMap(this.$refs.map)
    }
}
</script>
<style lang="scss">
.station-marker_default {
  width: 40px !important;
  height: 40px !important;
  margin-left: -20px !important;
  margin-top: -40px !important;
  background-image: url("../assets/station_default.png");
  background-size: 100%;
}
.map-imgs__item {
  display: inline-block;
  width: 80px;
  height: 80px;
  background-size: contain;
}
</style>