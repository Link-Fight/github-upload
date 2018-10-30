<template>
  <div class="xa-view" :class="isDark&&'dark'" id="app">
    <keep-alive include="MainIndex,MainCeche">
      <router-view class="xa-flex xa-container"/>
    </keep-alive>
    <div class="app-space">
    </div>
    <preview v-if="preview.isShow" :imgsrc="preview.img" :imgs="preview.imgs" @close="preview.isShow=false"></preview>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import preview from '@/components/preview.vue'
export default {
    name: 'App',
    components: {
        preview
    },
    data() {
        return {
            preview: {
                isShow: false,
                img: '',
                imgs: []
            }
        }
    },
    computed: {
        ...mapState({
            isDark: state => state.theme.isDark
        })
    },
    methods: {
        previewImage(img, imgs = []) {
            this.preview.isShow = true
            this.preview.img = img
            this.preview.imgs = imgs
        }
    },
    beforeCreate() {
        // eslint-disable-next-line
        if (window.location.hash.match(/\&token=[\w]+/)) {
            // eslint-disable-next-line
            let token = window.location.hash.match(/\&token=[\w]+/)[0]
            token = token.replace('&token=', '')
            token && this.$configDiyActionHeader({ token: token })
        }
    },
    mounted() {
        if (!this.$isWeixin) {
            this.$wxAction.previewImage = this.previewImage
        }
    }
}
</script>

<style lang="scss">
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 640px;
  margin: 0 auto;
  background-color: #f6f6f9;
}
#app.fullscreen {
  max-width: 100% !important;
}
@media all and (height: 812px) and (width: 375px) {
  .app-space {
    height: 8px;
  }
}
@media all and (min-height: 724px) and (width: 375px) {
  .app-space {
    height: 12px;
    background-color: #fff;
  }
}
@media screen and (min-width: 640px) {
  #app {
    box-shadow: 0px 0px 20px #fff;
  }
  body::before {
    content: "";
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    background: #000;
    filter: blur(10px);
  }
}
#app.dark {
  color: #c7c4c6;
  background-color: #282d33;
  .weui-loadmore_line .weui-loadmore__tips {
    background-color: #282d33;
  }
  .weui-search-bar__form:after {
    content: "";
    background: #282d33;
  }
  .xa-bg-white,
  .xa-bg-33 {
    background: #373e49;
  }
  .xa-bg-f2 {
    background: #373e49;
  }
  .xa-bg-f6 {
    background: #444;
  }
  .weui-cells {
    background: #373e49;
  }
  .weui-cell {
    color: #c7c4c6;
  }
  .xa-txt-000 {
    color: #c7c4c6;
  }
  .xa-txt-999 {
    color: #c7c4c6;
  }
  .xa-txt-333 {
    color: #c7c4c6;
  }
  .xa-line::before,
  .xa-line::after,
  .xa-line__top::before,
  .xa-line__bottom::after {
    content: "";
    background-color: #555;
  }
  .weui-cell:before,
  .weui-cells:before,
  .weui-cells:after {
    content: "";
    border-color: #555;
  }
}
</style>
