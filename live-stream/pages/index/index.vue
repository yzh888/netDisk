<template>
  <view>
	  <view>
	  	<image src="../../static/tabbar/hometown.jpg" class="img"
		style="width: 750rpx;height: 300rpx;"></image>
	  </view>
	  <!-- 轮播图 -->
    <!-- <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="200"
      style="width: 750rpx;height: 250rpx;"
    >
      <swiper-item>
        <image src="../../static/tabbar/1.jpg" style="width: 750rpx; height: 250rpx;"></image>
      </swiper-item>
      <swiper-item>
        <image src="../../static/tabbar/2.jpg" style="width: 750rpx; height: 250rpx;"></image>
      </swiper-item>
    </swiper> -->
	
	<!-- 列表 -->
    <view class="flex flex-wrap">
      <view class="list-item" v-for="i in 10" :key="i" @click="openLive">
        <image
          src="../../static/tabbar/hometown.jpg"
          style="width: 365rpx;height: 365rpx;"
          class="rounded"
          mode="aspectFill"
        ></image>
        <view
          class="rounded-circle px-2 flex align-center"
          style="position: absolute;left: 15rpx; top: 15rpx;background-color: rgba(0,0,0,0.4);"
        >
          <text class="iconfont iconbizhongguanli text-warning mr-1"></text>
          <text class="text-white font">0</text>
        </view>
        <view
          class="rounded-circle px-2 flex align-center"
          style="position: absolute;right: 15rpx; top: 15rpx;background-color: rgba(0,0,0,0.4);"
        >
          <text class="font-sm text-white">人气:</text>
          <text class="text-white font-sm">0</text>
        </view>
        <view
          class="rounded-circle flex align-center"
          style="position: absolute;left: 15rpx; bottom: 15rpx;"
        >
		<text class="text-white font">标题</text>
		</view>
		<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;bottom: 15rpx;background-color: rgba(0,0,0,0.4);">
			 <text style="width: 20rpx; height: 20rpx;" class="rounded-circle bg-danger mr-1"></text>
			<text class="text-white font-sm">已结束</text>
		</view>
         
        </view>
      </view>
    
    <!-- <tab></tab> -->
  </view>
</template>

<script>
export default {
  components: {},
  onLoad() {},
  methods: {
    openLive() {
      uni.navigateTo({
        url: '../live/live'
      });
    }
  }
};
</script>

<style>
.list-item {
  width: 375rpx;
  height: 375rpx;
  padding: 5rpx;
  box-sizing: border-box;
  position: relative;
}
.img {
	
}
</style>