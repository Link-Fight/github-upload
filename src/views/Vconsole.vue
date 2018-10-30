<template>
<section class="xa-view">
    <div class="xa-flex">
        <FormTextArea v-model="url" placeholder="输入地址"/>
    </div>
    <FormCell>{{userAgent}}</FormCell>
    <FormCell label="mini">{{miniProgram}}</FormCell>
    <FormCell label="toLoc">{{toLocResult}}</FormCell>
    <FormCell label="小程序:"/>
    <AppBtns class="xa-line__top" :items="toMiniTest" @click="toMiniDo"/>
    <AppBtns class="xa-line__top" :items="toTest" @click="toDo"/>
    <AppBtns :items="[{txt: '跳转',type: 'submit'}]" @click="$gotoHref(url)" />
</section>
</template>
<script>
import FormTextArea from '@/components/FormTextArea.vue'
import { getLocation } from '../controllers/reactNative'
let VConsole = require('vconsole/dist/vconsole.min.js')
// eslint-disable-next-line
let vc = new VConsole()
export default {
    components: {
        FormTextArea
    },
    data() {
        return {
            url: this.$route.query.url || '#/',
            userAgent: navigator.userAgent,
            miniProgram: '',
            toTest: [
                { txt: '发消息给RN', type: 'alert', action: 'toRN' },
                { txt: '获取定位', type: 'default', action: 'toLoc' }
            ],
            toMiniTest: [
                { txt: 'getEnv', type: 'submit', action: 'toMin_info' },
                { txt: 'postMessage', type: 'alert', action: 'toMin_post' },
                { txt: 'relaunch', type: 'default', action: 'toMin_relaunch' },
                { txt: 'redirectTo', type: 'default', action: 'toMin_redirectTo' },
                { txt: 'navigateBack', type: 'default', action: 'toMin_navigateBack' }
            ],
            toLocResult: ''
        }
    },
    methods: {
        toDo({ action }) {
            switch (action) {
                case 'toRN':
                    this.getLocation(loc => { this.toLocResult = loc })
                    break
                case 'toLoc':
                    this.toLocResult = '...'
                    this.$getLocation().then(data => (this.toLocResult = data), error => (this.toLocResult = error))
                    break
            }
        },
        toMiniDo({ action }) {
            let miniProgram = this.$wxAction.miniProgram()
            switch (action) {
                case 'toMin_info':
                    this.miniProgram = '...'
                    miniProgram.getEnv((res) => {
                        this.miniProgram = res.miniprogram
                    })
                    break
                case 'toMin_post':
                    miniProgram.postMessage({ data: 'v4' })
                    break
                case 'toMin_relaunch':
                    miniProgram.reLaunch({ url: '/pages/order/baseDetail?uuid=8737e134-1b72-4c00-9114-a25131f2c0de' })
                    break
                case 'toMin_redirectTo':
                    this.$gotoHref('mini:/pages/order/baseDetail?uuid=8737e134-1b72-4c00-9114-a25131f2c0de')
                    break
                case 'toMin_navigateBack':
                    miniProgram.navigateBack({ url: '/pages/order/baseDetail?uuid=8737e134-1b72-4c00-9114-a25131f2c0de' })
                    break
            }
        },
        getLocation
    }
}
</script>
