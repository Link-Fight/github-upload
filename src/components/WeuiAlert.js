
import WeuiAlert from './WeuiAlert.vue'
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { WeuiAlert: Object.assign({ name: 'GlobalAlert' }, WeuiAlert) },
        template: '<WeuiAlert v-show="alert.isShow" :title="alert.title" :content="alert.content" @close="hiddenAlert"/>',
        data: {
            alert: {
                isShow: false,
                content: '',
                title: '',
                promiseResolve: null
            }
        },
        methods: {
            showAlert(content, title = '') {
                if (arguments[0] instanceof Object) {
                    content = arguments[0].content
                    title = arguments[0].title || title
                }
                Object.assign(this.alert, { title: title + '', content: content + '', isShow: true })
                return new Promise(resolve => {
                    this.alert.promiseResolve = resolve
                })
            },
            hiddenAlert() {
                this.alert.isShow = false
                this.alert.promiseResolve()
            }
        }
    })
}