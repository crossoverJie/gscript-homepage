<template>
  <t-head-menu :theme="theme">
    <template #logo>
      <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
    </template>
    <template #operations>
      <t-space>
        <t-icon :name="theme === 'light' ? 'tips':'star-filled'" @click="mode = !mode"/>
        <t-icon name="logo-github-filled" />
      </t-space>
    </template>
  </t-head-menu>
</template>

<script setup>
import {ref, reactive, onMounted, computed, watch} from 'vue'
import {GlobalStore} from "../store/index.js";

const store = GlobalStore();

let theme = computed(() => {
  return store.displayTheme
})

let mode = ref(false)

const modeChange = (val) => {
  if(val){
    document.documentElement.setAttribute('theme-mode', 'dark');
    store.setTheme('dark');

  }else{
    document.documentElement.removeAttribute('theme-mode');
    store.setTheme('light');
  }
}

watch(mode,(v,o) => {
  console.log(v)
  modeChange(v);
})

onMounted(() => {
  mode.value = store.displayTheme === 'dark';
})


onMounted(() => {
})
</script>

<style scoped lang='less'>
:deep(.t-icon){
  height: 30px;
  width: 30px;
}
</style>
