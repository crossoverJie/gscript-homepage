import {createApp} from 'vue'
import './style.css'
import router from "./router/index.js";
import App from './App.vue'
import TDesign from 'tdesign-vue-next';
import { store } from './store';

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';


const app = createApp(App)
app.use(router)
app.use(TDesign)
app.use(store)
app.mount('#app')
