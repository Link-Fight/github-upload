<template>
<div>
    <FormCell :class="multiple&&'xa-line__bottom'" :label="label" :access="!disabled">
        <div @click="onShowSelect" class="formselect-diaplay xa-cell xa-flex">
            <span :class="displayLabel.class">{{displayLabel.txt}}</span>
        </div>
    </FormCell>
    <div v-if="multiple">
        <div v-for="(val,index) in value" :key="index" class="xa-bg-white weui-cell">
            <AppAvatar v-if="val.avatar" size="24" style="margin-right:4px;" :avatar="val.avatar"/>
            <span class="xa-flex">{{val.txt||val.label||val.name}}</span>
            <i v-if="!disabled" @click="onRemove(index)" class="xa-txt-red iconfont icon-shanchu"></i>
        </div>
    </div>
    <popPanel v-if="areaSelect.isShow" @close="onClose">
        <areaSelect class="xa-bg-f6" style="height:50vh" :maxLevel="maxLevel" :modal="false" getAreas2="/wechat/wechat/check_login" getUpAreas="/wechat/wechat/check_login" :service="$diyAction"  @change="onAreaSelectChange" @close="onClose"></areaSelect>
    </popPanel>
</div>
</template>
<script>
import areaSelect from './areaSelect/index.vue'
import { show, hidden } from './PopBase.js'
export default {
    name: 'FormArea',
    components: {
        areaSelect
    },
    data() {
        return {
            areaSelect: {
                isShow: false
            },
            scrollTarget: null
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
        maxLevel: Number,
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
                    txt: this.placeholder,
                    class: 'xa-txt-999'
                }
            } else {
                if (this.value.length) {
                    return {
                        txt: this.value[0].txt || this.value[0].label || this.value[0].name,
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
        onAreaSelectChange(val) {
            if (this.multiple) {
                if (this.value.find(valu => valu.id === val.id) === undefined) {
                    this.value.push(val)
                } else {
                    this.$showToast('已经添加了！')
                }
            } else {
                this.$emit('input', [val])
            }
            this.handlerShow(false)
        },
        onRemove(index) {
            this.value.splice(index, 1)
        },
        onClose() {
            setTimeout(() => {
                this.handlerShow(false)
            }, 300)
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
                show()
            } else {
                hidden()
            }
            this.areaSelect.isShow = isShow
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