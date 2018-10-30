<template>
    <div class="weui-cells weui-cells_form" style="margin-top:0">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <textarea class="weui-textarea xa-txt-14" :value="value" @input="$emit('input',$event.target.value)" :placeholder="placeholder" :rows="rows"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FormTextArea',
    props: {
        value: String,
        placeholder: {
            type: String,
            default: '请输入文本'
        },
        rows: {
            type: [Number, String],
            default: 3
        }
    }
}
</script>