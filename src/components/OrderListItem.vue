<template>
<div class="orderlist-item xa-cell xa-bg-white" @click="onClick">
    <!-- <div class="item-img xa-default__img" :style="{'backgroundImage':avatar?'url('+avatar+')':''}"></div> -->
    <AppAvatar v-if="avatar" class="item-img"  :avatar="avatar" size="65"/>
    <div class="item-content xa-txt-12">
        <div class="item-content__title xa-txt-14">{{title}}</div>
        <p class="item-content__address xa-txt-12">{{address}}</p>
        <p class="item-content__info xa-txt-12">{{info}}</p>
        <p class="item-content__time xa-txt-12 xa-txt-999">{{time}}</p>
        <div class="item-content__tips xa-txt-999 xa-cell">
            <div class="tips__item" v-for="(tip,index) in displayTips" :key="index">{{tip.txt}}<span class="tips__item-tip" v-show="tip.tip">.{{tip.tip}}</span> </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'OrderListItem',
    computed: {
        displayTips() {
            if (this.tips && this.tips.length > 0) {
                return this.tips.map(item => {
                    if (item instanceof Object) {
                        return item
                    } else {
                        let itemArr = item.split('.')
                        if (itemArr.length === 2) {
                            return {
                                txt: itemArr[0],
                                tip: itemArr[1]
                            }
                        } else {
                            return {
                                txt: itemArr[0]
                            }
                        }
                    }
                })
            } else {
                return []
            }
        }
    },
    props: {
        avatar: {
            type: [String, Array, Object],
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        info: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        },
        tips: {
            type: [String, Array],
            default() {
                return []
            }
        },
        href: String
    },
    methods: {
        onClick() {
            if (this.href) {
                this.$gotoHref(this.href)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.orderlist-item {
  padding: 15px 12px 15px 15px;
  align-items: flex-start;
}
.item-img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: #eee;
  flex-shrink: 0;
}
@media screen and(max-width:374px) {
  .item-img {
    width: 65px;
    height: 65px;
    margin-right: 8px;
  }
}
.item-content {
  .item-content__title {
    padding-top: 1px;
    line-height: 12px;
    margin-bottom: 6px;
  }
  .item-content__address {
    margin-bottom: 3px;
  }
  .item-content__time {
    display: inline-block;
    padding: 0 6px;
    border-radius: 5px;
    line-height: 18px;
    margin-top: 10px;
    background-color: #f2f2f2;
  }
  .item-content__tips {
    margin-top: 6px;
    flex-wrap: wrap;
    .tips__item {
      margin-right: 0.8em;
    }
    .tips__item:last-of-type {
      margin-right: 0;
    }
    .tips__item-tip {
      font-size: 8px;
    }
  }
}
</style>
