<template>
<div>
    <div class="infoCard-wrap xa-cell xa-bg-white">
        <div class="infoCard-imgs xa-default__img" :style="{'background-Image':imgsSrc?'url('+imgsSrc+')':''}"></div>
        <div class="infoCard-content">
            <p class="infoCard-title xa-txt-bold xa-txt-333">{{title}}</p>
            <p class="infoCard-subTitle xa-txt-999">{{subTitle}}</p>
        </div>
    </div>
</div>
</template>
<script>
let img = [
    {
        'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
        'thumb_url': 'http://es6.ruanyifeng.com/images/cover-3rd.jpg'
    }, {
        'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/f5k58/6426367adab44aed0151718ab61c8701a18bfb04.jpg?e=1517493632&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:HzgSfrdTQ5q6EwTO2BuE4yd2uf4=',
        'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/f5k58/6426367adab44aed0151718ab61c8701a18bfb04.jpg?imageView2/0/w/100/h/100&e=1517493632&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:sjk0BFxPPVl8Hay0v9a4ZCMlalw='
    }, {
        'url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/izsoq/385b6a74-ae62-35ce-a61f-4e72c2fc3874.gif?e=1517493664&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:9szXcYp0aBu11eIv2b46rN9D_bM=',
        'thumb_url': 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/izsoq/385b6a74-ae62-35ce-a61f-4e72c2fc3874.gif?imageView2/0/w/100/h/100&e=1517493664&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:qW3uKsmERjjqDx5pe5CprBf8KqQ='
    }
]
export default {
    name: 'TeamInfo',
    computed: {
        imgsSrc() {
            if (this.imgs.length) {
                return this.imgs[0].thumb_url
            }
        }
    },
    props: {
        imgs: {
            type: Array,
            default() {
                return img
            }
        },
        title: {
            type: String,
            default: '张强'
        },
        subTitle: {
            type: String,
            default: '订单： 洪湖李保成'
        }
    }
}
</script>

<style scoped lang="scss">
.infoCard-wrap {
  padding: 15px 15px;
  .infoCard-imgs {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #999;
  }
  .infoCard-title {
    font-weight: bold;
    font-size: 18px;
    height: 34px;
    line-height: 34px;
    margin-top: -1px;
  }
  .infoCard-subTitle {
    font-size: 14px;
    line-height: 18px;
    height: 18px;
  }
}
</style>
