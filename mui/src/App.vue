<template>
  <div id="app">
  	<keep-alive>
  		<router-view></router-view>  	
  	</keep-alive>
  </div>
</template>

<script>
export default {
  name: 'rootApp'
}
</script>

<style>
	@import "./assets/css/base.css";
	@import "./assets/css/product.css";
	@import "./assets/css/login.css";
	@import "./assets/css/checkout.css";
	.left{
		width: 20%;
		border: 1px solid gray;
		float: left;
	}
</style>
