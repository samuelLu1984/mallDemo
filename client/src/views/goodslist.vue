<template>
    <div >
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class=" cur" v-bind:class="{'default':defaultFlag}" @click="defaultPrice()">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortPrice()" :class="{'sort-up':params.sortFlag+1,'cur':defaultFlag}">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="priceChecked(0)" :class="{'cur':params.priceLv==0}">All</a></dd>
                <dd>
                  <a href="javascript:void(0)" @click="priceChecked(1)" :class="{'cur':params.priceLv==1}">0 - 100</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="priceChecked(2)" :class="{'cur':params.priceLv==2}">100 - 500</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="priceChecked(3)" :class="{'cur':params.priceLv==3}">500 - 1000</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="priceChecked(4)" :class="{'cur':params.priceLv==4}">1000 - 2000</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="priceChecked(5)" :class="{'cur':params.priceLv==5}">2000-</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul >
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img :src='"static/img/"+item.productImg' alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice|price}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-show="loadFlag" class="load-more">
                  <img src="static/loading/loading-spin.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal :mdFlag="errFlag" @close="closeModal()">
        <p slot="modal-msg" >

          <span class="error-msg">请先登录,否则无法加入到购物车中!</span>
        </p>
        <a href="javascript:;"  slot="modal-btn" class=" btn btn-login" @click="errFlag=false">确定</a>

        <!--<a href="javascript:;"  slot="modal-btn" class="btn-login" @click="mdFlag=false">确定</a>-->
      </modal>
      <modal :md-flag="sucFlag" @close="closeModal()">
        <p slot="modal-msg" >
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span class="error-msg">加入购物车成功！</span>

        </p>
       <div slot="modal-btn" >
         <a href="javascript:;"   class=" btn btn-login" @click="sucFlag=false">继续购物</a>
         <div class="btn-space"> </div>
         <router-link    class=" btn btn-login " @click="sucFlag=false" to="/cart">查看购物车</router-link>
       </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import axios from 'axios'
  import modal from '../components/modal'
    export default {
        name: "goods-list",
      data(){
          return {
            goodsList:[],
            defaultFlag:false,
            params:{
              sortFlag:1,
              pageNum:1,
              pageSize:8,
              priceLv:0
            },
            busy:true,
            loadFlag:true,
            errFlag:false,
            sucFlag:false
          }
      },
      mounted(){
          this.params.sortFlag=0
          this.getGoodsList()
      },
      methods:{
        getGoodsList(flag){

          axios.get('/goods/list',{params:this.params}).then(res=>{

              if (flag) {
                this.goodsList=this.goodsList.concat(res.data.result)


              }else{
                this.goodsList=res.data.result
              }
             if (res.data.result.length<this.params.pageSize) {
               this.busy=true
               this.loadFlag=false
             }else {
                this.busy=false
               this.loadFlag=true
             }




          })
        },
        sortPrice(){
          this.params.sortFlag=this.params.sortFlag>-1?1:-1
          this.params.sortFlag = -this.params.sortFlag;
          this.params.pageNum=1;
          // this.busy=false
          this.getGoodsList();
          this.defaultFlag=true
        },
        defaultPrice(){
          this.params.sortFlag=0
          this.defaultFlag=false;
          // this.busy=false
          this.params.pageNum=1;
          this.getGoodsList()
        },
        loadMore(){
          this.busy=true;
          setTimeout(()=>{
            this.params.pageNum++;
            this.getGoodsList(true)
          },1000)
        },
        priceChecked(index){
          this.params.pageNum=1
          this.params.priceLv=index
          this.getGoodsList()
        },
        addCart(productId){
          if (!sessionStorage.userId) {
            this.errFlag=true
            return
          }

          axios.post('/goods/addCart',{
            userId:sessionStorage.userId,
            productId:productId
          }).then(res=>{
           if (res.data.status==='0'){
             this.sucFlag=true
           }
          })
        },
        closeModal(){
          this.errFlag=false
          this.sucFlag=false
        }
      },
      // filters:{
      //     price(price){
      //       return '￥'+price
      //     }
      // },
      components:{
          modal
      }
    }
</script>
<style scoped>
  .load-more{
    width: 100%;
    height: 50px;
  }
  .load-more img{
    display: block;
    margin: 0 auto;
    height: 50px;
  }
  .error-msg{
    font-size: 20px;
  }
 .btn-space{
   height: 30px;
 }
</style>

