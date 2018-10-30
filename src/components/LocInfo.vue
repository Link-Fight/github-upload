<template>
  <LinkCell @click.native.stop="onClick" :title="cfg.address" icon="icon-zuobiao" iconClass="xa-txt-green" access/>
</template>
<script>
import gps from '@/util/gps.js'
export default {
    name: 'LocInfo',
    props: {
        cfg: Object
    },
    methods: {
        onClick() {
            let { lat, lon } = gps.gcj_encrypt(this.cfg.lat, this.cfg.lng)
            this.$wxAction.openLocation(Object.assign(this.cfg, {
                latitude: lat,
                longitude: lon,
                address: this.cfg.address,
                scale: 15
            }))
        }
    }
}
</script>
<style lang="scss" scoped></style>
