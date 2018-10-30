<template>
<transition name="pop-pane-fade">
    <div class="pop-panel__wrapper">
        <div class="weui-mask" @click.stop="$emit('close')" @touchstart="$emit('close')" @touchmove="$emit('close')"></div>
        <transition name="fadeup">
            <div v-if="isShow" class="pop-panel__content">
                <section class="xa-view max-page-width" :style="wrapStyle">
                    <slot name="header"></slot>
                    <section class="xa-container xa-flex" :class="contentClass">
                        <slot>
                            <section></section>
                        </slot>
                    </section>
                    <slot name="footer"></slot>
                </section>
            </div>
        </transition>
    </div>
</transition>
</template>
<script>
export default {
    data() {
        return {
            isShow: false
        }
    },
    name: 'PopPanel',
    props: {
        wrapStyle: Object,
        contentClass: String
    },
    mounted() {
        this.isShow = true
    }
}
</script>
<style lang="scss" scoped>
.pop-pane-fade-enter,
.pop-pane-fade-leave-active {
  opacity: 0;
}
.pop-pane-fade-leave-active {
  opacity: 0;
  transform: scale3d(0.5, 0.5, 1);
}
.pop-pane-fade-enter-active,
.pop-pane-fade-leave-active {
  transition: all 0.1s ease-in-out, transform 0.3s ease-in-out;
}

.pop-panel__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 1000;
}
.pop-panel__content {
  position: fixed;
  left: 0;
  right: 0px;
  bottom: 0;
  //   height: 50vh;
  z-index: 1001;
}
</style>
