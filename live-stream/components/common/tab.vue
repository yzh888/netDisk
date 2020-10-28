<template>
	<view class="flex bg-dark fixed-bottom content-around align-stretch text-light bg-hover-light" style="height: 70px;">
		<navigator open-type="switchTab" url="/pages/index/index" style="width: 250rpx;" class="flex align-center justify-center bg-dark">
			发现
		</navigator>
		<view class="flex align-center justify-center bg-danger" style="width: 250rpx;">
			<image src="../../static/tabbar/min.png" style="width: 60px;height: 60px;"></image>
		</view>
		<navigator open-type="switchTab" url="/pages/my/my" style="width: 250rpx;" class="flex align-center justify-center bg-primary">
			我的
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		}
	}
</script>

<style>
</style>
