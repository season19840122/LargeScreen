import Vue from 'vue'
// 按需引入 Element
import {
  Row,
  Button,
  Select,
  Loading,
  MessageBox,
  Message,
  // Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import styles from '@/assets/styles/scss/base.scss';
// 按需引入 Echarts
import 'echarts'
import '@/assets/styles/scss/echarts.scss'
// import { use } from "echarts/core";
// import { CanvasRenderer } from "echarts/renderers";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
// } from "echarts/charts";
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent
// } from "echarts/components";
import { default as VChart, THEME_KEY } from 'vue-echarts'
// 引入 datav
import dataV from '@jiaminghi/data-view'
// 引入 vue-amap
import VueAMap from 'vue-amap'
// 项目自身 vue
import App from './App.vue'
import router from './router'
import store from './store'

// 全局注册组件（也可以使用局部注册）
// 全局注册 Element
Vue.use(Row)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.use(Loading.directive)
// Vue.use(MessageBox);
// Vue.use(Message);
// Vue.use(Notification);
// 全局注册 vue-echarts
// use([
//   CanvasRenderer,
//   LineChart,
//   BarChart,
//   PieChart,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent
// ]);
Vue.component('v-chart', VChart)
// 全局注册 DataV
Vue.use(dataV)
// 全局注册 vue-amap
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '5b4187e9b01d2e89e16a2b239a59ce89',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
})

// 去除生产环境提示
Vue.config.productionTip = false

// Vue 全局变量
Vue.prototype.$src = process.env.VUE_APP_PUBLIC_PATH
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
// Vue.prototype.$notify = Notification;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
