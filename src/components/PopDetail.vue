<template>
    <PopPanel @close="$emit('close')" style="background-color: transparent;" contentClass="xa-bg-f6">
        <div slot="header" class="pop-title xa-txt-center xa-bg-f6">
            <p class="xa-txt-16">{{title}}</p>
        </div>
        <DetailComFactory style="max-height:80vh" :watch="true" :initCfg="body"/>
        <AppBtns slot="footer" :items="btns" @click="$emit('close')"/>
    </PopPanel>
</template>
<script>
export default {
    name: 'PopForm',
    data() {
        return {
            btns: [
                {
                    txt: '确定',
                    type: 'submit',
                    color: '#fff'
                }
            ],
            submitCfg: null
        }
    },
    props: {
        title: String,
        body: Array
    }
}
</script>
<style scoped>
.pop-title {
  border-radius: 10px 10px 0px 0px;
  padding: 15px;
}
</style>
