<template>
    <PopPanel @close="onBtnClick()">
        <div slot="header" class="xa-txt-center xa-bg-f6" style="padding:15px;">
            <p class="xa-txt-16">{{title}}</p>
            <p v-if="phone" class="xa-txt-12 xa-txt-999">
                更换手机后，下次登录可使用新手机号登录。当前手机号:<span class="xa-txt-green">{{phone}}</span>
            </p>
        </div>
        <div class="input-wrapper xa-bg-f6">
            <div class="xa-cell weui-search-bar__box weui-cell_access">
                <div class="select-phone-wrap xa-cell">
                    <select class="weui-select" v-model="icc">
                        <option v-for="(phone) in phones" :value="phone.code" :key="phone.code">+{{phone.code}} {{phone.desp}}</option>
                    </select>
                    <div class="xa-txt-333 weui-cell__ft"></div>
                </div>
                <input type="tel"  v-model="newPhone" class="weui-search-bar__input" placeholder="输入手机号" />
                <a href="javascript:" v-show="!!newPhone" class="weui-icon-clear" @click="newPhone=''" style="top:8px;"></a>
            </div>
            <div class="xa-cell weui-search-bar__box">
                <div class="xa-flex">
                    <input type="text"  v-model="verifyCode" class="weui-search-bar__input" placeholder="输入验证码" />
                </div>
                <template v-if="!isloading">
                    <div v-if="timedown" class="verifyCode-wrap xa-txt-999">重新获取({{timedown}})</div>
                    <div v-else @click="onSendVerifyCode" class="verifyCode-wrap xa-txt-green">获取验证码</div>
                </template>
                <i v-if="isloading" class="weui-loading"></i>
            </div>
        </div>
        <AppBtns slot="footer" :items="btns" @click="onBtnClick"/>
    </PopPanel>
</template>
<script>
import { cancelOkBtns } from '@/config/AppBtns'
import phones, { countDown } from '../controllers/phone'
export default {
    name: 'PopChangePhone',
    data() {
        return {
            btns: cancelOkBtns,
            phones,
            icc: '86',
            newPhone: '',
            verifyCode: '',
            isloading: false,
            timedown: 0
        }
    },
    props: {
        phone: String,
        title: String,
        tip: String,
        resolve: Function,
        reject: Function
    },
    methods: {
        sendverificationCode() {
            this.isloading = true
            return this.$promiseWithUi(
                this.$diyAction({
                    url: '/common/sms/verify_code',
                    data: {
                        phone: this.newPhone,
                        icc: this.icc
                    }
                }),
                {
                    toast: false
                }
            ).finally(() => {
                this.isloading = false
            })
        },
        onSendVerifyCode() {
            if (this.newPhone) {
                if (this.phone === this.newPhone) {
                    return this.$showToast('和原来的号码一致')
                }
                this.sendverificationCode().then(() => {
                    this.timedown = 60
                    countDown(this, {
                        timedown: 0
                    })
                    this.$showToast('发送成功，请检查短信！')
                })
            } else {
                return this.$showToast('请先输入手机号')
            }
        },
        onBtnClick({ action } = {}) {
            if (action === 'ok') {
                if (!this.newPhone) {
                    return this.$showToast('请输入手机号')
                } else if (!this.verifyCode) {
                    return this.$showToast('请输入验证码')
                }
                let result = {
                    icc: this.icc,
                    phone: this.newPhone,
                    verifyCode: this.verifyCode
                }
                this.resolve ? this.resolve(result) : this.$emit('submit', result)
            } else {
                this.reject ? this.reject() : this.$emit('close')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  padding: 0 15px 15px;
}
.select-phone-wrap {
  padding-right: 8px;
  margin-right: 8px;
  border-right: 1px solid #e4e4e4;
}
.verifyCode-wrap {
  padding-left: 8px;
  margin-left: 8px;
  border-left: 1px solid #e4e4e4;
}
.weui-select {
  height: 20px;
  line-height: 20px;
  width: 5em;
  padding: 0;
}
.weui-search-bar__box {
  padding: 8px 16px;
  background-color: #fff;
  border-radius: 5px;
}
.weui-search-bar__box + .weui-search-bar__box {
  margin-top: 8px;
}
</style>