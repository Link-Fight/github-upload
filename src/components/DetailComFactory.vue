<template>
  <transition-group name="detail-list" tag="div">
      <div v-for="(item,index) in coms" :key="index"  v-show="!item.show||comShow(item.show,variables)">
        <div v-if="item.type==='title'" class="detail-com__title xa-txt-14" v-html="item.title" ></div>
        <AppEmpty v-else-if="item.type==='empty'" :icon="item.icon" :txt="item.txt" />
        <div v-else-if="item.type==='tab'" v-fixedTop="tabComs.length===1" ><AppTab :items="item.items"  @input="onTabChange(item,arguments[0])" :value="item.value" class="xa-line"></AppTab></div>
        <AppTable v-else-if="item.type==='table'" :title="item.title" :items="item.items" class="xa-com__space"/>
        <AppImages v-else-if="item.type==='images'" :title="item.title" :subTitle="item.subTitle" :imgs="item.items" :autoPlay="item.autoPlay"/>
        <Chart v-else-if="item.type==='Chart'" :config="item.config" :title="item.title" class="xa-com__space"/>
        <DataShow v-else-if="item.type==='dataShow'" :component="item" class="xa-com__space"/>
        <DeviceListItem v-else-if="item.type==='DeviceListItem'" :config="item" class="xa-line xa-com__space"/>
        <FarmingInfo v-else-if="item.type==='FarmingInfo'" @click.native="handleBtnClick(item)" :config="item" class="xa-line xa-com__space" />
        <FormScore v-else-if="item.type==='score'" :disabled="true" :value="item.value" :label="item.title" class="xa-line xa-com__space" />
        <LinkCellForTxt v-else-if="item.type==='LinkCellForTxt'" :title="item.title" :content="item.content" class="xa-com__space"/>
        <LinkCell @click.native="onLinkCellClick(item)" @btnClick="onBtnClick(arguments[0],item,index)" v-else-if="item.type==='LinkCell'" :icon="item.icon" :btns="item.btns" :color="item.color" :title="item.title" :subTitle="item.subTitle" :value="item.value" :href="item.href"  :access="item.access" :phone="item.phone" class="xa-com__space"/>
        <LinkCellGroup @btnClick="onBtnClick(arguments[0],item,index)" @itemClick="onLinkCellClick" v-else-if="item.type==='LinkCellGroup'" :theme="item.theme" :tips="item.tips" :title="item.title" :icon="item.icon" :flod="item.flod" :items="item.items" class="xa-com__space"/>
        <LinkCellForImg @click.native="onLinkCellClick(item)" @btnClick="onBtnClick(arguments[0],item,index)" v-else-if="item.type==='LinkCellForImg'" :img="item.img" :btns="item.btns" :title="item.title" :subTitle="item.subTitle" :value="item.value" :href="item.href" :phone="item.phone" class="xa-com__space" />
        <LinkCellForImgGroup @btnClick="onBtnClick(arguments[0],item,index)" @itemClick="onLinkCellClick" v-else-if="item.type==='LinkCellForImgGroup'" :title="item.title" :flod="item.flod" :items="item.items" class="xa-com__space"/>
        <LinkImgInfo  @click.native="handleBtnClick(item)" v-else-if="item.type==='LinkImgInfo'" :title="item.title" :imgs="item.imgs" :href="item.href"  class="xa-com__space xa-bg-white" />
        <InfoListItem v-else-if="item.type==='InfoListItem'" :title="item.title" :items="item.items" class="xa-com__space"/>
        <GeoImg v-else-if="item.type==='GeoImg'" :value="item.config" />
        <LocInfo v-else-if="item.type==='LocInfo'" :cfg="item.config"/>
        <StatisticeCells v-else-if="item.type==='StatisticeCells'" :title="item.title" :theme="item.theme" :items="item.items" class="xa-com__space"/>
        <div v-else-if="item.type=='more'" @click="onLoadMore(item)"  class="xa-btn xa-txt-center xa-txt-green">{{item.title}}</div>
        <WeuiLoadMore v-else-if="item.type=='loading'" class="xa-com__space"></WeuiLoadMore>
      </div>
  </transition-group>
</template>
<script>
import InfoListItem from '@/components/InfoListItem.vue'
import Chart from '@/components/Chart.vue'
import AppTable from '@/components/AppTable.vue'
import AppImages from '@/components/AppImages.vue'
import DataShow from '@/components/DataShow.vue'
import DeviceListItem from '@/components/DeviceListItem'
import FarmingInfo from '@/components/FarmingInfo.vue'
import FormScore from '@/components/FormScore.vue'
import LinkImgInfo from '@/components/LinkImgInfo.vue'
import LocInfo from '@/components/LocInfo.vue'
import fixedTop from '@/directives/fixedTop'
function getTestServer(action) {
    return (params) => import('@/config/DetailComFactory.js').then((_) => _[action](params))
}
export default {
    name: 'DetailComFactory',
    components: {
        AppImages,
        AppTable,
        Chart,
        DataShow,
        DeviceListItem,
        FarmingInfo,
        FormScore,
        InfoListItem,
        LinkImgInfo,
        LocInfo
    },
    data() {
        return {
            coms: [],
            variables: {}
        }
    },
    computed: {
        tabComs() {
            return this.coms.filter(com => com.type === 'tab')
        }
    },
    props: {
        cacheKey: String,
        initCfg: {
            type: Array
        },
        watch: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        initCfg(newVal) {
            if (this.watch) {
                this.coms = newVal
            }
        }
    },
    methods: {
        comShow(showRule, variables) {
            let showVal = variables[showRule.key]
            return showVal === showRule.value
        },
        onLinkCellClick(event) {
            if (event.action) {
                return this.handleBtnClick(event)
            }
        },
        onBtnClick({ btn, event }, com) {
            this.handleBtnClick(btn, event, com)
        },
        handleBtnClick(btnCfg, event, com) {
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data) {
                    if (btnCfg.action === 'FORM') {
                        Object.assign(btnCfg, data)
                        return
                    }
                    this.$emit('refresh')
                } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                    let rect = event.target.getBoundingClientRect()
                    let top = rect['top'] + rect['height'] + 4
                    let right = document.body.clientWidth - rect['width'] * 1.5 - rect['left']
                    this.$showPopBtns(btnCfg.items, {
                        top: top + 'px',
                        right: right + 'px'
                    }, rect['width'] - 6).then(btnCfg => {
                        this.handleBtnClick(btnCfg, event, com)
                    })
                }
            })
        },
        onLoadMore(item) {
            item.type = 'loading'
            let promise = item.url === 'isTest' ? getTestServer('getMoreData') : this.$diyAction
            this.$promiseWithUi(promise({ url: item.url }), { toast: false }).then(body => {
                if (body.length === 0) {
                    item.type = 'txt'
                } else {
                    item.type = item.type + '_'
                    let index = this.coms.indexOf(item)
                    this.$nextTick(function () {
                        this.coms.splice(index, 0, ...body)
                    })
                }
            })
        },
        onTabChange(tabCfg, value) {
            tabCfg.value = value
            let tabItem = tabCfg.items[value]
            if (tabItem instanceof Object) {
                this.variables[tabCfg.variable] = tabItem.key || tabItem.title
                if (!tabItem.loaded && tabItem.src) {
                    this.loadingTabData(tabItem, tabCfg.variable, this.variables[tabCfg.variable])
                }
            } else {
                this.variables[tabCfg.variable] = tabItem
            }
        },
        loadingTabData(tabItem, key, value) {
            tabItem.loaded = true
            tabItem.params.bodyonly = true
            let promise = tabItem.src === 'isTest' ? getTestServer('getAjaxTab') : this.$diyAction
            this.$promiseWithUi(promise({
                url: tabItem.src,
                data: tabItem.params
            })).then(body => {
                body.forEach(item => {
                    item.show = item.show || {
                        key, value
                    }
                })
                this.coms.push(...body)
            })
        }
    },
    // todo: 仅仅为了实现功能的代码
    created() {
        let cacheVariables = null
        if (this.cacheKey) {
            try {
                cacheVariables = this.$util.getSessionStorage(this.cacheKey)
            } catch (error) {
                console.log(error)
            }
        }
        let variables = {}
        if (this.initCfg) {
            let coms = JSON.parse(JSON.stringify(this.initCfg))
            coms.forEach(item => {
                if (item.type === 'tab') {
                    variables[item.variable] = item.items[0].key || item.items[0].title || item.items[0]
                    item.value = 0
                    if (cacheVariables && cacheVariables[item.variable]) {
                        for (var i = 0; i < item.items.length; i++) {
                            let curItem = item.items[i]
                            if (cacheVariables[item.variable] === curItem || cacheVariables[item.variable] === curItem.key || cacheVariables[item.variable] === curItem.title) {
                                this.$nextTick(function () {
                                    this.onTabChange(item, i)
                                })
                                break
                            }
                        }
                    }
                }
            })
            this.coms = coms
        }
        this.variables = variables
        this.cacheKey && this.$watch('variables',
            (val) => {
                this.$util.setSessionStorage(this.cacheKey, val)
            }, {
                deep: true
            })
    },
    directives: {
        fixedTop
    }
}
</script>
<style lang="scss" scoped>
.detail-com__title {
  padding: 0 15px;
  margin: 8px 0;
  color: #bcbcbc;
  line-height: 16px;
}
.detail-list-enter-active {
  transition: all 0.3s ease-in-out;
}
.detail-list-enter {
  opacity: 0;
  transform: translateY(10%);
}
</style>
