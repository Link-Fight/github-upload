import PopDetail from './PopDetail.vue'
import { show, hidden } from './PopBase.js'
let Store = {}
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { GlobalPopDetail: Object.assign({ name: 'GlobalPopDetail' }, PopDetail) },
        template: `<GlobalPopDetail v-if="PopDetail.isShow" @close="hiddenPopDetail" :title="PopDetail.title" :body="PopDetail.body"/>`,
        data: {
            PopDetail: {
                isShow: false,
                title: '',
                body: [],
                resolve: null
            }
        },
        methods: {
            getTestServer(params) {
                return import('@/config/DetailComFactory.js').then(({ getInitData }) => getInitData(params))
            },
            showPopDetail: async function (api, params = {}, cacheKey) {
                if (this.PopDetail.isShow) {
                    await this.hiddenPopDetail()
                }
                show()
                this.PopDetail.title = ''
                return new Promise((resolve) => {
                    this.PopDetail.resolve = resolve
                    this.getDataAsync(api, params, cacheKey)
                        .then(data => {
                            if (Array.isArray(data)) {
                                this.PopDetail.body = data
                            } else {
                                this.PopDetail.title = data.title || ''
                                if (data.body) {
                                    this.PopDetail.body = data.body
                                } else if (data.config) {
                                    this.PopDetail.body = data.config.body
                                }
                            }
                            this.PopDetail.isShow = true
                        })
                })
            },
            getDataAsync(api, params, cacheKey) {
                if (cacheKey && Store[cacheKey]) {
                    return Promise.resolve(this.$copyObject(Store[cacheKey]))
                } else {
                    let promise = api === 'isTest' ? this.getTestServer : this.$diyAction
                    return this.$promiseWithUi(promise({
                        url: api,
                        data: { bodyonly: true, ...params }
                    })).then(data => {
                        if (cacheKey) {
                            Store[cacheKey] = data
                        }
                        return data
                    })
                }
            },
            onFormSubmit(result) {
                this.PopDetail.resolve(result)
            },
            hiddenPopDetail() {
                return new Promise(resolve => {
                    hidden()
                    setTimeout(() => {
                        this.PopDetail.isShow = false
                        resolve()
                    }, 300)
                })
            }
        }
    })
}