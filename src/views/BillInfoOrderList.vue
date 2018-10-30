// 发票订单列表
<template>
<section class="xa-view">
    <section class="v-order xa-flex xa-container">
        <div class="xa-cell" v-for="item in list" :key="item.value" @click="onItemClick(item)">
           <i class="iconfont" :class="selected.indexOf(item.value)==-1?'icon-choose':'icon-xuanze xa-txt-red'" style="margin:0 8px;"></i>
           <item class="bill-item-box xa-bg-white" :items="item.items" :price="item.price"/>
        </div>
        <div v-if="isNeedMore" @click="onMoreClick" class="xa-txt-12" style="text-align:center;line-height:44px;">查看更多</div>
    </section>
    <div class="xa-cell bill-foot-btn xa-bg-white">
         <span @click="onSelectAllClick" :class="isSelectAll?'xa-txt-red':''"><i class="iconfont" :class="isSelectAll?'icon-xuanze':'icon-choose'" style="margin:0 8px;"></i>全选</span>
         <span class="xa-flex xa-txt-16" v-html="totalTip" style="margin:0 8px;"></span><span @click="onNextClick" class="xa-btn_alert" :class="selected.length?'xa-txt-white':'xa-txt-999'" style="padding:0 12px">下一步</span>
    </div>
</section>
</template>
<script>
import baseView from './BaseView.js'
let id = 0
function getTest() {
    return Promise.resolve({
        'doc_title': '极飞保障订单',
        'items': [
            {
                'value': '91A5DAE3E882D11EE06DDFF173FD0CC2' + id++,
                'price': '0.2',
                'items': [
                    {
                        'key': '订单编号',
                        'value': '221486199384144475'
                    },
                    {
                        'key': '支付流水号',
                        'value': '4005212001201702048699727799'
                    },
                    {
                        'key': '价格',
                        'value': 0.01
                    },
                    {
                        'key': '发票状态',
                        'value': '未申请'
                    },
                    {
                        'key': '类型',
                        'value': '未定义'
                    },
                    {
                        'key': '支付时间',
                        'value': '2017-02-04 17:10'
                    }
                ]
            },
            {
                'value': '376314026CE97713E3F419722402D8F6' + id++,
                'price': '0.1',
                'items': [
                    {
                        'key': '订单编号',
                        'value': '671484201327539754'
                    },
                    {
                        'key': '价格',
                        'value': 4000
                    },
                    {
                        'key': '发票状态',
                        'value': '未申请'
                    },
                    {
                        'key': '类型',
                        'value': '未定义'
                    },
                    {
                        'key': '支付时间',
                        'value': '2017-02-04 16:36'
                    }
                ]
            },
            {
                'value': '376314026CE97713E3F' + id++,
                'price': '20.3',
                'items': [
                    {
                        'key': '订单编号',
                        'value': '671484201327539754'
                    },
                    {
                        'key': '价格',
                        'value': 20.1
                    },
                    {
                        'key': '发票状态',
                        'value': '未申请'
                    },
                    {
                        'key': '类型',
                        'value': '未定义'
                    },
                    {
                        'key': '支付时间',
                        'value': '2017-02-04 16:36'
                    }
                ]
            }
        ],
        'pageMoreUrl': 'bills/list',
        'nextUrl': 'form?src=sdfdfdf&params='
    })
}
export default {
    extends: baseView,
    data() {
        return {
            list: [],
            isNeedMore: false,
            pageMoreUrl: '',
            nextUrl: '',
            selected: []
        }
    },
    components: {
        item: {
            render(h) {
                return h('div', { class: 'xa-cell xa-flex' }, [
                    h('div', { class: 'xa-flex' }, this.items.map(item => h('p', {}, item.key + ' : ' + item.value))),
                    h('p', { class: 'xa-txt-red xa-txt-12' }, ['￥', h('span', { class: 'xa-txt-16' }, this.price)])
                ])
            },
            props: {
                items: Array,
                price: [String, Number]
            }
        }
    },
    computed: {
        isSelectAll() {
            if (this.list.length) {
                return this.list.length === this.selected.length
            }
            return false
        },
        totalPrice() {
            let price = 0
            this.list.forEach(item => {
                if (this.selected.indexOf(item.value) > -1) {
                    price += parseFloat(item.price * 100)
                }
            })
            return price / 100
        },
        totalTip() {
            let count = this.selected.length
            let price = 0
            if (count) {
                price = this.totalPrice
            }
            return `共计：<span class="xa-txt-blue"> ${count} </span>项，共<span class="xa-txt-red"> ${price} </span>元`
        }
    },
    methods: {
        async onMoreClick() {
            this.isNeedMore = false
            const result = await this.baseRequest({ src: this.pageMoreUrl }, getTest)
            console.log(result)
            if (result.items && result.items.length > 0) {
                this.list = this.list.concat(result.items)
                if (result.pageMoreUrl) {
                    this.isNeedMore = true
                    this.pageMoreUrl = result.pageMoreUrl
                }
            }
        },
        onNextClick() {
            if (!this.selected.length) {
                return this.$showToast('最少选择一项！')
            }
            this.$emit('submit', {
                list: this.list.filter(item => this.selected.indexOf(item.value) > -1),
                nextUrl: this.nextUrl,
                amount: this.totalPrice
            })
        },
        onSelectAllClick() {
            if (this.isSelectAll) {
                this.selected = []
            } else {
                this.selected = this.list.map(item => item.value)
            }
        },
        onItemClick(item) {
            const index = this.selected.indexOf(item.value)
            if (index === -1) {
                this.selected.push(item.value)
            } else {
                this.selected.splice(index, 1)
            }
        }
    },
    async beforeMount() {
        const result = await this.baseInitFn(getTest)
        this.list = result.items
        if (result.pageMoreUrl) {
            this.isNeedMore = true
            this.pageMoreUrl = result.pageMoreUrl
            this.nextUrl = result.nextUrl
        }
        console.log('beforeMounted', result)
    }
}
</script>
<style scoped>
.v-order {
  padding-top: 6px;
}
.bill-item-box {
  margin: 4px 8px 4px 0;
  padding: 6px;
  box-shadow: 0px 0px 10px 2px #e0e0e0;
}
.bill-foot-btn {
  line-height: 44px;
  border-top: 1px solid #e4e4e4;
}
</style>
