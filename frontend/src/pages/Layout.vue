<template>
  <t-layout class="layout-main">
    <t-header>
      <header-dom></header-dom>
    </t-header>
    <t-content>
      <home-page></home-page>
    </t-content>
  </t-layout>

</template>

<script setup>
import { reactive, onMounted } from 'vue'
import HomePage from "./HomePage.vue";
import HeaderDom from "./Header.vue";


onMounted(() => {
})
</script>

<style scoped lang='less'>
.layout-main{
  height: 100vh;
}
@media screen and (max-width: 769px) {
  .layout-main{
    height: 100%;
    min-height: 100vh;
  }
}
.t-layout__content{
  display: flex;
  flex-direction: column;
}
</style>
