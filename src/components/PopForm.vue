<template>
    <PopPanel  @close="$emit('close')" contentClass="xa-bg-f6">
        <div slot="header" class="pop-title xa-txt-center xa-bg-f6" style="padding:15px;">
            <p class="xa-txt-16">{{title}}</p>
        </div>
        <DiyFormFactory class="xa-bg-f6" ref="form" style="max-height:80vh" v-if="curItems.length" :items="curItems" :values="variables" />
        <AppBtns slot="footer" :items="btns" @click="onBtnClick"/>
    </PopPanel>
</template>
<script>
import { cancelOkBtns } from '../config/AppBtns'
export default {
    name: 'PopForm',
    components: {
        DiyFormFactory: () => import('@/components/DiyFormFactory.vue')
    },
    data() {
        return {
            btns: JSON.parse(JSON.stringify(cancelOkBtns)),
            curItems: [],
            submitCfg: null
        }
    },
    props: {
        title: String,
        items: Array,
        variables: Object
    },
    methods: {
        onBtnClick(e) {
            if (e.action === 'cancel') {
                return this.$emit('close')
            } else {
                this.$refs.form.getSubmitVariables().then(variables => {
                    if (variables) {
                        if (!this.submitCfg) {
                            return this.emitVariable(variables)
                        } else {
                            this.submitVairbale(variables, this.submitCfg)
                        }
                    }
                })
            }
        },
        submitVairbale: async function (variables, cfg) {
            let confirmResult = 'ok'
            if (cfg.ajax && cfg.ajax.confirm) {
                let { action } = await this.$showConfirm(cfg.ajax.confirm)
                confirmResult = action
            }
            if (confirmResult === 'ok') {
                this.$promiseWithUi(this.$diyAction({
                    url: cfg.ajax.api,
                    data: variables,
                    method: 'post'
                })).then(this.emitVariable)
            }
        },
        emitVariable(result) {
            this.$emit('close')
            this.$emit('submit', result)
        }
    },
    mounted() {
        this.curItems = this.items.filter(item => {
            if (item.type === 'submit') {
                Object.assign(this.btns[1], item)
                this.submitCfg = item
                return false
            }
            return true
        })
    }
}
</script>
<style scoped>
.pop-title {
  border-radius: 10px 10px 0px 0px;
  padding: 15px;
}
</style>
