<template>
<section class="v-device xa-view xa-bg-white" v-show="!isLoading">
    <DeviceInfo :avatar="device.avatar" :title="device.title" :sn="'SN:'+device.sn" />
    <section class="xa-flex xa-container" style="padding:15px">
        <div class="card-wrap"
            v-for="card in cards"
            :key="card.key"
            :class="{'active':card.active}"
            :style="{'background':card.active&&card.color}">
            <p class="card-title" >{{card.title}}</p>
            <p class="card-msg">
                <i v-if="card.active" class="xa-txt-20 iconfont icon-zhengque"></i>
                {{card.msg}}
            </p>
            <p class="card-tip">{{card.tip}}</p>
        </div>
    </section>
    <div class="device-btns">
        <transition-group name="flip-list">
            <AppBtnsItem v-for="(btn,index) in submitBtn" :key="index" @click.native="onBtnClick(btn)" :item="btn"></AppBtnsItem>
        </transition-group>
    </div>
    <template v-if="PopSafeguard.hasInit">
        <PopSafeguard v-show="PopSafeguard.isShow" @toScan="toScanCard()" @toBuy="toBugSafeguard" :buyUrl="api.SafeguardBuy" :docUrl="api.SafeguardDoc" @close="PopSafeguard.isShow=false" />
    </template>
     <template v-if="PopAskAgress.hasInit">
        <PopAskAgress v-show="PopAskAgress.isShow" label="确定不参与无忧计划" :resolve="PopAskAgress.resolve" @close="PopAskAgress.isShow=false">
            <div style="padding:15px;">
                <p>
                    你的设备还未购买无忧计划。激活后如果想购买无忧计划，请先携带设备前往极飞保障点进行检测后方可购买！
                </p>
                <p>如不进行购买，请再次勾选确认：</p>
            </div>
        </PopAskAgress>
     </template>
</section>
</template>
<script>
import BaseView from './BaseView'
import DeviceInfo from '@/components/DeviceInfo.vue'
import PopSafeguard from '@/components/PopSafeguard.vue'
import PopAskAgress from '@/components/PopAskAgress.vue'
import AppBtnsItem from '@/components/AppBtnsItem.vue'
const submitBtns = [
    { txt: '去使用无忧计划', icon: 'icon-youjiantou1', action: 'Safeguard', ajax: { api: '' } },
    { txt: '扫描激活卡二维码', icon: 'icon-saomiao', action: 'ScanCard', ajax: { api: '' } },
    { txt: '激活设备', type: 'submit', action: 'Active', ajax: { api: '' } }
]
function getTestServer(action) {
    return (params) => import('@/config/DeviceActive.js').then((_) => _[action](params))
}
export default {
    name: 'DeviceActive',
    extends: BaseView,
    components: {
        AppBtnsItem,
        DeviceInfo,
        PopAskAgress,
        PopSafeguard
    },
    data() {
        return {
            isLoading: false,
            device: {
                avatar: '',
                title: '',
                sn: '',
                hasSafeguard: true
            },
            cards: [
                {
                    key: 'active',
                    title: '设备激活卡',
                    msg: '扫描激卡活二维码',
                    tip: '用于激活设备,激活后将绑定设备激活者',
                    color: '#42bd56',
                    active: false
                }, {
                    key: 'safeguard',
                    title: '无忧计划卡',
                    msg: '扫描激活卡二维码',
                    tip: '有偿零部件更换服务 + 物超所值的保障金额',
                    color: '#f9a72d',
                    active: false
                }
            ],
            sn: {
                active: '',
                safeguard: ''
            },
            api: {
                ScanCard: 'isTest',
                Active: 'isTest',
                SafeguardBuy: 'isTest',
                SafeguardDoc: 'isTest'
            },
            PopSafeguard: {
                hasInit: false,
                isShow: false
            },
            PopAskAgress: {
                hasInit: false,
                isShow: false,
                resolve: null
            }
        }
    },
    computed: {
        submitBtn() {
            let btnKey = []
            if (!this.sn.active && !this.sn.safeguard) {
                btnKey = ['ScanCard']
            } else if (this.sn.active && !this.sn.safeguard && !this.device.hasSafeguard) {
                btnKey = ['Active']
            } else if (this.sn.active && !this.sn.safeguard) {
                btnKey = ['Safeguard', 'Active']
            } else if (this.sn.active && this.sn.safeguard) {
                btnKey = ['Active']
            }
            return btnKey.map(key => submitBtns.find(btn => btn.action === key))
        }
    },
    methods: {
        onBtnClick(cfg) {
            switch (cfg.action) {
                case 'ScanCard':
                    this.toScanCard(cfg)
                    break
                case 'Active':
                    this.toActive(cfg)
                    break
                case 'Safeguard':
                    this.toSafeguard(cfg)
                    break
            }
        },
        async toScanCard(cfg) {
            let type = ''
            if (!cfg) {
                this.PopSafeguard.isShow = false
                type = 'safeguard'
            }
            let result
            if (!this.$isWexin) {
                let input = await this.$showConfirm((cfg && cfg.txt && cfg.txt.replace('扫描', '输入')) || '请输入', {
                    key: 'sn',
                    placeholder: '请输入激活码',
                    required: true
                })
                if (input.action !== 'ok') {
                    return
                }
                result = input.value.sn
            } else {
                result = await this.$wxAction.toOpenScan()
            }
            let request = this.isTest ? getTestServer('scanCard') : this.$diyAction
            this.$promiseWithUi(request({
                url: this.api.ScanCard,
                data: {
                    sn: this.device.sn,
                    qrsn: result,
                    type
                },
                method: 'post'
            })).then(this.handlerResult)
        },
        handlerResult(result, cards = ['active', 'safeguard']) {
            cards = cards || Object.keys(result)
            cards.forEach(card => {
                this.sn[card] = result[card].sn || this.sn[card]
                let targetCard = this.cards.find(item => item.key === card)
                if (targetCard) {
                    let { title, msg, tip } = result[card]
                    Object.assign(targetCard, {
                        title: title || targetCard.title,
                        msg: msg || targetCard.msg,
                        tip: tip || targetCard.tip,
                        active: !!this.sn[card]
                    })
                }
            })
        },
        toActive: async function () {
            if (!this.sn.safeguard && this.device.hasSafeguard) {
                await this.toShowAgress()
            }
            let request = this.isTest ? getTestServer('activeDevice') : this.$diyAction
            let params = {
                sn: this.device.sn,
                active: this.sn.active,
                safeguard: this.sn.safeguard
            }
            this.$promiseWithUi(request({
                url: this.api.Active,
                data: params,
                method: 'post'
            })).then(({ href }) => this.$gotoHref(href))
        },
        toSafeguard: async function () {
            this.PopSafeguard.hasInit = this.PopSafeguard.isShow = true
        },
        toShowAgress() {
            this.PopAskAgress.hasInit = this.PopAskAgress.isShow = true
            return new Promise(resolve => (this.PopAskAgress.resolve = resolve))
        },
        toBugSafeguard() {
            this.$gotoHref(this.api.SafeguardBuy + this.sn.active)
        },
        initFn() {
            this.isLoading = true
            return this.baseInitFn(getTestServer('getInitData')).then(result => {
                this.isLoading = false
                Object.assign(this.device, result.device)
                if (result.device.hasSafeguard === false) {
                    this.cards = this.cards.slice(0, 1)
                }
                Object.assign(this.api, result.api)
                this.$nextTick(function () {
                    this.handlerResult(result)
                })
            })
        }
    },
    created() {
        this.initFn()
    }
}
</script>
<style lang="scss" scoped>
.card {
  &-wrap {
    position: relative;
    padding-top: 20px;
    height: 90px;
    text-align: center;
    background-color: rgb(234, 234, 234);
    border-radius: 5px;
    transition: all 0.3s;
  }
  &-title {
    position: absolute;
    padding: 0 0.5em;
    top: 0;
    left: 0;
    background-color: #c7c7c7;
    color: #fff;
    font-size: 13px;
    line-height: 20px;
    border-radius: 5px 0 5px 0;
  }
  &-msg {
    color: rgba(102, 102, 102, 0.8);
    line-height: 64px;
    height: 64px;
    .iconfont {
      position: relative;
      top: 2px;
    }
  }
  &-tip {
    color: #ccc;
    font-size: 13px;
  }
}
.card-wrap.active {
  background-color: #42bd56;
  & .card-title {
    background-color: rgba(0, 0, 0, 0.3);
  }
  & .card-msg {
    color: #fff;
  }
  & .card-tip {
    color: rgba(255, 255, 255, 0.7);
  }
}
.card-wrap + .card-wrap {
  box-shadow: 0px -6px 4px rgba(0, 0, 0, 0.39);
}
</style>
<style>
.v-device .device-btns {
  background-color: #f2f3f7;
  padding: 15px;
}
.v-device .device-btns .weui-flex {
  display: block;
  background-color: transparent;
}
.v-device .device-btns .xa-btn {
  box-sizing: border-box;
  margin: 8px 0;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  color: #fff;
  line-height: 36px;
  text-align: center;
  border: 2px solid #42bd46;
}
.v-device .device-btns .xa-btn_undefined {
  background-color: #fff;
  color: #42bd46;
}
</style>
