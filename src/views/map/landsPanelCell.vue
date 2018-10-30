<template>
    <div class="landInfo-item xa-bg-white" :class="{'selected':selected,'xa-isloading':loading ===1}">
        <div class="xa-cell landInfo-title">
            <div class="xa-flex landInfo-txt" :class="{'icon_free':type ==3,'icon_circle':type==2,'icon_line':type ==1}">
                <span>{{title}}</span>
            </div>
            <i v-if="checkBoxStatus>0" @click.stop="onSelected" class="landInfo-icon iconfont" :class="{'icon-icfuxuankuang global-color-gray':checkBoxStatus==1,'icon-fuxuankuang global-color-gray':checkBoxStatus==2,'icon-fuxuankuang xa-txt-green':checkBoxStatus==3}"></i>
        </div>
        <div class="xa-cell" v-for="(subTitle,index) in subTitles" :key="index">
            <p class="xa-flex landInfo-txt">
                <span v-html="subTitle.lt"></span>
            </p>
            <p class="landInfo-txt" :class="subTitle.rt | landCompleteState ">
                <span>{{subTitle.rt}}%</span>
            </p>
        </div>
    </div>
</template>
<script>
/* eslinet-disable */
export default {
    name: 'landsPanelCell',
    props: {
        type: {},
        title: {
            type: String,
            default: '#110 #110 #110 #110'
        },
        subTitles: {
            type: Array,
            default() {
                return [
                    { lt: '高天龙1号地区 高天龙1号地区' },
                    { lt: '120棵作物', rt: '0.5%' }
                ]
            }
        },
        selected: {
            type: Boolean,
            default: false
        },
        // 选择按钮的状态
        // 0：没有按钮
        // 1：有按钮 并且是还没有选择过的
        // 2：有按钮 灰色 表示为已经选择的
        // 3：有按钮 绿色 表示为当前选择的
        checkBoxStatus: {
            type: Number,
            default: 0
        },
        // 1 表示正在加载
        loading: {
            type: Number,
            default: 0
        }
    },
    methods: {
        onSelected(e) {
            // e = e || window.event
            // let rect = e.target.getBoundingClientRect()
            // let top = rect['top'] + rect['height'] + 10
            // let right = right = document.body.clientWidth - rect['width'] - rect['left'] + 8
            // this.$emit('selected', { top, right })
            this.$emit('select')
        }
    },
    filters: {
        landCompleteState(percent) {
            if (percent === undefined) {
                return 'displayNo'
            }
            percent = parseFloat(percent)
            if (percent >= 100) {
                return { 'landInfo-txt--finish': true }
            } else if (percent > 0) {
                return { 'landInfo-txt--working': true }
            }
        }
    }
}
</script>
<style scoped lang="scss">
.displayNo {
  display: none;
}

.icon_line {
  background-image: url("../../assets/icon_line1.png");
  background-repeat: no-repeat;
  background-size: 12px 12px;
  background-position: 2px 4px;
  text-indent: 18px;
}

.icon_circle {
  background-image: url("../../assets/icon_circle1.png");
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: 0px 3px;
  text-indent: 20px;
}

.icon_free {
  background-image: url("../../assets/icon_free.png");
  background-repeat: no-repeat;
  background-size: 13px 13px;
  background-position: 2px 4px;
  text-indent: 18px;
}

.landInfo-item {
  margin: 3px;
  padding: 0 4px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 20px;
  font-size: 10px;
}

.landInfo-item.selected {
  border-color: #67bd59;
  box-shadow: 1px 1px 2px #67bd59, -1px -1px 2px #67bd59;
}

.landInfo-icon {
  position: relative;
  top: 1px;
  right: 1px;
  text-indent: 0;
}

.landInfo-txt {
  /* display: block; */
  overflow: hidden;
  max-width: 100%;
  color: #818181;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
}

.landInfo-txt--finish {
  color: #090;
}

.landInfo-txt--working {
  color: #ffc107;
}

.landInfo-title {
  color: #666;
  font-weight: 800;
  font-size: 12px;
}
</style>
