<template>
<div>
    <div style="padding:8px;">
        <!-- <display ref="display"></display> -->
        <div class="weui_footer_inner" style="margin:4px 0;">
            <span class="weui_btn weui_btn_primary" @click="onToUpload">
                上传附件
            </span>
            <input style="display:none;" class="weui_btn weui_btn--primary" ref="qiinput" type="file" accept="*" @change="onQiniuFileChange">
        </div>
        <div style="max-width:540px;margin:0 auto;">
            <template v-for="fileInfo in uploadFileList">
                <div  @click="display(fileInfo.type,fileInfo.URL)" :key="fileInfo.name" :style="{'backgroundColor':fileInfo.STATUS?'#04be02':'#ff2424'}" style="padding:4px;border-radius: 4px;margin:8px 0;color:#eee;">
                    <div class="xa-cell" style="overflow: auto;">
                        {{fileInfo.name}}
                    </div>
                    <div v-show="fileInfo.size" class="xa-cell">
                        <div class="xa-flex">{{fileInfo.loaded | convertByte}}/{{fileInfo.size | convertByte}}</div>
                        <div>{{ fileInfo|displayStatue}}</div>
                        <i v-show="fileInfo.STATUS" class="iconfont icon-dui"></i>
                    </div>
                    <uploadProgress :value="fileInfo.PROGRESS"/>
                </div>
            </template>
        </div>
    </div>
</div>
</template>
<script>
import { uploadQiniu, getEXIF as EXIF } from '@/controllers/fileUpload.js'
import progress from './progress.vue'
import display from './display.vue'
let uptokenPromise = null
function getfn(gps) {
    return gps[0] + gps[1] / 60 + gps[2] / 3600
}
export default {
    components: { uploadProgress: progress, display },
    data() {
        return {
            uploadFileList: [] // {name,lastModified,size,type,PROGRESS,URID}
        }
    },
    methods: {
        onToUpload() {
            this.$refs.qiinput.click()
        },
        onQiniuFileChange() {
            let input = this.$refs.qiinput
            if (input.files && input.files.length) {
                uptokenPromise.then(token => this.handleSelectedFileToQiniu(input.files, this.uploadFileList, token))
            }
        },
        getTimeStamp() {
            let d = new Date()
            return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
        },
        extractFileInfo({ name, lastModified, size, type }) {
            return { name, lastModified, size, type, loaded: 0, STATUS: false, PROGRESS: 0, URID: -1, URL: '' }
        },
        getEXIFInfo(file) {
            EXIF.getData(file, function () {
                if (this.exifdata['GPSLatitude']) {
                    var lat = getfn(this.exifdata['GPSLatitude'])
                    var lng = getfn(this.exifdata['GPSLongitude'])
                    console.log(lat, lng)
                }
                console.log('this.exifdata', JSON.stringify(this.exifdata))
            })
        },
        handleSelectedFileToQiniu(files, uploadFileList, uptoken) {
            Array.from(files).forEach(file => {
                let params = {}
                let fileInfo = this.extractFileInfo(file)
                // return this.getEXIFInfo(file)
                // uploadFileList.push(fileInfo)
                params['key'] = window.location.host + window.location.pathname + this.getTimeStamp() + '/' + Math.random().toString(36).substr(8) + '/' + file.name
                params['token'] = uptoken
                params['file'] = file
                uploadQiniu(undefined, {
                    params,
                    onprogress(e) {
                        fileInfo.loaded = e.loaded
                        fileInfo.PROGRESS = Math.floor(100 * e.loaded / e.total)
                    }
                }).then(data => this.$diyAction({
                    url: '/resource/home/qiniu_key_convert',
                    data: { keys: [data.key] },
                    method: 'post'
                }).then(res => {
                    fileInfo.STATUS = true
                    fileInfo.URID = res[data.key]
                    return [res[data.key]]
                }).then(this.getResoureceUrls).then(url => { fileInfo.URL = url }))
            })
        },
        display(type, url) {
            if (url) {
                if (type.indexOf('image') === 0) {
                    this.$refs.display.show({ img: url })
                } else if (type.indexOf('application') === 0) {
                    console.log('type', type)
                } else {
                    this.$refs.display.show({ video: url })
                }
            }
        },
        getResoureceUrls(uids) {
            return this.$diyAction({ url: '/resource/home/get_resource_urls', data: { res_uids: uids }, method: 'post' }).then(data => data[0].url)
        }
    },
    filters: {
        convertByte(byte) {
            if (byte < 1024) {
                return byte + ' B'
            } else {
                byte = byte / 1024
                if (byte < 1024) {
                    return byte.toFixed(2) + ' KB'
                } else {
                    byte = byte / 1024
                    return byte.toFixed(2) + ' MB'
                }
            }
        },
        displayStatue(info) {
            if (info.PROGRESS < 100) {
                return '正在上传'
            } else if (!info.STATUS) {
                return '正在处理'
            }
        }
    },
    created() {
        if (!uptokenPromise) {
            uptokenPromise = this.$diyAction({ url: '/common/qiniu/up_token', data: { normal: 1 } }).then(data => data.uptoken)
        }
    }
}
</script>