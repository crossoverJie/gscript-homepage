<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import FormData from 'form-data'
export default {
  methods:{
    run(){
      let data = new FormData();
      data.append('body', 'void fib(){\n    int a = 0;\n    int b = 1;\n    int fibonacci(){\n        int c = a;\n        a = b;\n        b = a+c;\n        return c;\n    }\n    return fibonacci;\n}\n\nfunc int() f = fib();\n\nfor (int i = 0; i < 10; i++){\n    print(f()+" ");\n}');

      let config = {
        method: 'post',
        url: '/api/run',
        data: data
      };
      axios(config).then(function (res){
        console.log(res.data)
      })
    }
  }
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <button @click="run()">run</button>
  </div>
<!--  <HelloWorld msg="Vite + Vue" />-->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
