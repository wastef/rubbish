import Vue from 'vue'
import App from './App'

// import basics from './pages/basics/home.vue'
// Vue.component('basics',basics)

import components from './pages/tabBar/component/home.vue'
Vue.component('components',components)

import plugin from './pages/tabBar/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



