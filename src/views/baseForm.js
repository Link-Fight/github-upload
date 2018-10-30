import baseView from './BaseView.js'
export default {
    extends: baseView,
    data() {
        return {
            header: null,
            needCache: false,
            cacheKey: '',
            items: [],
            variables: {},
            needRequireTip: true
        }
    },
    components: {
        DiyFormFactory: () => import('@/components/DiyFormFactory.vue')
    },
    methods: {
        getTestServer(params) {
            return import('@/config/DiyForm.js').then(({ getInitData }) => getInitData(params))
        },
        initFn() {
            this.items = []
            let todo = null
            return this.baseInitFn(this.getTestServer).then(data => {
                this.header = data.header || null
                if (this.header && this.header.autoShow && this.header.action === 'DOC') {
                    todo = () => this.$onConfigBtnClick(this.header)
                }
                this.needRequireTip = data.needRequireTip
                if (this.header && this.header.href) {
                    this.header.access = ''
                }
                if (data.diy_form_guid) {
                    this.needCache = true
                    this.cacheKey = data.diy_form_guid
                    let storageValue = this.$util.getStorage('diyForm_variables_' + this.cacheKey)
                    if (storageValue) {
                        try {
                            let variables = storageValue.variables
                            let tip = `<div style="text-align:left;">${'您上次填写的内容还没有提交，是否继续该表单的填写？取消将删除该表单。' + (storageValue.TIME ? '<br>记录于：' + storageValue.TIME : '')}</div>`
                            this.$showConfirm(tip, '').then(({ action }) => {
                                if (action === 'ok') {
                                    data.variables = data.variables || {}
                                    Object.assign(data.variables, variables)
                                } else {
                                    this.$util.setStorage('diyForm_variables_' + this.cacheKey, null)
                                }
                                this.showForm(data, todo)
                            })
                        } catch (error) {
                            this.showForm(data, todo)
                        }
                        return
                    }
                }
                this.showForm(data, todo)
            })
        },
        showForm(data, todo) {
            todo && todo()
            Object.assign(this.$data, data)
        }
    },
    created() {
        this.initFn()
    }
}