<template>
		<view style="height: 100vh;" class="flex flex-column">
			<view class="flex border-bottom border-light-secondary" style="height: 100rpx;">
				<view
					class="flex-1 flex flex-column align-center justify-center "
					v-for="(item,index) in tabBars"
					:key="index"
					:class="index === tabIndex ? 'text-main' : '' "
					@click="changeTab(index)"
				>
				<text class="font-md">{{item.name}}</text>
				<text
					style="height: 8rpx;width: 140rpx;"
					class="rounded"
					:class="tabIndex === index ? 'bg-main':'bg-white' "
				></text>	
				</view>
			</view>
			<!-- swiper内容随着上面的tab切换联动 -->
			<swiper :duration="250" class="flex-1 flex" :current="tabIndex"
			@change="changeTab($event.detail.current)">
			<swiper-item class="flex-1 flex" v-for="(item,index) in tabBars" :key="index">
				<scroll-view scroll-y="true" class="flex-1">
					<view class="bg-light flex align-center font-sm px-2 text-muted"
					style="height: 60rpx;">
					文件下载至：storage/xxxx/xxxx</view>
					<view class="p-2 border-bottom border-light-secondary font text-muted">
						下载中{{ downing.length}}
					</view>
					<!-- 改变key值 -->
					<f-list v-for="(item,index) in downing" :key="'i' + index" :item="item"
					:index="index">
					<view class="flex align-center text-main" style="height: 70rpx;">
						<text class="iconfont icon-zanting"></text>
						<text class="ml-1">{{item.download}}%</text>
					</view>
					<!-- 进度条时间，percent属性绑定下载百分比 -->
					<progress slot="bottom" :percent="item.download" activeColor="#6c9ef4"
					:stroke-width="4"></progress>
					</f-list>
					
					<view class="p-2 border-bottom border-light-secondary font text-muted">
						下载完成({{ downed.length}})
					</view>
					<f-list
					v-for="(item,index) in downed"
					:key="'d' + index"
					:item="item"
					:index="index"
					:showRight= "false"
					>
					</f-list>
					
				</scroll-view>
			</swiper-item>
			</swiper>
		</view>
</template>
<script>
	import fList from '@/components/common/f-list.vue'
	export default {
		data() {
			return {
				tabIndex:0,
				tabBars:[
					{
						name:'下载列表'
					},
					{
						name:'上传列表'
					}
				],
				list: [
					{
						type: 'image',
						name: '风景.jpg',
						data: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3311552614,3643030730&fm=26&gp=0.jpg',
						create_time: '2019-13-14 00:00',
						download: 100
					},
					{
						type: 'image',
						name: '壁纸.jpg',
						data: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3311552614,3643030730&fm=26&gp=0.jpg',
						create_time: '2019-13-14 00:00',
						download: 60
					},
					{
						type: 'text',
						name: '记事本.txt',
						data: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3311552614,3643030730&fm=26&gp=0.jpg',
						create_time: '2019-13-14 00:00',
						download: 50
					},
					{
						type: 'video',
						name: 'uniapp实战教程.mp4',
						data: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3311552614,3643030730&fm=26&gp=0.jpg',
						create_time: '2019-13-14 00:00',
						download: 100
					}
					
				]
			}
		},
		onLoad() {

		},
		methods: {
			changeTab(index){
				this.tabIndex = index;
			}
		},
		components:{
			fList
		},
		computed: {
			downing(){
				return this.list.filter(item => {
					return item.download < 100;
				});
			},
			downed() {
				return this.list.filter(item => {
					return item.download === 100;
				});
			}
		},
	}
</script>

<style>
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
