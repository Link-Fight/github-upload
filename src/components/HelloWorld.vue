<template>
<section class="xa-view">
    <!-- <fileUpload/> -->
    <!-- <FormImgs/> -->
    <!-- <img v-if="url" style="display:block;width:350px;height:150px;margin:0 auto;" :src="url" alt=""> -->
    <div class="xa-cell xa-bg-white">
        <router-link v-show="!this.isHome" to="/"><span class="xa-txt-green" style="padding:0 8px;"><i class="iconfont icon-dingdanguanli"></i>目录</span></router-link>
        <SearchBar class="xa-flex" v-if="curMsgs.length" v-model="searchVal" placeholder="搜索点啥"/>
    </div>
    <section class="xa-flex xa-container">
    <!-- <AppTab v-if="curMsgs.length" :items="tab.items" :value="tab.value" @input="onTabChange" class="xa-line__top"/> -->
        <DetailComFactory :watch="true" :initCfg="disPlays"/>
    </section>
</section>
</template>
<script>
import { wgs84ToGcj02 } from '@/controllers/geo'
import fileUpload from '@/components/fileUpload/index.vue'
import FormImgs from '../components/FormImgs.vue'
import catalog from '@/catalogJson/catalog.json'
import device from '@/catalogJson/device.json'
import diyDetail from '@/catalogJson/diyDetail.json'
import diyForm from '@/catalogJson/diyForm.json'
import diyList from '@/catalogJson/diyList.json'
import other from '@/catalogJson/other.json'
import ensure from '@/catalogJson/ensure.json'
import bill from '@/catalogJson/bill.json'
let isShow = true
const routerMap = {
    'catalog': catalog,
    'device': device,
    'diyDetail': diyDetail,
    'diyForm': diyForm,
    'diyList': diyList,
    bill,
    'ensure': ensure,
    'other': other
}
console.log(routerMap['catalog'])
export default {
    name: 'HelloWorld',
    components: {
        fileUpload,
        FormImgs
    },
    data() {
        return {
            isHome: false,
            showLogin: false,
            loginCode: '',
            url: '',
            searchVal: this.$route.query.key || '',
            tab: {
                items: ['其它', '表单', '详情', '列表', '设备'],
                value: parseInt(this.$route.query.Tab || 0),
                tabMap: {
                    0: 'orderMsgs',
                    1: 'diyFormMsgs',
                    2: 'diyDetailMsgs',
                    3: 'diyListMsgs',
                    4: 'deviceModule'
                }
            },
            curMsgs: []
        }
    },
    watch: {
        $route() {
            this.getCurCfg()
        }
    },
    computed: {
        disPlays() {
            if (this.searchVal) {
                let result = []
                Object.keys(routerMap).forEach(key => {
                    result = result.concat(routerMap[key].filter(item => {
                        return JSON.stringify(item).indexOf(this.searchVal) > -1
                    }))
                })
                return result
            } else {
                return this.curMsgs
            }
        }
    },
    methods: {
        getCurCfg() {
            let { query } = this.$route
            let queryKeys = Object.keys(query)
            if (queryKeys.length === 0) {
                this.curMsgs = routerMap['catalog']
                this.isHome = true
            } else {
                this.curMsgs = routerMap[queryKeys[0]]
                this.isHome = false
            }
            this.searchVal = ''
        },
        getMapURL(pos) {
            var latitude = pos.latitude
            var longitude = pos.longitude
            var accuracy = pos.accuracy
            var zoomlevel = 10
            if (accuracy > 80) {
                zoomlevel -= Math.round(Math.log(accuracy / 50) / Math.LN2)
            }
            if (zoomlevel > 16) {
                zoomlevel = 16
            }
            var latlng = wgs84ToGcj02({ lat: latitude, lng: longitude })
            latitude = latlng.lat
            longitude = latlng.lng
            var url = `http://restapi.amap.com/v3/staticmap?location=${longitude},${latitude}&zoom=${14}&size=750*300&markers=mid,,A:${longitude},${latitude}&key=06931c736797e74f9af6e87e307d8b96`
            this.url = url
        },
        async authentication() {
            const CODE = 'XAG'
            this.showLogin = isShow
            let defaultCode = this.$util.getStorage('HELLOWORLD_LOGIN_CODE') || ''
            if (this.showLogin) {
                let result = await this.$showConfirm(
                    '欢迎！Boy!',
                    { key: 'code', placeholder: '输入口令', required: true, value: defaultCode },
                    {
                        txt: '返回吧'
                    },
                    {
                        txt: '下一步'
                    }
                )
                if (result.action === 'ok' && result.value.code === CODE) {
                    isShow = false
                    this.$util.setStorage('HELLOWORLD_LOGIN_CODE', CODE)
                } else {
                    throw new Error('No Login')
                }
            }
        }
    },
    async mounted() {
        // this.$getLocation().then(this.getMapURL)
        await this.authentication()
        this.getCurCfg()
    }
}
</script>
