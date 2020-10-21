<template>
	<view class="uni-flex">
		
		<view class="box">
			<text class="title">{{title}}</text>
		</view>
		<view class="box1">
			<text class="title ">{{title}}</text>
			<text class="iconfont icon-iconfonticon-baobia"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.box {
		width: 300rpx;
		height: 80rpx;
		background-color: #3F536E;
		color: #FFFFFF;
	}
	.box1 {
		width: 300rpx;
		height: 120rpx;
		background-color: #3F536E;
		color: #FFFFFF;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
