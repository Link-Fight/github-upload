<template>
  <div class="user-card-wrapper" :style="imgSrc">
      <span class="user-card-text xa-txt-18">{{text}}</span>
      <span class="user-card-id xa-txt-12">{{id}}</span>
  </div>
</template>
<script>
let IMGSRCMAP = {
  1: './static/card-red.png',
  2: './static/card-yellow.png',
  3: './static/card-grey.png',
  4: './static/card-light-blue.png',
  5: './static/card-dark-blue.png'
}
export default {
  props: {
    id: String,
    text: String,
    type: [String, Number]
  },
  computed: {
    imgSrc() {
      return {
        'backgroundImage': 'url(' + IMGSRCMAP[this.type] + ')'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.user-card {
  &-wrapper {
    position: relative;
    color: #fff;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  &-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    letter-spacing: 2px;
  }
  &-id {
    position: absolute;
    left: 15px;
    bottom: 16px;
  }
}
</style>
