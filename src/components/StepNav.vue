<template>
<ul class="xa-cell step-box">
    <li class="xa-flex step-item" v-for="(item,index) in items" :key="index" @click="onItemClick(index)" :class="{'step-item--done':index<value,'step-item--active':index==value}">
        {{item.txt||item}}
    </li>
</ul>
</template>
<script>
export default {
    props: {
        items: Array,
        value: [String, Number]
    },
    methods: {
        onItemClick(index) {
            this.$emit('input', index)
        }
    }
}
</script>
<style scoped>
.step-box {
  line-height: 36px;
  text-align: center;
  font-size: 12px;
  background-color: #e4e4e4;
}
.step-item {
  position: relative;
  cursor: pointer;
}
.step-item::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border: 16px solid transparent;
  border-left-color: #fff;
  border-right: none;
  border-left-width: 10px;
}
.step-item::after {
  content: " ";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border: 16px solid #fff;
  border-left-color: transparent;
  border-right: none;
  border-left-width: 10px;
}
.step-item--active {
  background-color: #ef3338;
  color: #fff;
}
.step-item--done {
  background-color: #b71c1c;
  color: #fff;
}
.step-item:first-of-type::before {
  display: none;
}
.step-item:last-of-type:after {
  display: none;
}
</style>
