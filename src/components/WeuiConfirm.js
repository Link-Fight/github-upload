
import WeuiConfirm from './WeuiConfirm.vue'
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { WeuiConfirm: Object.assign({ name: 'GlobalConfirm' }, WeuiConfirm) },
        template: `<WeuiConfirm v-if="confirm.isShow" @close="hiddenConfirm"
                    :type="confirm.type"
                    :content="confirm.content"
                    :title="confirm.title"
                    :needInput="confirm.needInput"
                    :placeholder="confirm.input.placeholder"
                    v-model="confirm.input.value"
                    :canceltext="confirm.canceltext" :comfirmtext="confirm.comfirmtext"/>`,
        data: {
            confirm: {
                type: '',
                isShow: false,
                needInput: false,
                input: {
                    value: '',
                    placeholder: '',
                    required: false,
                    key: ''
                },
                content: '',
                title: '',
                canceltext: '',
                comfirmtext: '',
                promiseResolve: null,
                cancelCfg: null,
                comfirmCfg: null
            }
        },
        methods: {
            showConfirm(content, title = '', canceltext = '取消', comfirmtext = '确定') {
                this.confirm.needInput = false
                this.cancelCfg = this.comfirmCfg = null
                if (arguments[0] instanceof Object) {
                    content = arguments[0].content
                    title = arguments[0].title || title
                    canceltext = arguments[0].canceltext || canceltext
                    comfirmtext = arguments[0].comfirmtext || comfirmtext
                }
                if (arguments[1] && arguments[1] instanceof Object && arguments[1].key) {
                    this.confirm.needInput = true
                    this.confirm.input.value = arguments[1].value || ''
                    this.confirm.input.key = arguments[1].key
                    this.confirm.input.placeholder = arguments[1].placeholder
                    this.confirm.input.required = arguments[1].required || false
                    title = ''
                }
                if (canceltext instanceof Object) {
                    let { txt } = canceltext
                    if (txt) {
                        this.cancelCfg = canceltext
                        canceltext = txt
                    }
                }
                if (comfirmtext instanceof Object) {
                    let { txt } = comfirmtext
                    if (txt) {
                        this.comfirmCfg = comfirmtext
                        comfirmtext = txt
                    }
                }
                Object.assign(this.confirm, { content: content + '', title: title + '', isShow: true, canceltext, comfirmtext })
                return new Promise(resolve => (this.confirm.promiseResolve = resolve))
            },
            hiddenConfirm(action) {
                let value = {}
                let btn = null
                if (this.confirm.needInput && action === 'ok') {
                    if (this.confirm.input.required) {
                        if (!this.confirm.input.value) {
                            return this.$showToast('请完成填写！')
                        }
                    }
                    try {
                        value = {
                            [this.confirm.input.key]: this.confirm.input.value
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                btn = action === 'ok' ? this.comfirmCfg : this.cancelCfg
                this.confirm.isShow = false
                this.confirm.promiseResolve({ action, value, btn })
            }
        }
    })
}
