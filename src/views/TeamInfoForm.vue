<template>
  <section class="xa-view">
    <section class="xa-flex xa-container" v-if="config.body.length">
      <DetailForm :configs="config.body" :submitApi="config.body.submitApi" @refresh="onRefresh" />
    </section>
    <AppBtns class="xa-flex--shrink" v-if="config.footer" @click="onBtnClick" :items="config.footer"/>
  </section>
</template>
<script>
import baseView from './BaseView.js'
import DetailForm from '../components/DetailForm'
import { getInitData } from '../config/ViewTeamInfoForm'
export default {
  name: 'teamInfoFormView',
  extends: baseView,
  data() {
    return {
      isTest: !!this.$route.query.isTest,
      config: {
        body: [],
        submitApi: '',
        footer: []
      }
    }
  },
  components: {
    DetailForm
  },
  methods: {
    initFn() {
      return this.baseInitFn(getInitData).then(data => {
        Object.assign(this.$data, data)
      })
    },
    onRefresh() {
      this.config.body = []
      this.$nextTick(function () {
        this.initFn().then(() => this.$showToast('更新成功'))
      })
    },
    onBtnClick(btnCfg, event, com) {
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
  created() {
    this.initFn()
  }
}
</script>
<style lang="scss" scoped>
</style>
