<template>
<div class="xa-line">
    <div class="weui-cell weui-cell_access">
        <div class="xa-cell" v-if="imgs&&imgs.length">
            <template v-for="(img,index) in imgs">
                <AppAvatar class="link-img" :avatar="img" :key="index" size="20" :style="{'left':-index*6+'px'}"  defaultImgType="person"/>
            </template>
        </div>
        <div style="position: relative;left: -6px;">{{title}}</div>
        <div v-if="href" class="weui-cell__ft"></div>
        <div v-if="href" class="weui-cell__ft"></div>
    </div>
</div>
</template>
<script>
export default {
    name: 'LinkImgInfo',
    props: {
        imgs: Array,
        title: String,
        href: String
    }
}
</script>
<style lang="scss" scoped>
.link-img {
  position: relative;
  border: 1px solid #fff;
}
.weui-cell_access .weui-cell__ft {
  position: relative;
  left: -4px;
  transform: scale(0.7);
}
.weui-cell_access .weui-cell__ft + .weui-cell__ft {
  position: relative;
  left: -12px;
}
.weui-cell_access .weui-cell__ft:after {
  content: "";
  border-color: #42bd56;
}
</style>
