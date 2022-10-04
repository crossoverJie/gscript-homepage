<template>
  <t-head-menu :theme="theme">
    <template #logo>
      <pre style="transform: scale(0.5);transform-origin: 0 50%;">
      _     _
      ___ ___ ___ ___|_|___| |_
      | . |_ -|  _|  _| | . |  _|
      |_  |___|___|_| |_|  _|_|
      |___|             |_|   v0.0.9
      </pre>
    </template>
    <template #operations>
      <t-space>
        <t-icon :name="theme === 'light' ? 'tips':'heart-filled'" @click="mode = !mode"/>
<!--        <t-icon name="logo-github-filled" @click="jump" />-->
        <t-button variant="text">
          <t-icon name="logo-github-filled" @click="jump" />
        </t-button>
      </t-space>
    </template>
  </t-head-menu>
</template>

<script setup>
import {ref, reactive, onMounted, computed, watch} from 'vue'
import {GlobalStore} from "../store/index.js";

const store = GlobalStore();

const jump = ()=>{
  window.open("https://github.com/crossoverjie/gscript-homepage")
}

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
