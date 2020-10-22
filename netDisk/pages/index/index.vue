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
			<template v-if="checkCount === 0">
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
			</template>
			
			<template v-else>
				<view slot='left' class="font-md ml-3 text-primary">取消</view>
				<text class="font-md font-weight-bold">已选中{{checkCount}}个</text>
				<view slot='right' class="font-md mr-3 text-primary">全选</view>
			</template>
		</nav-bar>
		<!-- 搜索框 -->
		<view class="px-3 py-2" >
			<view class="position-relative">
				<view class="flex align-center justify-center text-light-muted"
				style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;">
					<text class="iconfont icon-sousuo"></text>
				</view>
				<input type="text"
				 style="height: 70rpx;padding-left: 70rpx;"
				 class="bg-light font-md rounded-circle" 
				 placeholder="搜索网盘文件"/>
			</view>
			<!-- <uni-search-bar :radius="100" placeholder="搜索网盘文件" ></uni-search-bar> -->
			<!-- <view class="flex justify-between p-2">
				<view class="flex align-center">
					<view style="height: 70rpx;width: 70rpx;">
						<text class="iconfont icon-file-b-0 text-warning" style="font-size: 25;"></text>
					</view>
					<view class="flex flex-column ml-2">
						<text class="font-md font-weight-bold">{{ list.name }}</text>
						<text class="font-sm">{{ list.type }}</text>
					</view>
				</view>
				<view class="flex align-center">
					<text class="iconfont icon-jinru"></text>
				</view>
			</view> -->
		</view>
		<!-- 正文主体部分 -->
		<!-- <view v-for="(item,index) in list" :key="index">
		      <fList :item="item"></fList> -->
		<f-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @select="select"></f-list>	  
		
		</view>
		
	</view>
</template>

<script>
	import fList from '@/components/common/f-list.vue'
	//import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	//import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import navBar from '@/components/common/nav-bar.vue';
	export default {
		components:{
		//uniStatusBar	
		uniSearchBar,
		fList,
		// uniSwiperDot,
		navBar
		},
		data() {
			return {
				 list: [
				         {
				           type: 'dir',
				           name: '我的笔记',
				           create_time: '2020-10-21 08:00',
				           checked: false
				         },
				         {
				           type: 'image',
				           name: '风景.jpg',
				           create_time: '2020-10-21 08:00',
				           checked: false
				         },
				         {
				           type: 'video',
				           name: 'uniapp实战教程.mp4',
				           create_time: '2020-10-21 08:00',
				           checked: false
				         },
				         {
				           type: 'text',
				           name: '记事本.txt',
				           create_time: '2020-10-21 08:00',
				           checked: false
				         },
				         {
				           type: 'none',
				           name: '压缩包.rar',
				           create_time: '2020-10-21 08:00',
				           checked: false
				         }
				       ]
			};
		},
		props:{
			item:Object,
			index:0
		},
		onLoad() {
			uni.request({
				url:'http://localhost:7001/list',
				method:'GET',
				success: res => {
					this.list = res.data.data;
					console.log(res.data.data)
				}
			})
		},
		methods:{
			select(e){
				//接受子组件传递过来的索引选中状态，将对应的list中的数据更新
				this.list[e.index].checked = e.value
			}
		},
		computed:{
			//选中列表
			checkList(){
				return this.list.filter(item => item.checked);
			},
			checkCount() {
				return this.checkList.length;
			}
		}
	}
</script>

<style lang="scss">

</style>
