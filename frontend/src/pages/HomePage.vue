<template>
  <div class="code-main">
    <div class="code">
      <div class="run-btn">
        <t-space>
          <t-button @click="run" :loading="btnLoad" theme="success">Run</t-button>
          <t-select style="width: 200px" v-model="selectCode" @change="change">
            <t-option v-for="item in defaultCode" :key="item.value" :label="item.label" :value="item.value"/>
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
      <t-space direction="vertical" style="width:100%;height: 100%">
        <t-tabs :value="value" :theme="theme" @change="handlerChange" style="height: 100%">
          <t-tab-panel value="first">
            <template #label>
              <t-icon name="print" class="tabs-icon-margin"/>
              Output
            </template>
            <pre>{{ result }}</pre>
          </t-tab-panel>
          <t-tab-panel value="second">
            <template #label>
              <t-icon name="chart" class="tabs-icon-margin"/>
              AST
            </template>
            <pre>{{ ast }}</pre>
          </t-tab-panel>
          <t-tab-panel value="third">
            <template #label>
              <t-icon name="code" class="tabs-icon-margin"/>
              Symbol
            </template>
            <pre>{{ symbol }}</pre>
          </t-tab-panel>
        </t-tabs>
      </t-space>

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
      style: {height: "calc(100% - 52px - 20px)", width: '100%'},
      mode: "text/x-c++src",
      spellcheck: false,
      autofocus: true,
      indentWithTab: false,
      tabSize: 2,
      extensions: [javascript(), oneDark],
      result: "",
      ast: "",
      symbol: "",
      btnLoad: false,
      selectCode: '0',
      value: 'first',
      theme: 'card',
      defaultCode: defaultCode
    }
  },
  methods: {
    run() {
      let data = new FormData();
      data.append('body', this.code);
      this.btnLoad = true;
      let config = {
        method: 'post',
        url: '/api/run',
        data: data
      };
      axios(config).then((res) => {
        this.result = res.data.body;
        this.ast = res.data.ast;
        this.symbol = res.data.symbol;
      }).catch((res) => {
        this.result = res.response.data;
      }).finally(() => this.btnLoad = false)
    },
    inputChange(content) {
      this.$nextTick(() => {
        console.log("code:" + this.code);
        console.log("content:" + content)
      });
    },
    change(value) {
      this.code = defaultCode.find(i => i.value === this.selectCode).code;
    },
    handlerChange(newValue) {
      console.log(newValue)
      this.value = newValue;
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
    ::v-deep(.cm-scroller){
      height: calc(100vh - 52px - 64px - 20px);
    }
  }

  .preview {
    padding: 20px;

    ::v-deep(.t-space-item) {
      height: 100%;
    }

    ::v-deep(.t-tabs__nav-item.t-size-m) {
      height: 40px;
      line-height: 40px;
    }
    ::v-deep(.t-tabs__content){
      padding: 0 20px;
    }
    ::v-deep(.tabs-icon-margin){
      margin-right: 8px;
    }
  }
}
</style>
