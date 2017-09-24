<template>
	<div class="counter-wrapper">
		<button @click="increment">+</button>
		<p><span>{{sum}}</span></p>
		<button @click="decrement">-</button>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		props:{
			num:{
				type:Number,
				default:0
			}
		},
		methods:{
			increment(){
				this.$emit("incre")
			},
			decrement(){
				this.$emit("decre")
			}
		}
		
	}
</script>

<style lang="scss">

</style>