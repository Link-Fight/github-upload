import Vue from 'vue'
const Coms = {}
export default {
    data() {
        return {
            isLoading: '',
            curComponent: ''
        }
    },
    methods: {
        loadAsyncCom(ayncCom) {
            return new Promise(resolve => ayncCom(resolve))
        },
        findTarget(items, fn) {
            for (var i = 0; i < items.length; i++) {
                if (fn(items[i])) {
                    return items[i]
                }
            }
        },
        getRouterView(pre, path, comName) {
            if (Coms[comName]) {
                this.curComponent = comName
            } else {
                let curRouter = this.findTarget(this.$router.options.routes, (item) => item.path === '/' + path)
                this.loadAsyncCom(curRouter.component).then(data => {
                    Vue.component(comName, Object.assign({
                        name: comName
                    }, data.default))
                    Coms[comName] = true
                    setTimeout(() => {
                        this.isLoading = false
                        this.curComponent = comName
                    }, 200)
                })
            }
        }
    }
}