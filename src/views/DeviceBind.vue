<template>
<section class="xa-view xa-bg-white" v-show="!isLoading">
    <DeviceInfo :avatar="device.avatar" :title="device.title" :sn="'SN:'+device.sn" />
    <section class="xa-flex xa-container">
        <div class="xa-txt-center" style="margin:50px auto;width:233px;height:215px;background:#f2f3f7;border:1px solid #d7d7d7;border-radius:6px;">
            <div style="margin-bottom:10px;position:relative;top:-30px;">
                <div style="margin:auto;width:60px;height:60px;background:#42bd56;border-radius:50%;line-height:60px;"><i class="xa-txt-white xa-txt-32 iconfont icon-bangding"></i></div>
                <p class="xa-txt-999">即将绑定账号</p>
            </div>
            <AppAvatar style="margin:auto;" :avatar="user.avatar" size="55"/>
            <p class="xa-txt-bold">{{user.name}}</p>
            <p>{{user.phone}}</p>
        </div>
    </section>
    <AppBtns class="xa-line__top" v-if="btns.length" @click="onBaseBottomBtnClick" :items="btns"/>
</section>
</template>
<script>
import BaseView from './BaseView'
import DeviceInfo from '@/components/DeviceInfo.vue'
function getTestServer(action) {
    return (params) => import('@/config/DeviceBind.js').then((_) => _[action](params))
}
export default {
    name: 'DeviceActive',
    extends: BaseView,
    components: {
        DeviceInfo
    },
    data() {
        return {
            isLoading: false,
            device: {
                avatar: '',
                title: '',
                sn: ''
            },
            user: {
                avatar: '',
                name: '',
                phone: ''
            },
            btns: []
        }
    },
    methods: {
        initFn() {
            this.isLoading = true
            this.baseInitFn(getTestServer('getInitData')).then(data => {
                this.isLoading = false
                Object.assign(this.$data, data)
            })
        }
    },
    created() {
        this.initFn()
    }
}
</script>
