<template>
    <div class="filters-wrapper"  :class="{'plain':classPlain}">
        <div class="xa-cell xa-bg-white" v-show='items.length>0'>
            <li class="xa-cell xa-flex__center xa-txt-12 filters-title__item" v-for="(item,index) in displayItems" @click="onTitleClick(item,index)" :class="[item.ACTIVE||curSelectIndex==index?'xa-txt-green':'',classPlain?'':'xa-flex']" :key="index">
                <span class="xa-txt-ellipsis xa-txt--nowrap"> {{item.newTitle||item.title}}</span>
                <i class="filters-icon_arrow iconfont icon-xiala"></i>
            </li>
            <slot></slot>
        </div>
        <div v-if="isMaskShow" @click="onSubmit()" class="mask-wrap" :style="maskStyle"></div>
        <div v-if="isMaskShow" class="filters-items__wrapper xa-bg-white" :style="contentStyle">
            <div class="filters-item xa-line__top xa-cell" v-for="(item,index) in curFiltersItem.items" :key="index" @click="onRadioOrCheckBoxItemClick(item)" :class="item.ACTIVE?'active':''">
                <div class="xa-flex" :class="{'filters-item__wrap':item.text&&item.subTitle}">
                    <p class="filters-item__title">{{item.text}}</p>
                    <p class="filters-item__subTitle xa-txt-999 xa-txt-12" v-if="item.subTitle">{{item.subTitle}}</p>
                </div>
                <i class="filters-item__icon iconfont" :class="itemIcon"></i>
            </div>
        </div>
        <template v-if="needSelecArea">
            <div v-show="isMaskShow" class="filters-items__wrapper xa-bg-white" :style="contentStyle">
                <AppFilterArea  v-show="showSelectArea" :location="curFiltersItem.location" :level="curFiltersItem.level" @close="onSubmit" @submit="onSubmit" />
            </div>
        </template>
    </div>
</template>
<script>
import AppFilterArea from './AppFilterArea.vue'
export default {
    name: 'filters',
    components: {
        AppFilterArea
    },
    data() {
        return {
            displayItems: [],
            curFiltersItem: null,
            curSelectIndex: -1,
            curFilterType: null,
            isMaskShow: false,
            needSelecArea: false,
            showSelectArea: false,
            mask: {
                top: 0,
                left: 0,
                width: 0,
                height: null
            }
        }
    },
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        },
        result: {
            type: Object,
            default() {
                return {}
            }
        },
        // 设置后没有那么多线
        classPlain: Boolean,
        isFull: Boolean
    },
    computed: {
        maskStyle() {
            return {
                top: this.mask.top + 'px',
                left: this.mask.left + 'px',
                width: this.mask.width + 'px',
                height: this.mask.height + 'px'
            }
        },
        contentStyle() {
            return {
                top: this.mask.top + 'px',
                left: this.mask.left + 'px',
                width: this.mask.width + 'px'
            }
        },
        itemIcon() {
            if (this.curFilterType === 'radio') {
                return 'icon-iconfontgouxuan'
            } else if (this.curFilterType === 'checkbox') {
                return 'icon-fuxuankuang'
            }
        }
    },
    methods: {
        showMask() {
            let rect = this.$el.getBoundingClientRect()
            let parentRect = this.$el.offsetParent.getBoundingClientRect()
            this.mask.top = rect['top'] - parentRect['top'] + rect['height']
            this.mask.left = 0
            this.mask.width = parentRect['width']
            if (this.isFull) {
                this.mask.height = document.body.clientHeight - this.mask.top
            }
            this.isMaskShow = true
        },
        onSubmit(areaResult) {
            let oldItem = this.displayItems[this.curSelectIndex]
            this.curSelectIndex = -1
            if (oldItem.type === 'area') {
                if (areaResult !== undefined) {
                    oldItem.items.unshift(areaResult)
                    this.updateItemNewTitle(oldItem)
                    this.getRadioCheckBoxResult()
                }
            } else {
                if (JSON.stringify(oldItem) !== JSON.stringify(this.curFiltersItem)) {
                    oldItem.items = this.curFiltersItem.items
                    this.updateItemNewTitle(oldItem)
                    this.getRadioCheckBoxResult()
                }
            }
            this.isMaskShow = false
        },
        getRadioCheckBoxResult() {
            let result = {}
            this.displayItems.forEach(item => {
                if (item.type !== 'area') {
                    let activeItems = item.items.filter(item => item.ACTIVE)
                    if (activeItems && activeItems.length > 0) {
                        result[item.key] = activeItems.map(item => item.value)
                    }
                    if (item.type === 'radio' && result[item.key]) {
                        result[item.key] = result[item.key][0]
                    }
                } else {
                    result[item.key] = item.items[0]
                }
            })
            this.$emit('submit', result)
        },
        onTitleClick(item, index) {
            this.curSelectIndex = -1
            if (this.isMaskShow === true) {
                this.isMaskShow = false
                this.showSelectArea = false
                return
            }
            this.showMask()
            this.curSelectIndex = index
            this.curFiltersItem = JSON.parse(JSON.stringify(item))
            this.curFilterType = item.type
            if (this.curFilterType === 'area') {
                this.needSelecArea = true
                this.showSelectArea = true
            }
        },
        onRadioOrCheckBoxItemClick(item) {
            if (this.curFilterType === 'radio') {
                if (item.ACTIVE === false) {
                    this.curFiltersItem.items.forEach(item => (item.ACTIVE = false))
                    item.ACTIVE = true
                    return this.onSubmit()
                }
            }
            item.ACTIVE = !item.ACTIVE
        },
        updateItemNewTitle(titleItem) {
            let type = titleItem.type
            if (type === 'area') {
                if (titleItem.items.length > 0) {
                    titleItem.newTitle = titleItem.title + ':' + titleItem.items[0].name
                } else {
                    titleItem.newTitle = ''
                }
            } else {
                let selectedItems = titleItem.items.filter(item => item.ACTIVE)
                titleItem.newTitle = ''
                if (selectedItems.length === 1) {
                    titleItem.newTitle = selectedItems[0].text
                } else if (selectedItems.length > 1) {
                    titleItem.newTitle = titleItem.title + ':(' + selectedItems.length + ')项'
                }
            }
            titleItem.ACTIVE = !!titleItem.newTitle
        },
        initByResult(item, initResult = this.result) {
            let newItem = JSON.parse(JSON.stringify(item))
            newItem.newTitle = ''
            newItem.ACTIVE = false
            let key = item.key
            if (item.type !== 'area') {
                if (!initResult[key]) {
                    initResult[key] = []
                }
                let itemResult = initResult[key]
                let forEachFn = null
                if (itemResult instanceof Array) {
                    forEachFn = item => { item.ACTIVE = itemResult.find(result => ((result + '') === (item.value + ''))) !== undefined }
                } else {
                    forEachFn = item => { item.ACTIVE = (item.value + '') === (itemResult + '') }
                }
                newItem.items.forEach(forEachFn)
            } else {
                newItem.items = []
                newItem.location = null
                if (initResult[key] && JSON.stringify(initResult[key].length > 4)) {
                    newItem.items.push(initResult[key])
                    newItem.location = initResult[key]
                } else {
                    initResult[key] = {}
                }
            }
            newItem.items && this.updateItemNewTitle(newItem)
            return newItem
        }
    },
    created() {
        this.displayItems = this.items.map(item =>
            this.initByResult(item)
        )
    }
}
</script>
<style lang="scss" scoped>
.filters-wrapper {
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}
.filters-wrapper.plain {
  border-color: transparent;
  .filters-title__item + .filters-title__item::before {
    content: "";
    display: none;
  }
}
.filters-items__wrapper {
  position: absolute;
  z-index: 10;
  max-height: 80%;
  overflow-y: auto;
}
.filters-title__item,
.filters-item {
  position: relative;
  padding: 0 8px 0px 14px;
  min-width: 20%;
  //   font-size: 9pt;
  line-height: 38px;
  &__wrap {
    padding: 10px 0;
  }
  &__title {
    line-height: 20px;
  }
  &__subTitle {
    line-height: 14px;
  }
}
.filters-title__item {
  padding: 0;
}
.filters-item {
  animation: move 0.3s ease;
}
.filters-title__item.active,
.filters-item.active {
  color: #42bd56;
}
.filters-item__icon {
  opacity: 0;
}
.filters-item.active .filters-item__icon {
  opacity: 1;
}
@keyframes move {
  0% {
    // line-height: 16px;
    opacity: 0;
  }
  100% {
    // line-height: 32px;
    opacity: 1;
  }
}

.filters-icon_arrow {
  font-size: 12px;
  float: right;
  margin-right: 10px;
  transition: all 0.3s;
}

.filters-title__item + .filters-title__item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #e5e5e5;
  transform: scaleX(0.5);
  z-index: 1;
}

.mask-wrap {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  background: rgba(153, 153, 153, 0.8);
  z-index: 10;
}
</style>