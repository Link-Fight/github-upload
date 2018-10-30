<template>
    <FarmingListItem :config="config">
        <template slot="statu" slot-scope="{statu}">
            <UiStatu class="shape" :statu="statu"/>
        </template>
        <template slot="footer" slot-scope="{tips}">
            <AppAvatar v-if="tips.avatar" size="14" :avatar="tips.avatar" style="margin-right:4px" />
            <div>{{tips.title}}</div>
            <div class="xa-flex">{{tips.time}}</div>
        </template>
    </FarmingListItem>
</template>
<script>
export default {
    name: 'FarmingListItemV2',
    props: {
        config: {
            type: Object
        }
    }
}
</script>