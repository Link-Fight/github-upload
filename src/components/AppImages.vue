<template>
  <div class="images-wrapper">
      <section class="images-container" :style="curSytle">
          <div v-for="(img,index) in imgs" :key="index" class="xa-default__img" :style="{'backgroundImage':'url('+img.thumb_url+')'}"></div>
      </section>
      <div class="images-mask">
          <div class="images__content">
            <p class="images__title xa-txt-18">{{title}}</p>
            <p class="images__subTitle xa-txt-10">{{subTitle}}</p>
          </div>
          <div class="images__counter" v-if="this.imgs.length">
             <img :src="svg" alt=""><div>{{curIndex+1}}/{{this.imgs.length}}</div>
          </div>
      </div>
  </div>
</template>
<script>
import AlloyFinger from 'alloyfinger'
import svg from '../assets/more_img3.svg'
export default {
    name: 'AppImages',
    data() {
        return {
            isMobile: 'ontouchstart' in window,
            svg,
            curIndex: 0,
            af: null,
            setTimeout: -1
        }
    },
    computed: {
        curSytle() {
            let x = this.curIndex * 100
            return {
                transform: `translateX(-${x}%)`
            }
        }
    },
    props: {
        title: String,
        subTitle: String,
        imgs: {
            type: Array,
            default() {
                return []
            }
        },
        autoPlay: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onSwipe(evt) {
            let { direction } = evt
            if (direction === 'Right') {
                this.curIndex--
                if (this.curIndex < 0) {
                    this.curIndex = 0
                }
            } else if (direction === 'Left') {
                this.curIndex++
                if (this.curIndex >= this.imgs.length) {
                    this.curIndex = this.imgs.length - 1
                }
            }
            if (this.autoPlay) {
                clearTimeout(this.setTimeout)
                this.startAutoPlay()
            }
        },
        onTap() {
            this.$wxAction.previewImage(this.imgs[0].url, this.imgs.map(img => img.url))
        },
        startAutoPlay() {
            this.setTimeout = setTimeout(() => {
                this.curIndex++
                this.curIndex = this.curIndex % this.imgs.length
                if (this.curIndex !== undefined) {
                    this.startAutoPlay()
                }
            }, 5000)
        }
    },
    mounted() {
        if (!this.isMobile) {
            this.$el.onclick = this.onTap
        }
        this.af = new AlloyFinger(this.$el, {
            swipe: this.onSwipe,
            tap: this.onTap
        })
        this.autoPlay && this.startAutoPlay()
    },
    beforeDestroy() {
        clearTimeout(this.setTimeout)
    }
}
</script>
<style lang="scss" scoped>
.images-wrapper {
  position: relative;
  overflow: hidden;
  height: 144px;
}
.images-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.images-container {
  line-height: 0;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;
}
.xa-default__img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.images__content {
  position: absolute;
  left: 5px;
  bottom: 5px;
  color: #fff;
  text-shadow: 2px 3px 2px #000;
}
.images__counter {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 4px 8px;
  line-height: 0px;
  font-size: 0px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  //   box-shadow: 0px 0 4px #fff;
  img {
    display: inline-block;
    width: 10px;
    height: 12px;
    margin-right: 4px;
  }
  div {
    display: inline-block;
    font-size: 12px;
    vertical-align: 2px;
  }
}
</style>