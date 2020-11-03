<template>
  <view>
	  <view class="top flex align-center justify-center">
	  	<input type="text" 
		style="width: 600rpx;height: 70rpx;background-color: rgba(0,0,0,0.2);margin-top:80rpx;"
		class="rounded-circle mx-1 pl-5" 
		placeholder="搜索直播间" />
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
   <!-- <view class="flex flex-wrap">
      <view class="list-item" v-for="i in 10" :key="i" @click="openLive">
        <image
          src="../../static/taoranran.jpg"
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
    </view> -->
    
	<!-- 列表 -->
	<!-- <f-list></f-list> -->
	<view class="flex flex-wrap">
		<view class="list-item" v-for="(item, index) in list" :key="index">
			<f-card :item="item" :index="index" @click="openLive(item.id)"></f-card>
		</view>
	</view>
	
	<view class="f-divider"></view>
	<view class="flex align-center justify-center py-3">
		<text class="font-md text-secondary">{{ loadText }}</text>
	</view>
    <!-- <tab></tab> -->
  </view>
</template>

<script>
import fList from '@/components/common/f-list.vue';
import fCard from '@/components/common/f-card.vue';
export default {
  components: {
	  fList,
	  fCard
  },
  data() {
  	return {
  		list: [],
		page:1,
		loadText:'上拉加载更多'
		};
  },
  onLoad() {
	  this.getData();
  },
  onPullDownRefresh(){
	this.page = 1;
	this.getData()
	.then(res => {
		uni.showToast({
			title:'刷新成功',
			icon:'none'
		});
		uni.stopPullDownRefresh();
	})
	.catch(err => {
		uni.stopPullDownRefresh();
	});
  },
  onReachBottom() {
  	if(this.loadText !== '上拉加载更多'){
		return;
	}
	this.loadText = '加载中...';
	this.page++;
	this.getData();
  },
  methods: {
	getData(){
		let page = this.page;
		return this.$H
			.get('/live/list/' + page)
			.then(res =>{
				(this.list = page === 1 ? res:[...this.list,...res]),
				(this.loadText = res.length<10?'没有更多了':'上拉加载更多');
			})
			.catch(err => {
				if(this.page >1){
					this.page--;
					this.loadText = '上拉加载更多';
				}
			});
	},
    openLive() {
      uni.navigateTo({
        url: '../live/live'
      });
    },
  }
};
</script>

<style>
.top {
	width: 750rpx;
	height: 260rpx;
	background-image: url(../../static/taoranran.jpg);
	background-size: cover;
	background-image: linear-gradient(to right,#ba7ace 0%,#8745ff 100%);
}
.list-item {
  width: 375rpx;
  height: 375rpx;
  padding: 5rpx;
  box-sizing: border-box;
  position: relative;
}

</style>