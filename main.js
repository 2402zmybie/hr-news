import Vue from 'vue'
import App from './App'

//绑定实例
import api from './common/api'
Vue.prototype.$api = api

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
