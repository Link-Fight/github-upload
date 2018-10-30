<template>
<div>
    <FormCell :label="label">
      <div class="options-wrap xa-cell" :class="{'xa-txt-ccc':disabled}">
          <template v-for="option in options">
              <div class="option-item" :key="option.value" @click="()=>disabled||$emit('input',option.value)"> <i class="xa-txt-18" :class="value === option.value?'weui-icon-success':'weui-icon-circle'"></i> {{option.label}}</div>
          </template>
      </div>
    </FormCell>
</div>
</template>
<script>
export default {
    name: 'FormRadio',
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
.options-wrap {
  flex: 2;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.option-item {
  margin: 0px 1em;
}
</style>