<template>
<div>
    <FormCell :label="label" access>
        <div @click="onShowSelect" class="formselect-diaplay xa-cell xa-flex">
            <span :class="displayLabel.class">{{displayLabel.txt}}</span>
        </div>
    </FormCell>
    <PopPanel v-if="isShow" @close="onClose">
        <dateSelect  @close="handlerShow(false)" @submit="onSubmit" :dateValue="value" :viewMode="viewMode" />
    </PopPanel>
</div>
</template>
<script>
import dateSelect from './dateSelect/index.vue'
import { show, hidden } from './PopBase.js'
export default {
    name: 'FormDateSelect',
    components: {
        dateSelect
    },
    data() {
        return {
            isShow: false
        }
    },
    props: {
        value: String,
        label: String,
        viewMode: String,
        placeholder: {
            type: String,
            default: '请选择'
        }
    },
    computed: {
        displayLabel() {
            if (this.value) {
                return {
                    txt: this.value
                }
            } else {
                return {
                    txt: this.placeholder,
                    class: 'xa-txt-999'
                }
            }
        }
    },
    methods: {
        onShowSelect() {
            this.handlerShow(true)
        },
        onSubmit(val) {
            this.$emit('input', val)
        },
        onClose() {
            setTimeout(() => {
                this.handlerShow(false)
            }, 300)
        },
        handlerShow(isShow) {
            if (isShow) {
                show()
            } else {
                hidden()
            }
            this.isShow = isShow
        }
    }
}
</script>
<style lang="scss">
.formselect-diaplay {
  justify-content: flex-end;
  text-align: right;
}
</style>