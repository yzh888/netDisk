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
					<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3"
					 @tap="openAddDialog">
						<text class="iconfont icon-zengjia"></text>
					</view>

					<view 
						class="flex align-center justify-center bg-light rounded-circle mr-3" 
						style="width: 60rpx;height: 60rpx;"
						@click="openSortDialog"
					>
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
		<view class="px-3 py-2">
			<view class="position-relative">
				<view class="flex align-center justify-center text-light-muted" style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;">
					<text class="iconfont icon-sousuo"></text>
				</view>
				<input type="text" style="height: 70rpx;padding-left: 70rpx;" class="bg-light font-md rounded-circle" placeholder="搜索网盘文件" />
			</view>
			<!-- <uni-search-bar :radius="100" placeholder="搜索网盘文件" ></uni-search-bar> -->
		</view>

		<!-- 正文主体部分 -->
		<!-- <view v-for="(item,index) in list" :key="index">
		      <fList :item="item"></fList> -->
		<f-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @click="doEvent(item)" @select="select">
		</f-list>

		<!-- 底部操作条 -->
		<view v-if="checkCount > 0">
			<view class="flex align-stretch bg-primary text-white fixed-bottom">
				<view class="flex-1 flex flex-column align-center justify-center" style="line-height: 1.6;" v-for="(item,index) in actions"
				 :key="index" hover-class="bg-hover-primary" @click="handleBottomEvent(item)">
					<text class="iconfont" :class="item.icon"></text>
					{{ item.name }}
				</view>
			</view>
		</view>

		<!-- 是否删除 -->
		<f-dialog ref="delete">是否删除选中的文件?</f-dialog>
		<f-dialog ref="rename">
			<input type="text" v-model="renameValue" class="flex-1 bg-light rounded px-2" style="height: 95rpx;" placeholder="重命名" />
		</f-dialog>

		<!-- 新建文件夹，使用自定义弹出层，input插槽，绑定data中newdirname变量 -->
		<f-dialog ref="newdir">
			<input type="text" v-model="newdirname" class="flex-1 bg-light rounded px-2" style="height: 95rpx;" placeholder="新建文件夹名称" />
		</f-dialog>

		<!-- 添加操作条，应当能理解这里ref的作用了，type表示弹出的位置类型，具体取值都在popup子组件中 -->
		<uni-popup ref="add" type="bottom">
			<view class="bg-white flex" style="height: 200rpx;">
				<!-- 遍历addlist数组，纵向flex,为每个操作分配等高空间，每个操作有名称和图标 -->
				<view class="flex-1 flex align-center justify-center flex-column" hover-class="bg-light" v-for="(item,index) in addList"
				 :key="index" @tap="handleAddEvent(item)">
					<!-- 每个操作的图标，可以传入图标名称和颜色，灵活 -->
					<text class="rounded-circle bg-light iconfont flex align-center justify-center" style="width: 110rpx;height: 110rpx;"
					 :class="item.icon + ' ' + item.color">
					</text>
					<!-- 每个操作的名称 -->
					<text class="font text-muted">{{ item.name }}</text>
				</view>
			</view>
		</uni-popup>
		<!-- 排序框，底部弹出，遍历排序操作数组，为当前索引绑定文字蓝色样式 -->
		<uni-popup ref="sort" type="bottom">
			<view class="bg-white">
				<view class="flex align-center justify-center py-3 font border-bottom border-light-secondary" v-for="(item,index) in sortOptions"
				 :key="index" :class="index === sortIndex ? 'text-main' : 'text-dark'" hover-class="bg-light" @click="changeSort(index)">
					{{ item.name }}
				</view>
			</view>
		</uni-popup>
	</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	import fDialog from '@/components/common/f-dialog.vue';
	import fList from '@/components/common/f-list.vue';
	//import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	//import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import navBar from '@/components/common/nav-bar.vue';

	export default {
		components: {
			//uniStatusBar	
			uniSearchBar,
			fList,
			fDialog,
			uniPopup,
			navBar
		},
		data() {
			return {
				renameValue: '',
				newdirname: '',
				sortIndex: 0,
				sortOptions: [{
						name: '按名称排序'
					},
					{
						name: '按时间排序'
					}
				],
				list: [{
						type: 'dir',
						name: '我的笔记',
						create_time: '2020-10-21 08:00',
						checked: false
					},
					{
						type: 'image',
						name: '风景.jpg',
						create_time: '2020-10-21 08:00',
						data: 'https://pic-go-test.oss-cn-hangzhou.aliyuncs.com/img/53.jpeg',
						checked: false,
						download: 100
					},
					{
						type: 'image',
						name: '壁纸.jpg',
						create_time: '2020-10-21 08:00',
						data: 'https://pic-go-test.oss-cn-hangzhou.aliyuncs.com/img/53.jpeg',
						checked: false,
						download: 50
					},
					{
						type: 'video',
						name: 'uniapp实战教程.mp4',
						create_time: '2020-10-21 08:00',
						data: 'https://student-manage-ll.oss-cn-beijing.aliyuncs.com/%E4%BD%9C%E4%B8%9A%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91/wenwen.mp4',
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
				],
				addList: [{
					icon: "icon-file-b-6",
					color: "text-success",
					name: "上传图片"
				}, {
					icon: "icon-file-b-9",
					color: "text-primary",
					name: "上传视频"
				}, {
					icon: "icon-file-b-8",
					color: "text-muted",
					name: "上传文件"
				}, {
					icon: "icon-file-b-2",
					color: "text-warning",
					name: "新建文件夹",
				}]
			};
		},
		props: {
			item: Object,
			index: 0
		},
		onLoad() {
			uni.request({
				url: 'http://localhost:7001/list',
				method: 'GET',
				success: res => {
					this.list = res.data.data;
					console.log(res.data.data)
				}
			})
		},
		methods: {
			openSortDialog() {
				this.$refs.sort.open();
			},
			// 切换排序
			changeSort(index) {
				this.sortIndex = index;
				this.$refs.sort.close();
			},
			// 列表点击事件处理
			doEvent(item) {
				switch (item.type) {
					case 'image':
						let images = this.list.filter(item => {
							return item.type === 'image';
						});
						uni.previewImage({
							current: item.data,
							urls: images.map(item => item.data)
						});
						break;
					case 'video':
						console.log('f')
						uni.navigateTo({
							url: '../video/video?url=' + item.data + '&title=' + item.name
						});
						break;
					default:
						break;
				}
			},
			select(e) {
				//接受子组件传递过来的索引选中状态，将对应的list中的数据更新
				this.list[e.index].checked = e.value
			},
			handleCheckAll(checked) {
				this.list.forEach(item => {
					item.checked = checked;
				});
			},
			//处理底部操作条事件，这里仅对“删除”
			handleBottomEvent(item) {
				switch (item.name) {
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
							if (this.renameValue == '') {
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
			},
			openAddDialog() {
				this.$refs.add.open();
			},
			//处理添加操作的各种事件
			handleAddEvent(item) {
				this.$refs.add.close();
				switch (item.name) {
					case '新建文件夹':
						this.$refs.newdir.open(close => {
							if (this.newdirname == '') {
								return uni.showToast({
									title: '文件夹名称不能为空',
									icon: 'none'
								});
							}
							//模拟请求服务器这里先增加到list数组
							this.list.push({
								type: 'dir',
								name: this.newdirname,
								create_time: '2020-10-22 17:00',
								checked: false
							});
							uni.showToast({
								title: '新建文件夹成功',
								icon: 'none'
							});
							close();
						});
						break;
					default:
						break;
				}
			}
		},
		computed: {
			//选中列表
			checkList() {
				return this.list.filter(item => item.checked);
			},
			checkCount() {
				return this.checkList.length;
			},
			//操作菜单
			actions() {
				if (this.checkCount > 1) {
					return [{
						icon: "icon-xiazai",
						name: "下载"
					}, {
						icon: "icon-shanchu",
						name: "删除"
					}]
				}
				return [{
					icon: "icon-xiazai",
					name: "下载"
				}, {
					icon: "icon-fenxiang-1",
					name: "分享"
				}, {
					icon: "icon-shanchu",
					name: "删除"
				}, {
					icon: "icon-chongmingming",
					name: "重命名"
				}]
			}
		}
	}
</script>

<style lang="scss">

</style>
