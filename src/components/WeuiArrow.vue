<template>
  <div class="xa-arrow weui-cell__hd"  :class="direction"></div>
</template>
<script>
export default {
  name: 'WeuiArrow',
  props: {
    direction: {
      type: String,
      default: 'down' // down / up
    }
  }
}
</script>

<style lang="scss" scoped>
.xa-arrow {
  position: relative;
  width: 14px;
  height: 24px;
}
.xa-arrow::before {
  content: " ";
  display: inline-block;
  height: 5px;
  width: 5px;
  border-width: 1px 1px 0 0;
  border-color: #999;
  border-style: solid;
  position: relative;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  transition: transform 0.5s;
}
.xa-arrow.down::before {
  content: " ";
  left: 5px;
  transform: rotate(135deg);
}
.xa-arrow.up::before {
  content: " ";
  transform: rotate(-45deg);
  left: 5px;
  margin-top: -2px;
}
.xa-arrow.left::before {
  content: " ";
  transform: rotate(-135deg);
  left: 5px;
  margin-top: -2px;
}
.xa-arrow.right::before {
  content: " ";
  transform: rotate(45deg);
  left:2px;
  margin-top: -2px;
}
</style>
