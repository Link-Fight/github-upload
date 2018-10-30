<template>
<div class="panel-header">
    <slot></slot>
</div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.panel-header {
  padding: 4px 4px 2px;
  line-height: 30px;
  background-image: -moz-linear-gradient(top, #f3f3f3, #ddd);
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, #fff),
    color-stop(1, #ddd)
  );
}
</style>
