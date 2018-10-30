<template>
<section class="xa-view">
    <section class="v-result xa-flex xa-container">
        <p class="panel-title xa-txt-12">发票详情：</p>
        <div class="panel-box">
            <FormRadio class="result-formRadio" v-model="variables.type" label="发票类型" :options="radioOptions"/>
            <FormInput v-model="variables.content" label="发票内容" placeholder="请填写发票内容"/>
            <FormInput v-model="variables.amount" :readonly="true" label="发票金额">
                <span slot="suffix">元</span>
            </FormInput>
            <FormInput v-model="variables.description" label="备注信息" placeholder="如有备注信息，请输入"/>
        </div>
        <p class="panel-title xa-txt-12">发票抬头：</p>
        <div class="panel-box xa-txt-12" style="padding:5px 15px;line-height:1.8;">
            <p class="xa-txt-12" style="line-height:36px;border-bottom:1px solid #e4e4e4;">{{variables.header}}</p>
            <p class="xa-txt-12">税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{variables.taxpayer_no}}</p>
            <p class="xa-txt-12">银行名称：{{variables.bank_name}}</p>
            <p class="xa-txt-12">银行账号：{{variables.bank_account}}</p>
            <p class="xa-txt-12">公司电话：{{variables.company_phone}}</p>
            <p class="xa-txt-12">公司地址：{{variables.company_address}}</p>
        </div>
        <p class="panel-title xa-txt-12">寄送地址：</p>
        <div class="panel-box xa-txt-12" style="padding:5px 15px">
            <p class="xa-txt-12">{{curAddressInfo.name}}({{curAddressInfo.phone}})</p>
            <p class="xa-txt-12">{{curAddressInfo.area_name}}{{curAddressInfo.area_address}}</p>
        </div>
        <p class="panel-title xa-txt-12">开票须知：</p>
        <div class="panel-box" style="padding:5px 15px">
            <div style="border-radius: 5px;font-size: 10px;">1. 公司发票抬头请务必填写完整的公司全称，一经确认提交，<span style="color:red;">不能修改</span>。</div>
            <div style="border-radius: 5px;font-size: 10px;">2. 发票将于<span style="color:red;">20个工作日</span>内开具，与产品分开派送。</div>
            <div style="border-radius: 5px;font-size: 10px;">3. 应国家税务总局要求，自2017年7月1日起，您若开具增值税普通发票，<span style="color:red;">须同时提供企业抬头及税号，</span>否则发票将无法用于企业报销。</div>
            <div style="border-radius: 5px;font-size: 10px;">4. 如需更改收票地址，请联系极飞热线<span style="color:red;">4009803131</span>。</div>
        </div>
    </section>
    <div class="xa-btn xa-btn_alert xa-txt-center" @click="popPanel.isShow=true">提交</div>
    <WeuiConfirm v-if="popPanel.isShow" @close="onSubmit" title="提示消息">
        <div style="text-align:left;padding:8px 15px;color:#666">
            <p>发票抬头：{{variables.header}}</p>
            <p>纳税人识别号：{{variables.taxpayer_no}}</p>
            <p>公司信息：{{variables.company_address}} {{variables.company_phone}}</p>
            <p>银行信息：{{variables.bank_name}} {{variables.bank_account}}</p>
            <p style="margin:12px 0;" class="xa-txt-red xa-txt-12">请您务必仔细核对发票信息，一经提交，无法修改!</p>
        </div>
    </WeuiConfirm>
</section>
</template>
<script>
import baseView from './BaseView.js'
import FormRadio from '@/components/FormRadio.vue'
import FormInput from '@/components/FormInput.vue'
import WeuiConfirm from '@/components/WeuiConfirm.vue'
const radioOptions = [{ value: 0, label: '纸质' }, { value: 1, label: '电子(暂不支持专票)' }]
const singleRadioOptions = [{ value: 0, label: '纸质' }]
function getTest() {
    return Promise.resolve({
        nextUrl: '',
        value: [],
        amount: 100
    })
}
export default {
    extends: baseView,
    components: {
        FormRadio,
        FormInput,
        WeuiConfirm
    },
    props: {
        dataSoure: {
            type: Object
        }
    },
    data() {
        return {
            isSending: false,
            popPanel: {
                isShow: false
            },
            radioOptions,
            curAddressInfo: {},
            variables: {
                address_guid: '',
                type: 0, // 0 纸质 , 1 电子
                billtype: 2, // 发票类型 1：个人 2：公司
                invoice_type: 0, // 公司发票类型 0: 普票 1: 专票
                company_address: '公司地址', // 公司地址
                company_phone: '公司电话', // 公司电话
                bank_name: '开户银行', // 开户银行
                bank_account: '开户账号', // 开户账号
                header: '发票抬头', // 发票抬头
                taxpayer_no: '纳税人识别号', // 纳税人识别号
                content: '', // 发票内容
                amount: '', // 发票金额
                description: '', // 发票备注
                values: []
            },
            submitUrl: ''
        }
    },
    methods: {
        async onSubmit(action) {
            if (this.isSending) {
                return
            }
            console.log('onSubmit')
            this.isSending = true
            this.popPanel.isShow = false
            if (action === 'ok') {
                await this.$promiseWithUi(this.$diyAction({
                    url: this.submitUrl,
                    data: this.variables,
                    method: 'post'
                }))
                this.$showToast('提交成功')
                setTimeout(() => {
                    this.$router.go(-1)
                }, 250)
            }
            this.isSending = false
        },
        async getAppenInfo() {
            const result = await this.baseInitFn(getTest)
            this.variables.amount = result.amount
            this.nextUrl = result.nextUrl
            if (Array.isArray(result.values)) {
                this.variables.values = result.values
            } else {
                this.variables.values.push(result.values)
            }
        }
    },
    activated() {
        const { needBillType } = this.$route.query
        if (parseInt(needBillType) === 0) {
            this.radioOptions = singleRadioOptions
        }
        const result = this.dataSoure.get()
        const curBillHeader = result.billHeader
        this.variables.company_address = curBillHeader.company_address
        this.variables.company_phone = curBillHeader.company_phone
        this.variables.bank_name = curBillHeader.bank_name
        this.variables.bank_account = curBillHeader.bank_account
        this.variables.header = curBillHeader.header
        this.variables.taxpayer_no = curBillHeader.taxpayer_no
        this.curAddressInfo = result.addressList
        this.variables.address_guid = result.addressList.guid
        if (result.orderList) {
            const order = result.orderList
            this.variables.amount = order.amount
            this.variables.values = order.list.map(item => item.value)
            this.submitUrl = order.nextUrl
        }
    },
    beforeMount() {
        let { params, action } = this.$route.query
        if (action === 'appendInfo') {
            params = params ? JSON.parse(params) : {}
            this.variables.content = params.content
            this.getAppenInfo()
        }
    }
}
</script>
<style scoped>
.v-result {
  padding: 0px 15px 10px;
}
/deep/ .result-formRadio .weui-cell {
  padding: 10px 15px;
}
.panel-title {
  line-height: 36px;
  color: #666;
}
.panel-box {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 2px #e0e0e0;
}
</style>
