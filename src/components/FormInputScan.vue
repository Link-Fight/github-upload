<template>
<div class="xa-view">
   <div class="xa-cell weui-cell xa-line__bottom xa-bg-white">
        <i @click="onScan" class="xa-txt-green iconfont icon-saomiao"></i>
        <form @submit.prevent="()=> false" action="javascript:return true" class="xa-flex">
            <input v-model="input" class="weui-input xa-txt-center" :placeholder="placeholder" @keyup.enter.stop="onAdd" >
        </form>
        <span  @click="onAdd" :class="[input?'xa-txt-green':'xa-txt-999']">确认</span>
    </div>
    <div class="xa-flex xa-com-container">
        <div v-for="(val,index) in value" :key="index" class="xa-bg-white weui-cell">
            <div class="xa-flex">{{val.title||val}}</div><i v-if="!disabled" @click="onRemove(index)" class="xa-txt-red iconfont icon-shanchu"></i>
        </div>
    </div>
</div>
</template>
<script>
import FormInput from '@/components/FormInput.vue'
function getPromise(val) {
    console.log(JSON.stringify(val, null, 4))
    return new Promise(resolve => {
        setTimeout(function () {
            resolve()
        }, 300)
    })
}
export default {
    name: 'FormInputScan',
    components: {
        FormInput
    },
    data() {
        return {
            input: ''
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        max: [Number, String],
        placeholder: {
            type: String,
            default: '请输入或扫描二维码'
        },
        src: {
            type: Object
            // default() {
            //     return {
            //         url: 'isTest',
            //         key: '',
            //         params: { 'name': 'kelin' }
            //     }
            // }
        },
        value: Array,
        variables: Object
    },
    methods: {
        onAdd() {
            if (this.input.trim()) {
                this.asyncAdd(this.input).then(data => {
                    if (data !== undefined) {
                        this.value.push(data)
                        this.input = ''
                    }
                })
            }
        },
        onScan() {
            this.$wxAction.scanQRCode({
                needResult: 1,
                success: (res) => {
                    var result = res.resultStr
                    this.asyncAdd(result).then(data => this.value.push(data))
                }
            })
        },
        onRemove(index) {
            this.value.splice(index, 1)
        },
        asyncAdd(val) {
            let paramsKey = (this.src && this.src.key) || 'KEY'
            let isSame = this.value.find(mVal => {
                if (mVal instanceof Object) {
                    return mVal[paramsKey] === val
                }
                return mVal === val
            })
            if (isSame !== undefined) {
                this.$showToast('已经添加！')
                return Promise.resolve()
            }
            if (!this.src || !this.src.url) {
                return Promise.resolve(val)
            }
            let params = this.src.params || {}
            if (this.variables && this.src.params) {
                let keys = Object.keys(this.src.params)
                keys.forEach(key => {
                    params[key] = this.variables[key] || this.src.params[key]
                })
            }
            params[paramsKey] = val
            let requierAction = this.src.url === 'isTest' ? getPromise : this.$diyAction
            return this.$promiseWithUi(requierAction({
                url: this.src.url,
                data: params
            })).then(data => data && JSON.stringify(data).length > 2 ? data : val)
        }
    }
}
</script>
<style lang="scss" scoped></style>
