<template>
<RenderlessSelect @input="$emit('input',arguments[0])" :value="value" :label="label" :options="options" type="checkbox">
    <div slot-scope="{label,items,clickEvent}">
        <FormCell :label="label">
            <div class="options-wrap xa-cell">
                <template v-for="option in items">
                    <div class="option-item" :key="option.value" @click="clickEvent(option)">
                        <i class="iconfont" :class="option.DEFAULT?'icon-fuxuankuang xa-txt-green':'icon-icfuxuankuang'"></i> {{option.label}}</div>
                </template>
            </div>
        </FormCell>
    </div>
</RenderlessSelect>
</template>
<script>
import RenderlessSelect from './Renderless-select.vue'
export default {
    name: 'FormCheckBox',
    components: {
        RenderlessSelect
    },

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
.options-wrap {
  flex: 2;
  flex-wrap: wrap;
  //   justify-content: flex-end;
}
.option-item {
  margin: 0px 1em;
}
</style>