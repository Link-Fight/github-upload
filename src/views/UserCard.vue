<template>
<section class="xa-view xa-container" v-show="licence.length">
    <p v-if="hasLic.length">已获得({{hasLic.length}})</p>
    <ul class="card-wrap">
        <template v-for="(lic,index) in hasLic">
          <UserCard :key="index" class="card-item" :type="lic.index" :id="lic.code" :text="lic.title" @click.native="$gotoHref(lic.href)"></UserCard>
        </template>
    </ul>
    <p v-if="noLic.length">未获得({{noLic.length}})</p>
    <ul class="card-wrap">
        <template v-for="(lic,index) in noLic">
          <UserCard :key="index" class="card-item" :type="lic.index" :id="lic.code" :text="lic.title" @click.native="$gotoHref(lic.href)"></UserCard>
        </template>
    </ul>
</section>
</template>
<script>
import { mapState } from 'vuex'
import baseView from './BaseUser.js'
import UserCard from '@/components/UserCard.vue'
export default {
  extends: baseView,
  components: {
    UserCard
  },
  computed: {
    ...mapState({
      licence: state => state.user.licence
    }),
    hasLic() {
      return this.licence.filter(lic => !!lic.active)
    },
    noLic() {
      return this.licence.filter(lic => !lic.active)
    }
  }
}
</script>
<style lang="scss" scoped>
.xa-container {
  padding: 10px 15px;
}
.card-wrap {
  padding-bottom: 10px;
}
.card-item {
  padding-bottom: 55%;
  margin-top: 8px;
}
</style>