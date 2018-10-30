<template>
<div class="xa-view xa-bg-white">
    <div class="date-header xa-cell xa-txt-center">
        <div @click="onCancel" :style="{'opacity':dateTab===0?1:0}" class=" weui_btn weui_btn_mini">
            <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="xa-flex">{{ chooseText}}</div>
        <div @click="onSubmit" class="xa-txt-green weui_btn weui_btn_mini">
            <i class="iconfont icon-dui"></i>
        </div>
    </div>
    <main class="xa-flex">
        <div v-show="dateTab==0&&showDisplay" class="weui_cells weui_cells_access">
            <template v-for="display in [{label:'年',key:'YYYY',tab:1},{label:'月',key:'MM',tab:2},{label:'日',key:'DD',tab:3}]" >
                <FormCell :key="display.tab" :label="display.label" access @click.native="changeTab(display.tab)">
                    <div class="xa-txt-right">{{ date[display.key]}}{{display.label}}</div>
                </FormCell>
            </template>
            <FormCell>
                <div class="xa-txt-center xa-txt-green">{{ weekText}}</div>
                <div class="xa-cell" style="padding:15px;">
                    <picker style="margin: 0 15px;" class="xa-flex" v-model="date.HH" :min="0" :max="23" unit="时" />
                    <picker v-if="curViewMode=='minute'" style="margin: 0 15px;" class="xa-flex" v-model="date.mm" :min="0" :max="59" unit="分"/>
                </div>
            </FormCell>
        </div>
        <section v-show="dateTab==1||curViewMode=='year'" style="padding:20px;">
             <picker style="margin: 0 15px;" class="xa-flex" v-model="date.YYYY" :len="3" unit="年" />
        </section>
        <section v-show="curViewMode=='month'" style="padding:20px;">
            <FormCell>
                <div class="xa-cell" style="padding:0px;">
                    <picker style="margin: 0 15px;" class="xa-flex" v-model="date.YYYY" :len="3" unit="年" />
                    <picker style="margin: 0 15px;" class="xa-flex" v-model="date.MM" :min="1" :max="12" :len="3" unit="月" />
                </div>
            </FormCell>
        </section>
        <section v-show="curViewMode=='day'" style="padding: 8px 15px;">
            <div v-show="curViewMode=='day'" class="xa-txt-center xa-txt-green">{{ weekText}}</div>
            <FormCell>
                <div class="xa-cell" style="padding:0px;">
                    <picker style="margin: 0 15px;" class="xa-flex" v-model="date.YYYY" :len="3" unit="年" />
                    <picker style="margin: 0 15px;" class="xa-flex" v-model="date.MM" :min="1" :max="12" :len="3" unit="月" />
                    <picker style="margin: 0 15px;" class="xa-flex" v-model="date.DD" :min="1" :max="maxDD" :len="3" unit="日" />
                </div>
            </FormCell>
        </section>
        <section v-show="dateTab==2" style="padding:20px;">
             <picker style="margin: 0 15px;" class="xa-flex" v-model="date.MM" :min="1" :max="12" :len="3" unit="月" />
        </section>
        <section v-show="dateTab==3" style="padding:0 20px 20px;">
             <FormCell>
                <div class="xa-txt-center xa-txt-green">{{ weekText}}</div>
             </FormCell>
             <picker style="margin: 0 15px;" class="xa-flex" v-model="date.DD" :min="1" :max="maxDD" :len="3" unit="日" />
        </section>
    </main>
</div>
</template>
<script>
import picker from './picker'
const dateConfig = {
    'year': 'YYYY',
    'month': 'YYYY-MM',
    'day': 'YYYY-MM-DD',
    'hour': 'YYYY-MM-DD HH:00',
    'minute': 'YYYY-MM-DD HH:mm'
}
export default {
    data() {
        return {
            dateTab: 0,
            touchConfight: {},
            format: '',
            date: {
                YYYY: 2010,
                MM: 10,
                DD: 1,
                day: '1',
                HH: 0,
                mm: 0
            },
            maxDD: 28,
            curViewMode: null,
            showDisplay: false
        }
    },
    components: {
        picker
    },
    props: {
        viewMode: {
            type: String,
            default: 'day',
            validator(value) {
                if (!value) {
                    return true
                }
                return !!dateConfig[value]
            }
        },
        dateValue: {
            type: String,
            default() {
                return ''
            }
        }
    },
    computed: {
        weekText() {
            var data = new Date(this.date.YYYY, this.date.MM - 1, this.date.DD)
            if (data.toString().indexOf('Invalid') === -1) {
                return this.getWeekText(data.getDay())
            } else {
                return ''
            }
        },
        chooseText() {
            if (this.curViewMode === 'year') {
                return '选择年'
            }
            if (this.curViewMode === 'month') {
                return '选择年月'
            }
            if (this.dateTab === 0) {
                return '选择'
            }
            if (this.dateTab === 2) {
                return this.date.YYYY ? this.date.YYYY + '年' : '选择月'
            }
            if (this.dateTab === 3) {
                return this.date.DD ? this.date.YYYY + '年' + this.date.MM + '月' : '选择日'
            }
        }
    },
    methods: {
        onCancel() {
            if (this.dateTab !== 0) {
                this.dateTab = 0
            } else {
                this.$emit('close')
            }
        },
        onSubmit() {
            if (this.dateTab !== 0) {
                this.dateTab = 0
                return
            }
            this.$emit('submit', this.toString())
            this.$emit('close')
        },
        changeTab(num) {
            if (num === 3) {
                var date = new Date()
                date.setFullYear(this.date.YYYY, this.date.MM, 0)
                this.maxDD = date.getDate()
            }
            if (num === 2 && !this.date.YYYY) return
            if (num === 3 && !this.date.MM) return
            this.dateTab = num
        },
        toString() {
            var result = this.format
            result = result.replace('YYYY', this.date.YYYY)
            result = result.replace('MM', this.date.MM)
            result = result.replace('DD', this.date.DD)
            let mm = this.date.mm
            let HH = this.date.HH
            if (mm < 10) {
                mm = '0' + mm
            }
            if (HH < 10) {
                HH = '0' + HH
            }
            result = result.replace('HH', HH)
            result = result.replace('mm', mm)
            return result
        },
        getWeekText(num) {
            if (num === 1) return '星期一'
            if (num === 2) return '星期二'
            if (num === 3) return '星期三'
            if (num === 4) return '星期四'
            if (num === 5) return '星期五'
            if (num === 6) return '星期六'
            if (num === 0) return '星期天'
        }
    },
    created() {
        this.curViewMode = this.viewMode.toLowerCase() || 'day'
        if (this.curViewMode === 'hour' || this.curViewMode === 'minute') {
            this.showDisplay = true
        }
        if (dateConfig[this.curViewMode]) {
            this.format = dateConfig[this.curViewMode]
        } else {
            this.curViewMode = 'minute'
            this.format = 'YYYY-MM-DD HH:mm'
        }
        var mDate = new Date()
        this.date.YYYY = mDate.getFullYear()
        this.date.MM = mDate.getMonth() + 1
        this.date.DD = mDate.getDate()
        this.date.day = mDate.getDay()
        this.date.HH = 0
        this.date.mm = 0
        if (this.dateValue !== 'undefined' && this.dateValue) {
            var date = new Date(this.dateValue)
            if (date.toString().indexOf('Invalid') === -1) {
                this.date.YYYY = date.getFullYear()
                this.date.MM = date.getMonth() + 1
                this.date.DD = date.getDate()
                this.date.day = date.getDay()
                this.date.HH = date.getHours()
                this.date.mm = date.getMinutes()
            }
        }
    },
    mounted() {
        this.$el.addEventListener('touchmove', function (e) {
            e.preventDefault()
        }, false)
    }
}
</script>
<style lang='scss' scoped>
.date-header {
  padding: 0px 15px;
  line-height: 40px;
  border-bottom: 1px solid #efefef;
  box-shadow: 0 0 8px #ccc;
  z-index: 1;
}
</style>
