<template>
<section class="xa-view" v-show="!isLoading">
    <FormDropdown v-if="action=='godownEntry'" class="xa-com__space" v-model="godownEntry.type" label="物料仓型" :options="[{value: 2,label: '周转品仓'}, {value: 3,label: '不良品仓'}]"/>
    <LinkCell v-else-if="config.header" class="xa-com__space" :title="config.header.title" :href="config.header.href" />
    <section class="xa-flex xa-view xa-container">
        <FormCell class="xa-line__bottom" :label="mode==='edit'?'选择物料':'已选择的'">
            <div v-if="mode==='edit'" class="xa-txt-right"><span @click="onSelect" class="add-btn xa-txt-white xa-bg-green">添加+</span></div>
        </FormCell>
        <div class="selection-wrap xa-bg-white xa-flex xa-container">
            <div v-for="(item,index) in value" :key="item._value||item.value" class="xa-line__bottom">
                <EnsureDisplayItem :mode="mode" :item="item" @delete="onDelete(index,item)" @update="onEdit(item)"/>
                <AppTip @close="onEdit(item)" :key="index" v-if="item.num===0&&item.sn" tip="请录入设备序列号" />
            </div>
        </div>
    </section>
    <footer class="xa-bg-white xa-line__top xa-cell xa-txt-center">
        <div class="foot-tips weui-flex__item xa-btn xa-btn_cancel xa-txt-12"  :class="{'xa-isloading':getAsyncDataing}" v-html="totalTip"></div>
        <AppBtns v-if="config.subBtns&&config.subBtns.length>0" :class="{'disable':asyncBtnDisable}" :items="config.subBtns" @click="onBtnClick" :itemStyle="{'padding':'0 1em'}"/>
    </footer>
    <PopEnsureForm v-if="ensureForm.isShow" :config="ensureForm.config" :formType="ensureForm.formType" :checkInputApi="ensureForm.checkInputApi" :value="ensureForm.variables" @close="ensureForm.isShow=false" @submit="onEnsureFormSubmit"/>
</section>
</template>
<script>
import baseView from './BaseView.js'
import PopEnsureForm from '@/components/PopEnsureForm.vue'
import FormDropdown from '@/components/FormDropdown.vue'
import EnsureDisplayItem from '@/components/EnsureDisplayItem.vue'
function getPopFormType(action, type) {
    if (action === 'godownEntry') {
        return {
            1: 13,
            2: 23
        }[type] || type
    }
    return type
}
function getTestServer(action) {
    return params => import('@/config/ViewEnsureForm.js').then((_) => _[action](params))
}
export default {
    name: 'EnsureForm',
    extends: baseView,
    lastAsyncTimeStamp: -1,
    components: {
        EnsureDisplayItem,
        PopEnsureForm,
        FormDropdown
    },
    data() {
        return {
            action: '', // godownEntry godownOut
            godownEntry: {
                type: 3
            },
            isLoading: false,
            mode: 'edit',
            config: {
                header: {
                    title: '',
                    href: ''
                },
                popSelectApi: {},
                checkInputApi: {},
                checkSelectChangeApi: {
                    default: '',
                    params: {},
                    url: ''
                },
                subBtns: []
            },
            PopSelect: {
                hasInit: false
            },
            value: [],
            valueLen: 0,
            valueTotal: 0,
            ensureForm: {
                isShow: false,
                variables: {},
                config: {},
                formType: 1,
                checkInputApi: {},
                promise: null
            },
            needAsyncTotal: false,
            asyncTotalTip: '',
            getAsyncDataing: false,
            asyncBtnDisable: false, // 按钮无效
            popSelectCacheId: 'EnsurePopSelect',
            hasPopSelectShow: false
        }
    },
    computed: {
        totalTip() {
            let tip = this.asyncTotalTip || `选择了 ${this.valueLen} 种物料，共 ${this.valueTotal} 件物料`
            tip = tip.replace(/[\d.]+/g, function (num) {
                return `<span class="xa-txt-green">${num}</span>`
            })
            return this.getAsyncDataing ? '' : tip
        }
    },
    methods: {
        async onSelect() {
            let api = this.config.popSelectApi
            this.hasPopSelectShow = true
            let data = await this.$showPopSelect(api.url, api.params, this.value, this.action === 'godownEntry' ? 'checkbox' : 'radio', 'large', this.popSelectCacheId)
            data = data.filter(item => !this.value.find(val => val.value === item.value))
            if (data.length) {
                if (this.action === 'godownEntry') {
                    data.forEach(d => {
                        if (d.formType === 1) {
                            d.num = 1
                        } else {
                            d.num = 0
                            d.sn = []
                        }
                    })
                    this.value = this.value.concat(data)
                } else {
                    let curEditItem = data[0]
                    let addData = await this.showEnsureForm(curEditItem, { max: curEditItem.MAX || 0 })
                    this.value.push(Object.assign(curEditItem, addData))
                }
                this.onValueUpdate()
            }
        },
        showEnsureForm(variables, config = {}) {
            return new Promise((resolve, reject) => {
                this.ensureForm.isShow = true
                this.ensureForm.formType = getPopFormType(this.action, variables.formType)
                this.ensureForm.variables = variables
                this.ensureForm.config = config
                this.ensureForm.promise = resolve
            })
        },
        onEnsureFormSubmit(value) {
            this.ensureForm.promise(value)
        },
        async onEdit(item) {
            let data = await this.showEnsureForm(item, { max: item.MAX || 0 })
            let oldIndex = this.value.indexOf(item)
            let newItem = Object.assign(item, data)
            newItem._value = (new Date()).getTime()
            this.value.splice(oldIndex, 1, newItem)
            this.onValueUpdate()
        },
        async onDelete(index, item) {
            let { action } = await this.$showConfirm(item.title, '确定要移除？')
            if (action === 'ok') {
                this.value.splice(index, 1)
                this.onValueUpdate()
            }
        },
        onValueUpdate() {
            this.$nextTick(function () {
                if (this.needAsyncTotal) {
                    this.onValueAsyncUpdate()
                } else {
                    let len = this.value.length
                    let total = 0
                    this.value.forEach(val => {
                        if (val.num) {
                            total += val.num
                        }
                        if (val.sn && val.sn.length > 0) {
                            total += val.sn.length
                        }
                    })
                    this.valueLen = len
                    this.valueTotal = total
                }
            })
        },
        async onValueAsyncUpdate() {
            this.getAsyncDataing = true
            let asyncTime = Date.now()
            this.$options.lastAsyncTimeStamp = asyncTime
            let value = this.getSubmitValue()
            let promise = this.isTest ? getTestServer('asyncUpdate') : this.$diyAction
            let result = await promise({
                url: this.config.checkSelectChangeApi.url,
                data: {
                    ...this.config.checkSelectChangeApi.params,
                    value
                }
            })
            if (asyncTime === this.$options.lastAsyncTimeStamp) {
                if (result instanceof Object) {
                    let { tip, btns, disable } = result
                    this.asyncTotalTip = tip
                    this.config.btns = btns || this.config.btns
                    this.asyncBtnDisable = disable === undefined ? this.asyncBtnDisable : disable
                } else {
                    this.asyncTotalTip = result
                }
                this.getAsyncDataing = false
            }
        },
        getSubmitValue() {
            return this.value.map(val => ({
                value: val.value,
                num: val.num,
                imgs: val.imgs,
                sn: val.sn
            }))
        },
        async onBtnClick(btnCfg, event) {
            if (this.asyncBtnDisable || this.getAsyncDataing) {
                return
            }
            if (btnCfg.ajax && btnCfg.ajax.params) {
                let ajax = btnCfg.ajax
                let value = this.getSubmitValue()
                ajax._oldParamsStr = ajax.params ? JSON.stringify(ajax.params) : ''
                ajax.params = Object.assign(ajax.params || {}, { value })
                if (this.action === 'godownEntry' || this.action === 'godownOut') {
                    Object.assign(ajax.params, this.godownEntry)
                    if (this.action === 'godownOut') {
                        if (!value || value.length === 0) {
                            return this.$showToast('请先添加物料')
                        } else {
                            if (btnCfg.action === 'FORM' && !ajax.cacheKey) {
                                ajax.cacheKey = ajax.api + ajax._oldParamsStr
                            }
                        }
                    }
                }
            }
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data) {
                    this.$showToast('操作成功')
                    if (data.href) {
                        this.$gotoHref(data.href, {
                            replace: true
                        })
                    } else {
                        this.initFn()
                    }
                } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                    this.$showPopBtnsBottom(btnCfg.items, event.target).then(btnCfg => this.onBtnClick(btnCfg, event))
                }
            })
        },
        async initFn() {
            this.action = this.$route.params.action || ''
            this.isLoading = true
            let data = await this.baseInitFn(getTestServer('getInitData'))
            this.isLoading = false
            Object.assign(this, data)
            let config = data.config
            this.ensureForm.checkInputApi = config.checkInputApi
            if (config.checkSelectChangeApi && config.checkSelectChangeApi.url) {
                this.needAsyncTotal = true
                this.asyncTotalTip = config.checkSelectChangeApi.default || ''
                Object.assign(this.config.checkSelectChangeApi, config.checkSelectChangeApi)
            }
            this.onValueUpdate()
        }
    },
    beforeDestroy() {
        this.hasPopSelectShow && this.$showPopSelect(this.popSelectCacheId)
    },
    created() {
        this.initFn()
    }
}
</script>
<style lang="scss" scoped>
.selection-wrap {
  padding: 8px 15px;
}
.add-btn {
  display: inline-block;
  border: 1px solid;
  padding: 0 8px;
  border-radius: 12px;
}
.foot-tips {
  line-height: 20px;
  word-wrap: break-all;
}
/deep/ .disable .xa-btn {
  background-color: #999;
}
</style>
