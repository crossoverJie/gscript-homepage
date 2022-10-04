<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import FormData from 'form-data'
import {Codemirror} from "vue-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";

export default {
  components: {
    Codemirror
  },

  data() {
    return {
      code: '',
      style: {height: "400px", width: '1000px'},
      mode: "text/x-c++src",
      spellcheck: true,
      autofocus: true,
      indentWithTab: false,
      tabSize: 2,
      extensions: [javascript(), oneDark],
    }
  },
  methods: {
    run() {
      let data = new FormData();
      data.append('body', 'void fib(){\n    int a = 0;\n    int b = 1;\n    int fibonacci(){\n        int c = a;\n        a = b;\n        b = a+c;\n        return c;\n    }\n    return fibonacci;\n}\n\nfunc int() f = fib();\n\nfor (int i = 0; i < 10; i++){\n    print(f()+" ");\n}');

      let config = {
        method: 'post',
        url: '/api/run',
        data: data
      };
      axios(config).then(function (res) {
        console.log(res.data)
      })
    },
    inputChange(content) {
      this.$nextTick(() => {
        console.log("code:" + this.code);
        console.log("content:" + content)
      });
    },
  }
}
</script>

<template>
  <codemirror
      v-model="code"
      placeholder="Code gose here..."
      :style="style"
      :mode="mode"
      :spellcheck="spellcheck"
      :autofocus="autofocus"
      :indent-with-tab="indentWithTab"
      :tabSize="tabSize"
      :extensions="extensions"
  />
</template>

<style>
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
