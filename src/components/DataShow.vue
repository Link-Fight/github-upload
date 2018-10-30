<template>
    <div class="data-show-wrapper xa-bg-white xa-line">
        <div class="weui-cell" @click='onClickFn' :class="component.href&&'weui-cell_access'">
            <ul class="weui_cell_bd xa-flex">
                <li class="xa-cell show-item" v-for='(item,index) in component.items' :key="index" :style="{'font-weight':item.bold==true?'bold':item.bold}">
                     <div class="xa-flex">
                         <span>{{item.title}}</span> <span :style="{'color':item.color}">{{item.value}}</span>
                     </div>
                     <slot name="statu" v-for="(statu,index) in item.status" :statu="statu">
                        <UiStatu :key="index" :statu="statu"/>
                    </slot>
                </li>
            </ul>
            <div class="weui-cell__ft"></div>
        </div>
        <div class="dy_images xa-line__top xa-cell" v-if='component.images&&component.images.length>0'>
            <div class="dy_img " v-for='(img,index) in component.images' :key="index" :style="{'backgroundImage': 'url('+img.thumb_url||img+')'}" @click="onPreviewImage(img,component.images)"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dataShow',
    props: {
        component: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        onClickFn() {
            this.$emit('click')
        },
        onPreviewImage(curImgs, img) {
            this.$wxAction.previewImage(curImgs.url || curImgs, img.map(img => img.url || img))
        }
    }
}
</script>
<style lang="scss" scoped>
.data-show-wrapper {
  .dy_img {
    width: 54px;
    height: 54px;
    border: 1px dashed #ccc;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
  & .dy_img + .dy_img {
    margin-left: 8px;
  }
  .dy_images {
    flex-wrap: wrap;
    margin-left: 15px;
    padding: 10px 15px 10px 0px;
  }
  .show-item {
    align-items: baseline;
  }
}
</style>