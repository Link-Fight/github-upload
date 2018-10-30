<template>
<section class="xa-view wrapper">
    <panelHeader class="xa-cell" @click.native="$emit('changeTab',0)" style="overflow:hidden;">
        <div class="xa-cell head-tab xa-txt-green">
            <i class="iconfont icon-danpin"></i>&nbsp;
            <span> 全部</span>
        </div>
        <div style="padding-left:10px;">地块#{{landId}}</div>
    </panelHeader>
    <template v-if="!isLoading">
        <div class="xa-flex xa-container">
            <fieldsItems :items="fields" />
        </div>
        <LinkCell v-if="flyLogsLength" @click.native="$emit('changeTab',2)" title="查看飞行记录" :value="flyLogsLength" access class="xa-bg-f2"/>
    </template>
</section>
</template>
<script>
import panelHeader from './panelHeader.vue'
export default {
    components: {
        fieldsItems: {
            render(h) {
                return h('div',
                    {
                        class: 'weui-cells xa-txt-14',
                        style: {
                            'margin-top': '0px'
                        }
                    },
                    this.items.map(item =>
                        h('div',
                            {
                                class: 'weui-cell',
                                style: {
                                    'padding': '7px 15px'
                                }
                            },
                            [
                                h('div', {
                                    style: {
                                        'min-width': '6em'
                                    }
                                }, item.key),
                                h('div', { class: 'xa-txt-888' }, item.value)
                            ])
                    ))
            },
            props: {
                items: Array
            }
        },
        panelHeader
    },
    data() {
        return {
            isLoading: true,
            fields: [],
            flyLogsLength: 0
        }
    },
    props: {
        landId: String,
        promise: Promise
    },
    mounted() {
        this.promise.then(data => {
            this.isLoading = false
            this.fields = data.fields
            this.flyLogsLength = data.flyLogsLength
        })
    }
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(../../assets/loading-index.gif);
}
.head-tab {
  padding-left: 10px;
  padding-right: 20px;
  margin-right: 5px;
  line-height: 30px;
  &:active {
    background-clip: content-box;
    background-color: #ececec;
    color: #999 !important;
  }
}
.head-tab:after,
.head-tab:before {
  content: " ";
  position: absolute;
  right: 10px;
  top: 0;
  height: 100%;
  width: 1px;
  color: #d9d9d9;
  background: #cdcdcd;
}
.head-tab:before {
  transform: scaleX(0.5) rotate(45deg) translate(15px, 0px);
}
.head-tab:after {
  transform: scaleX(0.5) rotate(-45deg) translate(15px, 0px);
}
</style>
