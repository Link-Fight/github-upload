<script>
import svg from '../assets/more_img.svg'
export default {
    name: 'AppAvatar',
    render(h) {
        function renderImgs(vm, h, avatar) {
            let defaultImg = avatar[0].thumb_url || avatar[0]
            let originalImg = avatar[0].url || avatar[0].thumb_url || avatar[0]
            return h('div', {
                class: `xa-default__img ` + vm.defaultImgType + ' ' + vm.share,
                style: {
                    backgroundImage: defaultImg ? 'url(' + defaultImg + ')' : '',
                    width: vm.size + 'px',
                    height: vm.size + 'px',
                    borderRadius: '8px'
                },
                on: {
                    click(event) {
                        event.stopPropagation()
                        event.preventDefault()
                        if (avatar) {
                            originalImg && vm.$wxAction.previewImage(originalImg, avatar.map(a => a.url || a.thumb_url || a))
                        }
                    }
                }
            }, [
                    h('div', { class: 'appavatar__counter' }, [
                        h('img', {
                            attrs: {
                                src: svg
                            }
                        }),
                        h('span', avatar.length)
                    ])
                ])
        }
        function renderImg(vm, h, avatar = '') {
            let displayAvatar = avatar.thumb_url || avatar.url || avatar
            return h('div', {
                class: `xa-default__img ` + vm.defaultImgType + ' ' + vm.share,
                style: {
                    backgroundImage: displayAvatar.length > 1 ? 'url(' + displayAvatar + ')' : '',
                    width: vm.size + 'px',
                    height: vm.size + 'px'
                },
                on: {
                    click(event) {
                        event.stopPropagation()
                        event.preventDefault()
                        if (avatar) {
                            (avatar.url || avatar.thumb_url || avatar.length) && vm.$wxAction.previewImage(avatar.url || avatar.thumb_url || avatar)
                        }
                    }
                }
            })
        }
        if (this.avatar instanceof Array) {
            return renderImgs(this, h, this.avatar)
        } else {
            return renderImg(this, h, this.avatar)
        }
    },
    props: {
        avatar: {
            type: [String, Array, Object]
        },
        size: {
            type: [Number, String],
            default: 50
        },
        share: String, // square
        defaultImg: String,
        defaultImgType: {
            type: String,
            default: 'defalut' // person
        }
    }
}
</script>
<style lang="scss" scoped>
.xa-default__img {
  position: relative;
  border-radius: 50%;
}
.xa-default__img.square {
  border-radius: 4px;
}
.appavatar__counter {
  position: absolute;
  right: 4px;
  bottom: 4px;
  padding: 1px 3px;
  line-height: 0px;
  font-size: 0px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.83);
  border-radius: 4px;
  box-shadow: 0px 0 4px #fff;
  img {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 1px;
  }
  span {
    display: inline-block;
    font-size: 10px;
    vertical-align: 2px;
  }
}
</style>
