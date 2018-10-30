<template>
<section class="xa-view">
    <section  class="xa-flex xa-container cell-wrapper">
        <div v-for="(land,index) in lands" :key="index" class="cell-container" :class="'cell_'+land.id">
            <Cell :selected="curLandId==land.id"  @click.native="$emit('select',land)"   @select="onCellSelect(land)"  :title="land.id" :checkBoxStatus="land.checkBoxStatus" :subTitles="land.subTitles" :type="land.type" />
        </div>
    </section>
    <div class="cell-footer xa-cell">
         <div class="xa-flex" :class="isSelectedAll&&'xa-txt-green'">
             <i style="position: relative;top: 1px;"  @click="onSelectedAll" class="iconfont" :class="!isSelectedAll?'icon-icfuxuankuang':'xa-txt-green icon-fuxuankuang'" ></i> 全选
         </div>
        <div>已选{{count}}个块地、共飞行<span v-html="totalTip"></span>亩</div>
    </div>
</section>
</template>
<script>
import Cell from './LandsPanelCell.vue'
export default {
    components: {
        Cell
    },
    data() {
        return {
            lands: [],
            count: 0,
            isSelectedAll: false,
            total: 0
        }
    },
    computed: {
        totalTip() {
            if (this.total > 0) {
                return `<span class="xa-txt-green">${this.total.toFixed(2)}</span>`
            }
            return this.total
        }
    },
    props: {
        values: Array,
        curLandId: String
    },
    methods: {
        onSelectedAll() {
            this.count = 0
            this.total = 0
            if (this.isSelectedAll === false) {
                this.lands.forEach(land => {
                    this.count++
                    this.total += land.statistics_num
                    land.checkBoxStatus = 3
                })
            } else {
                this.lands.forEach(land => {
                    land.checkBoxStatus = 1
                })
            }
            this.isSelectedAll = !this.isSelectedAll
        },
        onCellSelect(land) {
            if (land.checkBoxStatus === 3) {
                land.checkBoxStatus = 1
                this.count--
                this.total -= land.statistics_num
            } else {
                land.checkBoxStatus = 3
                this.count++
                this.total += land.statistics_num
            }
        }
    },
    created() {
        this.lands = this.values.map(land =>
            Object.assign({}, land, { checkBoxStatus: 1 })
        )
    }
}
</script>
<style lang="scss" scoped>
.cell-wrapper {
  flex-wrap: wrap;
}
.cell-container {
  display: inline-block;
  min-width: 33.33%;
  width: 33.33%;
  max-width: 33.33%;
}
.cell-footer {
  padding: 0 4px;
  font-size: 12px;
  line-height: 46px;
  background: #eee;
}
</style>
