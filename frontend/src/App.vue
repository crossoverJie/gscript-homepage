
<template>
  <router-view :theme-mode="theme"></router-view>
</template>

<script setup>
import {computed} from "vue";
import {GlobalStore} from "./store/index.js";

const store = GlobalStore();

let theme = computed(() => {
  return store.displayTheme
})
</script>

<style>
body{
  margin: 0;
}
</style>
