<template>
<div class="progress-wrap">
    <div class="progress-index" :style="{'width':value+'%'}"></div>
</div>
</template>
<script>
export default {
    props: {
        value: {
            default: 0
        }
    }
}
</script>
<style scoped>
.progress-wrap {
  height: 2px;
  position: relative;
}
.progress-index {
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #04be02;
  overflow: hidden;
  transition: all 0.3s linear;
}
</style>