<template>
  <section class="xa-view" v-show="!isLoading">
      <!-- <div style="height:64px"></div> -->
      <TaskDatePicker v-if="!isLoading" class="taskview-header" :btns="config.btns"  @submit="onDatePickersubmit"></TaskDatePicker>
      <section ref="wrap" class="xa-flex xa-container xa-bg-f6" style="padding:16px 15px 0">
          <div class="xa-bg-white" style="margin-bottom:16px" v-for="(item) in items" :key="item.label" :class="'item_'+item.label">
              <TaskListItem  :label="item.label" :promise="item.promise" :active="curDateLable==item.label"></TaskListItem>
          </div>
      </section>
  </section>
</template>
<script>
import startMove from '@/util/startMove.js'
import baseView from './BaseView.js'
import TaskDatePicker from '../components/TaskDatePicker.vue'
import TaskListItem from '../components/TaskListItem.vue'
import { getInitData, getQueryData } from '../config/ViewTask'
export default {
    name: 'TaskView',
    extends: baseView,
    components: {
        TaskDatePicker,
        TaskListItem
    },
    data() {
        return {
            isTest: !!this.$route.query.isTest,
            isLoading: true,
            config: {
                btns: [],
                queryApi: ''
            },
            items: [],
            curDateLable: ''
        }
    },
    methods: {
        onDatePickersubmit(time) {
            let targetItem = this.items.find(item => item.label === time.label)
            if (targetItem === undefined) {
                let params = Object.assign({
                    time: time.time
                }, this.params)
                let newItem = {
                    label: time.label,
                    num: time.num,
                    promise: this.isTest ? getQueryData(params) : this.$diyAction({ url: this.config.queryApi, params })
                }
                let index = 0
                for (index = 0; index < this.items.length; index++) {
                    if (time.num < this.items[index].num) {
                        break
                    }
                }
                if (index === 0) {
                    this.items.unshift(newItem)
                } else {
                    this.items.splice(index, 0, newItem)
                }
            }
            this.curDateLable = time.label
            this.$nextTick(function () {
                this.moveToActiveDate()
            })
        },
        moveToActiveDate() {
            if (this.$refs.wrap) {
                let activeEle = this.$refs.wrap.querySelector('.item_' + this.curDateLable)
                console.log(activeEle.offsetTop)
                startMove(this.$refs.wrap, {
                    scrollTop: activeEle.offsetTop
                })()
            }
        },
        initFn() {
            return this.baseInitFn(getInitData).then(data => {
                Object.assign(this.config, data)
            })
        }
    },
    created() {
        this.initFn().then(() => {
            this.isLoading = false
        })
    }
}
</script>
<style lang="scss" scoped>
// .xa-view {
//   background-image: url("../assets/V4_task_new.png");
//   background-repeat: no-repeat;
//   background-size: 375px;
// }
.taskview-header {
  z-index: 10;
  box-shadow: 0px 1px 20px #999999;
}
</style>
