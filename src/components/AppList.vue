<template>
  <section class="xa-view">
      <AppFilters v-if="filter&&filter.items&&filter.items.length" @submit="$emit('filterSubmit',arguments[0])" :items="filter.items" :result="filter.result" style="z-index:1000"/>
      <section ref="wrap" class="xa-flex xa-container">
           <TouchEvent v-if="listenRefresh" :style="paddingTop?'margin-bottom:'+paddingTop+'px':''" @change="$emit('touchEvent',arguments[0])"/>
           <div v-for="(item,index) in items" :key="index" :class="itemsClass">
                <slot :item="item">
                    <div> {{item}}</div>
                </slot>
            </div>
            <template v-if="items.length===0">
                <slot name="empty">
                    <section class="xa-cell xa-txt-center">
                        <p class="xa-flex xa-txt-999">{{emptyTip}}</p>
                    </section>
                </slot>
            </template>
      </section>
  </section>
</template>
<script>
const ScrollTop = {}
export default {
    name: 'AppList',
    components: {
        AppFilters: () => import('@/components/AppFilters.vue')
    },
    data() {
        return {
            id: parseInt(Math.random() * 10000)
        }
    },
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        },
        listenRefresh: {
            type: Boolean,
            default: true
        },
        filter: Object,
        itemsClass: String,
        paddingTop: [Number, String],
        emptyTip: String
    },
    methods: {
        keepScrollTop() {
            ScrollTop[this.id] = this.$refs.wrap.scrollTop
        }
    },
    activated() {
        if (ScrollTop[this.id]) {
            this.$refs.wrap.scrollTop = ScrollTop[this.id]
            ScrollTop[this.id] = null
        }
    }
}
</script>