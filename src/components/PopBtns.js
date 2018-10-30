import PopBtns from './PopBtns.vue'
export function install(Vue, parent) {
    let el = document.createElement('div')
    parent ? parent.appendChild(el) : document.body.appendChild(el)
    return new Vue({
        el,
        components: { GlobalPopBtns: Object.assign({ name: 'GlobalPopBtns' }, PopBtns) },
        template: `<GlobalPopBtns v-if="PopBtns.isShow"
                        :theme="PopBtns.theme"
                        @click="onClick"
                        @close="PopBtns.isShow=false"
                        :style="PopBtns.style" 
                        :items="PopBtns.items" 
                        :align="PopBtns.align" 
                        :xDistince="PopBtns.xDistince"/>`,
        data: {
            PopBtns: {
                isShow: false,
                theme: '',
                items: [],
                xDistince: '0',
                align: 'right',
                style: {
                    top: '12px',
                    right: '0px'
                },
                promiseResolve: null
            }
        },
        methods: {
            showPopBtns(items, style, x, align, theme) {
                return new Promise((resolve) => {
                    this.PopBtns.isShow = true
                    this.PopBtns.items = items
                    this.PopBtns.style = Object.assign({ position: 'fixed' }, style)
                    this.PopBtns.xDistince = x
                    this.PopBtns.theme = theme || ''
                    this.PopBtns.align = align || 'right'
                    this.PopBtns.promiseResolve = resolve
                })
            },
            hiddenPopBtns() {
                this.PopBtns.isShow = false
            },
            showPopBtnsBottom(btns, target, cfg = {}) {
                let { align, theme, x } = cfg
                align = align || 'center'
                theme = theme || 'bottom'
                x = x || 0
                let rect = target instanceof window.HTMLElement ? target.getBoundingClientRect() : target
                let style = {
                    top: rect['top'] + 'px',
                    left: (rect['left'] + rect['right']) / 2 + 'px',
                    right: 'auto'
                }
                return this.showPopBtns(btns, style, x, align, theme)
            },
            onClick(item) {
                this.PopBtns.promiseResolve(item)
                this.PopBtns.isShow = false
            }
        }
    })
}