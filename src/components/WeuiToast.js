
import WeuiToast from './WeuiToast.vue'
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { WeuiToast: Object.assign({ name: 'GlobalToast' }, WeuiToast) },
        template: '<WeuiToast v-if="toast.isShow" :type="toast.type" :content="toast.content"/>',
        data: {
            toast: {
                type: '',
                isShow: false,
                content: '',
                timeOut: 0
            }
        },
        methods: {
            showToast(content, type = 'msg', duration = 0) {
                if (arguments[0] instanceof Object) {
                    content = arguments[0].content
                    type = arguments[0].type || type
                    duration = arguments[0].duration || duration
                }
                if (type === 'msg') {
                    duration = duration || 1500
                }
                Object.assign(this.toast, { type, content: content + '', isShow: true })
                clearTimeout(this.toast.timeOut)
                if (duration > 0) this.toast.timeOut = setTimeout(() => (this.toast.isShow = false), duration)
            },
            hiddenToast() {
                clearTimeout(this.toast.timeOut)
                this.toast.isShow = false
            }
        }
    })
}
