<template>
    <div class="roll-wrap">
        <ul class="xa-view" :style="wrapStyle">
            <li class="roll-item" v-for="(tip,index) in items" :key="index" v-html="tip"></li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            curIndex: 0,
            settimeoutHandle: -1
        }
    },
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: {
        wrapStyle() {
            let x = this.curIndex * 36
            return {
                height: this.items.length * 36 + 'px',
                transform: `translateY(-${x}px)`
            }
        }
    },
    methods: {
        move() {
            setTimeout(() => {
                if (this.curIndex === undefined) return
                this.curIndex = (++this.curIndex) % this.items.length
                this.move()
            }, 5000)
        }
    },
    mounted() {
        if (this.items.length > 1) {
            this.move()
        }
    }
}
</script>
<style scoped>
.xa-view {
  justify-content: space-around;
  transition: all 0.3s;
}
.roll-wrap {
  height: 36px;
  overflow: hidden;
  position: relative;
  font-size: 13px;
}
.roll-item {
  line-height: 18px;
}
</style>