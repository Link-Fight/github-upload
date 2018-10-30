<template>
  <section class="wrapper">
      <section v-if="showImg" class="img-wrapper" :style="{'backgroundImage': 'url('+ showSrc +')'}"></section>
      <div class="btn-wrap xa-cell" @click="$emit('close')">
          <i style="font-size:32px;" class="iconfont icon-chacha"></i>
      </div>
      <div class="btn-wrap bottom" v-show="index>-1">
        <i :class="{'xa-txt-999':!canLeft}" @click="onClick('left')" class="iconfont icon-zuojiantou"></i>
        <span>{{index+1}}/{{imgs.length}}</span>
        <i :class="{'xa-txt-999':!canRight}" @click="onClick('right')" class="iconfont icon-youjiantou"></i>
      </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      showImg: true,
      showSrc: '',
      index: -1
    }
  },
  props: {
    imgsrc: {
      type: String,
      default: 'https://tse4-mm.cn.bing.net/th?id=OIP.A6R8IdqN02XUxPiULO4uTwEsCo&w=300&h=168&c=7&qlt=90&o=4&dpr=1.25&pid=1.7'
    },
    imgs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    canLeft() {
      return this.index > 0
    },
    canRight() {
      return this.index < this.imgs.length - 1
    }
  },
  watch: {
    index(val) {
      this.showSrc = this.imgs[val]
    }
  },
  methods: {
    onClick(type) {
      if (type === 'left') {
        if (this.canLeft) {
          this.index--
        }
      } else {
        if (this.canRight) {
          this.index++
        }
      }
    }
  },
  mounted() {
    if (this.imgs && this.imgs.length > 1) {
      this.index = this.imgs.indexOf(this.imgsrc)
    }
    this.showSrc = this.imgsrc
  }
}
</script>
<style scoped>
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 40px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5000;
}
.img-wrapper {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.btn-wrap {
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
}
.btn-wrap.bottom {
  width: 100px;
  left: 50%;
  bottom: 4px;
  font-size: 16px;
  top: initial;
  display: flex;
  justify-content: space-between;
  transform: translateX(-50px);
}
/* .iconfont:hover {
  color: #999;
} */
.zoom-btn {
  position: absolute;
  bottom: 8px;
  left: 50%;
  color: #fff;
  transform: translateX(-50%);
  cursor: pointer;
}
</style>