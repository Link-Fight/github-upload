<template>
  <PopPanel  @close="$emit('close')">
      <div slot="header">
            <FormCell class="xa-bg-green xa-txt-white">
                <div>
                    <p>{{value.title}}</p>
                    <template v-if="value.subTitle">
                        <p v-if="!value.subTitle.push" class="xa-txt-12" :style="value">{{value.subTitle}}</p>
                        <div v-else class="xa-cell xa-flex-wrap item-status">
                            <UiStatu style="margin:2px 0;" v-for="subTitle in value.subTitle" :statu="{title:subTitle}" :key="subTitle"/>
                        </div>
                    </template>
                </div>
            </FormCell>
      </div>
      <div class="xa-view xa-bg-f6" style="height:70vh;min-height:300px;">
          <FormCell v-if="formType==1||formType==13" class="xa-line__bottom" label="请选择数量"><FormInputNum @msg="onMsg" :max="config.max" v-model="variables.num" slot="right"></FormInputNum></FormCell>
          <FormInputScan v-if="formType==2||formType==23"  class="xa-flex" v-model="variables.sn"  :variables="variables" :src="checkInputApi" />
          <template  v-if="formType==1||formType==2">
            <FormImgs class="xa-line__top" label="上传相关图片" v-model="variables.imgs" max="6" imgSize="60px"/>
            <div class="xa-txt-12 xa-bg-white" style="padding:4px 15px;">
                注：上传的图片将为作为核损依据，请上传零部件 受损部位 及 二维码 的清晰照片
            </div>
          </template>
      </div>
      <AppBtns class="xa-line__top" slot="footer" :items="btns" @click="onBtnClick"/>
  </PopPanel>
</template>
<script>
import { show, hidden } from './PopBase.js'
import FormImgs from '@/components/FormImgs.vue'
import FormInput from '@/components/FormInput.vue'
import FormInputNum from '@/components/FormInputNum.vue'
import FormInputScan from '@/components/FormInputScan.vue'
import { cancelOkBtns } from '@/config/AppBtns'
export default {
    name: 'PopEnsureForm',
    components: {
        FormImgs,
        FormInput,
        FormInputNum,
        FormInputScan
    },
    data() {
        return {
            btns: cancelOkBtns,
            variables: {
                num: 1,
                sn: [],
                imgs: []
            }
        }
    },
    props: {
        value: {
            type: Object,
            default() {
                return {}
            }
        },
        config: {
            type: Object,
            default() {
                return {
                    max: 0
                }
            }
        },
        formType: {
            type: [Number, String],
            default: 1,
            validator(val) {
                let formType = [1, 2, 13, 23]
                val = parseInt(val)
                return formType.includes(val)
            }
        },
        checkInputApi: Object
    },
    methods: {
        onBtnClick({ action }) {
            if (action === 'ok') {
                let variables = {}
                if (this.formType === 1 || this.formType === 13) {
                    variables['num'] = this.variables.num
                } else if (this.formType === 2 || this.formType === 23) {
                    variables['sn'] = this.variables.sn
                    variables['num'] = this.variables.sn.length
                }
                variables['imgs'] = this.variables.imgs
                if (variables.sn && variables.sn.length === 0) {
                    return this.$showToast('需要录入设备序列号')
                }
                this.$emit('submit', variables)
                this.$emit('close')
            } else {
                this.$emit('close')
            }
        },
        onMsg(msg) {
            console.log(msg)
            this.$showToast(msg)
        }
    },
    beforeDestroy() {
        hidden()
    },
    mounted() {
        show()
        Object.assign(this.variables, this.value)
    }
}
</script>
<style lang="scss" scoped>
.item-status {
  justify-content: space-between;
}
</style>
