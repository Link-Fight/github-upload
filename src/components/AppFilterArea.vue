<template>
<div>
    <div class="xa-cell xa-bg-f6 xa-txt-10 xa-txt-999" style="padding:0 8px;line-height:36px;">
        <div v-if="location" @click="$emit('submit',location)" class="xa-flex">当前定位区域：<span class="location-btn"><i class="iconfont icon-weizhi1"></i>{{location.name}}</span> </div>
        <span>请选择区域</span>
    </div>
    <section  class="item-container xa-cell" :class="{'xa-isloading':isLoading}">
        <section class="xa-flex" v-for="(path,index) in paths" :key="index">
            <itemsWrap class="items-wrap" :items="path"  :active="actives[index]" @click="onItemClick(index,arguments[0],arguments[1])" />
        </section>
    </section>
    <AppBtns class="xa-line__top" :items="[{
        txt: '取消',
        type: '',
        action: 'cancel'
    },{
         txt: '确定',
        type: 'submit',
        action: 'ok',
        color: '#fff'}]"  @click="onBtnClick"/>
</div>
</template>
<script>
const dataBase = {}
// const defaultGetUpAreasSrc = '/common/area/up_areas'
const defaultGetAreasSrc = '/common/area/areas'
export default {
    name: 'AppFilterArea',
    components: {
        itemsWrap: {
            render(h) {
                return h('div', {
                    style: { 'lineHeight': 32 + 'px' }
                }, this.items.map((item, index) =>
                    h('div', {
                        on: {
                            click: () => {
                                this.$emit('click', item.id, item.name)
                            }
                        },
                        class: this.active === item.id ? 'xa-txt-green' : ''
                    }, item.name)
                ))
            },
            props: {
                items: Array,
                active: Number
            }
        }
    },
    data() {
        return {
            isLoading: false,
            actives: [],
            paths: [],
            needPath: Boolean
        }
    },
    props: {
        location: Object,
        api: {
            type: String,
            default: defaultGetAreasSrc
        },
        level: {
            type: Number,
            default: 1
        }
    },
    methods: {
        onBtnClick({ action }) {
            if (action === 'cancel') {
                this.$emit('close')
            } else {
                if (this.actives.length > 0) {
                    this.emitResult(this.actives.length - 1)
                }
            }
        },
        emitResult(index) {
            if (index < 0) return
            let pathName = null
            let curId = this.actives[index]
            let curName = this.paths[index].find(item => item.id === curId)
            if (curName === undefined) {
                return this.emitResult(--index)
            }
            if (this.needPath) {
                let path = []
                for (var i = 0; i <= index; i++) {
                    path.push(this.paths[i].find(item => item.id === this.actives[i]).name)
                }
                pathName = path.join('/')
            }
            this.$emit('submit', {
                id: curId,
                name: curName.name,
                pathName
            })
        },
        onItemClick(index, id) {
            this.actives[index] = id
            this.actives = Array.from(this.actives)
            if (index < this.paths.length - 1) {
                this.paths.splice(index + 1, this.paths.length - index - 1)
            }
            if (this.level > 0) {
                if (this.paths.length >= this.level) {
                    return
                }
            }
            this.loadData({ upid: id }).then(data => {
                if (data.length) {
                    this.paths[index + 1] = data
                    this.paths = Array.from(this.paths)
                }
            })
        },
        loadData(params) {
            let paramsKey = JSON.stringify(params)
            if (dataBase[this.api][paramsKey]) {
                return Promise.resolve(dataBase[this.api][paramsKey])
            }
            this.isLoading = true
            return this.$diyAction({
                url: defaultGetAreasSrc,
                data: params
            }).then(data => {
                this.isLoading = false
                dataBase[this.api][paramsKey] = data
                return data
            })
        }
    },
    created() {
        dataBase[this.api] || (dataBase[this.api] = {})
        this.loadData({}).then(data => {
            this.paths.push(data)
        })
    }
}
</script>
<style lang="scss" scoped>
.item-container {
  padding: 8px;
}
.items-wrap {
  height: 40vh;
  padding: 0 4px;
  align-items: start;
  overflow-y: auto;
}
.location-btn {
  color: #42bd56;
  border: 1px solid;
  padding: 1px 4px;
  border-radius: 6px;
}
</style>