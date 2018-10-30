<template>
<section class="v-form xa-view" :class="{'xa-default__bg':loading}">
    <div v-show="type==1" @click="onShowDemo" class="xa-txt-red xa-bg-white" style="text-align:center;line-height:44px;height:44px;">一般纳税人资质证明示例</div>
    <div class="page-content xa-flex xa-container" :class="'v-form--'+type">
        <div class="xa-cell item-title xa-bg-f6">
            <span style="padding-left:15px;" class="xa-flex xa-txt-999">发票基本信息</span>
        </div>
        <FormInput label="发票抬头" v-model="variables.header" placeholder="请填写发票抬头"/>
        <FormInput label="发票税号" v-model="variables.taxpayer_no" placeholder="发票税号"/>
        <div class="xa-cell item-title xa-bg-f6">
            <span style="padding-left:15px;" class="xa-flex xa-txt-999">{{type==0?'更多信息':'专票信息(开设专票必填)'}}</span>
            <i v-show="type==0" @click="more=!more" class="iconfont" :class="[more?'icon-xiangxia-copy':'icon-xiangxia']"></i>
        </div>
        <FormInput v-show="more" label="银行名称" v-model="variables.bank_name" placeholder="请填写银行名称"/>
        <FormInput v-show="more" label="银行账号" v-model="variables.bank_account" placeholder="请填写银行账号"/>
        <FormInput v-show="more" label="公司联系方式" v-model="variables.company_phone" placeholder="请填写公司联系方式"/>
        <FormInput v-show="more" label="公司地址" v-model="variables.company_address" placeholder="请填写公司地址"/>
        <div v-if="type==1" class="xa-cell item-title xa-bg-f6">
            <span style="padding-left:15px;" class="xa-flex xa-txt-999">一般纳税人资质证明（非营业执照）</span>
        </div>
        <FormImgs v-if="type==1" label="上传图片" v-model="variables.st_img" max="9"/>
        <label for="weuiAgree" class="weui-agree">
            <input id="weuiAgree" type="checkbox" v-model="variables.default" class="weui-agree__checkbox">
            <span class="xa-txt-333 xa-txt-bold weui-agree__text">设置为默认</span>
        </label>
        <div class="xa-txt-12" style="padding:0 15px;">
            <span data-v-d2b08272="">应国家税务总局要求，自2017年7月1曰 起，您若开具增值税普通发票，
            <span data-v-d2b08272="" style="color: red;">须同时提供企业抬头及税号，</span>否则发票将无法用于企业报销。</span>
        </div>
    </div>
    <AppBtns style="flex-shrink: 0;" :items="[{txt:'提交',type:'submit'}]" @click="onSubmit"/>
</section>
</template>
<script>
import FormInput from '../components/FormInput.vue'
import FormImgs from '../components/FormImgs.vue'
import { getBillInfoList, saveBillInfo } from '@/apis/billInfo.js'
import baseView from './BaseView.js'
const popDemoHtml = `<div style="padding: 0px 10px;">
<h3 style="text-align:center">一般纳税人资质证明示例</h3>
<div ><img  src="http://agri-pub.static.xag.cn//image/v3/yibannashuiren-1.png" style="width: 100%; margin-bottom: 8px;">
<img  src="http://agri-pub.static.xag.cn//image/v3/yibannashuiren-2.png" style="width: 100%;"></div>
</div>`
const popNoticeHtml = `
<p style="line-height: 42px;text-align:center; font-weight: bold;">申请开具增值税专用发票确认书</p>
<div style="text-indent: 2em;padding: 4px 0px; font-size: 10px; text-align: left;">
    根据国家税法及发票管理相关规定，任何单位和个人不得要求他人为自己开具与实际经营业务情况不符的增值税专用发票【包括并不限于
    <br>（1）在没有货物采购或者没有接受应税劳务的情况下要求他人为自己开具增值税专用发票；
    <br>（2）虽有货物采购或者接受应税劳务但要求他人为自己开具数量或金额与实际情况不符的增值税专用发票】，否则属于“虚开增值税专用发票”。
    <br> <br>  我已充分了解上述各项相关国家税法和发票管理规定，并确认仅就我司实际购买商品或服务索取发票。如我司未按国家相关规定申请开具或使用增值税专用发票，由我司自行承担相应法律后果。
</div>
`
export default {
    name: 'billinfoname',
    extends: baseView,
    components: {
        FormInput,
        FormImgs
    },
    data() {
        return {
            loading: false,
            guid: '',
            type: 0,
            more: true,
            variables: {
                'invoice_type': 0,
                'default': false,
                'more': true,
                'guid': '',
                'header': '',
                'taxpayer_no': '',
                'bank_name': '',
                'bank_account': '',
                'company_phone': '',
                'company_address': '',
                'st_img': []
            }
        }
    },
    props: {
        isChild: Boolean,
        pType: [String, Number],
        pGuid: [String, Number]
    },
    methods: {
        onShowDemo() {
            this.$showPopDoc('', popDemoHtml)
        },
        async onSubmit(event) {
            await this.baseAction(saveBillInfo(this.variables))
            if (this.isChild) {
                this.$emit('close')
            } else {
                this.$router.replace('/billInfo/list?t=' + (new Date()).getTime())
            }
        }
    },
    async mounted() {
        this.loading = true
        const { query } = this.$route
        const guid = query.guid || this.pGuid
        const type = query.type || this.pType
        if (guid) {
            let data = await this.baseAction(getBillInfoList(guid))
            data = Array.isArray(data) ? data[0] : data
            this.variables = data
            this.type = this.variables.invoice_type
        }
        if (type || type === 0) {
            this.type = this.variables.invoice_type = parseInt(type)
        }
        this.type === 1 && this.$showPopDoc('', popNoticeHtml)
        this.loading = false
    }
}
</script>
<style lang="scss" scoped>
.v-form.xa-default__bg > div {
  opacity: 0;
}
.item-title {
  line-height: 44px;
}
</style>
