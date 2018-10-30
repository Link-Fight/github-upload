
export default {
    name: 'baseView',
    render(h) { return h('div') },
    data() {
        return {
            isTest: !!this.$route.query.isTest,
            location: !!this.$route.query.location,
            oldTitle: this.curRoute && this.curRoute.title,
            share: null // 页面分享配置
        }
    },
    watch: {
        $route(to, from) {
            if (this.curRoute) {
                return
            }
            if (from) {
                let needRefresh = false
                if (to && from) {
                    if (to.query.src !== from.query.src || to.query.params !== from.query.params || to.query.T !== from.query.T) {
                        needRefresh = true
                    }
                }
                if (needRefresh) {
                    this.initFn && this.initFn(to)
                }
            }
        }
    },
    props: {
        // 父页面传递下来的路由信息 {src,params}
        curRoute: Object
    },
    methods: {
        baseSessionUpdateFn(storageKey, ...agv) {
            this.$util.setSessionStorage(storageKey, '')
            return this.baseSessionInitFn(storageKey, ...agv)
        },
        baseSessionInitFn(storageKey, ...agv) {
            let storageValue = null
            if (!storageKey) {
                storageKey = window.location.hash
            }
            storageValue = this.$util.getSessionStorage(storageKey)
            if (storageValue) {
                return Promise.resolve(this.baseHandleViewConfig(storageValue))
            } else {
                return this.baseInitFn(...agv).then(data => {
                    this.$util.setSessionStorage(storageKey, data)
                    return data
                })
            }
        },
        baseInitFn(testPromise, isTest = this.isTest) {
            return this.baseRequest(this.curRoute || this.$extractRouteInfo(), testPromise, this.curRoute && this.curRoute.src === 'isTest' ? true : isTest)
        },
        baseRequest({ src, params = {} }, testPromise, isTest = this.isTest) {
            let promise = new Promise(resolve => {
                if (params.location) {
                    this.$getLocation().then(data => {
                        Object.assign(params, data)
                        resolve()
                    }).catch(() => resolve())
                } else {
                    resolve()
                }
            })
            let dataPromise = isTest && testPromise ? testPromise : this.$diyAction
            return this.$promiseWithUi(promise.then(() => dataPromise({
                url: src,
                data: params
            }))).then(this.baseHandleViewConfig)
        },
        baseAction(cfg) {
            return this.$promiseWithUi(this.$diyAction(cfg)).then(this.baseHandleViewConfig)
        },
        baseHandleViewConfig(data) {
            (data.title || data.doc_title) && this.$setDocTitle(data.title || data.doc_title || this.oldTitle)
            this.oldTitle = data.title || this.oldTitle
            this.share = null
            let share = data.share ? data.share : {
                title: this.oldTitle,
                imgUrl: 'http://xct.xair.cn/farmingsrv.jpg',
                desc: ''
            }
            if (share && share.title) {
                this.share = data.share
                this.configToShare(share)
            }
            return data
        },
        configToShare(share) {
            share.link = share.link || document.location.href
            share.imgSrc = share.imgSrc ? window.encodeURI(share.imgSrc) : 'http://static.xag.cn/v3/WechatIMG6512.jpeg?imageView2/1/w/50/h/50'
            this.$wxAction.config().then(() => {
                this.$wxAction.toShareConfig(Object.assign({}, share, {
                    fail(res) {
                        alert(JSON.stringify(res))
                    }
                }))
            })
        },
        onBaseBottomBtnClick(btnCfg, event, refreshFn) {
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data) {
                    refreshFn ? refreshFn() : (this.initFn && this.initFn())
                } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                    this.$showPopBtnsBottom(btnCfg.items, event.target).then(btnCfg => this.onBtnClick(btnCfg, event))
                }
            })
        }
    },
    activated() {
        this.share && this.configToShare(this.share)
        this.oldTitle && this.$setDocTitle(this.oldTitle)
    },
    beforeRouteLeave(to, from, next) {
        next()
    }
}
