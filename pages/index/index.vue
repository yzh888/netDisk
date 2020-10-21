<template>
	<view>
		<!-- <view>
		<uni-status-bar></uni-status-bar>
		<view class="flex border-bottom align-center" style="height: 44px;">
			<view class="flex-1 flex">
			<text class="font-md ml-3">首页</text>
		</view>
		<view class="flex-1 flex justify-center">
		</view>
		<view class="flex-1 flex justify-end">
			<view style="width: 60rpx;height: 60rpx;" 
			class="flex align-center justify-center bg-light rounded-circle mr-3">
				<text class="iconfont icon-zengjia"></text>
			</view>
			<view style="width: 60rpx;height: 60rpx;"
			class="flex align-center justify-center bg-light rounded-circle mr-3">
				<text class="iconfont icon-gengduo"></text>
			</view>
		</view>
		</view>
		</view> -->
		<nav-bar>
			<text slot="left" class="ml-3 font-md text-white font-weight-bold">首页</text>
			<template slot="right">
				<view style="width: 60rpx;height: 60rpx;"
				class="flex align-center justify-center bg-light rounded-circle mr-3">
				<text class="iconfont icon-zengjia"></text>
				</view>
				<view class="flex align-center justify-center bg-light rounded-circle mr-3"
				style="width: 60rpx;height: 60rpx;">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</template>
		</nav-bar>
		<view class="uni-badge-purple" style="height: 1000px;">
			123
		</view>
	</view>
</template>

<script>
	//import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import navBar from '@/components/common/nav-bar.vue';
	export default {
		components:{
		//uniStatusBar	
		navBar
		},
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">

</style>
