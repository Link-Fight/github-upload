<template>
  <section class="qrcode-wrapper xa-bg-green" v-if="!isLoading">
       <section class="qrcode-container xa-view xa-bg-white xa-txt-center">
           <section class="xa-view qrcode-header xa-flex">
               <div class="xa-cell">
                   <AppAvatar v-if="header.avatar" style="margin-right:8px;" size="24" :avatar="header.avatar"/>
                   <div v-html="header.tip"></div>
               </div>
               <div class="qrcode-header__content xa-flex">
                <div class="xa-txt-20 xa-txt-bold" style="margin-bottom:4px;line-height:22px" v-html="header.title"></div>
                <div class="xa-txt-14" style="line-height:22px;margin-bottom:4px;" v-html="header.subTitle"></div>
                <div class="xa-view" v-if="header.subTitles&&header.subTitles.length">
                    <template v-for="(subtTitle,index) in header.subTitles">
                        <div :key="index">{{subtTitle}}</div>
                    </template>
                </div>
                <div v-if="header.infos.length" class="qrcode-header__info xa-cell xa-txt-center">
                    <div class="qrcode-header__info-item" v-for="(info,index) in header.infos" :key="index">
                        <p>{{info.key}}</p>
                        <p class="xa-txt-ccc">{{info.value}}</p>
                    </div>
                </div>
               </div>
           </section>
           <div class="space"></div>
           <div class="xa-view">
               <Qrcode :url="body.content" size="110" />
               <div style="line-height:20px;">{{body.tip}}</div>
               <div class="footer-logo xa-txt-ccc" >XAG</div>
           </div>
       </section>
       <div class="tip-wrapper" v-if="isTipShow">
           <div class="weui-mask" @click="isTipShow=false"></div>
           <div class="animate-bounce-up tip-content xa-bg-green">{{floatTip}}</div>
       </div>
  </section>
</template>
<script>
import Qrcode from '../components/Qrcode'
import baseView from './BaseView.js'
function getInitData() {
    let data = {
        floatTip: '截图分享邀请更多植保团队加入',
        header: {
            avatar: 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/3/21/bg0o/u7778.jpg?e=1521645140&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:qXOggeA14AyYN0iuF1SfxyXJMVs=',
            tip: '李建辉邀请您加入农事需求',
            title: '洪湖玉米统防',
            subTitle: '河南省周口市西华县国营农场旁边',
            subTitles: ['1.河南省周口市西华县国营农场旁边', '2.河南省周口市西华县国营农场旁边 河南省周口市西华县国营农场旁边', '3.河南省周口市西华县国营农场旁边', '4.河南省周口市西华县国营农场旁边', '5.河南省周口市西华县国营农场旁边'],
            infos: [
                {
                    key: '玉米',
                    value: '作物'
                },
                {
                    key: '2000亩',
                    value: '面积'
                },
                {
                    key: '10元',
                    value: '亩单价'
                },
                {
                    key: '03.20-03.31',
                    value: '作业时间'
                }
            ]
        },
        body: {
            content: '234324324',
            tip: '长按识别二维码查看需求并加入'
        }
    }
    console.log(JSON.stringify(data, null, 4))
    return Promise.resolve(data)
}
export default {
    name: 'FarmingQr',
    extends: baseView,
    components: {
        Qrcode
    },
    data() {
        return {
            isTipShow: false,
            floatTip: '',
            isLoading: true,
            header: {
                avatar: '',
                tip: '',
                title: '',
                subTitle: '',
                subTitles: [],
                infos: []
            },
            body: {
                content: '',
                tip: ''
            }
        }
    },
    created() {
        this.baseRequest(this.$extractRouteInfo(), getInitData, this.isTest).then(data => {
            Object.assign(this.$data, data)
            if (data.floatTip) {
                let storageValue = this.$util.getStorage(window.location.href + '__' + data.floatTip)
                if (storageValue === undefined || storageValue === null) {
                    this.isTipShow = true
                    this.$util.setStorage(window.location.href + '__' + data.floatTip, {})
                } else {
                    this.isTipShow = false
                }
            }
            this.isLoading = false
        })
    }
}
</script>
<style lang="scss" scoped>
.qrcode {
  &-wrapper {
    padding: 12px;
  }
  &-container {
    border-radius: 5px;
    box-shadow: 1px 1px 5px #999;
  }
  &-header {
    padding: 15px 15px 0;
    overflow-y: auto;
    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: auto;
    }
    &__info {
      width: 250px;
      margin: 0 auto;
      border-right: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
      flex-wrap: wrap;
      flex-shrink: 0;
      background: #f2f3f7;
      &-item {
        box-sizing: border-box;
        width: 50%;
        line-height: 20px;
        padding: 5px 0;
        border-left: 1px solid #d7d7d7;
        border-top: 1px solid #d7d7d7;
      }
    }
  }
}
.space {
  position: relative;
  padding: 10px 0;
  margin-bottom: 8px;
  border-top: 1px dashed #d7d7d7;
  &::after {
    content: "";
    position: absolute;
    left: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #43bd56;
  }
  &::before {
    content: "";
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #43bd56;
  }
}
.tip-wrapper {
  .weui-mask {
    background-color: transparent;
    z-index: 10;
  }
  .tip-content {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 220px;
    height: 50px;
    padding: 0 16px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: -4px -4px 4px #bbb;
    &::after {
      content: "";
      position: absolute;
      display: block;
      bottom: -24px;
      left: 50%;
      transform: translateX(-18px);
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 12px 18px;
      border-color: #42bd56 transparent transparent;
    }
  }
}
.animate-bounce-up {
  animation: bounce-up 1.4s linear infinite;
}
@keyframes bounce-up {
  25% {
    transform: translateX(-50%) translateY(10px);
  }
  50%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  75% {
    transform: translateX(-50%) translateY(-10px);
  }
}
.footer-logo {
  line-height: 16px;
  margin: 18px 0 8px;
}
@media screen and (max-width: 320px) {
  .footer-logo {
    line-height: 16px;
    margin: 4px 0 4px;
    font-size: 12px;
  }
  .space {
    margin-bottom: 0;
    padding: 4px 0;
  }
}
</style>
