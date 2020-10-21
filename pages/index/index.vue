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
		<!-- 自定义导航栏 -->
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
		
		<view class="uni-badge-purple" style="height: 1000px;" >
			<!-- 设置圆角 -->
			<uni-search-bar :radius="100" placeholder="搜索网盘文件" ></uni-search-bar>
			
		</view>
	</view>
</template>

<script>
	//import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	//import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import navBar from '@/components/common/nav-bar.vue';
	export default {
		components:{
		//uniStatusBar	
		uniSearchBar,
		// uniSwiperDot,
		navBar
		},
		data() {
			return {
				 info: [{
				                content: 'banner3.jpg'
				            }, {
				                content: '123'
				            }, {
				                content: '内容 C'
				            }],
				            current: 0,
				            mode: 'round',
			};
		},
		onLoad() {
			
		},
		methods:{
			change(e) {
			            this.current = e.detail.current;
			        }
		}
	}
</script>

<style lang="scss">

</style>
