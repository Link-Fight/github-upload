<template>
  <section class="xa-view" v-show="!isLoading">
      <section class="xa-flex xa-container xa-txt-center xa-bg-white">
          <div class="header" style="padding-top:35px;">
            <AppAvatar class="xa-default__img" :avatar="body.header.img" size="80"/>
            <p style='font-size: 20px;font-weight: 800;line-height: 1.4;' v-html="body.header.title"></p>
            <p class="xa-txt-999" style="margin-top:16px;" v-html="body.header.subTitle"></p>
         </div>
         <div class="weui-loadmore weui-loadmore_line" style="width:90%">
            <span class="weui-loadmore__tips">{{body.tip}}</span>
        </div>
        <div class="content">
            <AppAvatar class="xa-default__img" :avatar="body.content.img" size="80"/>
            <p style='font-size: 20px;font-weight: 800;line-height: 1.4;' v-html="body.content.title"></p>
            <p class="xa-txt-999" style="margin-top:16px;" v-html="body.content.subTitle"></p>
        </div>
      </section>
      <AppBtns :items="btns" @click="onBtnClick"/>
  </section>
</template>
<script>
import baseView from './BaseView.js'
import { getInitData } from '../config/ViewJoin'
export default {
    name: 'JoinView',
    extends: baseView,
    data() {
        return {
            isTest: !!this.$route.query.isTest,
            isLoading: true,
            body: {
                header: {
                    img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
                    title: '其实不想走',
                    subTitle: '你走不走：打我电话(110、119)'
                },
                tip: '当前账号',
                content: {
                    img: 'http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/a18e4d6c826db144b7d2202892814cf7.jpg?imageView2/0/w/100/h/100&e=1823479031&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:VBrbHUpjVJaT7GjO80EpK6RMhPM=',
                    title: '',
                    subTitle: ''
                }
            },
            btns: []
        }
    },
    methods: {
        initFn() {
            return this.baseInitFn(getInitData).then(data => {
                Object.assign(this.$data, data)
            })
        },
        onBtnClick(btnCfg, event) {
            this.$onConfigBtnClick(btnCfg).then(data => {
                if (data) {
                    this.initFn()
                } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
                    this.$showPopBtnsBottom(btnCfg.items, event.target).then(btnCfg => {
                        this.onBtnClick(btnCfg, event)
                    })
                }
            })
        }
    },
    mounted() {
        this.initFn().then(() => {
            this.isLoading = false
        })
    }
}
</script>
<style lang="scss" scoped>
.xa-default__img {
  margin: 0 auto;
  margin-bottom: 8px;
}
</style>
