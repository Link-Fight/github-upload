<template>
 <div class="weui-cell xa-cell xa-bg-white" style="height:44px">
    <div class="xa-flex xa-cell">
        <span @click="$emit('onShowSelector')">{{dateLabel}}</span>
        <WeuiArrow @click="$emit('onShowSelector')" direction="down"></WeuiArrow>
    </div>
    <span v-show="!isTaday" class="xa-txt-green" style="margin-right:26px" @click="$emit('showTady')">
        <i class="iconfont icon-richengjintian" style="margin-right:4px"></i>今天
    </span>
    <span v-for="(btn,index) in btns" :key="index" class="xa-txt-green" style="margin-right:14px;" @click="$onConfigBtnClick(btn)">
        <i class="iconfont" :class="btn.icon" style="margin-right:4px"></i>{{btn.txt}}
    </span>
</div>
</template>
<script>
export default {
    name: 'TaskDatePickerLabel',
    props: {
        dateLabel: String,
        isTaday: Boolean,
        btns: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>
