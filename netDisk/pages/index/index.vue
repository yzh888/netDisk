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
				<view slot='left' class="font-md ml-3 text-primary" @click="handleCheckAll(false)">取消</view>
				<text class="font-md font-weight-bold">已选中{{checkCount}}个</text>
				<view slot='right' class="font-md mr-3 text-primary" @click="handleCheckAll(true)">全选</view>
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
		</view>
		
		<!-- 正文主体部分 -->
		<!-- <view v-for="(item,index) in list" :key="index">
		      <fList :item="item"></fList> -->
		<f-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @select="select"></f-list>	  
		
		<!-- 底部操作条 -->
		<view v-if="checkCount > 0">
			<view class="flex align-stretch bg-primary text-white fixed-bottom">
				<view class="flex-1 flex flex-column align-center justify-center"
				style="line-height: 1.6;"
				v-for="(item,index) in actions"
				:key="index"
				hover-class="bg-hover-primary"
				@click="handleBottomEvent(item)"
				>
				<text class="iconfont" :class="item.icon"></text>
				{{ item.name }}
				</view>
			</view>
		</view>	
		
		<!-- 是否删除 -->
		<f-dialog ref="delete">是否删除选中的文件?</f-dialog>
		<f-dialog ref="rename">
			<input 
			type="text"
			v-model="renameValue"
			class="flex-1 bg-light rounded px-2"
			style="height: 95rpx;"
			placeholder="重命名"
			/>
		</f-dialog>
		</view>
		
	</view>
</template>

<script>
	import fDialog from '@/components/common/f-dialog.vue'
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
		fDialog,
		// uniSwiperDot,
		navBar
		},
		data() {
			return {
				 renameValue: '',
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
			},
			handleCheckAll(checked){
				this.list.forEach(item => {
					item.checked = checked;
				});
			},
			//处理底部操作条事件，这里仅对“删除”
			handleBottomEvent(item){
				switch(item.name){
					case '删除':
					this.$refs.delete.open(close => {
						//对list过滤，留下未选中的
						this.list = this.list.filter(item => !item.checked);
						close();
						uni.showToast({
							title: '删除成功',
							icon: 'none'
						});
					});
					break;
					
					case '重命名':
					//重命名只能对单个文件，所以this.checkList[0],也就是唯一元素
						this.renameValue = this.checkList[0].name;
						this.$refs.rename.open(close => {
							if(this.renameValue == ''){
								return uni.showToast({
									title: '文件名称不能为空',
									icon: 'none'
								});
							}
							//更新该元素的name值,实时看到效果
							this.checkList[0].name = this.renameValue;
							close();
						});
						break;
					default:
					break;
				}
			}
		},
		computed:{
			//选中列表
			checkList(){
				return this.list.filter(item => item.checked);
			},
			checkCount() {
				return this.checkList.length;
			},
			//操作菜单
			actions(){
				if(this.checkCount > 1){
					return[{
						icon:"icon-xiazai",
						name:"下载"
					},{
						icon:"icon-shanchu",
						name:"删除"
					}]
				}
				return[{
					icon:"icon-xiazai",
					name:"下载"
				},{
					icon:"icon-fenxiang-1",
					name:"分享"
				},{
					icon:"icon-shanchu",
					name:"删除"
				},{
					icon:"icon-chongmingming",
					name:"重命名"
				}]
			}
		}
	}
</script>

<style lang="scss">

</style>
