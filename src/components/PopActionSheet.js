import PopActionSheet from './PopActionSheet.vue'
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { GlobalPopActionSheet: Object.assign({ name: 'GlobalPopActionSheet' }, PopActionSheet) },
        template: `<GlobalPopActionSheet v-if="PopActionSheet.isShow"
                        @close="PopActionSheet.isShow=false"
                        :title="PopActionSheet.title"
                        :items="PopActionSheet.items"
                        :resolve="PopActionSheet.resolve"
                        />`,
        data: {
            PopActionSheet: {
                isShow: false,
                title: '',
                items: [],
                resolve: null
            }
        },
        methods: {
            showPopActionSheet(items, title) {
                return new Promise((resolve) => {
                    this.PopActionSheet.isShow = true
                    this.PopActionSheet.title = title || ''
                    this.PopActionSheet.items = items
                    this.PopActionSheet.resolve = resolve
                })
            },
            hiddenPopActionSheet() {
                this.PopActionSheet.isShow = false
            }
        }
    })
}