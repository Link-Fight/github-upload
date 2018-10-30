<template>
 <div class="input-wrapper">
    <div class="input-wrap xa-bg-white">
        <FormTextArea v-model="input" rows="4" placeholder="黏贴整段地址，自动识别命名、电话和地址 例：刘小哥,1328886666,广东省广州市天河区广天街道广天大楼001号" />
        <p class="input-count">{{input.length}}/100</p>
    </div>
    <div class="input-btn-wrap xa-cell">
        <div  v-show="input.length" class="input-btn" @click="input=''">清空</div>
        <div class="input-btn" :class="[input.length>0?'input-btn-submit':'input-btn-cancel']" @click="$emit('input', input)">提交</div>
    </div>
</div>
</template>
<script>
import FormTextArea from '@/components/FormTextArea.vue'
export default {
    components: {
        FormTextArea
    },
    data() {
        return {
            input: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  padding: 8px;
}
.input-wrap {
  border: 1px solid #999;
}
.input-count {
  text-align: right;
  font-size: 12px;
  padding: 2px 8px;
  color: #888;
}
.input-btn-wrap {
  margin-top: 9px;
  justify-content: flex-end;
}
.input-btn {
  padding: 0 1.5em;
  height: 36px;
  line-height: 36px;
  color: #db0225;
}
.input-btn-submit {
  background-color: #db0225;
  color: #fff;
}
.input-btn-cancel {
  background-color: #999;
  color: #fff;
}
</style>
