<template>
<div>
    <FormCell :class="multiple&&'xa-line__bottom'" :label="label" :access="!disabled">
        <div @click="onShowSelect" class="formselect-diaplay xa-cell xa-flex">
            <AppAvatar v-if="displayLabel.avatar" size="24" style="margin-right:4px;" :avatar="displayLabel.avatar"/>
            <span :class="displayLabel.class">{{displayLabel.txt}}</span>
        </div>
    </FormCell>
    <AccordionCell v-if="multiple&&value.length">
        <transition-group name="fadeup">
            <div v-for="(val,index) in value" :key="index" class="xa-bg-white weui-cell">
                <AppAvatar v-if="val.avatar" size="24" style="margin-right:4px;" :avatar="val.avatar"/>
                <div class="xa-flex">
                    <p>{{val.txt||val.title||val.label}}</p>
                    <p v-if="val.subTitle" class="xa-txt-999 xa-txt-12" :style="val">{{val.subTitle}}</p>
                </div>
                <i v-if="!disabled" @click="onRemove(index)" class="xa-txt-red iconfont icon-shanchu"></i>
            </div>
        </transition-group>
    </AccordionCell>
</div>
</template>
<script>
import AccordionCell from './AccordionCell.vue'
let uid = 0
export default {
    name: 'FormSelect',
    _oldQueryData: null,
    components: {
        AccordionCell
    },
    data() {
        return {
            needClose: false,
            cacheId: '',
            hasShow: false
        }
    },
    props: {
        value: {
            type: Array
        },
        label: String,
        src: {
            type: Object,
            default() {
                return {
                    url: 'isTest',
                    params: { 'name': 'kelin' }
                }
            }
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        variables: {
            type: Object
        },
        multiple: {
            type: Boolean,
            default: true
        },
        max: {
            type: [Number, String]
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        displayLabel() {
            if (this.multiple) {
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
                    txt: this.placeholder + (this.value.length ? '(' + this.value.length + ')' : ''),
                    class: 'xa-txt-999'
                }
            } else {
                if (this.value.length) {
                    return {
                        txt: this.value[0].txt || this.value[0].label || this.value[0].title,
                        avatar: this.value[0].avatar
                    }
                } else {
                    return {
                        txt: this.placeholder,
                        avatar: '',
                        class: 'xa-txt-999'
                    }
                }
            }
        }
    },
    methods: {
        getCacheId() {
            return this.$options.name + '' + (uid++)
        },
        onRemove(index) {
            this.value.splice(index, 1)
        },
        onShowSelect() {
            if (this.disabled) return
            if (this.max && this.value.length >= parseInt(this.max)) {
                return
            }
            let src = this.src.url
            let params = this.src.params || {}
            if (this.variables && this.src.params) {
                let keys = Object.keys(this.src.params)
                keys.forEach(key => {
                    params[key] = this.variables[key] || this.src.params[key]
                })
            }
            let oldCacheId
            if (JSON.stringify(params) !== this.$options.oldQueryData && this.$options.oldQueryData) { // 请求参数有变化
                oldCacheId = this.cacheId
                this.cacheId = this.getCacheId()
            }
            this.$options.oldQueryData = JSON.stringify(params)
            this.hasShow = true
            this.$showPopSelect(src, params, this.value, (this.multiple ? 'checkbox' : 'radio'), null, this.cacheId, oldCacheId).then(data => {
                if (data && data.length) {
                    if (this.multiple === false) {
                        this.$emit('input', data)
                    } else {
                        let addData = data.filter(item =>
                            !this.value.find(val => val.value === item.value)
                        )
                        if (addData.length > 0) {
                            this.$emit('input', addData.concat(this.value))
                        }
                    }
                }
            })
        }
    },
    mounted() {
        this.cacheId = this.getCacheId()
    },
    beforeDestroy() {
        this.hasShow && this.$showPopSelect(this.cacheId)
    }
}
</script>
<style lang="scss">
.formselect-diaplay {
  justify-content: flex-end;
  text-align: right;
}
</style>
