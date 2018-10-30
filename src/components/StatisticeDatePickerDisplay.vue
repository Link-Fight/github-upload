<template>
 <div class="xa-bg-white xa-cell" style="height:50px;padding:0 15px;">
    <div class="xa-flex xa-cell">
        <AppTab class="dp-dispaly__tab" :value="displayType" @input="onDatePickTypeChange" theme="light" :items="['年','月','日']"></AppTab>
        <span @click="$emit('onShowSelector')" class="xa-txt-bold">{{dateLabel}}</span>
        <WeuiArrow @click="$emit('onShowSelector')" direction="down"></WeuiArrow>
    </div>
    <i  @click="$emit('onShowPop')" class="iconfont icon-shezhi"></i>
</div>
</template>
<script>
export default {
    name: 'StatisticeDatePickerDisplay',
    props: {
        dateLabel: String,
        displayType: Number
    },
    methods: {
        onDatePickTypeChange(newDatePickDisplayType) {
            this.$emit('submit', newDatePickDisplayType)
        }
    }
}
</script>
<style lang="scss" scoped>
.dp-dispaly__tab {
  min-width: 126px;
  margin-right: 15px;
}
</style>