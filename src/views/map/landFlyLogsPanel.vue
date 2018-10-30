<template>
<section class="xa-view wrapper">
    <panelHeader class="xa-cell" style="overflow:hidden;">
        <div @click="$emit('changeTab',0)" class="xa-cell head-tab xa-txt-green">
            <i class="iconfont icon-danpin"></i>&nbsp;
            <span> 全部</span>
        </div>
        <div @click="$emit('changeTab',1)" class="head-tab">地块#{{landId}}</div>
        <div class="xa-flex">飞行记录</div>
        <i @click="displayType=!displayType" class="iconfont icon-daohang" :class="{'xa-txt-green':displayType}"></i>
    </panelHeader>
      <div class="xa-flex xa-container">
          <AppTable v-if="tables.length&&displayType" :value="selectedIndex"  @input="changeSelectIndex" trClass="xa-txt-12" :items="tables" />
          <div v-if="!displayType" class="xa-txt-12 xa-line__top xa-bg-white" style="padding:10px;position:relative;" v-for="(field,index) in fields" :key="index" @click="changeSelectIndex(index)" :class="{'xa-bg-f2':selectedIndex==index}">
              <div style="position:absolute;top:10px;right:10px;">#{{field.id}}</div>
              <div style="display:inline-block;width:50%;" v-for="(item,index) in field.items" :key="index">
                  {{item.key}}:{{item.value}}
              </div>
          </div>
      </div>
</section>
</template>
<script>
import panelHeader from './panelHeader.vue'
import AppTable from '../../components/AppTable.vue'
export default {
    components: {
        panelHeader,
        AppTable
    },
    data() {
        return {
            displayType: true,
            selectedIndex: -1,
            tables: [],
            fields: []
        }
    },
    watch: {
        selectedIndex(newId) {
            this.$emit('input', newId)
        }
    },
    props: {
        landId: String,
        promise: Promise
    },
    methods: {
        changeSelectIndex(index) {
            if (this.selectedIndex === index) {
                this.selectedIndex = -1
            } else {
                this.selectedIndex = index
            }
        }
    },
    created() {
        this.promise.then(data => {
            if (data.displayTable === undefined) {
                var table = []
                var tableHeader = []
                var fields = []
                data.data.forEach((log, index) => {
                    fields.push({
                        id: log.id,
                        items: log.fields
                    })
                    tableHeader.length === 0 && log.fields.forEach((field, i) => {
                        i < 6 && tableHeader.push(field.key)
                    })
                    table[index] = []
                    log.fields.forEach((field, i) => {
                        i < 6 && table[index].push(field.value)
                    })
                })
                table.unshift(tableHeader)
                data.displayTable = table
                data.displayFields = fields
            }
            this.tables = data.displayTable
            this.fields = data.displayFields
        })
    }
}
</script>
<style lang="scss" scoped>
.head-tab {
  position: relative;
  padding-left: 10px;
  padding-right: 20px;
  margin-right: 5px;
  line-height: 30px;
  &:active {
    background-clip: content-box;
    background-color: #ececec;
    color: #999 !important;
  }
}
.head-tab:after,
.head-tab:before {
  content: " ";
  position: absolute;
  right: 10px;
  top: 0;
  height: 100%;
  width: 1px;
  color: #d9d9d9;
  background: #cdcdcd;
}
.head-tab:before {
  transform: scaleX(0.5) rotate(45deg) translate(15px, 0px);
}
.head-tab:after {
  transform: scaleX(0.5) rotate(-45deg) translate(15px, 0px);
}
</style>
