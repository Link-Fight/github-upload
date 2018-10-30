<template>
  <div class="xa-bg-white" style="padding:15px 20px 4px;position:relative;">
      <UiTagForFarming v-if="config.current" :theme="config.current.color"  class="farming-item__uitage xa-txt-10" :content="config.current.title"/>
      <div class="xa-cell">
        <AppAvatar size="24" v-if="config.avatar" :avatar="config.avatar" share="square" style="margin-right:8px;border-radio:4px;" />
        <div class="xa-flex xa-txt-bold" style="font-size:16px;height: 24px;overflow: hidden;">
            <div class="xa-txt-ellipsis@" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;" >{{config.title}}</div>
        </div>
        <div class="xa-cell" v-if="config.status" style="position:relative;right:-12px;">
            <slot name="statu" v-for="(statu,index) in config.status" :statu="statu">
                <UiStatu :key="index" :statu="statu"/>
            </slot>
        </div>
      </div>
      <div class="xa-txt-333" style="margin:4px 0 8px">
          {{config.address}}
      </div>
      <div v-if="config.items&&config.items.length" class="item-wrap xa-cell xa-line">
           <div class="weui-flex__item" v-for="(item,index) in config.items" :key="index">
               <p class="xa-txt-333 xa-txt-14">{{item.title}}</p>
               <p class="xa-txt-ccc xa-txt-14">{{item.value}}</p>
           </div>
       </div>
        <div v-if="config.tips" class="xa-cell xa-txt-12 xa-txt-ccc" style="line-height:32px;margin-top:4px">
            <slot name="footer" :tips="config.tips">
                <div class="xa-flex">
                    {{config.tips.time}}
                </div>
                <AppAvatar v-if="config.tips.avatar" size="14" :avatar="config.tips.avatar" style="margin-right:4px" />
                <div>
                    {{config.tips.title}}
                </div>
            </slot>
        </div>
  </div>
</template>
<script>
import UiTagForFarming from '../components/UiTagForFarming.vue'
export default {
    name: 'FarmingListItem',
    components: {
        UiTagForFarming
    },
    props: {
        config: {
            type: Object
        }
    }
}
</script>
<style lang="scss" scoped>
.farming-item__uitage {
  left: 0;
  top: 1px;
}
.item-wrap {
  padding: 5px 0;
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
