<template>
  <section class="v-user xa-container" :class="{'xa-default__bg':isLoading}">
    <template v-if="!isLoading">
      <div class="user-wrap xa-bg-white">
          <div class="user-content xa-bg-33 xa-line__bottom weui-cell weui-cell_access" @click="$gotoHref('#/userForm?title=个人信息')">
            <AppAvatar defaultImgType="person" :avatar="userInfo.avatar" size="56"/>
            <div class="user-info xa-flex">
                <p class="name xa-txt-18">
                    {{userInfo.name}}
                    <!-- <i v-if="userInfo.identification" class="iconfont icon-shimingrenzheng"></i> -->
                    <span v-if="userInfo.identification" class="icon-identifi"></span>
                </p>
                <p class="title">{{userInfo.id}}</p>
                <div class="user-status-wrap">
                  <div class="user-status-container">
                      <UiStatu class="user-status-item shape" v-for="(statu,index) in userInfo.status" :key="index" :statu="statu"/>
                  </div>
                </div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
      </div>
      <StatisticeCells v-if="userInfo.titles.length" class="xa-line__top user-titles xa-com__space" :items="userInfo.titles"/>
      <template v-if="userInfo.licence.length">
        <FormCell access href="#/userCard?title=我的执照">
            <span class="xa-txt-bold">我的执照</span>
            <span class="xa-txt-999 xa-txt-12" slot="right">查看全部</span>
        </FormCell>
          <div class="xa-com__space xa-line__bottom card-wrapper">
              <div class="card-wrap" :style="imgWrapStyle">
                  <UserCard v-for="(lic,index) in userInfo.licence" :key="index" class="card-item" :type="lic.index" :id="lic.code" :text="lic.title" @click.native="$gotoHref(lic.href)"></UserCard>
              </div>
          </div>
      </template>
      <FormCell class="xa-com__space" access :href="userInfo.setting_url+'&session=1'">
          <span class="xa-txt-bold">设置</span>
      </FormCell>
      <!-- <FormSwitch class="xa-com__space" label="夜间模式" v-model="isDark"></FormSwitch> -->
    </template>
  </section>
</template>
<script>
import baseView from './BaseUser.js'
import UserCard from '@/components/UserCard.vue'
export default {
  extends: baseView,
  name: 'UserView',
  components: {
    UserCard
  },
  computed: {
    imgWrapStyle() {
      if (this.userInfo.licence.length === 1) {
        return {
          'textAlign': 'center'
        }
      }
      return {
        width: this.userInfo.licence.length * 289 + 'px'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-identifi {
  display: inline-block;
  width: 16px;
  height: 18px;
  background-image: url("../assets/indentification.png");
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center 4px;
}
.user-wrap {
  position: relative;
  .user-content {
    // margin: 0 15px;
    padding: 20px 15px 18px;
    z-index: 1;
  }
  .user-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=");
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 0;
  }
}
.user-info {
  padding-left: 12px;
  //   color: #000;
  color: #fff;
  .name {
    margin-bottom: 2px;
  }
  .title {
    color: #ccc;
    font-size: 12px;
    margin-bottom: 6px;
  }
}
.user-titles {
  padding-top: 3px;
  padding-bottom: 3px;
}
.card-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  z-index: 99;
  padding: 10px 15px 12px;
  background-color: #fff;
}
.card-wrap {
  overflow-x: scroll;
  font-size: 0;
  .card-item {
    display: inline-block;
    width: 275px;
    height: 160px;
    border-radius: 8px;
    margin-right: 12px;
    background-position: center 5px;
  }
}
</style>
<style lang="scss">
.v-user {
  & .weui-cell:before,
  & .user-titles::before {
    content: "";
    display: none;
  }
  & .weui-flex__item + .weui-flex__item::before {
    content: "";
    display: none;
  }
  & .weui-flex__item .xa-txt-333 {
    color: #000;
  }
}
.v-user .xa-tag {
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 4px;
  border-color: transparent;
}
.v-user .xa-tag {
  margin-right: 6px;
}
.v-user .xa-default__img {
  border: 1px solid #fff;
}
.v-user .user-status-wrap {
  width: calc(100vw - 113px);
  max-width: 500px;
  overflow: hidden;
}
.v-user .user-status-container {
  overflow-x: auto;
  white-space: nowrap;
}
.v-user .user-status-item {
  display: inline-block;
  white-space: nowrap;
}
</style>