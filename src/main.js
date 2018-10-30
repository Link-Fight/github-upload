// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// /* global Vue, Vuex */
import App from './App'
import router from './router'
import Vuex from 'vuex'
import xaPlugin from './plugin'
import gobalCom from './gobalComs'
import 'weui'
import './assets/common.scss'
import store from './Store/index'
import baseApp from './baseApp'
// #region
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(xaPlugin)
Vue.use(gobalCom)

// #endregion
/* eslint-disable no-new */
function toStart() {
    new Vue({
        el: '#app',
        extends: baseApp(Vue),
        router,
        store: new Vuex.Store(store),
        components: { App },
        template: '<App/>'
    })

    router.beforeEach((to, from, next) => {
        if (to.meta && to.meta.title) {
            Vue.prototype.$setDocTitle(to.meta.title)
        }
        next()
    })
}
Vue.prototype.$wxConfig().then(() => toStart(), () => toStart())
