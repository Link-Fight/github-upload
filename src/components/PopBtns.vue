<template>
  <div class="pop-btns__wrapper" :class="theme" :style="wapperStyle">
      <div class="weui-mask" @click="onTouch" @touchmove="onTouch"></div>
      <ul class="pop-btns__body weui-cells xa-txt-14">
          <div class="pop-btns__arrow" :style="arrowStyle"></div>
          <li class="pop-btns-item__wrap xa-line__top" v-for="(item,index) in items" :key="index" @click="$emit('click',item)">
              <slot :item="item">
                  <div class="pop-btns__item" :class="{'left':!!item.icon}" ><i v-if="item.icon" class="iconfont" :class="item.icon"></i>{{item.txt}}</div>
              </slot>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
    name: 'PopBtns',
    props: {
        items: {
            type: Array,
            default() {
                let datas = [
                    {
                        txt: '默认显示日'
                    },
                    {
                        txt: '默认显示月'
                    },
                    {
                        txt: '默认显示年'
                    }
                ]
                return datas.slice(0, 3)
            }
        },
        align: {
            type: String,
            default: 'right'
        },
        top: {
            type: [String, Number],
            default: 40
        },
        right: {
            type: [String, Number],
            default: 8
        },
        xDistince: {
            type: [String, Number],
            default: 8
        },
        position: String,
        theme: {
            type: String,
            default: ''
        }
    },
    computed: {
        wapperStyle() {
            return {
                position: this.position,
                top: this.top + 'px',
                right: this.right + 'px'
            }
        },
        arrowStyle() {
            if (this.align === 'right') {
                return {
                    'right': this.xDistince + 'px',
                    'left': 'initial'
                }
            } else if (this.align === 'left') {
                return {
                    'right': 'initial',
                    'left': this.xDistince + 'px'
                }
            }
        }
    },
    methods: {
        onTouch() {
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss" scoped>
.pop-btns {
  &__wrapper {
    position: absolute;
    margin-top: 0;
    border-radius: 4px;
    z-index: 10;
    top: 40px;
    right: 8px;
    &.bottom {
      .pop-btns__body {
        transform: translateX(-50%) translateY(-110%);
        min-width: 8em;
      }
      .pop-btns__item {
        text-align: center;
        flex: 1;
      }
      .pop-btns__item.left {
        text-align: left;
        white-space: nowrap;
        & .iconfont {
          margin-right: 4px;
        }
      }
      .pop-btns__arrow {
        bottom: -12px;
        left: 50%;
        transform: translateX(15px);
        &::before {
          content: " ";
          position: absolute;
          bottom: 0;
          top: -13px;
          left: initial;
          border: 10px solid;
          border-color: #fff transparent transparent;
          transform: none;
          z-index: 1;
        }

        &::after {
          content: " ";
          position: absolute;
          bottom: 0;
          left: initial;
          border: 10px solid;
          border-color: #ededed transparent transparent;
          transform: none;
        }
      }
    }
    .weui-mask {
      z-index: 0;
      background-color: transparent;
    }
    .weui-cell:before {
      content: "";
      left: 10px;
      right: 10px;
    }
  }
  &-item__wrap {
    padding: 10px 15px 10px 0px;
    margin-left: 15px;
  }
  &__body {
    margin-top: 0;
    box-shadow: 4px 2px 10px #aaa;
    border-radius: 4px;
    border: 1px solid #ededed;
    overflow: initial;
  }
  &__arrow {
    position: absolute;
    width: 0px;
    height: 0px;
    z-index: 10;
    &::before {
      content: " ";
      position: absolute;
      top: -12px;
      right: 0px;
      left: initial;
      height: 0;
      width: 0px;
      border: 6px solid;
      border-color: transparent transparent #ededed;
      transform: none;
    }

    &::after {
      content: " ";
      position: absolute;
      top: -11px;
      right: 0px;
      left: initial;
      border: 6px solid;
      height: 0px;
      width: 0px;
      border-color: transparent transparent #fff;
      transform: none;
    }
  }
}
</style>
