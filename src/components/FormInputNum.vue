<template>
<div class="xa-cell">
    <i :class="isMinStatus?'xa-txt-999':'xa-txt-green'" @click="minusNum" class="xa-Number__input iconfont icon-minus"></i>
    <span class="xa-Number__value">{{value}}</span>
    <i :class="isMaxStatus?'xa-txt-999':'xa-txt-green'" @click="addNum" class="xa-Number__input iconfont icon-add"></i>
</div>
</template>
<script>
export default {
    props: {
        value: {
        },
        min: {
            type: [Number, String],
            default: 1
        },
        max: [Number, String]
    },
    computed: {
        isMinStatus() {
            return this.value <= parseInt(this.min)
        },
        isMaxStatus() {
            if (this.max !== undefined && this.max > 0) {
                if (this.value >= parseInt(this.max)) {
                    return true
                }
            }
            return false
        }
    },
    methods: {
        minusNum() {
            if (this.isMinStatus === true) {
                this.$emit('msg', '已是最小输入数量：' + this.min)
                return
            }
            this.$emit('input', this.value - 1)
        },
        addNum() {
            if (this.isMaxStatus === true) {
                this.$emit('msg', '已达到最大输入数量：' + this.max)
                return
            }
            this.$emit('input', this.value + 1)
        }
    }
}
</script>
<style scoped>
.xa-Number__value {
  width: 30px;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
}
.xa-Number__input {
  width: 24px;
  background: #f2f2f2;
  text-align: center;
  font-size: 20px;
}
</style>
