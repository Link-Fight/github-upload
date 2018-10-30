<template>
 <header class="device-info">
    <AppAvatar class="device-info__avatar" share="square" :avatar="avatar" size="65"/>
    <p class="xa-txt-bold">{{title}}</p>
    <p>{{sn}}</p>
</header>
</template>
<script>
export default {
    props: {
        avatar: String,
        title: String,
        sn: String
    }
}
</script>
<style lang="scss">
.device-info {
  text-align: center;
  line-height: 20px;
}
.device-info__avatar {
  margin: 45px auto 0;
  width: 140px !important;
  height: 78px !important;
  background-size: contain !important;
}
</style>
