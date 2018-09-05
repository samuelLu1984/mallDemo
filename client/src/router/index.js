import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/goodslist'
import Cart from '@/views/cart'
import Address from '@/views/address'
import Order from "@/views/orderlist"
import OrderSuc from "@/views/orderSuc"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path:'/goods',
      name:'goodsList',
      component:GoodsList
    },
    {
      path:'/cart',
      name:'cart',
      component:Cart
    },
    {
      path:'/address',
      name:'address',
      component:Address
    },
    {
      path:'/order',
      name:'order',
      component:Order
    },
    {
      path:'/orderSuc',
      name:'orderSuc',
      component:OrderSuc
    }
  ]
})
