<template>
<div class="device-wrapper xa-cell xa-bg-white">
 <AppAvatar v-if="(config.avatar&&config.avatar.length!==1)||!config.avatar" class="device-img" share="square" :avatar="config.avatar" size="65"/>
 <div class="xa-flex device-content">
     <div class="xa-cell xa-flex-wrap device-title xa-txt-16" :class="titleClass">{{config.title}}
       <div v-if="config.status&&config.status.length" class="device-status xa-cell xa-flex-wrap" style="margin-left:8px;">
         <UiStatu v-for="(tag,index) in config.status" class="shape" :key="index" :statu="tag"/>
       </div>
      </div>
     <p class="device-txt xa-txt-13">{{config.subTitle}}</p>
     <p class="xa-flex-wrap xa-cell xa-txt-13">
         <span class="device-txt device-info-item" v-for="(info,index) in config.info" :key="index">{{info}}</span>
     </p>
     <p class="device-tags xa-cell">
         <UiStatu v-for="(tag,index) in config.tags" class="shape" :key="index" :statu="tag"/>
     </p>
     <div v-if="config.address" class="device-address-wrap xa-cell weui-cell_access">
        <p class="device-address xa-txt-12 xa-txt-999" @click.stop="toMap"><i class="iconfont icon-zuobiao xa-txt-green"></i> {{config.address}}</p>
        <span class="device-address-ft xa-txt-999 weui-cell__ft"></span>
     </div>
 </div>
 <div v-if="config.btns&&config.btns.length" class="device-action" @click.stop="onActionClick($event)">
   <i class="xa-txt-999 iconfont icon-gengduo"></i>
 </div>
</div>
</template>
<script>
import gps from '@/util/gps.js'
export default {
  name: 'DeviceListItem',
  props: {
    config: Object
  },
  computed: {
    titleClass() {
      if (this.config.status && this.config.status.length) {
        return 'xa-txt-bold'
      }
    }
  },
  methods: {
    toMap() {
      let { lat, lon } = gps.gcj_encrypt(this.config.lat, this.config.lng)
      this.$wxAction.openLocation({
        latitude: lat,
        longitude: lon,
        name: this.config.title,
        address: this.config.address,
        scale: 15
      })
    },
    onActionClick(e) {
      let rect = e.currentTarget.getBoundingClientRect()
      this.$showPopBtns(this.config.btns, {
        top: rect['top'] + rect['height'] + 'px',
        right: document.body.clientWidth - rect['right'] + 'px'
      })
        .then(this.$onConfigBtnClick.bind(this))
        .then(cfg => {
          if (cfg) {
            this.$emit('refresh')
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.device {
  &-wrapper {
    position: relative;
    padding: 10px;
    min-height: 100px;
    align-items: center;
  }
  &-content {
    margin-right: 24px;
    overflow: hidden;
  }
  &-img {
    margin: 0 15px;
    flex-shrink: 0;
    background-size: contain;
  }
  &-title {
    line-height: 21px;
    margin-bottom: 10px;
  }
  &-status {
    justify-content: space-around;
  }
  &-txt {
    color: #666;
    line-height: 20px;
  }
  &-tags {
    margin-top: 5px;
  }
  &-action {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 8px;
  }
  &-address-wrap {
    position: relative;
    padding-right: 8px;
    margin-top: 4px;
    background-color: #eee;
    line-height: 22px;
    border: 1px solid #e4e4e4;
    border-radius: 2px;
    overflow: hidden;
  }
  &-address {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 24px;
  }
  &-address-ft {
    margin-left: auto;
  }
}
.device-info-item {
  margin-right: 18px;
  white-space: nowrap;
}
</style>
