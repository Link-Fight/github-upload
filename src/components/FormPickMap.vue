<template>
<div>
    <FormCell class="xa-line__bottom" :label="label" :access="!disabled">
        <div @click="onShowSelect" class="formselect-diaplay xa-cell xa-flex">
            <span :class="displayLabel.class">{{displayLabel.txt}}</span>
        </div>
    </FormCell>
    <AccordionCell v-if="value.length">
        <transition-group name="fadeup">
            <div v-for="(val,index) in value" :key="index" class="xa-bg-white weui-cell xa-txt-12">
                <span class="xa-txt-999" style="margin-right:4px;">{{val.id}}</span>
                <span class="xa-flex">{{' '+val.title}}</span>
                <i v-if="!disabled" @click="onRemove(index)" class="xa-txt-red iconfont icon-shanchu"></i>
            </div>
        </transition-group>
    </AccordionCell>
    <template v-if="hasInit">
        <div v-show="isShow" class="weui-mask">
            <section class="max-page-width">
                <pickMap :chooseMap="hasChooseMap" :src="pickMapSrc" @submit="onSubmit" @close="onClose"/>
            </section>
        </div>
    </template>
</div>
</template>
<script>
import AccordionCell from './AccordionCell.vue'
let asynLoaderResolve = null
let asynLoaderPromise = new Promise(resolve => {
    asynLoaderResolve = resolve
})
export default {
    name: 'FormPickMap',
    components: {
        pickMap: () => import(/* webpackChunkName: "views/pickMap" */'@/components/pickMap/index.vue').then(_ => {
            console.log('pickMap')
            asynLoaderResolve()
            return _
        }),
        AccordionCell
    },
    data() {
        return {
            hasInit: false,
            isShow: false,
            pickMapSrc: {},
            hasChooseMap: {}
        }
    },
    props: {
        value: {
            type: Array
        },
        label: String,
        placeholder: {
            type: String,
            default: '请选择'
        },
        src: {
            type: Object,
            default() {
                return {
                    url: '/wechat/noflyzone/home/no_fly_zone_list',
                    params: { 'area': '' }
                }
            }
        },
        variables: {
            type: Object
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        displayLabel() {
            if (this.max) {
                if (this.value.length >= parseInt(this.max)) {
                    return {
                        txt: `已达最大添加数量:${this.max}`,
                        class: 'xa-txt-red'
                    }
                } else {
                    return {
                        txt: `${this.placeholder}(${this.value.length}/${this.max})`,
                        class: 'xa-txt-999'
                    }
                }
            }
            return {
                txt: this.value.length ? '已选择(' + this.value.length + ')' : this.placeholder,
                class: 'xa-txt-999'
            }
        }
    },
    methods: {
        onSubmit(val) {
            val.forEach(valItem => {
                if (this.value.find(valu => valu.id === valItem.id) === undefined) {
                    this.value.push(valItem)
                }
            })
            this.handlerShow(false)
        },
        onRemove(index) {
            this.value.splice(index, 1)
        },
        onClose() {
            this.handlerShow(false)
        },
        onShowSelect() {
            if (this.disabled) return
            if (this.max && this.value.length >= parseInt(this.max)) {
                return
            }
            this.handlerShow(true)
        },
        handlerShow(isShow) {
            if (isShow) {
                let chooseMap = {}
                if (this.value && this.value.length) {
                    this.value.forEach(val => {
                        chooseMap[val.id] = true
                    })
                }
                let params = {}
                if (this.variables && this.src.params) {
                    let keys = Object.keys(this.src.params)
                    keys.forEach(key => {
                        params[key] = this.variables[key] || this.src.params[key]
                    })
                }
                console.log(this.src.url, params)
                this.hasChooseMap = chooseMap
                this.hasInit = this.isShow = true
                this.pickMapSrc = {
                    url: this.src.url,
                    params
                }
                this.$promiseWithUi(asynLoaderPromise)
            } else {
                this.isShow = false
            }
        }
    }
}
</script>
<style lang="scss">
.formselect-diaplay {
  justify-content: flex-end;
  text-align: right;
}
</style>
