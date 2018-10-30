export default {
    namespaced: true,
    state: {
        hasInit: false,
        topItems: [],
        items: [],
        visibleApi: '',
        sortApi: '',
        valueApi: ''
    },
    mutations: {
        updateVariable(state, { variable, value }) {
            state[variable] = value
        },
        update(state, newState) {
            state.hasInit = true
            if (newState.top) {
                state.topItems = newState.top
            }
            if (newState.body || newState.items) {
                state.items = newState.body || newState.items
            }
            if (newState.visibleApi) {
                state.visibleApi = newState.visibleApi
            }
            if (newState.sortApi) {
                state.sortApi = newState.sortApi
            }
            if (newState.valueApi) {
                state.valueApi = newState.valueApi
            }
        }
    }
}