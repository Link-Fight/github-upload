<template>
<section class="xa-view">
    <div class="xa-cell page-header">
        <p>地址地址 (最多收录10条记录)</p>
        <div class="xa-txt-12">
            <span class="header-btn" :class="{'xa-bg-red xa-txt-white':isInManager}" @click="isInManager=!isInManager">管理</span>
            <span v-show="list.length<10" class="header-btn xa-txt-red" @click="onAddClick">新建</span>
            <span v-show="list.length>=10" class="header-btn xa-txt-white xa-bg-99" @click="onAddClick(false)">新建</span>
        </div>
    </div>
    <section v-show="!isLoading" class="xa-flex xa-container" :class="{'isInManager':isInManager}">
        <section style="overflow:auto" v-show="list.length>0">
            <div class="address-item-box xa-cell" v-for="item in list" :key="item.guid" @click="onSelectItem(item.guid)">
                <i v-if="isChid" class="iconfont" :class="selected!==item.guid?'icon-choose':'icon-xuanze xa-txt-red'" style="margin:0 8px;"></i>
                <div class="address-item xa-flex">
                    <p><span>{{item.name}}</span><span>{{item.phone}}</span></p>
                    <p><span>{{item.area_name}}</span></p>
                    <p><span>{{item.area_address}}</span></p>
                    <div class="address-actions xa-cell">
                        <div v-show="item.default" class="xa-flex address-icon--default iconfont icon-morendizhi"></div>
                        <div class="xa-cell xa-txt-12">
                            <div @click="onEditBill(item)" class="item-btn"><i class="iconfont icon-bianji1"></i>编辑</div>
                            <div @click="onRemoveBill(item)" class="item-btn xa-txt-red"><i class="iconfont icon-ttpodicon"></i>删除</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div v-show="list.length===0" class="xa-cell xa-container" style="padding-bottom:30vh">
            <AppEmpty txt="没有地址记录，请点击+号添加！"/>
        </div>
        <!-- <div @click="onAddClick" class="address-add-btn xa-btn_alert"><i class="xa-txt-24 xa-txt-white iconfont icon-add"></i></div> -->
    </section>
    <div v-if="isChid&&!isLoading" class="xa-btn xa-btn_alert xa-txt-center" @click="onSubmit">下一步</div>
    <popPanel v-if="popForm.isShow" @close="popForm.isShow=false">
        <div class="xa-bg-f2"><popForm :guid="popForm.guid" :isChild="true" @close="onPopFormClose"/></div>
    </popPanel>
</section>
</template>
<script>
import { getAddressList, deleteAddress } from '@/apis/address.js'
import baseView from './BaseView.js'
export default {
    extends: baseView,
    name: 'AddressList',
    components: {
        popForm: () => import('@/views/AddressForm.vue')
    },
    data() {
        return {
            isInManager: false,
            popForm: {
                isShow: false,
                guid: ''
            },
            isLoading: '',
            list: [],
            time: (new Date()).getTime(),
            selected: ''
        }
    },
    props: {
        isChid: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        async init() {
            this.isLoading = true
            this.list = await this.baseAction(getAddressList())
            this.isLoading = false
            this.$setDocTitle('我的地址信息')
            if (this.isChid) {
                const selected = this.list.find(item => item.default)
                if (selected) {
                    this.selected = selected.guid
                }
            }
        },
        async onAddClick(canAdd) {
            if (canAdd === false) {
                this.$showToast('最多收录10条记录！')
                return
            }
            if (this.isChid) {
                this.popForm.isShow = true
                this.popForm.guid = ''
                return
            }
            this.$router.push(`/address/form`)
        },
        async onEditBill(item) {
            if (this.isChid) {
                this.popForm.isShow = true
                this.popForm.guid = item.guid
                return
            }
            this.$router.push(`/address/form?guid=${item.guid}`)
        },
        async onChangeBill(item) {
            this.$router.push(`/address/form?guid=${item.guid}`)
        },
        async onRemoveBill(item) {
            let { action } = await this.$showConfirm('确定要移除该地址信息？')
            if (action === 'ok') {
                await this.baseAction(deleteAddress(item.guid))
                this.$showToast('操作成功')
                if (item.guid === this.selected) {
                    this.selected = ''
                }
                setTimeout(() => {
                    this.init()
                }, 300)
            }
        },
        onSelectItem(guid) {
            this.selected = guid
        },
        onSubmit() {
            if (!this.selected) {
                return this.$showToast('请选择地址！')
            }
            this.$emit('submit', this.list.filter(item => item.guid === this.selected)[0])
        },
        onPopFormClose() {
            this.init()
            this.popForm.isShow = false
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (from.name === 'AddressForm') {
                console.log(to.query.t)
                if (vm.time < to.query.t) {
                    vm.init()
                    vm.time = to.query.t
                }
            }
        })
    },
    mounted() {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
.page-header {
  margin: 5px 15px;
  justify-content: space-between;
}
.header-btn {
  padding: 0 8px;
  border: 1px solid;
  border-radius: 12px;
}
.header-btn + .header-btn {
  margin-left: 8px;
}
.iconfont + .address-item {
  margin-left: 0;
}
.address-item-box + .address-item-box {
  margin-top: 10px;
}
.address-item {
  position: relative;
  margin: 0px 15px;
  padding: 8px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 2px #e0e0e0;
  p {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    &:first-of-type {
      padding-bottom: 4px;
      border-bottom: 1px solid #e4e4e4;
      margin-bottom: 4px;
    }
  }
}
.address-actions {
  justify-content: flex-end;
}
.address-icon--default {
  color: #ffc107;
  font-size: 16px;
}
.item-btn {
  display: none;
}
.isInManager .item-btn {
  display: block;
}
.item-btn + .item-btn {
  margin-left: 16px;
}
.address-add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 32px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  //   background-color: #42bd45;
  color: #fff;
}
</style>
