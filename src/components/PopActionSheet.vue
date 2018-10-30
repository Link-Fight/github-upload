<template>
<PopPanel  @close="$emit('close')">
    <div v-if="title" slot="header" class="xa-txt-center xa-txt-bold xa-bg-f6" style="padding:15px;">
        <p class="xa-txt-16">{{title}}</p>
    </div>
    <div class="xa-bg-white xa-txt-center">
        <template v-for="(item,index) in items">
            <div class="xa-line__bottom" style="padding:15px" :class="item.class" @click="onBtnClick(item)" :key="index" v-html="item.txt||item"></div>
        </template>
    </div>
    <div slot="footer" @click="$emit('close')" class="xa-bg-f6 xa-txt-center"  style="padding:15px;">
        取消
    </div>
</PopPanel>
</template>
<script>
export default {
    name: 'PopActionSheet',
    data() {
        return {
            isAgress: false
        }
    },
    props: {
        title: String,
        items: Array,
        resolve: Function
    },
    methods: {
        onBtnClick(btn) {
            this.resolve(btn)
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
