<template>
<section class="qrcode-wrapper xa-bg-green">
    <section class="qrcode-container xa-view xa-bg-white xa-txt-center">
        <div class="qrcode-head">
            <p style='font-size: 20px;font-weight: 800;line-height: 1.4;' v-html="header.title"></p>
            <p class="xa-txt-999" v-html="header.sub_title"></p>
        </div>
        <div class="qrcode-line"></div>
        <div class="qrcode-content xa-flex xa-cell">
           <div class="qrcode-item xa-view " v-for="(item,index) in content" :key="index" >
                <Qrcode :url="item.content" :size="qrsize"></Qrcode>
                <div class="qrcode-tip" v-html="item.tip"></div>
           </div>
        </div>
    </section>
</section>
</template>
<script>
import Qrcode from '../components/Qrcode'
import baseView from './BaseView.js'
function getInitData() {
    let data = {
        title: 'xxx二维IM啊',
        header: {
            title: '技术',
            sub_title: '腾讯 阿里 网易'
        },
        content: [
            {
                content: '15915797485',
                tip: 'XAIRCRAF 2018'
            },
            {
                content: '15915797485',
                tip: 'XAIRCRAF 2018'
            },
            {
                content: '15915797485',
                tip: 'XAIRCRAF 2018'
            }
            // {
            //     content: '15915797485',
            //     tip: 'XAIRCRAF 2018'
            // }
            // {
            //     content: '15915797485',
            //     tip: 'XAIRCRAF 2018'
            // },
            // {
            //     content: '15915797485',
            //     tip: 'XAIRCRAF 2018'
            // }
        ]
    }
    console.log(JSON.stringify(data, null, 4))
    return Promise.resolve(data)
}
export default {
    extends: baseView,
    components: {
        Qrcode
    },
    data() {
        return {
            header: {
                title: '',
                sub_title: ''
            },
            content: []
        }
    },
    computed: {
        qrsize() {
            let size = 180 / this.content.length
            return size < 100 ? 100 : size
        }
    },
    created() {
        let queryDataPromise = null
        if (this.$route.query.session) {
            queryDataPromise = this.baseSessionInitFn(null, getInitData)
        } else {
            queryDataPromise = this.baseInitFn(getInitData)
        }
        queryDataPromise.then(data => {
            Object.assign(this.$data, data)
        })
    }
}
</script>
<style lang="scss" scoped>
.qrcode {
  &-wrapper {
    padding: 12px;
  }
  &-container {
    border-radius: 5px;
    box-shadow: 1px 1px 5px #999;
  }
  &-head {
    padding: 40px 0 10px;
    line-height: 2.4;
  }
  &-tip {
    margin: 0 auto;
    color: #797979;
    margin-top: 8px;
    font-size: 12px;
  }
  &-line {
    height: 2px;
    margin: 12px;
    border-radius: 100%/20px;
    box-shadow: 0 0 30px #999;
    background: #cdcdcd;
    transform: scaleY(0.5);
    background: -webkit-linear-gradient(
      left,
      #cdcdcd 35%,
      #04be02 50%,
      #cdcdcd 65%
    );
  }
  &-content {
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 36px;
    overflow: auto;
  }
}
.qrcode-item {
  margin: 1em;
}
</style>
