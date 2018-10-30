import PopForm from './PopForm.vue'
import { show, hidden } from './PopBase.js'
let Store = {}
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { GlobalPopForm: Object.assign({ name: 'GlobalPopForm' }, PopForm) },
        template: `<GlobalPopForm v-if="PopForm.isShow" @close="hiddenPopForm" @submit="onFormSubmit" :title="PopForm.title" :items="PopForm.items" :variables="PopForm.variables"/>`,
        data: {
            PopForm: {
                isShow: false,
                title: '',
                items: [],
                variables: {},
                resolve: null
            }
        },
        methods: {
            getTestServer(params) {
                return import('@/config/DiyForm.js').then(({ getInitData }) => getInitData(params))
            },
            showPopForm(api, params, cacheKey) {
                show()
                return new Promise((resolve) => {
                    this.PopForm.resolve = resolve
                    this.getFormAsync(api, params, cacheKey)
                        .then(data => {
                            this.PopForm.title = data.title
                            this.PopForm.items = data.items
                            this.PopForm.variables = Object.assign({}, params, data.variables)
                            this.PopForm.isShow = true
                        })
                })
            },
            getFormAsync(api, params, cacheKey) {
                if (cacheKey && Store[cacheKey]) {
                    return Promise.resolve(this.$copyObject(Store[cacheKey]))
                } else {
                    let promise = api === 'isTest' ? this.getTestServer : this.$diyAction
                    return this.$promiseWithUi(promise({
                        url: api,
                        data: params
                    })).then(data => {
                        if (cacheKey) {
                            Store[cacheKey] = data
                        }
                        return data
                    })
                }
            },
            onFormSubmit(result) {
                this.PopForm.resolve(result)
            },
            hiddenPopForm() {
                hidden()
                this.PopForm.isShow = false
            }
        }
    })
}
