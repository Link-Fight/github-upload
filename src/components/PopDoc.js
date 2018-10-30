import PopDoc from './PopDoc.vue'
import { show, hidden } from './PopBase.js'
function initFu() {
    let data = {
        tabs: [
            {
                title: '按需求流程',
                api: 'isTest1'
            },
            {
                title: '按需求流程',
                api: 'isTest2'
            }
        ]
    }
    console.log(JSON.stringify(
        data, null, 4
    ))
    return Promise.resolve(data)
}
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { GlobalPopDoc: Object.assign({ name: 'GlobalPopDoc' }, PopDoc) },
        template: `<GlobalPopDoc v-if="PopDoc.isShow"
                        @close="hiddenPopDoc"
                        :tabs="PopDoc.tabs"
                        :content="PopDoc.content"
                        />`,
        data: {
            PopDoc: {
                isShow: false,
                tabs: [],
                resolve: null,
                content: ''
            }
        },
        methods: {
            showPopDoc(api, content) {
                show()
                return new Promise((resolve) => {
                    this.PopDoc.resolve = resolve
                    if (!api && content) {
                        this.PopDoc.tabs = []
                        this.PopDoc.content = content
                        this.PopDoc.isShow = true
                    } else {
                        let promise = api === 'isTest' ? initFu : this.$diyAction
                        this.$promiseWithUi(promise({
                            url: api
                        })).then(data => {
                            if (data.tabs === undefined && data.content) {
                                this.PopDoc.tabs = []
                                this.PopDoc.content = data.content
                            } else {
                                this.PopDoc.content = ''
                                this.PopDoc.tabs = data.tabs
                            }
                            this.PopDoc.isShow = true
                        })
                    }
                })
            },
            hiddenPopDoc() {
                hidden()
                this.PopDoc.isShow = false
                this.PopDoc.resolve && this.PopDoc.resolve()
            }
        }
    })
}
