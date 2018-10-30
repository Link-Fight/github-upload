<template>
  <section class="xa-view" v-if="!isLoading">
    <TouchEvent @change="onTouchChange"/>
    <TeamListItem class="team-detal__header xa-bg-green" :style="{'backgroundColor':config.header.bg}"
     :avatar="config.header.avatar"
     :certificate="config.header.certificate"
      :title="config.header.title"
      :subTitle="config.header.sub_title"
      :attrs="config.header.attrs"
      :tags="config.header.tags"
      :btns="config.header.btns"
      :badge="config.header.current"
      :href="config.header.href"
      :tip="config.header.tip"
    />
    <section class="xa-view xa-container">
        <DetailComFactory v-if="config.body.length" :initCfg="config.body" @refresh="initFn"></DetailComFactory>
    </section>
    <AppBtns class="xa-flex--shrink" v-if="config.footer" @click="onBtnClick" :items="config.footer"/>
  </section>
</template>
<script>
import baseView from './BaseView.js'
import { getInitData } from '../config/ViewTeamDetail'
export default {
  name: 'TeamDetailView',
  extends: baseView,
  data() {
    return {
      isTest: !!this.$route.query.isTest,
      isLoading: true,
      config: {
        header: {
          title: '* * *',
          sub_title: '* * *',
          attrs: [],
          tags: [],
          btns: [],
          current: '',
          href: ''
        },
        body: [],
        footer: []
      }
    }
  },
  methods: {
    onTouchChange({ action }) {
      if (action === 'needRefresh') {
        this.initFn(true)
      }
    },
    onBtnClick(btnCfg, event) {
      this.$onConfigBtnClick(btnCfg).then(data => {
        if (data) {
          console.log('toTo:refresh')
          this.$emit('refresh')
        } else if (data === undefined && btnCfg.items && btnCfg.items.length) {
          this.$showPopBtnsBottom(btnCfg.items, event.target).then(btnCfg => {
            this.onBtnClick(btnCfg, event)
          })
        }
      })
    },
    initFn() {
      return this.baseInitFn(getInitData).then(data => {
        this.config.body = []
        this.$nextTick(function () {
          Object.assign(this.$data, data)
        })
      })
    }
  },
  created() {
    this.initFn().then(() => {
      this.isLoading = false
    })
  },
  beforeDestroy() {
    console.log('mainCache beforeDestroy')
  }
}
</script>
<style lang="scss">
.team-detal__header {
  .team-item__avatar {
    top: 0;
  }
  .team-item__title.xa-txt-333 {
    font-size: 18px !important;
    color: #fff;
  }
  .team-item__subtitle.xa-txt-12 {
    font-size: 14px !important;
    color: #fff;
    margin-top: 6px;
  }
}
</style>