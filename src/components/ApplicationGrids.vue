<template>
 <div class="app-grids xa-com__space" :class="config.visible?'xa-bg-white':'app-grids__hidden'">
    <FormCell class="grids-title xa-txt-16 xa-txt-bold" :label="config.title">
        <FormSwitch v-if="status==='edit'" slot="right" size="small" v-model="config.visible"/>
        <i class="iconfont icon-yanjing2" v-if="status==='view'&&!config.visible" slot="right"></i>
    </FormCell>
    <transition-group class="weui-grids xa-txt-center"  name="flip-list" tag="div">
        <template v-for="mItem in config.items">
            <BaseItem v-show="mItem.visible" @click.native="onClick(mItem)" :title="mItem.title" :status="status==='edit'&&'minus'" :value="mItem.value" :icon="mItem.icon" :key="mItem.key"/>
        </template>
    </transition-group>
    <template v-if="status">
        <FormCell v-if="hiddenCount" class="xa-txt-999" label="首页隐藏应用"></FormCell>
        <transition-group class="weui-grids xa-txt-center"  name="flip-list" tag="div">
            <template v-for="mItem in config.items">
                <BaseItem v-show="!mItem.visible" @click.native="onClick(mItem)"  :title="mItem.title" :status="status==='edit'&&'add'" :icon="mItem.icon" :key="mItem.key"/>
            </template>
        </transition-group>
    </template>
</div>
</template>
<script>
import FormSwitch from '@/components/FormSwitch.vue'
import startMove from '@/util/startMove.js'
let BaseItem = {
    render(h) {
        return h('div', { 'class': 'weui-grid ' + (this.status ? 'active' : '') },
            [
                this.status ? h('div', { 'class': 'btn-icon ' + this.status }) : '',
                !this.status && this.value > 0 ? h('span', { 'class': 'grid-badge weui-badge' }, this.displayNum) : '',
                h('div', { 'class': 'weui-grid__icon' },
                    [
                        h('i', { 'class': 'iconfont xa-txt-24 ' + this.icon })
                    ]
                ),
                h('p', { 'class': 'weui-grid__label xa-txt-000 xa-txt-13' }, this.title)
            ])
    },
    data() {
        return {
            displayNum: 0
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newValue) {
                startMove(this.$data, { displayNum: newValue })()
            }
        }
    },
    props: {
        icon: String,
        title: String,
        value: [String, Number],
        status: [String, Boolean]
    }
}
export default {
    name: 'grids',
    components: {
        BaseItem,
        FormSwitch
    },
    props: {
        config: Object,
        status: String
    },
    computed: {
        hiddenCount() {
            let count = 0
            this.config.items.forEach(i => {
                if (!i.visible) {
                    count++
                }
            })
            return count
        }
    },
    watch: {
        hiddenCount(val) {
            if (val === this.config.items.length) {
                if (this.status === 'edit') {
                    this.config.visible = false
                }
            }
        }
    },
    methods: {
        onClick(item) {
            if (this.status === 'edit') {
                item.visible = !item.visible
            } else {
                this.$emit('click', item)
            }
        }
    }
}
</script>
<style lang="scss">
.app-grids {
  transition: all 0.3s;
  &__hidden {
    background-color: #e5e5e5;
  }
  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .grid-badge,
  .btn-icon {
    position: absolute;
    top: 8px;
    right: 8px;
    animation: show 0.3s ease-in-out;
  }
  .btn-icon {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
  .btn-icon::after {
    content: "";
    position: absolute;
    left: 3px;
    top: 7px;
    width: 9px;
    height: 1px;
    background-color: #fff;
  }
  .btn-icon.add::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 7px;
    height: 9px;
    width: 1px;
    background-color: #fff;
  }
  .btn-icon.minus {
    background-color: #ef3338;
  }
  .btn-icon.add {
    background-color: #42bd56;
  }
  .weui-cell:before,
  .weui-grid::before,
  .weui-grid::after,
  .weui-grids:before {
    content: "";
    display: none;
  }
  .weui-grid {
    padding: 5px 4px;
  }
  .weui-grid.active {
    transition: all 0.3s;
    background-color: #f3f3f3;
    background-clip: content-box;
  }
  .weui-grid__icon {
    margin-top: 6px;
    height: 32px;
  }
  .weui-grid__icon + .weui-grid__label {
    margin-top: 8px;
    padding-bottom: 5px;
  }
  .grids-title {
    padding-top: 16px;
    padding-bottom: 10px;
  }
}
</style>
