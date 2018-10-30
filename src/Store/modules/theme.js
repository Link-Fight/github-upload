import { setStorage, getStorage } from '../../util/index'
function init() {
    return Object.assign({
        isDark: false
    },
        getStorage('STORE_THEME') || {}
    )
}
export default {
    namespaced: true,
    state: init(),
    mutations: {
        update(state, newState) {
            let newValue = Object.assign(state, newState)
            setStorage('STORE_THEME', newValue)
        }
    }
}