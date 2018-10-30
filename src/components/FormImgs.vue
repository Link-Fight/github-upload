<template>
<div class="form-imgs__wrapper xa-bg-white" :style="{'paddingTop':!label&&!this.max&&'15px'}">
    <div v-if="label||this.max" :style="{'opacity':this.max||0}" style="padding:8px 0" class="xa-cell xa-txt-12 xa-txt-999">
        <div class="xa-flex xa-txt-333 xa-txt-14">{{label}}</div>
        <i v-show="isLoading" class="weui-loading"></i>
        {{this.items.length}}/{{this.max}}
    </div>
    <ul class="form-imgs__container xa-cell">
        <template v-for="(img,index) in items">
            <slot :img="img" :i="index" :onpreview="onPreviewClick" :onremove="onRemoveClick">
                <li @click.self="onPreviewClick(index)" :key="img.thumb_url+index" :style="{'backgroundImage':'url('+img.thumb_url+')','width':imgSize,'height':imgSize}" class="weui-uploader__file">
                    <div v-if="!disabled" @click.stop="onRemoveClick(index)" style="position: absolute;top:-9px;right: -9px;">
                        <i class="weui-icon-clear"></i>
                    </div>
                </li>
            </slot>
        </template>
        <li v-if="canAdd&&!disabled" @click="onAddClick" class="weui-uploader__input-box" :style="{'width':imgSize,'height':imgSize}"></li>
    </ul>
</div>
</template>
<script>
let uploadImgAsync = import(/* webpackChunkName: "uploadImageServer" */'@/controllers/UploadImg.js')
export default {
    name: 'FormImgs',
    data() {
        return {
            uploadServer: null,
            items: [],
            isLoading: false,
            requireLocation: false
        }
    },
    props: {
        label: String,
        value: {
            type: Array,
            default() {
                return []
            }
        },
        max: [Number, String],
        readyOnly: {
            type: Boolean,
            default: false
        },
        gps: Boolean,
        gpsCascade: String,
        variables: Object,
        sizeType: {
            type: [String, Array]
            // ['original', 'compressed']
        },
        sourceType: {
            type: [String, Array]
            //  ['album', 'camera']
        },
        disabled: {
            type: Boolean,
            default: false
        },
        imgSize: String
    },
    computed: {
        canAdd() {
            if (this.readyOnly === true) {
                return false
            }
            if (this.max !== undefined) {
                let max = parseInt(this.max)
                if (max <= this.items.length) {
                    return false
                }
            }
            return true
        }
    },
    methods: {
        getAsyCacheResourceApi(value) {
            return import('@/controllers/cacheResourceUrls.js').then(({ getCacheUrls }) => getCacheUrls(value, this.$diyAction))
        },
        getServer() {
            if (this.uploadServer) {
                return Promise.resolve(this.uploadServer)
            } else {
                return uploadImgAsync.then(({ UploadImg }) => {
                    this.uploadServer = new UploadImg(this.$isWeixin, this, this.$wxAction, this.$diyAction)
                    return this.uploadServer
                })
            }
        },
        getCfg() {
            let config = {
                count: 9
            }
            if (this.max) {
                config.count = parseInt(this.max) - this.items.length
                if (config.count > 9) {
                    config.count = 9
                }
            }
            if (this.sizeType) {
                config.sizeType = this.sizeType instanceof Array ? this.sizeType : [this.sizeType]
            }
            if (this.sourceType) {
                config.sourceType = this.sourceType instanceof Array ? this.sourceType : [this.sourceType]
            }
            return config
        },
        onRemoveClick(index) {
            this.items.splice(index, 1)
            this.updateVaule()
        },
        onPreviewClick(index) {
            this.$wxAction.previewImage(this.items[index].url, this.items.map(item => item.url))
        },
        onAddClick: async function () {
            let server = await this.getServer()
            try {
                let imagesData = await server.chooseImage(this.getCfg())
                console.log('imagesData', imagesData)
                this.isLoading = true
                this.getPicLoaction(imagesData).then(() => {
                    imagesData.guid.forEach((guid, index) => {
                        this.items.push({
                            guid,
                            thumb_url: imagesData.src[index],
                            url: imagesData.src[index]
                        })
                    })
                    this.updateVaule()
                })
            } catch (error) {
                console.log('error', JSON.stringify(error))
            }
        },
        getPicLoaction(imagesData) {
            if (!this.requireLocation) {
                return Promise.resolve()
            }
            return this.$diyAction({
                url: '/resource/home/location_detail',
                data: {
                    guid: imagesData.guid[0]
                }
            }).then(data => {
                // this.requireLocation = false
                if (!data.id) {
                    this.isLoading = false
                    this.$showAlert('请上传带有gps信息的原图')
                    return new Promise(function () { })
                }
                if (this.gpsCascade && this.variables) {
                    if (this.variables[this.gpsCascade] && !this.variables[this.gpsCascade].id) {
                        Object.assign(this.variables[this.gpsCascade], data)
                    }
                }
            })
        },
        updateVaule() {
            this.$nextTick(function () {
                this.isLoading = false
                this.$emit('input', this.items.map(item => item.guid))
            })
        }
    },
    mounted() {
        if (this.value && this.value.length) {
            this.isLoading = true
            this.getAsyCacheResourceApi(this.value)
                .then(imgs => {
                    console.log(imgs)
                    this.items = imgs.map(img => {
                        this.isLoading = false
                        return {
                            guid: img.uid,
                            thumb_url: img.thumb_url,
                            url: img.url
                        }
                    })
                })
        }
        if (this.gps) {
            this.requireLocation = true
        }
    }
}
</script>
<style lang="scss" scoped>
.weui-uploader__file {
  position: relative;
  margin-right: 16px;
  margin-bottom: 16px;
}
.form-imgs__container {
  flex-wrap: wrap;
}
.form-imgs__wrapper {
  padding: 0px 15px 5px 15px;
  min-height: 100px;
  flex-wrap: wrap;
}
@media screen and (min-width: 360px) {
  .weui-uploader__input-box,
  .weui-uploader__file {
    width: 88px;
    height: 88px;
  }
}
@media screen and (min-width: 375px) {
  .weui-uploader__input-box,
  .weui-uploader__file {
    width: 98px;
    height: 98px;
  }
}
</style>
