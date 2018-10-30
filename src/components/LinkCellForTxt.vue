<template>
  <div class="weui-cells" style="margin-top:0;">
      <LinkCell v-if="title" :title="title" icon="" value="" :child="true"></LinkCell>
      <div class="weui-cell xa-txt-14" v-clipboard :data-clipboard-text="content"  v-html="content"></div>
  </div>
</template>
<script>
import clipboard from '@/directives/clipboard'
export default {
    name: 'LinkCellForTxt',
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        }
    },
    directives: {
        clipboard
    }
}
</script>