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
          :class="['codemirror',displayTheme]"
          :mode="mode"
          theme="idea"
          :spellcheck="spellcheck"
          :autofocus="autofocus"
          :indent-with-tab="indentWithTab"
          :tabSize="tabSize"
          :extensions="extensions"
      />
    </div>
    <div class="preview" v-loading="btnLoad">
      <t-tabs :value="value" :theme="theme" @change="handlerChange">
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
import {GlobalStore} from "../store/index.js";

export default {
  components: {
    Codemirror
  },
  data() {
    return {
      code: '',
      mode: "text/x-c++src",
      spellcheck: false,
      autofocus: true,
      indentWithTab: false,
      tabSize: 2,
      //extensions: [javascript(),oneDark],
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
  computed:{
    extensions(){
      let arr = [javascript()]
      if(this.displayTheme === 'dark'){
        arr.push(oneDark)
      }
      return arr
    },
    displayTheme(){
      return GlobalStore().displayTheme
    },
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
  flex: 1;
  overflow: hidden;

  > div {
    flex: 1;

    .run-btn {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      padding: 0 0 10px 0;
    }
  }

  .code {
    padding: 20px 10px 20px 20px;
    display: flex;
    flex-direction: column;

    .codemirror {
      flex: 1;
      ::v-deep(.cm-focused){
        outline: none;
      }
      ::v-deep(.cm-scroller)  {
        height: calc(100vh - 64px - 42px - 40px);
        width: calc(50vw - 30px);
      }
    }
    .light{
      ::v-deep(.cm-scroller){
        background: white;
      }
    }
  }

  .preview {
    padding: 20px 20px 20px 10px;
    display:flex;
    ::v-deep(.t-tabs){
      flex: 1;
      .t-tabs__content{
        padding: 0 20px;
        height: calc(100vh - 64px - 42px - 38px);
      }
      .t-tabs__nav-item{
        height: 38px;
        line-height: 38px;
        .t-icon{
          margin-right: 8px;
        }
      }
    }
  }
}

@media screen and (max-width: 769px) {
  .code-main {
    flex-direction: column;
    height: unset;
    flex: unset;

    .code {
      padding: 20px 20px 10px 20px;
      .codemirror {
        flex: 1;
        ::v-deep(.cm-scroller)  {
          min-height: calc(50vh / 2);
          height: unset;
          width: unset;
        }
      }
    }
    .preview{
      padding: 10px 20px 20px 20px;
      min-height: calc(50vh / 2);
      ::v-deep(.t-tabs){
        .t-tabs__content{
          padding: 0 20px;
          height: unset;
          overflow: auto;
        }
      }
    }
  }
}
</style>
