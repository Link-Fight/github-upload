<template>
<section class="v-form" :class="{'xa-default__bg':loading}">
    <div v-show="!loading" class="page-content">
        <FormInput label="收货人" v-model="variables.name" placeholder="请填写收货人名称"/>
        <FormInput label="联系电话" v-model="variables.phone" dataType="tel" placeholder="请填写联系电话"/>
        <FormArea class="weui-cell" style="padding:0;display:block" label="收货地区" :multiple="false" v-model="variables.area" placeholder="请选择收货地区"/>
        <FormInput label="邮政编码" v-model="variables.postcode" dataType="tel" placeholder="请填写邮政编码"/>
        <div style="padding:8px 15px;">街道、楼门地址</div>
        <FormTextArea v-model="variables.area_address" placeholder="请填写详细的街道、楼门地址"/>
        <label for="weuiAgree" class="weui-agree">
            <input id="weuiAgree" type="checkbox" v-model="variables.default" class="weui-agree__checkbox">
            <span class="xa-txt-333 xa-txt-bold weui-agree__text">设置为默认</span>
        </label>
    </div>
    <AppBtns v-show="!loading" :items="[{txt:'提交',type:'submit'}]" @click="onSubmit"/>
</section>
</template>
<script>
import FormArea from '../components/FormArea.vue'
import FormInput from '../components/FormInput.vue'
import FormTextArea from '../components/FormTextArea.vue'
import { getAddress, saveAddress } from '@/apis/address.js'
import baseView from './BaseView.js'
export default {
    name: 'addressForm',
    extends: baseView,
    components: {
        FormArea,
        FormInput,
        FormTextArea
    },
    data() {
        return {
            loading: false,
            variables: {
                area: [],
                area_address: '',
                default: false,
                guid: '',
                name: '',
                phone: '',
                postcode: ''
            }
        }
    },
    props: {
        isChild: {
            type: Boolean,
            default: false
        },
        guid: {
            type: String,
            default: ''
        }
    },
    methods: {
        async onSubmit() {
            let submit = JSON.parse(JSON.stringify(this.variables))
            if (submit.area) {
                debugger
                submit.area = Array.isArray(submit.area) ? submit.area[0] : submit.area
                submit.area = {
                    id: submit.area.id,
                    name: submit.area.name
                }
            }
            await this.baseAction(saveAddress(submit))
            if (this.isChild) {
                this.$emit('close')
            } else {
                this.$router.replace('/address/list?t=' + (new Date()).getTime())
            }
        }
    },
    async mounted() {
        this.loading = true
        const { query } = this.$route
        const guid = query.guid || this.guid
        if (guid) {
            let { variables } = await this.baseAction(getAddress(guid))
            variables.area = [variables.area]
            this.variables = variables
        }
        this.loading = false
    }
}
</script>
<style lang="scss" scoped>
.page-content {
  height: calc(100% - 44px);
  overflow: auto;
}
</style>
