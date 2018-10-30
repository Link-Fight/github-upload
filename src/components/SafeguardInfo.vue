<template>
    <div class="info-wrap xa-cell xa-flex-center" :class="[active?'active':'disable']">
        <div class="xa-flex">
            <textList class="info-title xa-txt-bold xa-txt-20" :texts="title" />
            <textList class="info-subtitle" :texts="subTitle" />
        </div>
        <!-- <i v-if="hasIcon" class="info-icon iconfont" :class="[active?'icon-baozhangzhong':'icon-yiguoqi']"></i> -->
    </div>
</template>
<script>
export default {
    components: {
        textList: {
            render(h) {
                return h('div', {}, this.texts.map((txt, index) => h('div', { key: index }, txt)))
            },
            props: {
                texts: Array
            }
        }
    },
    props: {
        title: {
            type: Array
        },
        subTitle: {
            type: Array
        },
        active: {
            type: Boolean,
            default: true
        },
        hasIcon: {
            type: Boolean,
            default: true
        }
    }
}
</script>
<style lang="scss" scoped>
.info {
  &-wrap {
    padding: 20px 15px 10px;
    background-size: cover;
    &.active {
      background-color: #b82b34;
      & .info-title,
      & .info-subtitle,
      & .iconfont {
        color: #fff;
      }
    }
  }
  &-title {
    font-size: 20px;
    line-height: 23px;
    min-height: 46px;
    margin-bottom: 23px;
  }
  &-icon {
    font-size: 80px;
    height: 80px;
    &::before {
      position: relative;
      top: -20px;
    }
  }
}
</style>
