<template>
  <AppAvatar v-if="mAvatar.length" :avatar="mAvatar" />
</template>
<script>
export default {
    name: 'AppAvatarByUid',
    data() {
        return {
            mAvatar: []
        }
    },
    props: {
        avatar: [String, Array]
    },
    methods: {
        getAsyCacheResourceApi(value) {
            return import('@/controllers/cacheResourceUrls.js').then(({ getCacheUrls }) => getCacheUrls(value, this.$diyAction))
        }
    },
    created() {
        let uids = []
        if (Array.isArray(this.avatar)) {
            uids = this.avatar
        } else {
            uids = [this.avatar]
        }
        this.getAsyCacheResourceApi(uids).then(imgs => { this.mAvatar = imgs })
    }
}
</script>
