<template>
<div class="xa-bg-white">
  <div class="team-item__wrapper xa-cell" @click="onItemClick">
      <UiTag v-if="badge" class="team-item__uitage" :content="badge"/>
      <div style="position:relative;">
        <AppAvatar class="team-item__avatar" :avatar="avatar" size="50"/>
        <img v-if="svgSrc" class="team-item__avatar-icon" :src="svgSrc"/>
      </div>
      <div class="xa-flex xa-txt-999" >
            <p class="xa-cell" style="line-height:24px;">
                <span class="team-item__title xa-txt-333 xa-txt-14 xa-txt-bold" style="margin-right:1em">{{title}}</span>
                <UiStatu v-for="(tag,index) in tags" :key="index" :statu="tag"/>
            </p>
            <p class="team-item__subtitle xa-txt-12">{{subTitle}}</p>
            <div class="xa-txt-12">
                <span class="team-item__attrs" v-for="(attr,index) in attrs" :key="index">
                    <i class="iconfont xa-txt-14" :class="attr.icon"></i> {{attr.n}}
                </span>
            </div>
      </div>
      <div>
          <AppBtns class="team-item__btns" :items="btns" @click="onBtnClick" />
      </div>
  </div>
  <AppTip v-if="tip" :tip="tip"/>
</div>
</template>
<script>
import person from '../assets/icon-gerenrenzheng.svg'
import company from '../assets/icon-gongsirenzheng.svg'
export default {
    name: 'TeamListItem',
    props: {
        badge: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        },
        attrs: {
            type: Array,
            default() {
                return [
                    // {
                    //     icon: 'icon-unie602',
                    //     n: 12
                    // }
                ]
            }
        },
        tags: {
            type: Array,
            default() {
                return [
                    // {
                    //     txt: '已验证',
                    //     color: ''
                    // }
                ]
            }
        },
        btns: {
            type: Array,
            default() {
                return []
            }
        },
        href: String,
        tip: String,
        certificate: [ String, Number ]
    },
    computed: {
        svgSrc() {
            if (this.certificate === 1) {
                return person
            } else if (this.certificate === 2) {
                return company
            }
        }
    },
    methods: {
        onBtnClick(item) {
            console.log(arguments[0], arguments[1])
            this.$onConfigBtnClick(item)
        },
        onItemClick() {
            this.href && (this.$gotoHref(this.href))
        }
    }
}
</script>
<style lang="scss">
.team-item {
  &__wrapper {
    position: relative;
    padding: 15px;
  }
  &__uitage.uitag__wrapper {
    position: absolute;
    left: 0;
    top: 1px;
  }
  &__avatar {
    position: relative;
    top: 4px;
    width: 50px;
    height: 50px;
    margin-right: 15px;
    background-color: #eee;
  }
  &__avatar-icon {
      position:absolute;
      bottom: -5px;
      right: 15px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
  }
  &__title {
    line-height: 22px;
  }
  &__tag {
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
  &__tag + &__tag {
    margin-left: 8px;
  }
  &__subtitle {
    margin-top: -2px;
  }
  &__attrs {
    display: inline-block;
    margin-top: 6px;
    height: 16px;
    line-height: 16px;
    vertical-align: top;
    & > .iconfont {
      position: relative;
      top: 1px;
    }
  }
  &__attrs + &__attrs {
    margin-left: 8px;
  }
  &__btns {
    .xa-btn {
      line-height: initial;
      padding: 2px 6px;
      border-radius: 5px;
      background-color: #42bd56;
      color: #fff;
      font-size: 12px;
      margin-left: 4px;
    }
  }
}
</style>
