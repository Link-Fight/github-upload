<template>
<div>
    <FormCell :label="label" access>
        <select class="weui-select" :value="value" @input="$emit('input',$event.target.value)">
             <option class="xa-txt-999" disabled value="">请选择</option>
             <template v-for="option in options">
                 <option :key="option.value" :value="option.value">{{option.label}}</option>
             </template>
        </select>
    </FormCell>
</div>
</template>
<script>
export default {
    name: 'FormDropdown',
    props: {
        options: {
            type: Array,
            default() {
                return []
            }
        },
        label: String,
        value: {}
    }
}
</script>
<style lang="scss" scoped>
.weui-select {
  text-align: right;
  height: 22px;
  line-height: 22px;
  direction: rtl;
  option {
    direction: ltr;
  }
}
</style>