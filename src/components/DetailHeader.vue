<template>
<div>
    <div class="detail-header-wrap xa-cell xa-bg-white">
        <AppAvatar v-if="avatar" class="detail-header-imgs" :avatar="avatar" size="55"/>
        <div class="detail-header-content">
            <p class="detail-header-title xa-txt-333"> <i class="iconfont" :class="icon"></i>{{title}}
                 <span class="team-item__tag xa-txt-10" v-for="(tag,index) in tags" :key="index" :style="tag">{{tag.txt}}</span>
            </p>
            <p class="detail-header-subTitle xa-txt-999">{{subTitle}}</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'DetailHeader',
    props: {
        avatar: {
            type: [String, Object, Array],
            default() {
                return {
                    'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
                    'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM='
                }
            }
        },
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '李全玉米'
        },
        subTitle: {
            type: String,
            default: '河南省周口市华西村国营农场旁边'
        },
        tags: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        onImgClick() {
            let imgs = this.imgs.map(img => img.url)
            this.$wxAction.previewImage(imgs[0], imgs)
        }
    }
}
</script>

<style scoped lang="scss">
.team-item__tag {
  display: inline-block;
  font-weight: initial;
  position: relative;
  box-sizing: border-box;
  padding: 0 4px;
  height: 16px;
  line-height: 16px;
  border-radius: 3px;
  border: 0.5px solid;
}
.detail-header-wrap {
  padding: 15px 15px;
  .detail-header-imgs {
    margin-right: 6px;
  }
  .detail-header-title {
    font-weight: bold;
    font-size: 18px;
    height: 24px;
    line-height: 34px;
  }
  .detail-header-subTitle {
    font-size: 11px;
    line-height: 34px;
    height: 31px;
  }
}
</style>
