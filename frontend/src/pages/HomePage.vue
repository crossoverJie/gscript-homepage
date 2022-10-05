<template>
  <div class="code-main">
    <div class="code">
      <div class="run-btn">
        <t-space>
          <t-button @click="run" :loading="btnLoad" theme="success">Run</t-button>
          <t-select style="width: 200px" v-model="selectCode" @change="change">
            <t-option v-for="item in defaultCode" :key="item.value" :label="item.label" :value="item.value" />
          </t-select>
        </t-space>
      </div>
      <codemirror
          v-model="code"
          placeholder="Code goes here..."
          :style="style"
          :mode="mode"
          :spellcheck="spellcheck"
          :autofocus="autofocus"
          :indent-with-tab="indentWithTab"
          :tabSize="tabSize"
          :extensions="extensions"
      />
    </div>
    <div class="preview" v-loading="btnLoad">
      <pre>{{result}}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'
import {Codemirror} from "vue-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";
import {defaultCode} from "../assets/defaultCode.js";

export default {
  components: {
    Codemirror
  },
  data() {
    return {
      code: '',
      style: {height: "calc(100% - 52px)", width: '100%'},
      mode: "text/x-c++src",
      spellcheck: false,
      autofocus: true,
      indentWithTab: false,
      tabSize: 2,
      extensions: [javascript(), oneDark],
      result:"",
      btnLoad:false,
      selectCode:'0',
      defaultCode:defaultCode
    }
  },
  methods: {
    run() {
      let data = new FormData();
      data.append('body',this.code);
      this.btnLoad = true;
      let config = {
        method: 'post',
        url: '/api/run',
        data: data
      };
      axios(config).then((res) =>{
        this.result = res.data.body;
      }).catch((res) =>{
        this.result = res.response.data;
      }).finally(() => this.btnLoad = false)
    },
    inputChange(content) {
      this.$nextTick(() => {
        console.log("code:" + this.code);
        console.log("content:" + content)
      });
    },
    change(value){
      this.code = defaultCode.find(i => i.value === this.selectCode).code;
    }
  },
  mounted() {
    this.code = defaultCode.find(i => i.value === this.selectCode).code;
  }
}
</script>

<style scoped lang="less">
.code-main {
  display: flex;
  height: 100%;

  > div {
    flex: 1;

    .run-btn {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      padding: 10px 0;
    }
  }
  .preview{
    padding: 20px;
  }
}
</style>
