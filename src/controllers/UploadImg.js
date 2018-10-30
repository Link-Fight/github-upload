import { saveWechatRes } from '@/apis/wx.js'
import fileUpload from '@/controllers/fileUpload'
var u = navigator.userAgent
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
export class UploadImg {
    constructor(isWeixin, vm, $wxAction, $diyAction) {
        this._input = this.createdInput()
        if (!isWeixin) {
            this.input = this._input
        }
        this.chooseImageConfig = { count: 1 }
        this.vm = vm
        this.$wxAction = $wxAction
        this.$diyAction = $diyAction
        this.reusltPromise = null
    }
    createdInput() {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/jpg,image/jpeg,image/png,image/gif'
        input.onchange = () => {
            input.files.length > 0 && this.onNativeSelectedFile(input.files, {
                sizeType: ['original'],
                count: 1
            }).then(data => {
                this.reusltPromise({
                    src: [data.src],
                    guid: [data.guid]
                })
            })
        }
        return input
    }
    $chooseImage = async function (config) {
        let localIds = await this.$wxAction.chooseImage(config)
        this.vm.$showToast('上传图片' + localIds.length + '张', 'loading')
        let serverId = await this.$wxAction.upload(localIds, false)
        if (isiOS) {
            localIds = await this.$wxAction.getLocalImgData(localIds)
        }
        let resId = await this.vm.$promiseWithUi(this.$diyAction(Object.assign({}, saveWechatRes, {
            data: {
                uids: serverId.map(item => 'wechat' + item)
            }
        })))
        return {
            src: localIds,
            serverId,
            guid: resId
        }
    }
    chooseImage(cfg) {
        if (cfg) {
            this.chooseImageConfig = Object.assign({}, { count: 1 }, cfg)
        }
        if (this.input) {
            return new Promise(resolve => {
                this.input.click()
                this.reusltPromise = resolve
            })
        } else {
            return this.$chooseImage(Object.assign({ count: 1 }, cfg))
        }
    }
    onNativeSelectedFile(files, config) {
        if (files.length) {
            var todo
            let cfg = Object.assign({}, config, this.chooseImageConfig)
            if (cfg.sizeType.indexOf('original') > -1) {
                todo = fileUpload.uploadOriginalFile
            } else {
                todo = fileUpload.uploadCompressFile
            }
            return todo(files[0], this.onprogress.bind(this)).catch(error => {
                window.alert(error.msg)
            })
        }
    }
    onprogress({ loaded, total }) {
        let num = Math.floor(100 * loaded / total)
        if (num < 100) {
            this.vm.$showToast('上传图片：' + num + '%')
        } else {
            this.vm.$showToast('正在处理图片，请稍等！', 'msg', 0)
        }
    }
}
