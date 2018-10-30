<template>
<div class="xa-bg-white">
    <LinkCell v-show="title" class="xa-txt-bold" :title="title" :phone="phone"/>
    <div class="items-wrapper xa-bg-white" @click="$emit('click')">
        <div class="xa-cell" v-for="(item,index) in items" :key="index">
            <p v-show="item.value"><span class="xa-txt-999">{{item.txt}}</span><span class="xa-txt-999" v-if="item.txt&&item.value">: </span>
                 {{item.value}}</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'InfoListItem',
    props: {
        title: String,
        items: Array,
        phone: String
    }
}
</script>
<style lang="scss" scoped>
.items-wrapper {
  padding: 10px 15px;
  line-height: 24px;
}
</style>
