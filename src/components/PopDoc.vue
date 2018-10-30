<template>
 <PopPanel  @close="$emit('close')" :wrapStyle="{'backgroundColor':'transparent'}">
  <section class="xa-view" style="height:100vh;padding:56px 32px;">
     <section class="xa-view popDoc-conent xa-bg-f6">
        <header>
            <AppTab :class="{'xa-txt-green':tabs.length===1}" :items="tabs" :value="curTab" @input="onTabChange" />
        </header>
        <section class="xa-container xa-flex xa-bg-white xa-line__top" style="padding:4px">
            <section v-html="curContent"></section>
        </section>
        <footer class="xa-txt-center xa-txt-666 xa-line__top" style="line-height:40px;" @click="$emit('close')">
            我知道了
        </footer>
     </section>
  </section>
 </PopPanel>
</template>
<script>
let STORE = {
    isTest1: '<img style="width:100%;display: block;max-width: 320px;margin: 0 auto;" src="http://p6e99w2gy.bkt.clouddn.com/agri/pm/v4/farm/join_demand.png?nsukey=KHisU4zUiyMVQTKwUMv2OkpR5joXTyhP05HlioHPy0vIPqloY7jDsOOHOcW0XJTlIM8LynyHIBGqjKEyFnb%2BQo4vvkHJLNgfdJEw8OgltPBEOU9E1L7xZj7vh193czz3sHhS3jiksHB0nBg7BYu2W9Th40qs3aCaSrpccLl%2B7haA4LL%2FnIzlNCuinbO19vnoNQbLmF5M8tEora9jjN62XQ%3D%3D">',
    isTest2: '<img style="width:100%;display: block;max-width: 320px;margin: 0 auto;" src="http://p6e99w2gy.bkt.clouddn.com/agri/pm/v4/farm/publish_demand.png">'
}
export default {
    name: 'Doc',
    data() {
        return {
            curTab: -1,
            curContent: ''
        }
    },
    props: {
        tabs: {
            type: Array,
            default() {
                return []
            }
        },
        content: String
    },
    methods: {
        onTabChange(index) {
            let tabApi = this.tabs[index].api
            this.loadDocConent(tabApi)
            this.curTab = index
        },
        loadDocConent(tabApi) {
            if (STORE[tabApi]) {
                this.curContent = STORE[tabApi]
            } else {
                this.$promiseWithUi(this.$diyAction({ url: tabApi })).then(content => {
                    this.curContent = STORE[tabApi] = content
                })
            }
        }
    },
    created() {
        if (this.tabs.length === 0 && this.content) {
            this.curContent = this.content
        } else if (this.tabs.length === 1) {
            this.loadDocConent(this.tabs[0].api)
        } else {
            this.onTabChange(0)
        }
    }
}
</script>
<style lang="scss" scoped>
.popDoc-conent {
  overflow: hidden;
  border-radius: 5px;
}
</style>