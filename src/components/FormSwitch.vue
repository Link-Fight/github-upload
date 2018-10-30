<template>
  <div class="weui-cell weui-cell_switch xa-bg-white" :class="size?'weui-switch__'+size:''">
        <div class="weui-cell__bd">
            <p>{{label}}</p>
            <p v-if="subLabel" class="xa-txt-999 xa-txt-12">{{subLabel}}</p>
        </div>
        <div class="weui-cell__ft xa-cell">
            <input :disabled="disabled" :checked="value" @change="$emit('input',!value)" class="weui-switch" type="checkbox">
        </div>
    </div>
</template>
<script>
export default {
    name: 'FormSwitch',
    props: {
        label: String,
        subLabel: String,
        value: Boolean,
        size: String,
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
.weui-cell_switch {
  padding-top: 9.5px;
  padding-bottom: 9.5px;
}
.weui-switch__mini,
.weui-switch__small {
  padding: 0;
}
.weui-switch,
.weui-switch-cp__box {
  height: 23px;
  width: 42px;
}
.weui-switch:after,
.weui-switch-cp__box:after,
.weui-switch:before,
.weui-switch-cp__box:before {
  height: 20px;
  width: 20px;
}
.weui-switch__mini .weui-switch,
.weui-switch__mini .weui-switch-cp__box {
  height: 16px;
  width: 36px;
}
.weui-switch__mini .weui-switch:after,
.weui-switch__mini .weui-switch-cp__box:after,
.weui-switch__mini .weui-switch:before,
.weui-switch__mini .weui-switch-cp__box:before {
  height: 14px;
  width: 14px;
}
</style>