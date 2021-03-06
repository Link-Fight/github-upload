<template>
<transition name="fadeshow">
    <section>
        <div v-if="modal" class="weui-mask" @click="$emit('close')"></div>
        <section class="area-wrap max-page-width xa-view" :class="{modal:modal}">
            <areaTitle @cancel="$emit('close')" @comfirm="emit()"><slot>请选择</slot></areaTitle>
            <slot name="header"></slot>
            <div class="list-header xa-cell">
                <div v-for="(m,index) in menus" :key="index" @click="onMenuClick(m)" :class="{active:curMenu.id===m.id}" class="area-menu">{{m.name}}</div>
            </div>
            <main ref="scrollwrap" class="list-wrapper xa-flex selected-container">
                <slot name="items" v-for="item in items" :item="item" :curMenu="curMenu" :onItemClick="onItemClick">
                    <div @click="onItemClick(item)" class="area-item" :class="{active:curMenu.id ===item.id}" :key="item.id">
                        {{item.name}}
                    </div>
                </slot>
                <loading v-show="items.length===0"></loading>
            </main>
        </section>
    </section>
</transition>
</template>
<script>
import loading from './loading.vue'
import areaTitle from './title.vue'
const defaultGetUpAreasSrc = '/common/area/up_areas'
const defaultGetAreasSrc = '/common/area/areas'
function $service() {
    let key = JSON.stringify(Array.prototype.slice.call(arguments, 0))
    let cache = this.$options.store[this.saveKey][key]
    if (cache) {
        return Promise.resolve(cache)
    } else {
        return this.service.apply(this, arguments).then(data => (this.$options.store[this.saveKey][key] = data))
    }
}
function $saveDatas(key, datas) {
    this.$options.store[this.saveKey][key] = datas
}
const placeholder = {
    upid: 0,
    id: '-',
    name: '请选择'
}
export default {
    components: { loading, areaTitle },
    store: Object.create(null),
    scrollStore: Object.create(null),
    $service: null,
    $saveDatas: null,
    data() {
        return {
            menus: [Object.assign({}, placeholder)],
            items: [],
            curMenu: Object.assign({}, placeholder),
            seletedStatus: '' // 【''/'UP'】  ''表示从根节点开始、'UP'表示是从某个子节点开始
        }
    },
    props: {
        modal: {
            type: Boolean,
            default: true
        },
        service: {
            type: Function,
            required: true
        },
        getAreas: {
            type: String,
            default: defaultGetAreasSrc
        },
        getUpAreas: {
            type: String,
            default: defaultGetUpAreasSrc
        },
        saveKey: {
            type: String,
            default: '___'
        },
        value: {
            type: Object,
            default() {
                return {
                    // id: 580
                }
            }
        },
        /** @augments maxLevel 选择到指定层级就终止 */
        maxLevel: Number
    },
    methods: {
        onMenuClick(menu) {
            if (menu.id === this.curMenu.id) return
            this.updateCurItems(menu.upid, menu.id === placeholder.id ? this.curMenu.upid : menu.id)
            this.curMenu = menu
        },
        onItemClick(item) {
            let index
            if (item.id) {
                if (this.seletedStatus === 'UP') {
                    this.menus.push(Object.assign({}, placeholder))
                    this.seletedStatus = ''
                    return this.onItemClick(item)
                }
                if (this.curMenu.id === placeholder.id) {
                    index = this.menus.length - 1
                    this.menus.splice(index, 0, item)
                } else {
                    index = this.menus.indexOf(this.curMenu)
                    this.menus.splice(index, this.menus.length - 1 - index, item)
                    this.onMenuClick(this.menus[this.menus.length - 1])
                }
                this.menus[this.menus.length - 1].upid = item.id
                item.upid = item.upid || (index === 0 ? 0 : this.menus[index - 1].id)
                this.updateCurItems(item.id, item.upid, item)
            }
        },
        updateCurItems(enterId, leaveId, item) {
            if (this.maxLevel) {
                if (this.menus.length > this.maxLevel) {
                    this.emit()
                    return
                }
            }
            this.$options.scrollStore[this.saveKey][leaveId] = this.$refs.scrollwrap.scrollTop
            this.items = []
            this.$options.$service({ url: this.getAreas, data: { upid: enterId } }).then(data => {
                this.items = data
                if (data.length === 0) {
                    this.emit()
                }
            }).then(() => {
                this.$refs.scrollwrap && (this.$refs.scrollwrap.scrollTop = this.$options.scrollStore[this.saveKey][enterId] || 0)
            })
        },
        emit() {
            let name = ''
            let id
            let level = 0
            let path = []
            this.menus.forEach(menu => {
                if (menu.id !== placeholder.id) {
                    name += ' ' + menu.name
                    id = menu.id
                    level++
                    path.push(menu)
                }
            })
            if (path.length === 0) {
                this.$emit('close', null)
            } else {
                this.$emit('change', {
                    id, name, level, path
                })
            }
        }
    },
    created() {
        if (this.saveKey) {
            this.$options.store[this.saveKey] = this.$options.store[this.saveKey] || {}
            this.$options.scrollStore[this.saveKey] = this.$options.scrollStore[this.saveKey] || {}
            this.$options.$service = $service.bind(this)
        } else {
            this.$options.$service = this.service
        }
        if (this.value && this.value.id) {
            this.$options.$saveDatas = $saveDatas.bind(this)
            this.$options.$service({ url: this.getUpAreas, data: { id: this.value.id } }).then(data => {
                data.sort((mP, mA) => mP.level - mA.level)
                let menus = []
                for (let i = 0; i < data.length; i++) {
                    let menu = {
                        upid: i === 0 ? 0 : data[i - 1].id,
                        id: data[i].id,
                        name: data[i].name
                    }
                    menus.push(menu)
                    this.$options.$saveDatas(JSON.stringify([this.getAreas, { upid: menu.upid }]), data[i].data)
                }
                this.menus = menus
                this.onMenuClick(this.menus[menus.length - 1])
                this.seletedStatus = 'UP'
            })
        } else {
            this.$options.$service({ url: this.getAreas }).then(data => { this.items = data })
        }
    }
}
</script>
<style scoped>
.selected-container {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
.area-wrap.modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5000;
  background-color: #ffffff;
  height: 70vh;
}

.area-title {
  line-height: 40px;
  height: 40px;
  padding: 0 8px;
}

.area-menu {
  position: relative;
  margin-right: 8px;
}

.area-item.active,
.area-menu.active {
  color: #42bd56;
}

.area-menu.active::after {
  position: absolute;
  right: 1px;
  bottom: 1px;
  left: 1px;
  height: 2px;
  background-color: #42bd56;
  content: " ";
}

.area-item > .iconfont {
  display: none;
}

.area-item.active > .iconfont {
  display: initial;
}

.action {
  line-height: 26px;
}
.list-header,
.list-wrapper {
  text-indent: 8px;
}
.list-header {
  background-color: #f2f2f2;
  line-height: 2.8em;
}
.list-wrapper {
  line-height: 2.4em;
}
</style>