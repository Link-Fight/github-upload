<template>
<div class="cube-picker-panel xa-bg-white" v-show="isVisible" @click.stop>
    <div class="cube-picker-choose xa-cell xa-line__bottom">
        <span class="weui_btn weui_btn_mini" data-action="cancel" @click="cancel"><i class="iconfont icon-fanhui"></i></span>
        <h1>{{title}}</h1>
        <span class="weui_btn weui_btn_mini"  data-action="confirm" @click="confirm"> <i class="xa-txt-green iconfont icon-dui"></i></span>
    </div>
    <div class="cube-picker-content">
        <i class="border-bottom-1px xa-line__bottom"></i>
        <i class="border-top-1px xa-line__top"></i>
        <div class="cube-picker-wheel-wrapper" ref="wheelWrapper">
            <div v-for="(data,index) in pickerData" :key="index">
                <ul class="wheel-scroll">
                    <li v-for="(item,index) in data" class="wheel-item" :key="index">{{item[textKey]}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="cube-picker-footer"></div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
const DEFAULT_KEYS = {
    value: 'value',
    text: 'text'
}

const EVENT_SELECT = 'select'
const EVENT_VALUE_CHANGE = 'value-change'
const EVENT_CANCEL = 'cancel'
const EVENT_CHANGE = 'change'
export default {
    data() {
        return {
            isVisible: false,
            pickerData: this.data.slice(),
            pickerSelectedIndex: this.selectedIndex
        }
    },
    props: {
        title: {
            type: String
        },
        cancelTxt: {
            type: String,
            default: '取消'
        },
        confirmTxt: {
            type: String,
            default: '确定'
        },
        swipeTime: {
            type: Number,
            default: 2500
        },
        zIndex: {
            type: Number
        },
        data: {
            type: Array,
            default() {
                return []
            }
        },
        selectedIndex: {
            type: Array,
            default() {
                return []
            }
        },
        alias: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        valueKey() {
            return this.alias.value || DEFAULT_KEYS.value
        },
        textKey() {
            return this.alias.text || DEFAULT_KEYS.text
        }
    },
    watch: {
        data(newVal) {
            this.setData(newVal, this.selectedIndex)
        },
        selectedIndex(newVal) {
            this.setData(this.data, newVal)
        }
    },
    methods: {
        confirm() {
            if (!this._canConfirm()) {
                return
            }
            this.hide()
            let changed = false
            let pickerSelectedText = []
            const dataLength = this.pickerData.length
            const selectedValLength = this.pickerSelectedVal.length
            if (selectedValLength !== dataLength) {
                if (selectedValLength > dataLength) {
                    this.pickerSelectedVal.splice(dataLength)
                    this.pickerSelectedIndex.splice(dataLength)
                }
                changed = true
            }
            for (let i = 0; i < dataLength; i++) {
                let index = this.wheels[i].getSelectedIndex()
                this.pickerSelectedIndex[i] = index
                let value = null
                let text = ''
                if (this.pickerData[i].length) {
                    value = this.pickerData[i][index][this.valueKey]
                    text = this.pickerData[i][index][this.textKey]
                }
                if (this.pickerSelectedVal[i] !== value) {
                    changed = true
                }
                this.pickerSelectedVal[i] = value
                pickerSelectedText[i] = text
            }
            this.$emit(EVENT_SELECT, this.pickerSelectedVal, this.pickerSelectedIndex, pickerSelectedText)
            if (changed) {
                this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedVal, this.pickerSelectedIndex, pickerSelectedText)
            }
        },
        cancel() {
            this.hide()
            this.$emit(EVENT_CANCEL)
        },
        show() {
            if (this.isVisible) {
                return
            }
            this.isVisible = true
            if (!this.wheels || this.dirty) {
                this.$nextTick(() => {
                    this.wheels = this.wheels || []
                    let wheelWrapper = this.$refs.wheelWrapper
                    for (let i = 0; i < this.pickerData.length; i++) {
                        this._createWheel(wheelWrapper, i).enable()
                        this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
                    }
                    this.dirty && this._destroyExtraWheels()
                    this.dirty = false
                })
            } else {
                for (let i = 0; i < this.pickerData.length; i++) {
                    this.wheels[i].enable()
                    this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
                }
            }
        },
        hide() {
            if (!this.isVisible) {
                return
            }
            this.isVisible = false
            for (let i = 0; i < this.pickerData.length; i++) {
                this.wheels[i].disable()
            }
        },
        setData(data, selectedIndex) {
            this.pickerSelectedIndex = selectedIndex ? [...selectedIndex] : []
            this.pickerData = data.slice()
            if (this.isVisible) {
                this.$nextTick(() => {
                    const wheelWrapper = this.$refs.wheelWrapper
                    this.pickerData.forEach((item, i) => {
                        this._createWheel(wheelWrapper, i)
                        this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
                    })
                    this._destroyExtraWheels()
                })
            } else {
                this.dirty = true
            }
        },
        refill(datas) {
            let ret = []
            if (!datas.length) {
                return ret
            }
            datas.forEach((data, index) => {
                ret[index] = this.refillColumn(index, data)
            })
            return ret
        },
        refillColumn(index, data) {
            const wheelWrapper = this.$refs.wheelWrapper
            let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
            let wheel = this.wheels ? this.wheels[index] : false
            let dist = 0
            if (scroll && wheel) {
                let oldData = this.pickerData[index]
                this.$set(this.pickerData, index, data)
                let selectedIndex = wheel.getSelectedIndex()
                if (oldData.length) {
                    let oldValue = oldData[selectedIndex][this.valueKey]
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][this.valueKey] === oldValue) {
                            dist = i
                            break
                        }
                    }
                }
                this.pickerSelectedIndex[index] = dist
                this.$nextTick(() => {
                    // recreate wheel so that the wrapperHeight will be correct.
                    wheel = this._createWheel(wheelWrapper, index)
                    wheel.wheelTo(dist)
                })
            }
            return dist
        },
        scrollTo(index, dist) {
            const wheel = this.wheels[index]
            this.pickerSelectedIndex[index] = dist
            wheel.wheelTo(dist)
        },
        refresh() {
            this.$nextTick(() => {
                this.wheels.forEach((wheel) => {
                    wheel.refresh()
                })
            })
        },
        _createWheel(wheelWrapper, i) {
            if (!this.wheels[i]) {
                const wheel = this.wheels[i] = new BScroll(wheelWrapper.children[i], {
                    wheel: {
                        selectedIndex: this.pickerSelectedIndex[i] || 0
                    },
                    swipeTime: this.swipeTime,
                    observeDOM: false
                })
                wheel.on('scrollEnd', () => {
                    this.$emit(EVENT_CHANGE, i, wheel.getSelectedIndex())
                })
            } else {
                this.wheels[i].refresh()
            }
            return this.wheels[i]
        },
        _destroyExtraWheels() {
            const dataLength = this.pickerData.length
            if (this.wheels.length > dataLength) {
                const extraWheels = this.wheels.splice(dataLength)
                extraWheels.forEach((wheel) => {
                    wheel.destroy()
                })
            }
        },
        _canConfirm() {
            return this.wheels.every((wheel) => {
                return !wheel.isInTransition
            })
        }
    },
    created() {
        this.pickerSelectedVal = []
        if (!this.pickerSelectedIndex.length) {
            this.pickerSelectedIndex = []
            for (let i = 0; i < this.pickerData.length; i++) {
                this.pickerSelectedIndex[i] = 0
            }
        }
    }
}
</script>
<style lang="scss">
.cube-picker-choose {
  padding: 0 8px;
  line-height: 40px;
  justify-content: space-between;
}
.cube-picker-content {
  position: relative;
  top: 20px;
  > i {
    position: absolute;
    z-index: 10;
    left: 0;
    width: 100%;
    height: 68px;
    pointer-events: none;
    transform: translateZ(0);
  }
  > .border-bottom-1px {
    top: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.8)
    );
  }
  > .border-top-1px {
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.8)
    );
  }
  .cube-picker-wheel-wrapper {
    display: flex;
    padding: 0 4px;
    text-align: center;
    > div {
      height: 173px;
      overflow: hidden;
      font-size: 14px;
      flex: 1;
    }
    .wheel-scroll {
      padding: 0;
      margin-top: 68px;
      line-height: 36px;
      list-style: none;
      > li {
        height: 36px;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
.cube-picker-footer {
  height: 20px;
}
</style>
