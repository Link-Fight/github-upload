<template>
  <section class="diyForm-wrap" :class="{'needRequireTip':needRequireTip}">
       <div v-for="(item,index) in coms" class="xa-line__top"
            :key="index"
            :class="[item.type,'formitem_'+index,item.require?'com_require':'',validateResult[item.variable]&&validateResult[item.variable].result&&'right']"
            v-show="!item.showRule||eventShow(item.showRule,variables,item.variable,changeTrigger)">
            <AppImages v-if="item.type==='images'" :imgs="item.items"/>
            <LinkCellForTxt v-else-if="item.type==='LinkCellForTxt'" :title="item.title" :content="item.content" ></LinkCellForTxt>
            <LinkCellGroup v-else-if="item.type==='LinkCellGroup'" :title="item.title" :items="item.items" ></LinkCellGroup>
            <LinkCell v-else-if="item.type==='LinkCell'" :icon="item.icon" :btns="item.btns" :title="item.title" :subTitle="item.subTitle" :value="item.value" :href="item.href" :phone="item.phone" />
            <LinkCellForImg v-else-if="item.type==='LinkCellForImg'" :img="item.img" :btns="item.btns" :title="item.title" :subTitle="item.subTitle" :value="item.value" :href="item.href" :phone="item.phone"/>
            <LinkCellForImgGroup v-else-if="item.type==='LinkCellForImgGroup'" :title="item.title" :items="item.items" />
            <InfoListItem v-else-if="item.type==='InfoListItem'" :title="item.title" :items="item.items" ></InfoListItem>
            <StatisticeCells v-else-if="item.type==='StatisticeCells'" :title="item.title" :items="item.items" ></StatisticeCells>
            <FormArea v-else-if="item.type==='area'"  v-model="variables[item.variable]" :placeholder="item.placeholder" :label="item.label" :multiple="item.multiple" :maxLevel="item.level" :max="item.max" :min="item.min" :disabled="item.mode=='view'"/>
            <FormCheckBox v-else-if="item.type==='checkBox'" v-model="variables[item.variable]" :options="item.options" :label="item.label"/>
            <FormDateSelect v-else-if="item.type==='dateSelect'" v-model="variables[item.variable]" :placeholder="item.placeholder" :label="item.label" :viewMode="item.viewMode"/>
            <FormInput v-else-if="item.type==='text'" v-model="variables[item.variable]" :placeholder="item.placeholder" :dataType="item.dataType" :label="item.label" :unit="item.unit" :Fixed="item.fixed" :readonly="item.mode==='view'"/>
            <FormPickLatLng v-else-if="item.type==='latLng'" v-model="variables[item.variable]" :placeholder="item.placeholder" :label="item.label"/>
            <FormPickMap v-else-if="item.type==='map'" v-model="variables[item.variable]" :variables="variables" :placeholder="item.placeholder" :src="item.src" :label="item.label"/>
            <FormTextArea v-else-if="item.type==='textarea'" v-model="variables[item.variable]" :placeholder="item.placeholder" />
            <FormRadio v-else-if="item.type==='radio'" v-model="variables[item.variable]" :label="item.label" :options="item.options" :disabled="item.mode=='view'"/>
            <FormRadioGroup v-else-if="item.type==='radioGroup'" v-model="variables[item.variable]" :label="item.label" :options="item.options" :disabled="item.mode=='view'"/>
            <FormDropdown v-else-if="item.type==='dropdown'" v-model="variables[item.variable]" :label="item.label" :options="item.options"/>
            <div v-else-if="item.type==='title'" class="form-com__title xa-txt-14 xa-txt-999">{{item.title}}</div>
            <FormImgs v-else-if="item.type==='imgUpload'" v-model="variables[item.variable]" :variables="variables" :max="item.max" :sizeType="item.sizeType" :gps="item.gps" :gpsCascade="item.gpsCascade" :disabled="item.mode=='view'"/>
            <FormSwitch v-else-if="item.type==='switch'" v-model="variables[item.variable]" :label="item.label" :subLable="item.subLable" :disabled="item.mode=='view'"/>
            <FormSlider v-else-if="item.type==='slider'" v-model="variables[item.variable]" :label="item.label" :min="item.min" :max="item.max" :unit="item.unit" :range="!!item.isRange" :step="item.step"></FormSlider>
            <FormSelect v-else-if="item.type==='select'" v-model="variables[item.variable]" :multiple="item.multiple" :variables="variables" :placeholder="item.placeholder" :label="item.label" :src="item.src" :max="item.max" :min="item.min" :disabled="item.mode=='view'"/>
            <FormScore v-else-if="item.type==='score'" :disabled="item.mode=='view'" v-model="variables[item.variable]" :label="item.label" />
            <FormSubmitBtn v-else-if="item.type==='submit'" :item="item" @click="onSubmitClick(item)" />
            <AppTip v-if="validateResult[item.variable]&&validateResult[item.variable].msg" @close="validateResult[item.variable].msg=''" :tip="validateResult[item.variable].msg"/>
            <div v-if="item.tips" style="padding:5px 15px;margin-bottom:4px;" class="xa-line__top xa-bg-white xa-txt-12 xa-txt-999" v-html="item.tips"></div>
       </div>
  </section>
</template>
<script>
import startMove from '@/util/startMove.js'
import AppImages from '../components/AppImages.vue'
import InfoListItem from '../components/InfoListItem.vue'
import FormArea from '../components/FormArea.vue'
import FormCheckBox from '../components/FormCheckBox.vue'
import FormDateSelect from '../components/FormDateSelect.vue'
import FormImgs from '../components/FormImgs.vue'
import FormInput from '../components/FormInput.vue'
import FormLabel from '../components/FormLabel.vue'
import FormPickLatLng from '../components/FormPickLatLng.vue'
import FormPickMap from '../components/FormPickMap.vue'
import FormRadio from '../components/FormRadio.vue'
import FormRadioGroup from '../components/FormRadioGroup.vue'
import FormDropdown from '../components/FormDropdown.vue'
import FormSelect from '../components/FormSelect.vue'
import FormScore from '../components/FormScore.vue'
import FormSlider from '../components/FormSlider.vue'
import FormSwitch from '../components/FormSwitch.vue'
import FormSubmitBtn from '../components/FormSubmitBtn.vue'
import FormTextArea from '../components/FormTextArea.vue'
import eventShow from '../util/eventShow'
import { formComDefaultValue, formComVariableCheck } from './DiyFormFactory'
export default {
    name: 'DiyFormFactory',
    components: {
        AppImages,
        InfoListItem,
        FormArea,
        FormCheckBox,
        FormDateSelect,
        FormImgs,
        FormInput,
        FormLabel,
        FormPickLatLng,
        FormPickMap,
        FormRadio,
        FormRadioGroup,
        FormDropdown,
        FormSelect,
        FormScore,
        FormSwitch,
        FormSubmitBtn,
        FormTextArea,
        FormSlider
    },
    data() {
        return {
            requireList: [],
            changeTrigger: 0,
            coms: [],
            variables: {},
            // hiddenVariables: [],
            immediateClearList: [],
            validateResult: null,
            checkVariablesTimeout: null,
            beginCache: false,
            isSending: false
        }
    },
    watch: {
        variables: {
            deep: true,
            handler(newVal) {
                this.changeTrigger++
                clearTimeout(this.checkVariablesTimeout)
                this.checkVariablesTimeout = setTimeout(() => {
                    this.isTest && console.log('variables', JSON.stringify(newVal))
                    this.checkRequestVariable(false)
                    if (this.needCache && this.cacheKey && this.beginCache) {
                        this.$util.setStorage('diyForm_variables_' + this.cacheKey, {
                            variables: newVal,
                            TIME: (new Date()).toLocaleString()
                        })
                    } else {
                        this.beginCache = true
                    }
                }, 350)
            }
        }
    },
    props: {
        needCache: Boolean,
        cacheKey: String,
        items: Array,
        values: Object,
        needRequireTip: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        eventShow,
        initFormItems(items, values) {
            let variables = Object.assign(values, {})
            let validateResult = {}
            let immediateClearList = []
            items.forEach((item, index) => {
                if (item.showRule) {
                    if (JSON.stringify(item.showRule).length <= 4) {
                        delete item.showRule
                    } else if (item.showRule.show) {
                        item.showRule = item.showRule.show
                    }
                    if (item.showRule.immediateClear) {
                        immediateClearList.push(Object.assign({ variable: item.variable }, item.showRule))
                    }
                }
                let defaultValueFn = formComDefaultValue[item.type]
                if (defaultValueFn !== undefined && item.variable) {
                    variables[item.variable] = variables[item.variable] || defaultValueFn(item)
                }
                if (item.require === true) {
                    this.requireList.push({
                        show: true,
                        index,
                        variable: item.variable,
                        check: formComVariableCheck(item.type).bind(this, item)
                    })
                    validateResult[item.variable] = {
                        result: false,
                        msg: ''
                    }
                }
            })
            this.variables = variables
            this.validateResult = validateResult
            this.coms = Array.from(this.items)
            this.hiddenVariables = []
            this.initImmediateClearList(immediateClearList)
        },
        clearVariablesValue(variable) {
            if (this.variables[variable] instanceof Array) {
                this.variables[variable] = []
            } else if (this.variables[variable] instanceof Object) {
                this.variables[variable] = {}
            } else {
                if (this.variables[variable] === false || this.variables[variable] === true) {
                    return
                }
                this.variables[variable] = ''
            }
        },
        // 专门处理被依赖对象的值需要被清空的清空
        initImmediateClearList(immediateClearList) {
            let target = {}
            immediateClearList.forEach(item => {
                if (item.control_id) {
                    let mTarget = target[item.control_id] || (target[item.control_id] = [])
                    item.variable && mTarget.push(item.variable)
                } else {
                    item.items.forEach(mItem => {
                        let mTarget = target[mItem.control_id] || (target[mItem.control_id] = [])
                        item.variable && mTarget.push(item.variable)
                    })
                }
            })
            let keys = Object.keys(target)
            keys.forEach(key => {
                this.$watch('variables.' + key, () => {
                    this.$nextTick(function () {
                        target[key].forEach(variable => this.clearVariablesValue(variable))
                    })
                })
            })
        },
        checkRequestVariable(needMsg) {
            clearTimeout(this.checkVariablesTimeout)
            this.requireList.forEach(item => {
                let { result, msg } = item.check(this.variables[item.variable])
                let msgObj = {}
                if (needMsg === false) {
                    !msg && (msgObj = {
                        msg: ''
                    })
                } else {
                    msgObj = {
                        msg
                    }
                }
                Object.assign(this.validateResult[item.variable], {
                    result
                }, msgObj)
            })
        },
        checkVariables(variables = this.variables) {
            this.checkRequestVariable(true)
            let flag = true
            let index = -1
            this.requireList.forEach(item => {
                if (this.hiddenVariables.indexOf(item.variable) === -1) {
                    let { result } = this.validateResult[item.variable]
                    if (flag && result === false) {
                        flag = false
                        index = item.index
                    }
                }
            })
            return { flag, index }
        },
        getSubmitVariables: async function () {
            let result = this.handlerCheckSubmit()
            if (result) {
                return this.variables
            }
        },
        handlerCheckSubmit() {
            let { flag, index } = this.checkVariables(this.variables)
            if (!flag) {
                let el = this.$el.querySelector('.formitem_' + index)
                if (el) {
                    startMove(el.offsetParent, { scrollTop: el.offsetTop })()
                }
            }
            return flag
        },
        onSubmitClick: async function (cfg) {
            if (this.isSending) {
                return
            }
            this.isSending = true
            let { flag, index } = this.checkVariables(this.variables)
            if (flag) {
                let confirmResult = 'ok'
                if (cfg.ajax) {
                    if (cfg.ajax.confirm) {
                        let { action } = await this.$showConfirm(cfg.ajax.confirm)
                        confirmResult = action
                    }
                    if (confirmResult === 'ok') {
                        this.submitVariables(cfg, this.variables)
                    } else {
                        this.isSending = false
                    }
                } else if (cfg.href) {
                    this.$gotoHref(cfg.href.url, { replace: true })
                    this.isSending = false
                }
            } else {
                let el = this.$el.querySelector('.formitem_' + index)
                if (el) {
                    startMove(el.offsetParent, { scrollTop: el.offsetTop })()
                }
                this.isSending = false
            }
        },
        submitVariables(cfg, variables) {
            this.$promiseWithUi(this.$diyAction({
                url: cfg.ajax.api,
                data: variables,
                method: 'post'
            })).then(result => {
                this.$showToast('提交成功')
                if (this.needCache && this.cacheKey) {
                    this.$util.setStorage('diyForm_variables_' + this.cacheKey, null)
                }
                setTimeout(() => {
                    if (this.$route.query.minback) {
                        return this.$wxAction.miniProgram().navigateBack()
                    }
                    let hrefUrl
                    if (result.href) {
                        hrefUrl = result.href
                    } else if (cfg.href) {
                        hrefUrl = cfg.href.url
                        let paramsUrl = ''
                        cfg.href.params && cfg.href.params.forEach(key => {
                            var val = variables[key]
                            if (val instanceof Object) {
                                val = JSON.stringify(val)
                            }
                            paramsUrl += `${key}=${val}&`
                        })
                        if (paramsUrl) {
                            hrefUrl += hrefUrl.indexOf('?') === -1 ? '?' : '&' + paramsUrl
                        }
                    }
                    this.$gotoHref(hrefUrl, { replace: true })
                }, 2000)
            }).catch(() => {
                this.isSending = false
            })
        }
    },
    mounted() {
        this.initFormItems(this.items, JSON.parse(JSON.stringify(this.values || {})))
    }
}
</script>
<style lang="scss" scoped>
.form-com__title {
  padding: 0 15px;
  margin: 8px 0;
  line-height: 16px;
}
.diyForm-tips.xa-line__top:before,
.diyForm-wrap {
  padding-bottom: 8px;
}
.diyForm-wrap > .xa-line__top:before {
  content: "";
  left: 15px;
}
.diyForm-wrap > .title.xa-line__top:before {
  content: "";
  display: none;
}
.needRequireTip {
  .com_require {
    position: relative;
  }
  .com_require::after {
    content: "";
    position: absolute;
    left: 0px;
    top: 12px;
    height: 16px;
    width: 3px;
    line-height: 16px;
    color: #f23030;
    background-color: #f23030;
  }
  .com_require.right::after {
    content: "";
    color: #42bd56;
    background-color: #42bd56;
  }
}
</style>
