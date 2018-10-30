<template>
<div>
    <FormCell v-if="label" :label="label"></FormCell>
    <div class="weui-cells weui-cells_checkbox">
        <label v-for="option in options" class="weui-cell weui-check__label" :key="option.label" @click="()=>disabled||$emit('input',option.value)">
                <div class="weui-cell__hd">
                    <input type="radio" class="weui-check" :checked="option.value===value">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                     <p>{{option.label}}</p>
                </div>
        </label>
    </div>
</div>
</template>
<script>
export default {
    name: 'FormRadioGroup',
    props: {
        options: {
            type: Array,
            default() {
                return []
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: String,
        value: {}
    }
}
</script>
<style lang="scss" scoped>
.weui-cells {
  margin-top: 0px;
}
.weui-cell.weui-check__label {
  padding: 8px 15px 8px 10px;
  line-height: 25px;
}
.weui-cells_checkbox .weui-cell__hd {
  padding-right: 0;
}
.weui-icon-checked {
  position: relative;
  top: -1px;
}
</style>