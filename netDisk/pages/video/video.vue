<template>
	<view style="height: 100vh;">
		<video :src="url" controls autoplay style="width: 750rpx;height: 100vh;"
		@ended="back"></video>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				url:''
			};
		},
		onLoad(e) {
			if(!e.url){
				uni.showToast({
					title:'非法参数',
					icon:'none'
				});
				return uni.navigateBack({
					delta: 1
				});
			}
			this.url = e.url;
			if(e.title){
				uni.setNavigationBarTitle({
					title:e.title
				});
			}
		},
		methods:{
			back(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	};
</script>

<style>
</style>
