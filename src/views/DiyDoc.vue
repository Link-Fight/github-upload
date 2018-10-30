<template>
<section class="diyDoc-wrapper xa-bg-white" v-html="content" style="padding:4px 15px;"></section>
</template>
<script>
import baseView from './BaseView.js'
export default {
    name: 'DiyDoc',
    extends: baseView,
    data() {
        return {
            isLoading: true,
            content: ''
        }
    },
    methods: {
        getTestServer(params) {
            return import('@/config/DiyDoc.js').then(({ getInitData }) => getInitData(params))
        }
    },
    created() {
        this.baseSessionInitFn('', this.getTestServer)
            .then(data => {
                Object.assign(this.$data, data)
                this.isLoading = false
            })
    }
}
</script>
<style lang="scss">
.diyDoc-wrapper {
  img {
    max-width: 100% !important;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
