<template>
<div class="weui-cells" style="margin-top:0;">
  <LinkCell v-if="title" :title="title" icon="" value="" href="" :child="true"></LinkCell>
  <div v-if="theme=='steps'" class="step-box xa-cell">
    <div v-for="(item,index) in items" :key="index" :class="{'step-item-done':item.status,'step-item-cur':index===lastCurIndex}" class="step-item xa-flex xa-cell">
        <span class="step-line"></span>
        <div class="step-circle">
            <span class="step-txt">{{index+1}}</span>
            <span class="step-icon iconfont icon-dui"></span>
        </div>
    </div>
  </div>
  <div class="weui-cell xa-txt-center">
    <div class="cell-item xa-flex" v-for="(item,index) in items" :key="index">
      <p class="xa-txt-14 xa-txt-333">{{item.value}}</p>
      <p class="xa-txt-14 xa-txt-999">{{item.title}}</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
    name: 'StatisticeCells',
    props: {
        title: {
            type: String,
            default: ''
        },
        theme: String,
        items: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: {
        lastCurIndex() {
            let last = -1
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].status) {
                    last = i
                }
            }
            return last
        }
    }
}
</script>
<style lang="scss" scoped>
p.xa-txt-12 {
  line-height: 22px;
}
.cell-item {
  position: relative;
}
.cell-item + .cell-item::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 1px;
  background-color: #e5e5e5;
  transform: scale3d(0.5, 1, 1);
}
.step-box {
  padding: 0 15px;
  .step-item {
    position: relative;
    justify-content: center;
  }
  .step-circle {
    z-index: 1;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    color: #666;
    background-color: #fff;
    border: 1px solid;
  }
  .step-line {
    position: absolute;
    top: 20px;
    right: 50%;
    width: 100%;
    background-color: #666;
    height: 1px;
  }
  .step-icon {
    display: none;
  }
  .step-item-done {
    .step-circle {
      color: #42bd56;
    }
    .step-txt {
      display: none;
    }
    .step-icon {
      display: initial;
    }
    & + .step-item-done {
      .step-line {
        background-color: #42bd56;
      }
    }
  }
  .step-item-cur {
    .step-txt {
      display: initial;
    }
    .step-icon {
      display: none;
    }
  }
  .step-item:first-child {
    .step-line {
      display: none;
    }
  }
}
.step-box + .weui-cell:before {
  content: " ";
  display: none;
}
.step-box + .weui-cell {
  .cell-item + .cell-item::before {
    content: " ";
    display: none;
  }
}
</style>
