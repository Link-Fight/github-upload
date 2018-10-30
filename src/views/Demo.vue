<template>
<div>
    <LinkCellGroup @btnClick="onBtnClick(arguments[0],LinkCellGroup)" :theme="LinkCellGroup.theme" :tips="LinkCellGroup.tips" :title="LinkCellGroup.title" :items="LinkCellGroup.items" class="xa-com__space"/>
    <LinkCellGroup :flod="baseLinkCellGroup.flod" :theme="baseLinkCellGroup.theme" :tips="baseLinkCellGroup.tips" :title="baseLinkCellGroup.title" :items="baseLinkCellGroup.items" class="xa-com__space"/>
</div>
</template>
<script>
import { baseLinkCellGroup, insurancelnDetailLinkCellGroup } from '../config/LinkCellGroup'
export default {
    data() {
        return {
            LinkCellGroup: insurancelnDetailLinkCellGroup,
            baseLinkCellGroup
        }
    },
    methods: {
        onBtnClick(...arg) {
            console.log(arg)
        }
    }
}
</script>
<style>
</style>
