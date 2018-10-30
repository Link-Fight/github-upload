<template>
<div>
    <FormCell :label="label" access>
        <div @click="onShowSelect" class="formselect-diaplay xa-cell xa-flex">
            <span :class="displayLabel.class">{{displayLabel.txt}}</span>
        </div>
    </FormCell>
    <div v-if="isShow" class="weui-mask">
        <section class="max-page-width">
            <pickLatLng :value="value" :child="true" @close="isShow=false" @submit="onSubmit" />
        </section>
    </div>
</div>
</template>
<script>
let asynLoaderResolve = null
let asynLoaderPromise = new Promise(resolve => {
    asynLoaderResolve = resolve
})
export default {
    name: 'FormPickLatLng',
    components: {
        pickLatLng: () => import(/* webpackChunkName: "views/pickLatlng" */'@/components/pickLatlng/index.vue').then(_ => {
            asynLoaderResolve()
            return _
        })
    },
    data() {
        return {
            isShow: false
        }
    },
    props: {
        value: {
            type: Object
        },
        label: String,
        placeholder: {
            type: String,
            default: '请选择'
        }
    },
    computed: {
        displayLabel() {
            if (this.multiple) {
                return {
                    txt: this.placeholder,
                    class: 'xa-txt-999'
                }
            } else {
                if (this.value && this.value.address) {
                    return {
                        txt: this.value.name + ' ' + this.value.address
                    }
                } else {
                    return {
                        txt: this.placeholder,
                        class: 'xa-txt-999'
                    }
                }
            }
        }
    },
    watch: {
        value: {
            deep: true,
            handler() {
                console.log(233)
            }
        }
    },
    methods: {
        onShowSelect() {
            this.isShow = true
            this.$promiseWithUi(asynLoaderPromise).then(() => {
                this.isShow = true
            })
        },
        onSubmit(val) {
            console.log(JSON.stringify(val, null, 4))
            this.$emit('input', val)
        }
    }
}
</script>
<style lang="scss">
.formselect-diaplay {
  justify-content: flex-end;
  text-align: right;
}
</style>