<template>
    <section class="xa-view">
        <AddressInput @input="handleInput"/>
        <div class="map-wrapper xa-flex xa-container">
            <div class="display-pane">
                <FormCell :label="name">
                    <span slot="right">{{phone}}</span>
                </FormCell>
                <FormCell :label="address" :value="address"/>
            </div>
            <section ref="map"></section>
        </div>
    </section>
</template>
<script>
/* global L */

import AddressInput from './AddressInput.vue'
import { createGaodeGeoMap as createMap } from '@/controllers/map.js'
export default {
    components: {
        AddressInput
    },
    data() {
        return {
            markerPoint: null,
            address: '',
            phone: '',
            name: ''
        }
    },
    methods: {
        handleInput(input) {
            let inputList = input.split(/[,，]/g)
            if (inputList.length === 3 || inputList.length === 1) {
                let phone = inputList.find(item => /\d/.test(item))
                if (!phone && inputList.length === 3) {
                    return this.$showToast('无法识别输入的信息')
                } else if (phone) {
                    inputList.splice(inputList.indexOf(phone), 1)
                }
                let addressIndex = inputList.length > 1 ? inputList[0].length > inputList[1].length ? 0 : 1 : 0
                this.recognitionAddressResult(inputList, phone, addressIndex).catch(() => {
                    addressIndex = addressIndex ? 0 : 1
                    this.recognitionAddressResult(inputList, phone, addressIndex).catch(() =>
                        this.$showToast('无法识别输入的信息')
                    )
                })
            } else {
                this.$showToast('请按照格式来输入,用、或,号来分割', 'msg', 3000)
            }
        },
        recognitionAddressResult(inputList, phone, addressIndex) {
            return this.recognitionAddress(inputList[addressIndex]).then(data => {
                console.log(data)
                this.createMap()
                this.addMarker(data.detail.location)
                this.displayResult(inputList, phone, addressIndex)
            })
        },
        recognitionAddress(address) {
            return new Promise((resolve, reject) => {
                this.$wxAction.geo.QQGeocoder.getLocation(address, {
                    error(e) {
                        reject(e)
                    },
                    complete: (e) => {
                        resolve(e)
                    }
                })
            })
        },
        displayResult(inputList, phone, addressIndex) {
            this.address = inputList[addressIndex]
            this.phone = phone
            this.name = inputList[addressIndex ? 0 : 1]
        },
        addMarker(latlng) {
            this.markerPoint && this.markerPoint.remove()
            this.markerPoint = L.marker(latlng, { icon: L.divIcon({ className: 'cur-marker' }) }).addTo(this.$options.$map)
            this.fitToLoc(latlng)
        },
        fitToLoc(locLatLng) {
            this.$options.$map.setView(locLatLng, 18)
        },
        createMap() {
            if (this.$options.$map) return
            this.$options.$map = createMap(this.$refs.map)
        }
    }
}
</script>
<style scoped lang="scss">
.map-wrapper {
  padding: 0 8px;
  /deep/ .cur-marker {
    width: 36px;
    height: 36px;
    background-color: #db0225;
    border: 4px solid red;
    border-radius: 50%;
  }
}
.display-pane {
  position: absolute;
  width: 90%;
  left: 16px;
  right: 16px;
  top: 16px;
  z-index: 1000;
  opacity: 0.8;
}
</style>
