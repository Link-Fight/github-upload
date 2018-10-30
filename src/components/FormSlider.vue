<template>
<div class="xa-bg-white">
<p class="xa-txt-999 xa-txt-12" style="padding:10px 15px 4px">{{label}}</p>
<div class="xa-cell" style="padding:16px 20px;">
    <div class="action mini" :class="minStyle" @click="onMiniClick"></div>
    <div class="xa-flex">
        <vue-slider ref="slider"
            :value="value"
            @input="onValueChange"
            :min="min" :max="max"
            :tooltip="tooltip"
            :dotSize='16'
            :piecewiseLabel="piecewiseLabel"
            :sliderStyle="sliderStyle"
            :processStyle="{backgroundColor: '#42bd56'}">
            <template slot="tooltip" slot-scope="tooltip">
                <div style="position:relative;top:8px;white-space: nowrap;" class="xa-txt-12">
                    {{tooltip.value }}{{unit}}
                </div>
            </template>
        </vue-slider>
        <div class="xa-cell custom-label">
            <div v-for="data in stepDatas" :key="data">
                {{data}}{{unit}}
            </div>
        </div>
    </div>
    <div class="action add" :class="addStyle" @click="onAddClick"></div>
  </div>
</div>
</template>
<script>
import vueSlider from 'vue-slider-component'
export default {
    name: 'FormSlider',
    components: { vueSlider },
    data() {
        return {
            sliderStyle: [
                {
                    backgroundColor: '#42bd56'
                },
                {
                    backgroundColor: '#42bd56'
                }
            ],
            tooltip: 'always',
            piecewiseLabel: false,
            stepDatas: [],
            timeoutHandler: -1
        }
    },
    props: {
        label: String,
        value: {},
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            default: 'm'
        },
        range: {
            type: Boolean,
            required: true
        },
        step: {
            type: Number,
            default: 0
        }
    },
    computed: {
        minStyle() {
            if (this.range === false) {
                if (this.value <= this.min) {
                    return 'disable'
                }
            } else {
                if (this.value[0] <= this.min) {
                    return 'disable'
                }
            }
        },
        addStyle() {
            if (this.range === false) {
                if (this.value >= this.max) {
                    return 'disable'
                }
            } else {
                if (this.value[1] >= this.max) {
                    return 'disable'
                }
            }
        }
    },
    methods: {
        refresh() {
            this.timeoutHandler = setTimeout(() => {
                if (this.stepDatas !== undefined && this.$el.offsetWidth === 0) {
                    this.refresh()
                } else {
                    this.$refs.slider.refresh()
                }
            }, 1000)
        },
        onValueChange(val) {
            this.$emit('input', val)
        },
        onMiniClick() {
            if (this.range === false) {
                if (this.value > this.min) {
                    this.setSliderValue(this.value - 1)
                }
            } else {
                if (this.value[0] > this.min) {
                    this.setSliderValue([this.value[0] - 1, this.value[1]])
                }
            }
        },
        onAddClick() {
            if (this.range === false) {
                if (this.value <= this.max) {
                    this.setSliderValue(this.value + 1)
                }
            } else {
                if (this.value[1] < this.max) {
                    this.setSliderValue([this.value[0], this.value[1] + 1])
                }
            }
        },
        setSliderValue(val) {
            val instanceof Array ? this.$refs.slider.setValue(val) : this.$refs.slider.setCurrentValue(val)
        }
    },
    mounted() {
        if (this.$el.offsetWidth === 0) {
            this.refresh()
        }
        let center = parseInt((this.max + this.min) / 2)
        let center1 = parseInt((center + this.min) / 2)
        let center2 = parseInt((this.max + center) / 2)
        this.stepDatas = [this.min, center1, center, center2, this.max]
    },
    beforeDestroy() {
        clearTimeout(this.timeoutHandler)
    }
}
</script>
<style lang="scss" scoped>
.custom-label {
  font-size: 10px;
  margin: 0 0 0 0;
  color: #999;
  justify-content: space-between;
}
.action {
  position: relative;
  top: -10px;
  width: 20px;
  height: 20px;
  //   border: 2px solid #43bd56;
}
.action.add {
  margin-left: 10px;
}
.action.mini {
  margin-right: 10px;
}
.action.add::after,
.action.mini::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  height: 0px;
  width: 14px;
  border-top: 1px solid #43bd56;
  border-bottom: 1px solid #43bd56;
  transform: translateY(-1px) translateX(-50%);
}
.action.add::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  height: 14px;
  width: 0px;
  border-left: 1px solid #43bd56;
  border-right: 1px solid #43bd56;
  transform: translateX(-1px) translateY(-50%);
}
.action.disable,
.action.disable::before,
.action.disable::after {
  border-color: #999;
}
</style>
