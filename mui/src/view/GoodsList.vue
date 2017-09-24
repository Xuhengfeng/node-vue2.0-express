<template>
	<div class="GoodsList-wrapper">
		<nav-header></nav-header>
        <nav-bread>
        	<span>goodslist</span>
        </nav-bread>
        
        
        
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" :class="{'sort-up':sortFlag}" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{'cur':priceChecked==='all'}">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked===index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
                
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodList">
                    <div class="pic">
                     <!--注意这边的图片路径是 在static的下面，他是文件编译打包（npm run build）后的路径-->
                    	<a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice|formatMoney}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!--infinite-scroll-disabled="false" 表示 是否关闭滚动加载  默认是false 打开滚动加载 
              infinite-scroll-distance="20"   表示  滚动多少的时候开始滚动加载
              v-infinite-scroll="loadMore"    监听事件  是否加载 -->
              <div class="view-more-normal"
              		v-infinite-scroll="loadMore"   
              		infinite-scroll-disabled="busy"
              		infinite-scroll-distance="30">
              	<img src="./../assets/loading-spinning-bubbles.svg" v-show="loading" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal :mdShow="mdShowCart" @close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成功!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop" ></div>
      <nav-footer></nav-footer>
	</div>
</template>

<script type="text/ecmascript-6">
	import NavHeader from "components/NavHeader"
	import NavBread from "components/NavBread"
	import NavFooter from "components/NavFooter"
	import Modal from "components/Modal"
	import axios from "axios"
	
	export default{
		data(){
			return{
				page: 1,               //默认是从第一页开始的
				pageSize: 8,           //默认请求多少条数据
				sortFlag: true,        //默认是从小到大排序
				busy: true,            //默认是禁止滚动加载的
				goodList: [],
				priceFilter: [
					{
						startPrice:"0.00",
						endPrice:"500.00"
					},
					{
						startPrice:"500.00",
						endPrice:"1000.00"
					},
					{
						startPrice:"1000.00",
						endPrice:"1500.00"
					},
					{
						startPrice:"1500.00",
						endPrice:"2000.00"
					},
				],
				priceChecked: 'all',
				overLayFlag: false,
				filterBy: false,
				loading: false,
				mdShowCart: false
			}
		},
		mounted(){
			this._getGoodsList()
		},
		filters:{
			formatMoney(value){
				return `$${value}元`
			}
		},
		methods:{
			_getGoodsList(flag){
				let param = {
					page: this.page,
		          	pageSize: this.pageSize,
		          	sort: this.sortFlag?1:-1,
		          	priceLevel: this.priceChecked
				};
				this.loading = true;  
				//请求后端数据接口的之前，显示loading
				axios.get("/goods/list",{
					params: param
				}).then(response => {
					var res = response.data;
					this.loading = false;
					if(res.status === "0"){
						if(flag){//flag true的时候表示 数据需要 和之前的数据累加 ，拼接成新的数组数据；
							//this.goodList = this.goodList.concat(res.result.list);
							this.goodList = [...this.goodList, ...res.result.list];//es6 拼接数组
							if(res.result.count == 0){
								//没有数据的时候,关闭滚动加载,禁用掉！
								this.busy = true; 
							}else{
								//开启滚动加载
								this.busy = false;
							}
						}else{
							this.goodList = res.result.list;
							//开启滚动加载
							this.busy = false;
						}
					}else{
						console.log("------------请求数据为空-----------------")
						this.goodList = []; 
					}
				})
			},
			sortGoods(){                  //商品排序
				this.sortFlag = !this.sortFlag;
				this.page = 1;
				this._getGoodsList();
			},
			setPriceFilter(index){
				this.priceChecked = index;
				this.page = 1;
				this._getGoodsList();
			},
			loadMore(){
				//关闭滚动加载
				this.busy = true;
				setTimeout(() => {  //节流 请求数据接口  减少服务器的压力
					this.page++;
					this._getGoodsList(true);
				}, 500);
			},
			addCart(productId){
				axios.post("/goods/addCart",{
					productId: productId
				}).then((res) => {
					var res = res.data;
					console.log(res)
					if(res.status === "0"){
						this.mdShowCart = true;
//						this.$store.commit("updataCartCount", 1);
					} else {
						alert("加入到购物车失败")
						this.mdShow = true;
					}
				})
			},
			showFilterPop(){
				this.filterBy=true;
				this.overLayFlag=true;
			},
			closePop(){
				this.filterBy=false;
				this.overLayFlag=false;
			},
			closeModal() {
				this.mdShowCart = false;
			}
			
		},
		components:{
			NavHeader,
			NavBread,
			NavFooter,
			Modal
		}
	}
</script>

<style>

</style>