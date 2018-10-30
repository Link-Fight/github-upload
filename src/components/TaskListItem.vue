<template>
  <div style="padding-right:15px;">
    <div class="xa-cell" style="padding:11px 0;" :style="{paddingBottom:isLoading||'0px'}">
        <div class="item-label" :class="[active?'xa-bg-green xa-txt-white':'xa-bg-e5 xa-txt-333']"> {{label}}</div>
        <div class="xa-flex"></div>
        <i v-show="isLoading" class="weui-loading"></i>
    </div>
    <LinkCell  v-for="(item,index) in items" :key="index" :class="index||'item-noline'" :icon="item.icon" :btns="item.btns" :title="item.title" :subTitle="item.subTitle" :value="item.value" :href="item.href" :child="true"></LinkCell>
  </div>
</template>
<script>
export default {
    name: 'TaskListItem',
    data() {
        return {
            isLoading: true,
            items: []
        }
    },
    props: {
        label: String,
        promise: Promise,
        active: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.promise.then(({ body }) => {
            this.isLoading = false
            this.items = body
        })
    }
}
</script>
<style lang="scss" scoped>
.item-label {
  padding: 0 15px 0 15px;
  line-height: 23.5px;
  border-radius: 0 10px 10px 0;
}
</style>
<style>
.item-noline.weui-cell:before {
  content: "";
  display: none;
}
</style>
