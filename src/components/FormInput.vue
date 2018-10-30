<template>
<div class="wrapper xa-cell xa-bg-white weui-cell xa-align_center">
    <slot name="pre"></slot>
    <label>{{label}}</label>
    <div class="xa-cell input-wrap xa-flex" :class="'xa-txt-'+align">
        <slot>
            <input v-if="dataType==='string'" :value="value" @input="$emit('input',$event.target.value)" class="weui-input" :placeholder="placeholder" :readonly="readonly">
            <input v-else-if="dataType==='float'" ref="input" type="number" :value="value" @input="updateValue($event.target.value)" class="weui-input" :placeholder="placeholder" :readonly="readonly">
            <input v-else ref="input" type="tel" :value="value" @input="updateValue($event.target.value)" class="weui-input" :placeholder="placeholder" :readonly="readonly">
        </slot>
        <span v-if="unit" style="white-space: nowrap;padding-left:4px;">{{unit}}</span>
    </div>
    <slot name="suffix"></slot>
</div>
</template>
<script>
export default {
    name: 'FormInput',
    props: {
        label: String,
        value: {},
        unit: String,
        dataType: {
            type: String,
            default: 'string'
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: 'right'
        },
        Fixed: {
            type: Number,
            default: 2
        }
    },
    methods: {
        updateValue(value) {
            let formattedValue = value.trim()
            if (this.dataType === 'int') {
                formattedValue = parseInt(formattedValue)
            } else {
                formattedValue = parseFloat(formattedValue)
                if (value.indexOf('.') !== -1) {
                    if (value.indexOf('.') < value.length - (this.Fixed || 2)) {
                        formattedValue = formattedValue.toFixed((this.Fixed || 2))
                    } if (value.endsWith('.')) {
                        formattedValue += '.'
                    }
                }
            }
            formattedValue = isNaN(formattedValue) ? '' : formattedValue
            this.$refs.input.value = formattedValue
            this.$emit('input', formattedValue)
        }
    }
}
</script>
<style scoped>
.wrapper {
  min-height: 42px;
  padding: 0 15px;
}
.xa-txt-center input {
  text-align: center;
}
.xa-txt-right input {
  text-align: right;
}
</style>