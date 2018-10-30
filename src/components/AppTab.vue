<template>
  <div class="xa-cell xa-Tab xa-txt-center xa-bg-white xa-txt-999" :class="theme">
      <div class="xa-flex" v-for="(item,mIndex) in items" :class="{'active':value==mIndex}" :key="mIndex" @click="$emit('input',mIndex)">{{item.title||item.txt||item}}</div>
      <div class="index-line" :style="indexLineStyle"></div>
  </div>
</template>
<script>
export default {
    name: 'AppTab',
    computed: {
        indexLineStyle() {
            return {
                left: (this.value / this.items.length * 100) + '%',
                right: ((this.items.length - this.value - 1) / this.items.length * 100) + '%'
            }
        }
    },
    props: {
        items: {
            type: Array,
            default() {
                return ['语文', '数学', '英语']
            }
        },
        value: {
            type: Number,
            default: 0
        },
        theme: {
            type: String,
            validator(val) {
                let themes = ['light', 'simple']
                if (val) {
                    return themes.indexOf(val) > -1
                } else {
                    return true
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
.xa-Tab {
  position: relative;
  line-height: 44px;
  .index-line {
    position: absolute;
    bottom: 0;
  }
  .active {
    color: #42bd56;
  }
  .index-line {
    background-color: #42bd56;
    height: 3px;
    border-radius: 1.5px;
    transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1),
      left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;
  }
}
.xa-Tab.light {
  border: 1px solid #42bd56;
  line-height: 24px;
  color: #42bd56;
  border-radius: 4px;
  .xa-flex {
    z-index: 1;
    transition: color 0.3s;
  }
  .xa-flex + .xa-flex {
    border-left: 1px solid #42bd56;
  }
  .active {
    color: #fff;
    // background-color: #42bd56;
  }
  .index-line {
    top: 0;
    bottom: 0;
    height: 100%;
    z-index: 0;
  }
}
.xa-Tab.simple {
  .index-line {
    background-color: transparent;
  }
  .index-line::after {
    content: " ";
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    display: inline-block;
    width: 4em;
    text-align: center;
    background-color: #42bd56;
    border-radius: 2px;
  }
}
</style>
