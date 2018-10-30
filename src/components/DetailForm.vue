<template>
  <div>
      <template v-for="(item,index) in items">
            <LinkCellForImg v-if="item.type=='LinkCellForImg'" :key="index" @click.native="onComClick(item)" :img="item.img" :title="item.title" :value="item.value" :href="item.href" class="xa-com__space" size="large"></LinkCellForImg>
            <LinkCell  v-else-if="item.type==='LinkCell'" :key="index"  @click.native="onComClick(item)" :icon="item.icon" :btns="item.btns" :title="item.title" :subTitle="item.subTitle" :value="item.value" :href="item.href" class="xa-com__space"></LinkCell>
            <LinkCellGroup  v-else-if="item.type==='LinkCellGroup'" :theme="item.theme"  @itemClick="onComClick" :key="index" :title="item.title" :items="item.items" class="xa-com__space"></LinkCellGroup>
            <LinkCellForImgGroup  v-else-if="item.type==='LinkCellForImgGroup'" @itemClick="onComClick" :key="index" :title="item.title" :items="item.items" class="xa-com__space" size="large"></LinkCellForImgGroup>
      </template>
  </div>
</template>
<script>
let uploadImgAsync = import(/* webpackChunkName: "uploadImageServer" */'@/controllers/UploadImg.js')
export default {
    name: 'DetailForm',
    data() {
        return {
            server: {
                uploadImg: false
            },
            items: []
        }
    },
    props: {
        submitApi: {
            type: String,
            default: '/wechat/wechat/check_login'
        },
        configs: {
            type: Array
        }
    },
    methods: {
        getServer(server) {
            if (server === 'images-upload') {
                if (this.server.uploadImg) {
                    return Promise.resolve(this.server.uploadImg)
                } else {
                    this.$showToast('正在请求选择图片', 'msg', 0)
                    return uploadImgAsync.then(({ UploadImg }) => {
                        this.$hiddenToast()
                        this.server.uploadImg = new UploadImg(this.$isWeixin, this, this.$wxAction, this.$diyAction)
                        return this.server.uploadImg
                    })
                }
            }
        },
        onComClick: async function (itemConfig) {
            if (itemConfig.EDIT) {
                let EDIT = itemConfig.EDIT
                if (Array.isArray(EDIT)) {
                    this.$showPopActionSheet(EDIT).then(cfg => {
                        console.log('cfg', JSON.stringify(cfg))
                    })
                }
                if (EDIT.type === 'images-upload') {
                    let server = await this.getServer('images-upload')
                    let imagesData = await server.chooseImage()
                    this.linkCellForImgUpdateImg(itemConfig, imagesData)
                } else if (EDIT.type === 'text') {
                    this.$showPopInput(itemConfig.title, itemConfig.value)
                        .then(value => this.linkCellUpdateValue(itemConfig, value))
                } else if (EDIT.type === 'select') {
                    this.$showPopSelect(EDIT.src).then(data => {
                        if (data && data.length) {
                            this.submitData(EDIT.api || this.submitApi, { [EDIT.variable]: data }).then(() => {
                                this.$showToast('修改成功')
                                setTimeout(() => {
                                    this.$emit('refresh')
                                }, 2000)
                            })
                        }
                    })
                }
            }
        },
        linkCellForImgUpdateImg(itemConfig, images) {
            this.submitData(itemConfig.EDIT.api || this.submitApi, { [itemConfig.EDIT.variable]: images.guid[0] }).then(() => {
                itemConfig.img = images.src[0]
                this.$showToast('修改成功')
            })
        },
        linkCellUpdateValue(itemConfig, value) {
            this.submitData(itemConfig.EDIT.api || this.submitApi, { [itemConfig.EDIT.variable]: value }).then(() => {
                itemConfig.value = value
                this.$showToast('修改成功')
            })
        },
        submitData(url, data) {
            return this.$promiseWithUi(this.$diyAction({ url, data, method: 'post' }))
        }
    },
    created() {
        this.items = Array.from(this.configs)
    }
}
</script>
<style lang="scss" scoped></style>
