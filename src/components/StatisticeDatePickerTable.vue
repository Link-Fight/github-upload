<template>
  <div class="st-date-pick-table xa-txt-333 xa-txt-center">
        <template v-for="(rows,rowIndex) in items">
            <ul :key="rowIndex" class="st-date-pick-table__row xa-cell">
                <li class="xa-flex" v-for="(col,mIndex) in rows" :key="mIndex" name="fade" tag="li">
                    <span :key="mIndex" @click="$emit('click',col)" class="st-date-pick-table__cell" :date-row="rowIndex" :class="col | activeClassFilter(checkActive,activeClass)">{{col.num||col}}</span>
                </li>
            </ul>
        </template>
</div>
</template>
<script>
export default {
    name: 'StatisticeDatePickerTable',
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        },
        checkActive: {
            type: Function
        },
        activeClass: String
    },
    filters: {
        activeClassFilter(item, checkActive, activeClass) {
            if (checkActive) {
                let flag = checkActive(item)
                return (flag ? (activeClass || 'active') : '') + ' ' + item.type
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.st-date-pick-table {
  &__row + &__row {
    margin-top: 12px;
  }
  &__cell {
    display: inline-block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 5px solid transparent;
    &.next,
    &.prev {
      color: #999;
    }
    &.active {
      background-color: #42bd56;
      background-clip: content-box;
      color: #fff;
    }
  }
}
</style>
