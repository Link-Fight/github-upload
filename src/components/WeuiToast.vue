<template>
    <transition name="fade">
        <div :class="[type?'xa-toast__' + type:'xa-toast__msg']">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i :class="toastClass"></i>
                <slot>
                    <p class="weui-toast__content">{{content}}</p>
                </slot>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'WeuiToast',
    props: {
        type: {
            type: String,
            default: 'loading'
        },
        content: {
            type: String,
            default: '请求中'
        }
    },
    computed: {
        toastClass() {
            switch (this.type) {
                case 'loading':
                    return 'weui-loading weui-icon_toast'
                case 'success':
                    return 'weui-icon-success-no-circle weui-icon_toast'
                default:
                    return ''
            }
        }
    }
}
</script>
<style scoped>
.xa-toast__msg .weui-toast {
  width: 100%;
  max-width: 280px;
  left: 50%;
  top: initial;
  margin-left: 0;
  transform: translateX(-50%);
  min-height: 1em;
  bottom: 60px;
  background-color: transparent;
}

.xa-toast__msg .weui-toast__content {
  display: inline-block;
  padding: 8px 12px;
  margin: 0;
  font-size: 12px;
  text-align: center;
  border-radius: 6px;
  background: rgba(17, 17, 17, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-enter {
  transform: scale(0);
}
.fade-leave-to {
  opacity: 0;
}
</style>