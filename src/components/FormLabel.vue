<template>
  <div>
      <p>{{title}}</p>
      <p class="xa-txt-12" style="color:#BCBCBC;line-height:14px">{{subTitle}}</p>
  </div>
</template>
<script>
export default {
    name: 'FormLabel',
    props: {
        title: '',
        subTitle: ''
    }
}
</script>
