<template>
     <div class="selected-item xa-cell xa-txt-12">
        <div class="xa-flex">
            <p>{{item.title}}</p>
            <div class="xa-cell item-info__wrap">
                <AppAvatarByUid class="xa-flex--shrink" :avatar="item.imgs"/>
                <div class="xa-cell item-sn-wrap" v-if="item.sn&&item.sn.length">
                    <div v-for="(sn,index) in item.sn" :key="index" class="xa-tag">
                        {{sn.value||sn}}
                    </div>
                </div>
                <!-- <p v-if="item.num">x{{item.num}}</p> -->
            </div>
        </div>
        <p v-if="item.num">x{{item.num}}</p>
        <template v-if="mode==='edit'">
            <i @click="$emit('delete')" class="icon-btn xa-txt-red iconfont icon-ttpodicon"></i>
            <i @click="$emit('update')" class="icon-btn xa-txt-green iconfont icon-bianji1"></i>
        </template>
    </div>
</template>
<script>
export default {
    name: 'EnsureDisplayItem',
    props: {
        item: Object,
        mode: {
            type: String,
            default: 'edit'
        }
    }
}
</script>
<style lang="scss" scoped>
.item-sn-wrap {
  flex-wrap: wrap;
  justify-content: flex-end;
}
.item-info__wrap {
  justify-content: space-between;
  align-items: flex-end;
}
.selected-item {
//   border-bottom: 1px solid #e4e4e4;
  line-height: 25px;
  padding: 4px 0px;
  .icon-btn {
    display: inline-block;
    border: 4px solid transparent;
  }
}
</style>
