import PopInput from './PopInput.vue'
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { GlobalPopInput: Object.assign({ name: 'GlobalPopInput' }, PopInput) },
        template: `<GlobalPopInput v-if="PopInput.isShow"
                        @close="hiddenPopInput"
                        @submit="onSubmit"
                        :title="PopInput.title"
                        :tip="PopInput.tip"
                        :defaultValue="PopInput.defaultValue"
                        :placeholder="PopInput.placeholder"
                        />`,
        data: {
            PopInput: {
                isShow: false,
                title: '',
                defaultValue: '',
                tip: '',
                placeholder: '',
                promiseResolve: null
            }
        },
        methods: {
            showPopInput(title, defaultValue, tip, placeholder) {
                return new Promise((resolve) => {
                    Object.assign(this.PopInput, {
                        isShow: true,
                        title: title || '',
                        defaultValue: defaultValue || '',
                        tip: tip || '',
                        placeholder: placeholder || '请输入'
                    })
                    this.PopInput.promiseResolve = resolve
                })
            },
            hiddenPopInput() {
                setTimeout(() => {
                    this.PopInput.isShow = false
                }, 300)
            },
            onSubmit(data) {
                this.PopInput.promiseResolve(data)
                this.PopInput.isShow = false
            }
        }
    })
}