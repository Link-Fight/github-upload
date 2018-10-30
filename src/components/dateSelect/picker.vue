<template>
   <div class="xa-txt-center" @touchmove.stop.prevent="onTouchMore" @touchend="onTouchEnd">
        <ul>
            <li v-for="i in len" :key="i+'up'" @click="onHandleDire('DOWN',i)">
                {{displayLabel(value-len+i-1)}}
            </li>
            <li class="picker-item__active">
                {{displayLabel(value)}}{{unit}}
            </li>
            <li v-for="i in len" :key="i" @click="onHandleDire('UP',i)">
                {{displayLabel(value+i)}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'picker',
    data() {
        return {
            touchCfg: null
        }
    },
    props: {
        value: {
            type: Number,
            required: true
        },
        unit: String,
        max: Number,
        min: Number,
        len: {
            type: Number,
            default: 2
        }
    },
    methods: {
        displayLabel(num) {
            if (this.min !== undefined && num < this.min) {
                return num + (this.max - this.min) + 1
            }
            if (this.max !== undefined && num > this.max) {
                return this.min + (num - this.max) - 1
            }
            if (num < 10) {
                return '0' + num
            }
            return num
        },
        onHandleDire(dir, i) {
            let value = this.value
            if (dir === 'UP') {
                value++
                if (this.max !== undefined) {
                    if (this.value >= this.max) {
                        value = this.min
                    }
                }
            } else {
                value--
                if (this.min !== undefined) {
                    if (this.value <= this.min) {
                        value = this.max
                    }
                }
            }
            this.$emit('input', value)
        },
        onTouchMore(event) {
            if (event.type === 'touchmove') {
                var date = new Date()
                var touchY = event.touches[0].clientY
                var touchConfight = this.touchCfg
                if (!touchConfight) {
                    var sleepTime = 200
                    this.touchCfg = touchConfight = {
                        lastTime: date,
                        oldY: touchY,
                        sleepTime: sleepTime
                    }
                }
                if (date - touchConfight.lastTime > touchConfight.sleepTime) {
                    touchConfight.lastTime = date
                    if (touchY < touchConfight.oldY) {
                        this.onHandleDire('UP')
                    } else {
                        this.onHandleDire('DOWN')
                    }
                    touchConfight.oldY = touchY
                }
            }
        },
        onTouchEnd() {
            this.touchCfg = null
        }
    }
}
</script>
<style lang="scss" scoped>
.picker-item__active {
  font-size: 17px;
  font-weight: bold;
  padding: 5px 0;
  color: #000;
  border-top: 3px solid #04be02;
  border-bottom: 3px solid #04be02;
}
</style>
