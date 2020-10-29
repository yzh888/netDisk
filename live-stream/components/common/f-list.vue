<template>
	<view class="flex flex-wrap">
	 <view class="list-item" v-for="(item,index) in list" :key="index" @click="openLive">
	    <image
	      :src="item.image"
	      style="width: 365rpx;height: 365rpx;"
	      class="rounded"
	      mode="aspectFill"
	    ></image>
	    <view  
	      class="rounded-circle px-2 flex align-center"
	      style="position: absolute;left: 15rpx; top: 15rpx;background-color: rgba(0,0,0,0.4);"
	    >
	      <text class="iconfont iconbizhongguanli text-warning mr-1"></text>
	      <text class="text-white font">{{item.money}}</text>
	    </view>
	    <view
	      class="rounded-circle px-2 flex align-center"
	      style="position: absolute;right: 15rpx; top: 15rpx;background-color: rgba(0,0,0,0.4);"
	    >
	      <text class="font-sm text-white">人气:</text>
	      <text class="text-white font-sm">{{ item.text }}</text>
	    </view>
	    <view
	      class="rounded-circle flex align-center"
	      style="position: absolute;left: 15rpx; bottom: 15rpx;"
	    >
		<text class="text-white font">{{item.title}}</text>
		</view>
		<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;bottom: 15rpx;background-color: rgba(0,0,0,0.4);">
			 <text style="width: 20rpx; height: 20rpx;" class="rounded-circle mr-1" ></text>
			 <!-- :style="{background-color:background-colors[index]}" -->
			<text class="text-white font-sm">{{item.static}}</text>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: [Number, String],
		},
		data() {
			return {
				colors:[
					'red','green'
				],
				list: [{
					image:'../../static/taoranran.jpg',
					text: 799,
					static: '进行中',
					title:'来来来',
					money:876
				},
				{
					image:'../../static/tabbar/hometown.jpg',
					text: 18,
					static: '已结束',
					title:'走走走',
					money:777
				},
				{
					image:'../../static/tabbar/1.jpg',
					text: 99,
					static: '已结束',
					title:'快快快',
					money:523
				},
				{
					image:'../../static/tabbar/2.jpg',
					text: 88,
					static: '已结束',
					title:'看看看',
					money:4533
				},
				{
					image:'../../static/taoranran.jpg',
					text: 799,
					static: '已结束',
					title:'看看看',
					money:876
				},
				{
					image:'../../static/taoranran.jpg',
					text: 799,
					static: '已结束',
					title:'哈哈哈',
					money:876
				},
				{
					image:'../../static/taoranran.jpg',
					text: 799,
					static: '已结束',
					title:'嘿嘿嘿',
					money:876
				},
				],
				};
		},
	  components: {},
	  onLoad() {},
	  methods: {
	    openLive() {
	      uni.navigateTo({
	        url: '../live/live'
	      });
	    },
	  }
	};
</script>

<style>
</style>
