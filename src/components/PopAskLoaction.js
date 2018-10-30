import PopAskLoaction from './PopAskLoaction.vue'
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { GlobalPopAskLoaction: Object.assign({ name: 'GlobalPopAskLoaction' }, PopAskLoaction) },
        template: `<GlobalPopAskLoaction v-if="PopAskLoaction.isShow"
                        @close="hiddenPopAskLoaction"
                        />`,
        data: {
            PopAskLoaction: {
                isShow: false,
                promiseResolve: null
            }
        },
        methods: {
            showPopAskLoaction() {
                return new Promise((resolve) => {
                    this.PopAskLoaction.isShow = true
                    this.PopAskLoaction.promiseResolve = resolve
                })
            },
            hiddenPopAskLoaction() {
                this.PopAskLoaction.isShow = false
                this.PopAskLoaction.promiseResolve()
            }
        }
    })
}