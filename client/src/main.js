// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import navHeader from  './components/nav-header';
import navFooter from  './components/nav-footer';
import navBread from  './components/nav-bread';
import Modal from './components/modal'
import Vuex from 'vuex'


import infiniteScroll from 'vue-infinite-scroll'
import '../static/css/base.css'
import '../static/css/product.css'
import '../static/css/login.css'
import '../static/css/checkout.css'
Vue.use(Vuex)
let store=new Vuex.Store({
   state:{
     user:{
       userId:'',
       userName:''
     },
     cartCount:0
   },
  mutations:{
     updateUser(state,user){
         state.user=user
     },
    updateCartCount(state,num){
       state.cartCount +=num
    }
  }
})

Vue.config.productionTip = false
Vue.use(infiniteScroll)
Vue.component('navHeader',navHeader)
Vue.component('navFooter',navFooter)
Vue.component('navBread',navBread)
Vue.component('Modal',Modal)
Vue.filter('price',function (price) {
  price=price.toFixed(2)
  return '￥'+price
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
