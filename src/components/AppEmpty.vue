<template>
 <div class="xa-flex xa-txt-center">
    <i style="font-size:80px;margin-top:-40px;" class="xa-txt-999 iconfont" :class="icon||'icon-zanwujilu'"></i>
    <p class="xa-txt-999">{{txt}}</p>
</div>
</template>
<script>
export default {
    name: 'AppEmpty',
    props: {
        icon: String,
        txt: String
    }
}
</script>
<style lang="scss" scoped>

</style>
