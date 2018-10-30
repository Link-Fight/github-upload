<template>
  <div class="date-pick__wrapper">
      <div class="weui-mask" @click="$emit('onHidden','submit')"></div>
      <div class="date-pick__container">
            <div class="xa-bg-white xa-cell" style="height:50px;padding:0 15px;">
                <div class="xa-flex xa-cell">
                    <span class="xa-txt-bold" @click="$emit('onHidden','submit')">{{dateLabel}}</span>
                    <WeuiArrow direction="up" @click.native="$emit('onHidden','submit')"></WeuiArrow>
                </div>
            </div>
            <div v-show="needTypeChange" class="date-pick__tab xa-line__top xa-bg-f6">
                <AppTab :value="displayType" @input="$emit('update:displayType',arguments[0])" theme="light" :items="['年','月','日']"></AppTab>
            </div>
            <div class="xa-line__top date-pick-body__wrapper xa-bg-white xa-cell">
                <WeuiArrow v-show="displayType!==0" @click.native="onPrevBtnClick" class="date-pick__prev-btn" direction="left"></WeuiArrow>
                <div class="xa-flex">
                    <DatePickerDate :value="date" @input="$emit('update:date',arguments[0])" :year="year" :month="month" v-show="displayType===2"></DatePickerDate>
                    <DatePickerMonth :value="month" @input="$emit('update:month',arguments[0])" v-show="displayType===1"></DatePickerMonth>
                    <DatePickerYear :value="year" @input="$emit('update:year',arguments[0])" v-show="displayType===0"></DatePickerYear>
                </div>
                <WeuiArrow v-show="displayType!==0" @click.native="onNextBtnClick" class="date-pick__next-btn" direction="right"></WeuiArrow>
            </div>
      </div>
  </div>
</template>
<script>
import StatisticeDatePickerInDate from './StatisticeDatePickerInDate.vue'
import StatisticeDatePickerInMonth from './StatisticeDatePickerInMonth.vue'
import StatisticeDatePickerInYear from './StatisticeDatePickerInYear.vue'
export default {
  name: 'StatisticeDatePickerSelector',
  components: { DatePickerDate: StatisticeDatePickerInDate, DatePickerMonth: StatisticeDatePickerInMonth, DatePickerYear: StatisticeDatePickerInYear },
  data() {
    return {}
  },
  props: {
    displayType: Number,
    year: [String, Number],
    month: [String, Number],
    date: [String, Number],
    dateLabel: String,
    needTypeChange: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    year(newval, last) {
      if (this.displayType === 0) {
        last > 0 && this.$emit('onHidden', 'submit')
      }
    },
    month(newval, last) {
      if (this.displayType === 1) {
        last > 0 && this.$emit('onHidden', 'submit')
      }
    },
    date(newval, last) {
      if (this.displayType === 2) {
        last > 0 && this.$emit('onHidden', 'submit')
      }
    }
  },
  methods: {
    changeDate(newDate) {
      this.$emit('update:year', newDate.getFullYear())
      this.$emit('update:month', newDate.getMonth() + 1)
      this.$emit('update:date', newDate.getDate())
    },
    onPrevBtnClick() {
      let date = new Date()
      if (this.displayType === 1) {
        date.setFullYear(parseInt(this.year) - 1, parseInt(this.month) - 1, this.date)
      } else {
        date.setFullYear(this.year, parseInt(this.month) - 2, this.date)
      }
      this.changeDate(date)
    },
    onNextBtnClick() {
      let date = new Date()
      if (this.displayType === 1) {
        date.setFullYear(parseInt(this.year) + 1, parseInt(this.month) - 1, this.date)
      } else {
        date.setFullYear(this.year, parseInt(this.month), this.date)
      }
      this.changeDate(date)
    }
  }
}
</script>
<style lang="scss" scoped>
.date-pick {
  &__wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
    .weui-mask {
      z-index: 0;
      transition: opacity 0.8s;
    }
  }
  &__tab {
    padding: 15px;
  }
  &-body {
    &__wrapper {
      padding: 6px 10px 24px;
    }
  }
  &__prev-btn {
    border-right: 1em solid transparent;
  }
  &__next-btn {
    border-left: 1em solid transparent;
  }
}
</style>
