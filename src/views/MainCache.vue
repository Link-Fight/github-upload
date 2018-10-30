<template>
<section class="v-maincahe" :class="{'xa-default__bg':isLoading}">
    <keep-alive :exclude="exclude">
        <component :is="curComponent" :curRoute="curRoute" />
    </keep-alive>
</section>
</template>
<script>
import Vue from 'vue'
// /* global Vue */
let componentStore = {}
/*

{
    [comName]:{
        timestamp: '',
        curName: '',
        count: 0
    }
}

*/
export default {
    name: 'MainCeche',
    data() {
        return {
            isLoading: false,
            curComponent: '',
            curRoute: {},
            exclude: []
        }
    },
    watch: {
        $route(to, from) {
            if (to && from && to.name === 'MainCache') {
                let needRefresh = false
                if (to.query.src !== from.query.src || to.query.params !== from.query.params || to.query.T !== from.query.T) {
                    needRefresh = true
                }
                if (needRefresh) {
                    this.initFn()
                }
            }
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
        getRouterView(comName, timeStamp = 0) {
            let comCfg = componentStore[comName]
            if (comCfg) {
                console.log('mainCache', comCfg.timeStamp, timeStamp)
                if (comCfg.timeStamp < timeStamp) {
                    comCfg.timeStamp = timeStamp
                    comCfg.count++
                    this.exclude.shift()
                    this.exclude.push(comCfg.curName)
                    let oldName = comCfg.curName
                    this.$nextTick(function () {
                        this.curComponent = oldName
                    })
                } else {
                    this.curRoute = this.$extractRouteInfo()
                    this.curComponent = comCfg.curName
                    return
                }
            } else {
                comCfg = componentStore[comName] = {
                    timeStamp: timeStamp,
                    count: 0,
                    curName: ''
                }
            }
            this.$nextTick(function () {
                this.curRoute = this.$extractRouteInfo()
                this.createDiyComponents(comName, comCfg)
            })
        },
        createDiyComponents(comName, comCfg) {
            this.isLoading = true
            console.log('mainCache', comName, comCfg)
            let curRouter = this.findTarget(this.$router.options.routes, (item) => item.path === '/' + this.$route.params.child)
            if (curRouter) {
                comCfg.curName = comName + '' + comCfg.count
                this.loadAsyncCom(curRouter.component).then(data => {
                    Vue.component(comCfg.curName, Object.assign({}, data.default, {
                        name: comCfg.curName
                    }))
                    setTimeout(() => {
                        this.isLoading = false
                        this.curComponent = comCfg.curName
                    }, 200)
                })
            } else {
                window.alert('暂不支持该类型页面：' + comName)
            }
        },
        handleComponentsName(name) {
            return name.replace(/\W/g, '')
        },
        initFn() {
            console.log('mainCache', this.$route)
            let key = this.$route.params.child + this.$route.fullPath.replace(this.$route.path, '')
            if (this.$route.query.T) {
                key = key.replace('T=' + this.$route.query.T, '')
            }
            this.getRouterView(this.handleComponentsName(decodeURIComponent(key)), this.$route.query.T)
        }
    },
    mounted() {
        this.initFn()
    }
}
</script>
<style lang="scss">
.v-maincahe.xa-default__bg section {
  opacity: 0.5;
}
</style>
