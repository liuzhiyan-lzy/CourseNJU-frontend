import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// 自定义指令-修复图片异常
Vue.directive('fixImg', {
  // inserted 是元素插入父节点会被执行
  inserted(el, option) {
    // console.log(el, option)
    // 每个钩子函数，接收两个参数，第一个参数为DOM对象，第二个参数为当前指令的属性对象
    el.addEventListener('error', () => {
      el.src = option.value
    })

    // 上面的只能监听错误事件，如果图片本身不存在 src 也就不会触发错误事件
    el.src = el.src || option.value
  },
  // 每次这个元素数据发生更新之后，都需要检查一遍是否为空，如果是则修复
  componentUpdated(el, option) {
    el.src = el.src || option.value
  }
})

// 全局注册组件
import ImageUpload from '@/components/ImageUpload'
Vue.component('ImageUpload', ImageUpload) // 注册导入上传组件

import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
