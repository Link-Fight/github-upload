<template>
 <div class="display-item xa-line__bottom">
    <div class="item-info xa-cell">
        <span class="xa-cell" @click="$emit('itemclick')">
            <span class="xa-txt-12" style="margin-right:4px;">{{item.id}}</span>
            <span style="line-height:24px;">{{item.title}}</span>
        </span>
        <i @click="$emit('chose')" class="item-action xa-txt-red iconfont" :class="[chooseResult[item.id]?'icon-xuanze':' icon-choose']"></i>
    </div>
    <div v-if="item.items"  @click="$emit('itemclick')" class="tips-wrap xa-cell xa-txt-10">
        <span v-for="(mItem,mIndex) in item.items" :key="mIndex">
            {{mItem.key+': '+mItem.value}}
        </span>
    </div>
</div>
</template>
<script>
export default {
    props: {
        item: Object,
        chooseResult: Object
    }
}
</script>
<style lang="scss" scoped>
.display-item {
  padding: 4px 0;
}
.item-info {
  align-items: flex-start;
}
.item-action {
  padding: 4px 8px;
  margin-left: auto;
}
.tips-wrap {
  flex-wrap: wrap;
  justify-content: space-between;
  line-height: 20px;
  color: #3399ff;
}
</style>
