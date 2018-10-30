export default {
    namespaced: true,
    state: {
        hasInit: false,
        id: '',
        name: '',
        identification: 1,
        qr: '#/qrcode?isTest=1',
        position: '',
        phone: '',
        email: '',
        avatar: null,
        status: [],
        licence: [],
        titles: []
    },
    mutations: {
        updateVariable(state, { variable, value }) {
            state[variable] = value
        },
        update(state, newState) {
            state.hasInit = true
            Object.assign(state, newState)
        }
    },
    getters: {}
}