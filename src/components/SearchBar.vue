<template>
<div class="xa-searchBar  weui-search-bar_focusing xa-bg-white">
    <form @submit.prevent="()=> false" action="javascript:return true" class="weui-search-bar__form">
        <div class="weui-search-bar__form">
            <div class="weui-search-bar__box">
                <i class="weui-icon-search xa-txt-999"></i>
                <input type="search" v-focus="focus" @keyup.enter.stop="customSearchEvent('search')" :value="value" @input="onInput" @focus="onFocus" @blur="onBlur"  class="weui-search-bar__input" :placeholder="placeholder" />
                <a href="javascript:" v-show="!!value" class="weui-icon-clear" @click="clearVal('')"></a>
            </div>
        </div>
    </form>
    <slot>
        <a v-if="value"  href="javascript:" @click="customSearchEvent('search')" class="weui-search-bar__cancel-btn xa-txt--nowrap">搜索</a>
    </slot>
</div>
</template>
<script>
export default {
    name: 'SearchBar',
    props: {
        value: {
            type: String
        },
        placeholder: {
            type: String,
            default: '搜索'
        },
        focus: {
            type: Boolean,
            default: false
        },
        onFocus: {
            type: Function,
            default() {
                return () => { }
            }
        },
        onBlur: {
            type: Function,
            default() {
                return () => { }
            }
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value)
        },
        customSearchEvent() {
            this.$emit('submit', this.searchVal)
        },
        clearVal() {
            this.$emit('input', '')
        }
    }
}
</script>
<style scoped>
.xa-searchBar {
  display: flex;
  padding: 6px 10px;
  z-index: 0;
}
.weui-search-bar__form {
  border-radius: 5px;
}
.weui-search-bar__form:after {
  content: "";
  background: #f1f1f1;
}
.weui-search-bar__cancel-btn {
  display: inline-block;
}
</style>
