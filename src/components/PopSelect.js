import PopSelect from './PopSelect.vue'
import { show, hidden } from './PopBase.js'
function getTestServer(action) {
    return (params) => import('@/config/PopSelect.js').then((_) => _[action](params))
}
export function install(Vue, parent, name) {
    let cacheItems = {}
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        mounted() {
            window.P = this
        },
        el,
        components: {
            empty: {
                render(h) {
                    return h('div')
                }
            },
            GlobalPopSelect: Object.assign({}, PopSelect, { name: name || 'GlobalPopSelect' })
        },
        template: `
            <div v-show="PopSelect.isShow">
                <keep-alive :include="include">
                    <component :is="curComponent"
                        @close="onClose"
                        @submit="onSubmit"
                        @change="onChange"
                        @more="onMore"
                        :querySrc="src"
                        :type="PopSelect.type"
                        :items="PopSelect.items"
                        :needSearch="PopSelect.needSearch"
                        :filter="PopSelect.filter"
                        :emptyStatus="PopSelect.emptyStatus"
                        :placeholder="PopSelect.placeholder"
                        :title="PopSelect.title"
                        :size="PopSelect.size"
                        :subTitle="PopSelect.subTitle"
                    />
                </keep-alive>
            </div>
            `,
        data: {
            src: '',
            params: {},
            include: ['empty'],
            curComponent: '',
            PopSelect: {
                isShow: false,
                filter: {},
                items: [],
                title: '',
                subTitle: '',
                needSearch: false,
                emptyStatus: {},
                placeholder: null,
                size: '',
                type: 'radio',
                promiseResolve: null
            }
        },
        methods: {
            clearCache(cacheId) {
                this.include.splice(this.include.indexOf(cacheId), 1)
                cacheItems[cacheId] = null
            },
            addCache(src, params, selecteds, newCacheId) {
                if (this.include.indexOf(newCacheId) > -1) {
                    this.PopSelect.isShow = true
                    this.PopSelect.src = src
                    this.PopSelect.params = params
                    this.PopSelect.items = cacheItems[newCacheId] || []
                    this.PopSelect.selecteds = selecteds
                    return new Promise(resolve => {
                        this.curComponent = newCacheId
                        this.PopSelect.promiseResolve = resolve
                    })
                } else {
                    this.include.push(newCacheId)
                    this.createDiyComs(newCacheId)
                }
            },
            handleCache(src, params, selecteds, newCacheId, oldCacheId) {
                oldCacheId && this.clearCache(oldCacheId)
                return newCacheId && this.addCache(src, params, selecteds, newCacheId)
            },
            showPopSelect(src, params = {}, selecteds, type = 'radio', size, newCacheId, oldCacheId) {
                if (arguments.length === 1 && typeof src === 'string' && this.include.indexOf(src) > -1) {
                    this.clearCache(src)
                    this.curComponent = src
                    return
                }
                show()
                if (newCacheId || oldCacheId) {
                    let handleReuslt = this.handleCache(src, params, selecteds, newCacheId, oldCacheId)
                    if (handleReuslt) {
                        return handleReuslt
                    }
                }
                return new Promise(resolve => {
                    this.src = ''
                    if (src instanceof Object) {
                        this.toShow(src)
                    } else {
                        this.src = src
                        this.params = Object.assign({}, params)
                        this.selecteds = selecteds || []
                        let request = src === 'isTest' ? getTestServer('getInitData') : this.$diyAction
                        this.$promiseWithUi(request({ url: src, data: params }))
                            .then(data => {
                                data.config = data.config || {}
                                if (data.config.queryApi) {
                                    this.src = data.config.queryApi
                                }
                                this.checkItemDefault(data.config.body, selecteds)
                                this.toShow({
                                    title: data.title,
                                    emptyStatus: data.emptyStatus,
                                    items: data.config.body,
                                    placeholder: data.config.placeholder,
                                    subTitle: data.subTitle || '',
                                    needSearch: data.config.needSearch || (data.config.header && data.config.header.needSearch) || false,
                                    filter: data.config.filter,
                                    size,
                                    type,
                                    curComponent: newCacheId
                                })
                            })
                    }
                    this.PopSelect.promiseResolve = resolve
                })
            },
            createDiyComs(cacheId) {
                let component = Object.assign({}, PopSelect, {
                    name: cacheId
                })
                Vue.component(cacheId, component)
            },
            toShow({ items, title, subTitle, needSearch = false, filter = {}, emptyStatus, placeholder, size, type, curComponent }) {
                this.PopSelect.placeholder = null
                curComponent && (cacheItems[curComponent] = items)
                this.curComponent = curComponent || 'GlobalPopSelect'
                this.$nextTick(function () {
                    Object.assign(this.PopSelect, {
                        isShow: true,
                        title,
                        subTitle,
                        emptyStatus,
                        items,
                        needSearch,
                        filter,
                        placeholder,
                        size,
                        type
                    })
                })
            },
            hiddenPopSelect() {
                hidden()
                this.curComponent = 'empty'
                this.PopSelect.isShow = false
            },
            onChange({ src, params }) {
                this.getRequest(src, Object.assign(this.params, params), 'getQueryData').then(datas => {
                    this.checkItemDefault(datas, this.selecteds)
                    this.PopSelect.items = []
                    this.$nextTick(function () {
                        this.PopSelect.items = datas
                        if (this.curComponent !== 'GlobalPopSelect') {
                            cacheItems[this.curComponent] = datas
                        }
                    })
                })
            },
            onSubmit(data) {
                this.PopSelect.promiseResolve(data)
                this.hiddenPopSelect()
            },
            onClose() {
                setTimeout(() => {
                    this.hiddenPopSelect()
                }, 300)
            },
            onMore(item) {
                this.getRequest(item.url, {}, 'getMoreData').then(body => {
                    if (body.length === 0) {
                        item.type = 'txt'
                    } else {
                        this.checkItemDefault(body, this.selecteds)
                        let index = this.PopSelect.items.indexOf(item)
                        this.PopSelect.items.splice(index, 1)
                        this.$nextTick(function () {
                            this.PopSelect.items.push(...body)
                            if (this.curComponent !== 'GlobalPopSelect') {
                                cacheItems[this.curComponent] = this.PopSelect.items
                            }
                        })
                    }
                })
            },
            checkItemDefault(items = [], selecteds = []) {
                items.forEach(item => {
                    if (item.items) {
                        item.default = false
                        item.items.forEach(mItem => {
                            mItem.default = !!selecteds.find(select => select.value === mItem.value)
                            item.default = mItem.default
                        })
                    } else {
                        item.default = !!selecteds.find(select => select.value === item.value)
                    }
                })
            },
            getRequest(url, data, action) {
                let request = url === 'isTest' ? getTestServer(action) : this.$diyAction
                data.bodyonly = true
                return this.$promiseWithUi(request(({ url, data })), { toast: true })
            }
        }
    })
}
