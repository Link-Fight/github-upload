<template>
    <FormCell  :label="label">
       <div style="text-align:right">
            <i v-for="(n,index) in 5"  @click="disabled||$emit('input',n)" style="margin-left: 4px;" :key="index" :style="value>index?'color: #FFC107;':''" class="xa-txt-999 iconfont icon-xing-copy"></i>
       </div>
    </FormCell>
</template>
<script>
export default {
    name: 'FormScore',
    props: {
        label: String,
        value: [String, Number],
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
