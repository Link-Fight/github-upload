<template>
    <div class="xa-tag xa-txt-12" :class="{'plain':statu.plain}" :style="wrapStyle">
        <i v-if="statu.icon" class="xa-txt-12 iconfont" :style="iconStyle" :class="statu.icon"></i>
        {{statu.title}}
    </div>
</template>
<script>
export default {
    name: 'UiStatu',
    props: {
        statu: Object
    },
    computed: {
        iconStyle() {
            if (this.statu.plain && (this.statu.color === '#999999' || this.statu.color === '#999')) {
                return {
                    color: '#BFBFBF'
                }
            }
        },
        wrapStyle() {
            let borderColor = !this.statu.plain ? this.statu.color : ''
            if (this.statu.plain && (this.statu.color === '#999999' || this.statu.color === '#999')) {
                borderColor = '#E5E5E5'
            }
            return {
                background: !this.statu.plain ? this.statu.color : '',
                borderColor,
                color: this.statu.plain ? this.statu.color : ''
            }
        }
    }
}
</script>