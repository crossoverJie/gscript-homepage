<template>
  <t-head-menu :theme="theme">
    <template #logo>
      <pre style="transform: scale(0.5);transform-origin: 0 50%;">
      _     _
      ___ ___ ___ ___|_|___| |_
      | . |_ -|  _|  _| | . |  _|
      |_  |___|___|_| |_|  _|_|
      |___|             |_|   v0.0.10
      </pre>
    </template>
    <template #operations>
      <t-space class="space">
        <t-tooltip content="切换主题">
          <t-button shape="square" variant="text" @click="mode = !mode">
            <template v-if="theme === 'light'">
              <heart-filled-icon slot="icon"/>
            </template>
            <template v-else>
              <tips-icon slot="icon"/>
            </template>
          </t-button>
        </t-tooltip>
        <t-tooltip content="About playground">
        <t-button shape="square" variant="text" @click="jump('https://github.com/crossoverjie/gscript-homepage')">
          <info-circle-filled-icon slot="icon"></info-circle-filled-icon>
        </t-button>
        </t-tooltip>
        <t-tooltip content="Gscript">
        <t-button shape="square" variant="text" @click="jump('https://github.com/crossoverjie/gscript')">
          <logo-github-filled-icon slot="icon"></logo-github-filled-icon>
        </t-button>
        </t-tooltip>
      </t-space>
    </template>
  </t-head-menu>
</template>

<script setup>
import {ref, reactive, onMounted, computed, watch} from 'vue'
import {GlobalStore} from "../store/index.js";
import { LogoGithubFilledIcon, TipsIcon, HeartFilledIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue-next';

const store = GlobalStore();

const jump = (url)=>{
  window.open(url)
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
  height: 25px;
  width: 25px;
}
::v-deep(.t-menu__logo){
  width: 70px;
}
::v-deep(.t-menu__operations){
  margin-right: 20px !important;
}
</style>
