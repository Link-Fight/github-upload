<template>
 <popPanel @close="$emit('close')">
    <div slot="header" class="xa-txt-center xa-txt-bold xa-bg-f6" style="padding:15px;">
        <p class="xa-txt-16">极飞无忧计划</p>
    </div>
    <div class="xa-container" style="max-height:50vh">
        <div style="padding:4px 15px;margin-bottom:12px;background:#fff;">
            <p class="xa-txt-666">您已有无忧计划卡</p>
            <div @click="$emit('toScan')" class="xa-btn xa-btn--green" style="margin-bottom:16px;">
                <i class="iconfont icon-saomiao xa-txt-12" style="margin-right:4px;"></i>扫描无忧计划卡二维码
            </div>
            <p v-if="buyUrl" class="xa-txt-666">或者 还没有无忧计划卡</p>
            <div v-if="buyUrl" @click="$emit('toBuy')" class="xa-btn xa-btn--yellow">
                在线购买
            </div>
            <p class="xa-txt-999 xa-txt-13">提醒：支付成功将自动激活设备</p>
        </div>
        <div class="diyDoc-wrapper xa-bg-white" v-html="content" style="padding:4px 15px;"></div>
    </div>
    <div slot="footer">
        <div @click="$emit('close')" class="xa-btn xa-btn--plain" >取消</div>
    </div>
</popPanel>
</template>
<script>
export default {
    data() {
        return {
            content: ''
        }
    },
    props: {
        docUrl: String,
        buyUrl: String
    },
    methods: {
        getTestServer(params) {
            return import('@/config/DiyDoc.js').then(({ getInitData }) => getInitData(params))
        }
    },
    mounted() {
        if (this.docUrl) {
            let request = this.docUrl === 'isTest' ? this.getTestServer : this.$diyAction
            this.$promiseWithUi(request({
                url: this.docUrl
            })).then(data => {
                Object.assign(this.$data, data)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.xa-container {
  background-color: #f2f2f2;
}
.xa-btn {
  color: #fff;
  border-radius: 5px;
  margin: 4px 0;
  text-align: center;
}
.xa-btn--green {
  background-color: #42bd46;
  border-color: #42bd46;
}
.xa-btn--yellow {
  background-color: #ff6600;
  border-color: #ff6600;
}
.xa-btn--plain {
  margin: 0;
  color: #666;
  border: none;
  background-color: #fff;
  border-top: 1px solid #e5e5e5e5;
}
</style>
<style lang="scss">
.diyDoc-wrapper {
  img {
    max-width: 100% !important;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
