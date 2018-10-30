<template>
<section class="xa-view">
    <section ref="header" class="xa-view xa-container">
         <header>
             <DetailComFactory v-if="config.header.length" :initCfg="config.header"></DetailComFactory>
             <div v-fixedTop v-if="config.tabs.length>1" class="xa-line__bottom main-Device__tabs xa-bg-white" style="padding:0 2em">
                <AppTab :items="config.tabs" :value="variables.tabValue" @input="getRouterViewByTab" theme="simple"/>
            </div>
         </header>
         <section class="main-Device__container xa-line__top">
            <keep-alive>
                <component :is="curComponent" :curRoute="curRoute" child="true" />
            </keep-alive>
         </section>
    </section>
    <AppBtns v-if="config.footer&&config.footer.length" class="xa-flex--shrink xa-line__top" @click="onBaseBottomBtnClick" :items="config.footer"/>
</section>
</template>
<script>
import BaseView from './BaseView'
import BaseMain from './BaseMain'
import DeviceListItem from '@/components/DeviceListItem'
import fixedTop from '@/directives/fixedTop'
let { methods } = BaseView
function getTestServer(params) {
    return import('@/config/MainDevice.js').then(({ getInitData }) => getInitData(params))
}
export default {
    name: 'MainDevice',
    extends: BaseMain,
    components: {
        DeviceListItem
    },
    watch: {
        $route(to, from) {
            if (to.name === from.name) {
                if (to.query.guid !== from.query.guid || to.query.src !== from.query.src || to.query.params !== from.query.params) {
                    this.initFn()
                }
            }
        }
    },
    data() {
        return {
            isTest: !!this.$route.query.isTest,
            location: !!this.$route.query.location,
            isLoading: false,
            curRoute: {},
            variables: {
                tabValue: 0
            },
            config: {
                header: [],
                tabs: [],
                footer: []
            }
        }
    },
    methods: {
        getRouterViewByTab(tabInde) {
            this.variables.tabValue = tabInde
            let curTabIem = this.config.tabs[tabInde]
            if (curTabIem) {
                Object.assign(this.curRoute, curTabIem)
                let preName = this.$route.query.src || 'K'
                let comName = preName + curTabIem.path + tabInde + this.$route.query.guid
                console.log('comName', comName)
                this.getRouterView(preName, curTabIem.path, comName)
            }
        },
        onBaseBottomBtnClick(btnCfg, event, refreshFn) {
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data) {
                    refreshFn ? refreshFn() : (this.initFn && this.initFn())
                } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                    this.$showPopBtnsBottom(btnCfg.items, event.target).then(btnCfg => this.onBtnClick(btnCfg, event))
                }
            })
        },
        ...methods,
        initFn() {
            let { src, params } = this.$extractRouteInfo()
            params.guid = params.guid || this.$route.query.guid
            return this.baseRequest({ src, params }, getTestServer)
                .then(data => {
                    if (data.header) {
                        data.header.forEach(item => {
                            item.type = item.type || 'DeviceListItem'
                        })
                    }
                    Object.assign(this.$data.config, {
                        header: [],
                        tabs: [],
                        footer: []
                    }, data)
                    this.isLoading = false
                    this.getRouterViewByTab(0)
                })
        }
    },
    mounted() {
        this.initFn()
    },
    directives: {
        fixedTop
    }
}
</script>
<style lang="scss">
.main-Device__tabs {
  z-index: 9999;
}
.main-Device__container {
  position: relative;
  & .statistice-date-picker__wrap {
    position: initial !important;
  }
  & .date-pick__wrapper {
    position: absolute !important;
  }
  & .weui-mask {
    position: absolute;
  }
  & section {
    height: initial;
  }
  & section.xa-flex.xa-container {
    flex: auto;
    overflow-y: auto;
  }
  & section.xa-view {
    display: block;
  }
}
</style>
