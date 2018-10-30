<template>
    <div class="detail-list" :class="isExpand?'isOn':'isOff'">
        <div class="header xa-cell" style="height:40px;line-height:40px;">
            <i class="trigger-btn iconfont icon-gengduo1" @click="isExpand=!isExpand" style="font-size:24px;padding-right:8px;"></i><span>DiyDetail</span>
        </div>
        <div class="content">
            <h3>组件系列</h3>
            <ul>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=linkcell">Linkcell系列</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=table">table</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=dataShow">dataShow</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=chart">chart</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=DeviceListItem">DeviceListItem</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=FarmingInfo">FarmingInfo</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=InfoListItem">InfoListItem</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=GeoImg">GeoImg</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=LocInfo">LocInfo</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=StatisticeCells">StatisticeCells</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=empty">empty</router-link>
            </ul>
            <h3>页面示例</h3>
            <ul>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1">all</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=device">device</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=FormDetail">FormDetail</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=farming">farming</router-link>
                <router-link exact class="item xa-line__bottom" tag="li" to="/diyDetail?isTest=1&src=Statistics">Statistics</router-link>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isExpand: false
        }
    },
    watch: {
        $route() {
            this.isExpand = false
        }
    }
}
</script>
<style lang="scss" scoped>
.xa-line__bottom:last-of-type::after {
  content: "";
  display: none;
}
.detail-list {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  color: #fff;
  z-index: 999;
  .trigger-btn {
    display: none;
  }
  .header,
  .content {
    background-color: #282c34;
    padding: 0 16px;
  }
  .content {
    height: calc(100vh - 40px);
    max-height: calc(100vh - 40px);
    overflow: auto;
  }
  h3 {
    margin-top: 15px;
  }
  ul {
    margin-left: 1em;
    transition: all 0.3s;
  }
  .item {
    line-height: 1.5;
    padding: 15px 0;
    cursor: pointer;
    &:hover {
      color: #4e975a;
    }
  }
  .router-link-active {
    color: #42bd56;
  }
}
@media screen and (max-width: 540px) {
  .detail-list {
    width: 100%;
    height: auto;
    .trigger-btn {
      display: block;
    }
    .content {
      height: auto;
      background-color: rgba(40, 44, 52, 0.8);
    }
  }
  .isOff.detail-list {
    bottom: auto;
    .content {
      height: 0;
      overflow: hidden;
    }
  }
}
</style>
