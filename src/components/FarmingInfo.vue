<template>
  <div class="xa-bg-white bg" style="padding:14px 15px 0px;" :style="{'paddingBottom':config.status&&config.status.length?'0px':'7px'}">
      <div class="xa-cell">
          <AppAvatar v-if="config.avatar" size="24" :avatar="config.avatar" style="margin-right:8px" />
          <div class="xa-flex xa-txt-18 xa-txt-bold">{{config.title}}</div>
          <div v-if="config.tags" v-for="(tag,index) in config.tags" :key="index"  class="xa-tag shape xa-txt-ccc"  style="margin-right:4px" :style="{'background':tag.color,'borderColor':tag.color}">{{tag.title}}</div>
      </div>
      <div style="margin:1px 0 14px">
          {{config.address}}
      </div>
      <div v-if="config.items&&config.items.length" class="item-wrap xa-cell">
           <div class="weui-flex__item" v-for="(item,index) in config.items" :key="index" @click="$gotoHref(item.href)">
               <p class="xa-txt-333 xa-txt-14">{{item.title}}</p>
               <p class="xa-txt-ccc xa-txt-14">{{item.value}}</p>
           </div>
       </div>
      <div v-if="config.status&&config.status.length" class="xa-cell xa-txt-ccc xa-txt-12 xa-line__top statu-wrap">
          <div class="xa-cell statu-item xa-txt-999" v-for="(statu,index ) in config.status" :key="index" :class="{'xa-txt-999':statu.value}">
             <i class="iconfont xa-txt-14" :class="statu.value?'icon-zhengque xa-txt-green':'xa-txt-ccc icon-yduicuowukongxin'" style="margin-right:4px;"></i>  {{statu.txt}}
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'FarmingInfo',
  props: {
    config: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
.statu-wrap {
  padding: 5px 0;
  margin-top: 19px;
  line-height: 22px;
  flex-wrap: wrap;
}
.statu-item {
  box-sizing: border-box;
  padding-right: 1em;
  min-width: 33.33%;
}
.item-wrap {
  padding: 5px 0;
}
.item-time {
  padding: 0 4px;
  height: 16px;
  line-height: 16px;
  border-radius: 3px;
  border: 0.5px solid;
}
@media screen and(max-width: 360px) {
  .item-wrap p {
    font-size: 12px;
  }
}
.weui-flex__item {
  position: relative;
}
.weui-flex__item + .weui-flex__item::before {
  content: " ";
  position: absolute;
  left: -1em;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background-color: #e5e5e5;
  transform: scaleX(0.5);
}
</style>