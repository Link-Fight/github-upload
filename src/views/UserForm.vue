<template>
  <section class="xa-container" v-if="!isLoading">
    <div class="xa-com__space" style="padding-top:8px;">
        <FormCell label="头像" access @click.native="onComClick('avatar')">
            <AppAvatar v-if="userInfo.avatar" slot="right" size="58" :avatar="userInfo.avatar" ></AppAvatar>
        </FormCell>
        <FormCell label="昵称" @click.native="onComClick('name')">
            <span slot="right">{{userInfo.name}}</span>
        </FormCell>
        <FormCell label="账号ID">
            <span slot="right">{{userInfo.id}}</span>
        </FormCell>
        <FormCell label="二维码名片" :href="userInfo.code_url+'&session=1'">
            <i slot="right" class="iconfont icon-erweima"></i>
        </FormCell>
        <FormCell label="个性签名" @click.native="onComClick('position')">
            <span slot="right">{{userInfo.position}}</span>
        </FormCell>
        <FormCell label="邮箱地址" @click.native="onComClick('email')">
            <span slot="right">{{userInfo.email}}</span>
        </FormCell>
    </div>
    <div class="xa-com__space">
        <FormCell label="修改电话" @click.native="onComClick('phone')">
            <span slot="right">{{userInfo.phone}}</span>
        </FormCell>
        <FormCell label="修改密码" access @click.native="onComClick('password')"></FormCell>
    </div>
    <div class="xa-com__space">
        <FormCell label="实名认证" :href="userInfo.identification_url" :access="!!userInfo.identification_url">
            <span v-if="!userInfo.identification" class="xa-txt-999" slot="right">未认证</span>
            <span v-else class="xa-txt-yellow" slot="right">已认证</span>
        </FormCell>
    </div>
    <PopChangePassword v-if="PopChangePassword.isShow" title="修改密码" :resolve="PopChangePassword.resolve" :reject="PopChangePassword.reject"/>
    <PopChangePhone v-if="PopChangePhone.isShow" title="修改手机号" :resolve="PopChangePhone.resolve" :reject="PopChangePhone.reject"/>
  </section>
</template>
<script>
import { mapMutations } from 'vuex'
import baseView from './BaseUser.js'
import PopChangePassword from '@/components/PopChangePassword'
import PopChangePhone from '@/components/PopChangePhone'
let uploadImgAsync = import(/* webpackChunkName: "uploadImageServer" */'@/controllers/UploadImg.js')
export default {
    name: 'UserForm',
    extends: baseView,
    components: {
        PopChangePassword,
        PopChangePhone
    },
    data() {
        return {
            editCfg: {
                avatar: {
                    type: 'img'
                },
                name: {
                    label: '昵称',
                    type: 'text'
                },
                position: {
                    label: '个性签名',
                    type: 'text'
                },
                password: {
                    type: 'changePassword'
                },
                phone: {
                    type: 'changePhone'
                },
                email: {
                    label: '邮箱地址',
                    type: 'text'
                }
            },
            server: {
                uploadImg: false
            },
            PopChangePassword: {
                isShow: false,
                resolve: null,
                reject: null
            },
            PopChangePhone: {
                isShow: false,
                resolve: null,
                reject: null
            }
        }
    },
    methods: {
        ...mapMutations(
            {
                update: 'user/updateVariable'
            }
        ),
        getServer(server) {
            if (server === 'IMG') {
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
        showPopChange(type, option = {}) {
            let typeMap = {
                changePassword: 'PopChangePassword',
                changePhone: 'PopChangePhone'
            }
            let action = typeMap[type]
            return new Promise((resolve, reject) => {
                this[action].isShow = true
                this[action].resolve = resolve
                this[action].reject = reject
                Object.assign(this[action], option)
            }).catch(() => { }).finally(() => {
                this[action].isShow = false
            })
        },
        onComClick: async function (variable) {
            let { label, type } = this.editCfg[variable] || {}
            if (!type) return
            if (type === 'img') {
                let server = await this.getServer('IMG')
                let imagesData = await server.chooseImage()
                this.updateImg(variable, imagesData)
            } else if (type === 'changePassword' || type === 'changePhone') {
                this.showPopChange(type).then(val => {
                    val && this.updateText(variable, val, type === 'changePhone' && 'phone')
                })
            } else if (type === 'text') {
                this.$showPopInput(label, this.userInfo[variable])
                    .then(value => this.updateText(variable, value))
            }
        },
        updateImg(variable, images) {
            this.submitData(variable, images.guid[0]).then(() => {
                this.update({
                    variable,
                    value: {
                        url: images.src[0],
                        thumb_url: images.src[0]
                    }
                })
            })
        },
        updateText(variable, value, childVal) {
            if (value !== this.userInfo[variable]) {
                this.submitData(variable, value).then(() => {
                    if (variable in this.userInfo) {
                        this.update({
                            variable,
                            value: childVal ? value[childVal] : value
                        })
                    }
                })
            }
        },
        submitData(variable, data) {
            return this.$promiseWithUi(this.$diyAction({
                url: this.userInfo.edit_url,
                data: {
                    [variable]: data,
                    action: variable
                },
                method: 'post'
            })).then(() => this.$showToast('修改成功'))
        }
    }
}
</script>
<style lang="scss" scoped></style>