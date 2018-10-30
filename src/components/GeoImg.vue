<template>
<div>
      <img style="max-width: 100%;" :src="imgSrc" alt="">
</div>
</template>
<script>
import { getQQMapImage } from '../controllers/geo'
// getGaodeMapImage
export default {
    name: 'GeoImg',
    data() {
        return {
            imgSrc: ''
        }
    },
    props: {
        value: {
            type: Object,
            default() {
                return {
                    name: '',
                    address: '',
                    lat: '',
                    lng: '',
                    zoom: ''
                }
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(newVal) {
                this.imgSrc = getQQMapImage(newVal, newVal.zoom)
                console.log(this.imgSrc)
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
