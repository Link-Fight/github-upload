<template>
  <div v-show="isShow">
       <div v-show="isVideoSHow">
            <video
                ref="video"
                style="height:204px;"
                x5-playsinline=""
                webkit-playsinline
                playsinline
                width="100%"
                height="100%"
                preload="auto"
                controls=""
            >
            <source ref="source" src="http://7xlyy2.com1.z0.glb.clouddn.com/1ico3w09qtb.mp4?e=1831519115&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:bcLSTiDO26bb3uwKbePUx7ZH-zs=">
            </video>
        </div>
        <div v-show="isImgShow">
            <img ref="img" style="display: block;max-width: 100%;margin: 0 auto;">
        </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            isShow: false,
            isImgShow: false,
            isVideoSHow: false
        }
    },
    methods: {
        show({ video, img }) {
            this.isVideoSHow = false
            this.isImgShow = true
            if (video) {
                this.$refs.source.src = video
                this.$refs.video.load()
                this.isVideoSHow = true
            }
            if (img) {
                this.$refs.img.src = null
                this.$nextTick(function () {
                    this.$refs.img.src = img
                })
                this.isImgShow = true
            }
            if (this.isVideoSHow) {
                this.$refs.video.pause()
            }
            this.isShow = this.isVideoSHow || this.isImgShow
        }
    }
}
</script>
