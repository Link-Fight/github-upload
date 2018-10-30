<template>
  <DiyListHeader class="list-filter-header" @refresh="$emit('refresh')" @btnClick="$emit('btnClick',arguments[0])" :needSearch="false" :btns="btns">
      <AppFilters class="xa-flex" v-if="filter&&filter.items&&filter.items.length" :isFull="true" :classPlain="true" @submit="$emit('filterSubmit',arguments[0])" :items="filter.items" :result="filter.result" style="z-index:1000;margin-left:10px;"/>
  </DiyListHeader>
</template>
<script>
import DiyListHeaderProps from './DiyListHeaderProps'
export default {
    name: 'DiyListFiltersHeader',
    mixins: [DiyListHeaderProps],
    components: {
        AppFilters: () => import('@/components/AppFilters.vue')
    },
    props: {
        filter: {
            type: Object
        }
    }
}
</script>
<style lang="scss">
.list-filter-header div.filters-items__wrapper {
  max-height: 80vh;
}
</style>
