// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
//图片懒加载
import VueLazyload from 'vue-lazyload'
//内容无限滚动
import InfiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

Vue.use(VueLazyload,{
	loading:'/static/loading-svg/loading-bars.svg'
})

Vue.use(InfiniteScroll)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
