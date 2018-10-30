<template>
  <div class="tabbar-wrap weui-flex xa-line__top xa-bg-white" :class="{'hasRudder':centerIndex>=0}">
      <template v-for="(item,index) in items">
        <div class="tabbar-item weui-flex__item" :key="index" :class="[index==value?'xa-txt-green':'xa-txt-999']" @click="$emit('input',index)">
            <p class="tabbar-icon iconfont" :class="index==value?item.activeicon||item.icon:item.icon"></p>
            <p class="tabbar-label xa-txt-10">{{item.txt}}</p>
        </div>
        <div v-if="index===centerIndex&&rudder" class="rudder-btn" :class="{'rudder-btn--center':!rudder.txt}" :key="'rudder'+index" @click="onRudderClick">
            <i class="iconfont xa-txt-bold" :class="rudderClass"></i>
            <p style="position: relative;top: -4px;" class="xa-txt-12"> {{rudder.txt}} </p>
        </div>
      </template>
  </div>
</template>
<script>
// $emit: input more
export default {
    name: 'TabBar',
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        },
        rudder: Object,
        value: [Number, String]
    },
    computed: {
        centerIndex() {
            if (this.items.length % 2 === 0) {
                return this.items.length / 2 - 1
            }
            return -1
        },
        rudderClass() {
            if (this.rudder) {
                return this.rudder.icon + ' ' + (this.rudder.txt ? 'xa-txt-18' : 'xa-txt-24')
            }
        }
    },
    methods: {
        onRudderClick() {
            this.$onConfigBtnClick(this.rudder).then(datas => {
                if (this.rudder.items && this.rudder.items.length) {
                    this.$emit('more', this.rudder.items)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.tabbar-wrap {
  overflow: hidden;
  padding-top: 2px;
  padding-bottom: 4px;
  text-align: center;
}
.tabbar-wrap.hasRudder {
  overflow: initial;
}
.tabbar-icon {
  font-size: 22px;
  height: 26px;
  line-height: 34px;
}
.tabbar-label {
  line-height: 1.2;
  margin-top: 6px;
}
.rudder-btn {
  position: relative;
  top: -11px;
  width: 46px;
  height: 46px;
  padding: 1px;
  background-color: #42bd56;
  border-radius: 50%;
  color: #fff;
  box-sizing: border-box;
  z-index: 999;
}
.rudder-btn::before {
  content: "";
  position: absolute;
  top: -7px;
  right: -7px;
  bottom: -7px;
  left: -7px;
  background-color: #42bd56;
  z-index: -1;
  border-radius: 50%;
}
.rudder-btn--center {
  top: 4px;
  width: 46px;
  height: 38px;
  border-radius: 2px;
  background-color: #42bd56;
}
.rudder-btn--center::before {
  content: "";
  display: none;
}
</style>
