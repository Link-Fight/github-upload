<template>
<div>
    <div class="xa-cell xa-bg-f6 xa-txt-10 xa-txt-999" style="padding:0 8px;line-height:36px;">
        <span>{{title}}</span>
    </div>
    <section  class="item-container xa-cell">
        <itemsWrap class="items-wrap" :items="items"  :active="index" @click="onItemClick" />
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
export default {
    components: {
        itemsWrap: {
            render(h) {
                return h('div', {
                    style: { 'lineHeight': 32 + 'px' }
                }, this.items.map((item, index) =>
                    h('div', {
                        on: {
                            click: () => {
                                this.$emit('click', index)
                            }
                        },
                        class: this.active === index ? 'xa-txt-green' : ''
                    }, item.label)
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
            index: 0
        }
    },
    props: {
        title: {
            type: String,
            default: '请选择'
        },
        items: {
            type: Array,
            default() {
                return [{
                    'value': '0',
                    'label': '智能距离'
                },
                {
                    'value': 1,
                    'label': '50km'
                },
                {
                    'value': 2,
                    'label': '100km'
                },
                {
                    'value': 3,
                    'label': '200km'
                }
                ]
            }
        }
    },
    methods: {
        onItemClick(index) {
            this.index = index
        },
        onBtnClick({ action }) {
            if (action === 'cancel') {
                this.$emit('close')
            } else {
                if (this.index !== -1) {
                    this.$emit('submit', this.items[this.index])
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.item-container {
  padding: 8px;
}
.items-wrap {
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
