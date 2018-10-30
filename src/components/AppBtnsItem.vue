<template>
   <div @click.stop="$emit('click',item,arguments[0])" class="xa-btn xa-txt-nowrap" :class="'xa-btn_'+item.type" :style="item|styleFilter">
        <slot>
            <i v-if="item.icon" class="iconfont" :class="item.icon"></i> {{item.txt}}
        </slot>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    filters: {
        styleFilter(cfg) {
            return {
                'backgroundColor': cfg.bg,
                color: cfg.color
            }
        }
    }
}
</script>
