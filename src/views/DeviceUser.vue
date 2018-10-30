<template>
    <section class="xa-view" v-show="!isLoading">
        <FormCell class="xa-bg-white" :label="(config&&config.title) ||'设备管理者是做什么的？'">
            <div v-if="docUrl" slot="right" style="padding:0 5px;border-radius:2px;" class="xa-txt-white xa-bg-green" @click="showDoc">查看</div>
        </FormCell>
        <section style="margin-top:8px;" class="xa-flex xa-container">
            <template v-for="(user,index) in users">
                 <div :key="index" class="xa-bg-white xa-line__bottom xa-cell xa-txt-14 xa-flex" style="padding:10px 15px;">
                    <AppAvatar v-if="user.avatar" size="28" style="margin-right:8px;" :avatar="user.avatar" />
                    <div class="xa-flex">{{user.txt}}</div>
                    <div @click="onRemove(user)">移除</div>
                </div>
            </template>
        </section>
        <div @click="addUser" class="xa-btn xa-btn_submit xa-txt-center">{{(config&&config.btnTitle) ||'添加管理者'}}</div>
    </section>
</template>
<script>
import BaseView from './BaseView'
function test(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                config: {
                    title: '',
                    btnTitle: ''
                },
                users: [
                    {
                        avatar: 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
                        value: '123',
                        txt: '刘波'
                    },
                    {
                        avatar: 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
                        value: '1234',
                        txt: '刘波1'
                    }
                ],
                docUrl: 'isTest',
                deleteApi: 'isTest',
                updateApi: 'isTest',
                addApi: {
                    src: 'isTest',
                    api: 'post/test'
                }
            })
        }, 1000)
    })
}
export default {
    name: 'DeviceUser',
    extends: BaseView,
    data() {
        return {
            isLoading: false,
            config: {
                title: '',
                btnTitle: ''
            },
            users: [
                {
                    avatar: 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
                    value: '123',
                    txt: '刘波'
                },
                {
                    avatar: 'http://7xlyy2.com1.z0.glb.clouddn.com/localhost:972018/2/1/iqlj8/BingWallpaper-2017-06-29.jpg?e=1517493540&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:dSzWuWkqXmTYIZL0lyt0bJu92Dk=',
                    value: '1234',
                    txt: '刘波1'
                }
            ],
            docUrl: 'isTest',
            deleteApi: 'isTest',
            updateApi: 'isTest',
            addApi: {
                src: 'isTest',
                api: 'post/test'
            }
        }
    },
    methods: {
        getRequset() {
            return this.isTest ? test : this.$diyAction
        },
        showDoc() {
            this.$showPopDoc(this.docUrl)
        },
        addUser: async function () {
            let [user] = await this.$showPopSelect(this.addApi.src)
            if (user) {
                await this.$promiseWithUi(this.getRequset()({
                    url: this.addApi.api,
                    data: user,
                    method: 'post'
                }))
                this.updateUser()
            }
        },
        updateUser() {
            this.$promiseWithUi(this.getRequset()({
                url: this.updateApi
            })).then(({ users }) => {
                this.users = users
                this.$showToast('操作成功')
            })
        },
        onRemove: async function (data) {
            await this.$promiseWithUi(this.getRequset()({
                url: this.deleteApi,
                data,
                method: 'post'
            }))
            this.updateUser()
        },
        initFn() {
            this.isLoading = true
            return this.baseInitFn(test).then(data => {
                this.isLoading = false
                Object.assign(this.$data, data)
            })
        }
    },
    created() {
        this.initFn()
    }
}
</script>
<style lang="scss" scoped>
</style>
