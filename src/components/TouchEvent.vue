<template>
    <div style="position:relative;line-height:0;font-size:0;">
        <template v-if="needDrag">
            <svg class="svghead" width="100%" :height="contentHeight/2">
                <path :d="svgPatch" fill="#42bd56" :fill-opacity="svgPathOpacity" style="file:#42bd56"></path>
            </svg>
            <slot>
                <div class="tip-wrap">
                    <span class="tip-arrow" :style="tipStyle">
                        <i class="iconfont" :class="iconfont"></i>
                    </span>
                </div>
            </slot>
        </template>
    </div>
</template>
<script>
import startMove from '@/util/startMove.js'
import getScrollTarget from '@/util/getScrollTarget.js'
let uid = 0
export default {
    _cache: {},
    name: 'TouchEvent',
    data() {
        return {
            dragging: false, // 容器是否拖拽中
            startY: -1,
            width: -1, // 容器宽度
            contentHeight: 0, // 下拉距离
            distanceY: 0, // 拖拽移动的距离
            neeRefresh: false, // 是否需要‘刷新’
            isSvgDragging: false, // svg是否下拉中
            direction: '' // 滚动的方向
        }
    },
    props: {
        disabled: { // 如同input的disabled 为true时候 表示不起作用
            type: Boolean,
            default: false
        },
        maxDistance: { // 最大下拉距离
            type: Number,
            default: 150
        },
        // 当达到下拉最大距离后 $emit 后是否自动恢复
        autoClose: {
            type: Boolean,
            default: true
        },
        // 是否需要滚动到底部的事件
        needMore: {
            type: Boolean,
            default: true
        },
        // 是否需要下拉
        needDrag: {
            type: Boolean,
            default: true
        },
        iconfont: {
            type: String,
            default: 'icon-youjiantou'
        }
    },
    watch: {
        contentHeight(val, oldVal) {
            if (val > 0) {
                this.isSvgDragging = true
            } else {
                this.isSvgDragging = false
            }
        },
        direction(val) {
            this.$emit('change', {
                action: 'direction',
                val: val
            })
        }
    },
    computed: {
        svgPatch() {
            if (this.width) {
                return `M0,0 L${this.width},0 Q${this.width / 2},${this.contentHeight} 0,0`
            }
        },
        svgPathOpacity() {
            return this.contentHeight / this.maxDistance
        },
        tipStyle() {
            let opacity = this.contentHeight / this.maxDistance
            let rotate = opacity * 90
            return {
                opacity: opacity,
                '-webkit-transform': `rotate(${rotate}deg)`,
                'webkitTransform': `rotate(${rotate}deg)`,
                transform: `rotate(${rotate}deg)`
            }
        }
    },
    methods: {
        onTouchStart(e) {
            e = e.changedTouches ? e.changedTouches[0] : e
            this.dragging = true
            this.startY = e.pageY
            this.neeRefresh = false
            if (this.width === -1) {
                this.width = parseInt(getComputedStyle(this.$el)['width'])
            }
        },
        onTouchMove(e) {
            let event = e
            let scrollTarget
            let scrollTop
            if (!event.target._uid) {
                event.target._uid = ++uid
                this.$options._cache[event.target._uid] = scrollTarget = getScrollTarget(event.target)
            } else {
                scrollTarget = this.$options._cache[event.target._uid]
            }
            e = e.changedTouches ? e.changedTouches[0] : e
            scrollTop = scrollTarget.scrollTop
            const dy = e.pageY - this.startY
            if (this.dragging && scrollTop === 0 && this.needDrag) {
                if (dy > 0) {
                    event.preventDefault()
                }
                this.contentHeight = parseInt(this.contentHeight) + (dy - this.distanceY) / 1.5
                if (this.contentHeight < 0) {
                    this.contentHeight = 0
                }
                if (this.contentHeight >= this.maxDistance) {
                    this.contentHeight = this.maxDistance
                    this.neeRefresh = true
                } else {
                    this.neeRefresh = false
                }
                this.$nextTick(() => {
                    this.distanceY = dy
                })
                if (this.distanceY - dy > 0) {
                    return false
                }
            } else if (this.needMore) {
                let direction = this.judgeDirection(dy)
                if (direction === 'UP') {
                    if ((scrollTop + 160) >= (scrollTarget.scrollHeight - scrollTarget.clientHeight)) {
                        this.$emit('change', {
                            action: 'needMore'
                        })
                    }
                }
            }
        },
        judgeDirection(dy) {
            let direction = 'UP'
            if (dy > 0) {
                direction = 'DOWN'
            }
            if (Math.abs(dy) > 10) {
                this.direction = direction
            }
            return direction
        },
        onTouchEnd(e) {
            this.distanceY = 0
            if (this.dragging === true && this.contentHeight > 0) {
                if (this.neeRefresh) {
                    this.$emit('change', {
                        action: 'needRefresh'
                    })
                }
                if (this.autoClose === true || this.neeRefresh === false) {
                    startMove(this, {
                        contentHeight: 0
                    })()
                }
            }
            this.dragging = false
        }
    },
    mounted() {
        this.$el.parentNode.addEventListener('touchstart', this.onTouchStart)
        this.$el.parentNode.addEventListener('touchmove', this.onTouchMove)
        this.$el.parentNode.addEventListener('touchend', this.onTouchEnd)
    },
    beforeDestroy() {
        this.$el.parentNode.removeEventListener('touchstart', this.onTouchStart)
        this.$el.parentNode.removeEventListener('touchmove', this.onTouchMove)
        this.$el.parentNode.removeEventListener('touchend', this.onTouchEnd)
    }
}
</script>
<style scoped>
.tip-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.tip-arrow {
  float: left;
  color: #fff;
}
</style>