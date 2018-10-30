<template>
  <section class="xa-view" :class="{'xa-default__bg':isLoading}">
      <section :class="contentClass" class="xa-flex xa-container">
          <keep-alive>
                <component :is="curComponent" :curRoute="curRoute" child="true" />
          </keep-alive>
      </section>
      <div :class="contentClass" style="position:relative;z-index:9999;"><TabBar v-if="tabs.length>1" :items="tabs"  :rudder="rudderBtn" :value="curTab" @input="onTabChange" @more="moreBtns=arguments[0]" /></div>
      <div @click.self.stop="moreBtns=[]" v-show="moreBtns.length" class="xa-cell more-btns__wrapper">
          <div class="xa-cell xa-flex more-btns__content">
              <div class="more-btns__item" v-for="(btn,index) in moreBtns" :key="index" @click.stop="onBtnClick(btn)">
                    <div class="more-btns__icon" :style="{'backgroundColor':color[index]}">
                        <i class="iconfont xa-txt-24"  :class="btn.icon"></i>
                    </div>
                    <p class="more-btns__txt">{{btn.txt}}</p>
              </div>
          </div>
      </div>
  </section>
</template>
<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
const storageKey = window.location.href + '_/MainIndex_curTab'
const Coms = {}
let tabBarsCache = {}
function getTestServer(params) {
  return import('@/config/MainIndex.js').then(({ getInitData }) => getInitData(params))
}
export default {
  name: 'MainIndex',
  data() {
    return {
      isActivated: true,
      color: ['#67bd59', '#F0C000', '#C1232B', '#27727B', '#E87C25', '#B5C334',
        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'],
      isLoading: true,
      isTest: !!this.$route.query.isTest,
      moreBtns: [],
      tabs: [],
      rudderBtn: null,
      curTab: 0,
      curComponent: null,
      curRoute: {
        src: 'isTest',
        params: '',
        title: ''
      }
    }
  },
  watch: {
    $route(to, from) {
      if (!this.isActivated) {
        return
      }
      if (to.name === from.name) {
        if (to.query.src !== from.query.src) {
          this.initFn()
        }
      }
    }
  },
  computed: {
    contentClass() {
      if (this.moreBtns.length) {
        return {
          'blur': true
        }
      }
    }
  },
  methods: {
    ...mapMutations(
      {
        updateTheme: 'theme/update'
      }
    ),
    onBtnClick(btn) {
      this.moreBtns = []
      this.$onConfigBtnClick(btn)
    },
    onTabChange(newIndex) {
      this.$util.setStorage(storageKey + this.$route.query.src, newIndex)
      if (newIndex !== this.curTab) {
        this.curTab = newIndex
        this.getRouterViewByTab(this.curTab)
      }
    },
    loadAsyncCom(ayncCom) {
      return new Promise(resolve => ayncCom(resolve))
    },
    findTarget(items, fn) {
      for (var i = 0; i < items.length; i++) {
        if (fn(items[i])) {
          return items[i]
        }
      }
    },
    getRouterView(pre, path, tabInde) {
      let comName = pre + path + tabInde
      if (Coms[comName]) {
        this.curComponent = comName
      } else {
        let curRouter = this.findTarget(this.$router.options.routes, (item) => item.path === '/main')
        let component = this.findTarget(curRouter.children, (item) => item.path === path)
        this.loadAsyncCom(component.component).then(data => {
          Vue.component(comName, Object.assign({
            name: comName
          }, data.default))
          Coms[comName] = true
          setTimeout(() => {
            this.isLoading = false
            this.curComponent = comName
          }, 200)
        })
      }
    },
    getRouterViewByTab(tabInde) {
      let curTabIem = this.tabs[tabInde]
      if (curTabIem) {
        Object.assign(this.curRoute, curTabIem)
        this.getRouterView(this.$route.query.src || 'K', curTabIem.path, tabInde)
      }
    },
    getCacheData() {
      if (tabBarsCache[this.$route.fullPath]) {
        return Promise.resolve(tabBarsCache[this.$route.fullPath])
      } else {
        let { src, params } = this.$extractRouteInfo()
        if (this.$route.params.action === 'farming') {
          src = '/wechat/farmingsrv/home/index'
        }
        let dataPromise = this.isTest ? getTestServer : this.$diyAction
        return this.$promiseWithUi(dataPromise({
          url: src,
          data: params
        })).then(data => {
          tabBarsCache[this.$route.fullPath] = data
          return data
        })
      }
    },
    initFn() {
      this.curTab = this.$route.query.TAB || 0
      this.getCacheData().then(tabs => {
        if (Array.isArray(tabs)) {
          this.tabs = tabs
        } else {
          this.tabs = tabs.tabs
          this.rudderBtn = tabs.rudderBtn
        }
        try {
          let storageTab = this.$util.getStorage(storageKey + this.$route.query.src)
          if (storageTab && this.tabs.length > storageTab) {
            this.curTab = storageTab
            this.getRouterViewByTab(storageTab)
          } else {
            this.getRouterViewByTab(this.curTab)
          }
        } catch (error) {
          this.curTab = 0
          this.getRouterViewByTab(0)
        }
      })
    }
  },
  mounted() {
    this.initFn()
    if (this.$route.query.isDark) {
      this.updateTheme({
        isDark: this.$route.query.isDark === '1'
      })
    }
  },
  deactivated() {
    this.isActivated = false
  },
  activated() {
    this.isActivated = true
  }
}
</script>
<style lang="scss" scoped>
.blur {
  filter: blur(3px);
  opacity: 0.5;
  transform: opacity 0.3;
}
.more-btns {
  &__wrapper {
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 5%;
    transform: all 0.3s;
  }
  &__content {
    flex-wrap: wrap;
    justify-content: space-around;
  }
  &__item {
    margin-top: 24px;
    width: 33.33%;
    text-align: center;
  }
  &__icon {
    width: 56px;
    height: 56px;
    margin: 0 auto;
    font-size: 32px;
    color: #fff;
    background-color: #42bd56;
    border-radius: 50%;
    margin-bottom: 12px;
  }
}
</style>
