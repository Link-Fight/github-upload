<template>
  <section class="diyForm-wrapper xa-view">
      <FormCell v-if="header" :class="{'cell__flex-center':!header.icon&&!header.access}" :label="header.title"  :icon="header.icon" :access="header.access" :style="{'color':header.color,'background':header.bg}"  @click.native="$onConfigBtnClick(header)"/>
      <DiyFormFactory class="xa-flex xa-container" :needRequireTip="needRequireTip" v-if="items.length" :needCache="needCache" :cacheKey="cacheKey" :items="items" :values="variables" />
  </section>
</template>
<script>
import baseForm from './BaseForm.js'
export default {
    name: 'DiyForm',
    extends: baseForm
}
</script>
<style lang="scss">
.diyForm-wrapper {
  .cell__flex-center {
    justify-content: center;
    .weui-cell__bd {
      display: none;
    }
  }
}
</style>