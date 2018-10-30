// 发票抬头列表
<template>
<section class="xa-view">
    <div class="xa-cell page-header">
        <p>发票信息 (最多收录5条记录)</p>
        <div class="xa-txt-12">
            <span class="header-btn" :class="{'xa-bg-red xa-txt-white':isInManager}" @click="isInManager=!isInManager">管理</span>
            <span v-show="list.length<5" class="header-btn xa-txt-red" @click="onAddClick">新建</span>
            <span v-show="list.length>=5" class="header-btn xa-txt-white xa-bg-99" @click="onAddClick(false)">新建</span>
        </div>
    </div>
    <section v-show="!isLoading" class="xa-flex xa-container">
        <section :class="{'isInManager':isInManager}" style="overflow:auto" v-show="list.length>0">
            <div class="xa-cell billInfo-item-box" v-for="item in list" :key="item.guid" @click="onSelectItem(item)">
                <i v-if="isChid" class="iconfont" :class="selected!==item.guid?'icon-choose':'icon-xuanze xa-txt-red'" style="margin:0 8px;"></i>
                <div class="billInfo-item xa-flex">
                    <div :class="item.invoice_type=='0'?'xa-txt-green':'xa-txt-red'">{{item.invoice_type=='0'?'普票':'专票'}}</div>
                    <div v-show="item.default" class="billInfo-icon--default iconfont icon-morendizhi"></div>
                    <p class="xa-txt-16">{{item.header}}</p>
                    <p><span>税号:</span><span>{{item.taxpayer_no}}</span></p>
                    <p v-if="item.bank_name"><span>银行名称:</span><span>{{item.bank_name}}</span></p>
                    <p v-if="item.bank_account"><span>银行账号:</span><span>{{item.bank_account}}</span></p>
                    <p v-if="item.company_phone"><span>公司电话:</span><span>{{item.company_phone}}</span></p>
                    <p v-if="item.company_address"><span>公司地址:</span><span>{{item.company_address}}</span></p>
                    <div class="billInfo-actions xa-cell">
                        <span class="xa-txt-red xa-flex"> {{item.enable?'':'请重新编辑提交'}}</span>
                        <div class="xa-cell xa-txt-12">
                            <div @click.stop="onChangeBill(item)" class="item-btn xa-txt-green"><i class="iconfont icon-shuaxin2"></i>转为{{item.invoice_type!='0'?'普票':'专票'}}</div>
                            <div @click.stop="onEditBill(item)" class="item-btn xa-txt-blue"><i class="iconfont icon-bianji1"></i>编辑</div>
                            <div @click.stop="onRemoveBill(item)" class="item-btn xa-txt-red"><i class="iconfont icon-ttpodicon"></i>删除</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div v-show="list.length===0" class="xa-cell xa-container" style="padding-bottom:30vh">
            <AppEmpty txt="没有发票记录，请点击+号添加！"/>
        </div>
        <!-- <div @click="onAddClick" class="billInfo-add-btn xa-btn_alert"><i class="xa-txt-24 xa-txt-white iconfont icon-add"></i></div> -->
    </section>
    <div v-if="isChid&&!isLoading" class="xa-btn xa-btn_alert xa-txt-center" @click="onSubmit">下一步</div>
    <popPanel v-if="popForm.isShow" @close="popForm.isShow=false">
        <popForm class="xa-bg-f2" style="max-height:80vh" :pGuid="popForm.guid" :pType="popForm.type" :isChild="true" @close="onPopFormClose"/>
    </popPanel>
</section>
</template>
<script>
import { getBillInfoList, deleteBillInfo } from '@/apis/billInfo.js'
import baseView from './BaseView.js'
const btns = [{
    txt: '普通发票',
    class: 'xa-txt-green',
    type: 0
}, {
    txt: '增值税专用发票',
    class: 'xa-txt-red',
    type: 1
}]
export default {
    extends: baseView,
    name: 'billinfoheaderlist',
    components: {
        popForm: () => import('@/views/BillInfoForm.vue')
    },
    data() {
        return {
            isInManager: false,
            popForm: {
                isShow: false,
                type: '',
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
            this.list = await this.baseAction(getBillInfoList())
            this.isLoading = false
            this.$setDocTitle('我的发票抬头')
            if (this.isChid) {
                const selected = this.list.find(item => item.default)
                if (selected) {
                    this.selected = selected.guid
                }
            }
        },
        async onAddClick(canAdd) {
            if (canAdd === false) {
                this.$showToast('最多收录5条记录|')
                return
            }
            const btn = await this.$showPopActionSheet(btns, '请选择发票类型')
            if (this.isChid) {
                this.popForm.isShow = true
                this.popForm.type = btn.type
                this.popForm.guid = ''
                return
            }
            this.$router.push(`/billInfo/form?type=${btn.type}`)
        },
        async onEditBill(item) {
            if (this.isChid) {
                this.popForm.isShow = true
                this.popForm.type = ''
                this.popForm.guid = item.guid
                return
            }
            this.$router.push(`/billInfo/form?guid=${item.guid}`)
        },
        async onChangeBill(item) {
            let type = item.invoice_type ? 0 : 1
            if (this.isChid) {
                this.popForm.isShow = true
                this.popForm.type = type
                this.popForm.guid = item.guid
                return
            }
            this.$router.push(`/billInfo/form?guid=${item.guid}&type=${type}`)
        },
        async onRemoveBill(item) {
            let { action } = await this.$showConfirm('确定要移除该发票信息？')
            if (action === 'ok') {
                await this.baseAction(deleteBillInfo(item.guid))
                this.$showToast('操作成功')
                setTimeout(() => {
                    this.init()
                }, 300)
            }
        },
        onSelectItem(item) {
            if (!item.enable) {
                this.$showToast('该信息需要重新提交确认才可以使用！')
                return
            }
            this.selected = item.guid
        },
        onSubmit() {
            if (!this.selected) {
                return this.$showToast('请选择发票信息！')
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
            if (from.name === 'BillForm') {
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
.iconfont + .billInfo-item {
  margin-left: 0;
}
.billInfo-item-box + .billInfo-item-box {
  margin-top: 10px;
}
.billInfo-item {
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
.billInfo-icon--default {
  position: absolute;
  top: -13px;
  right: 8px;
  color: #ffc107;
  font-size: 32px;
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
.billInfo-add-btn {
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
