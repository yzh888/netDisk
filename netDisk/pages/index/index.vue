<template>
	<view>
		<!-- 自定义导航栏 -->
		<nav-bar>
			<template v-if="checkCount === 0">
				<!-- 插槽再一次发挥逆天作用，进入子目录，左边将变成返回箭头，导航栏变成子目录名称 -->
				<template slot="left">
					<view
						style="width: 60rpx;height: 60rpx;"
						class="flex align-center justify-center bg-light rounded-circle ml-3"
						hover-class="bg-hover-light"
						@tap="backUp"
						v-if="current"
					>
						<text class="iconfont icon-fanhui"></text>
					</view>
					<text class="font-md ml-3">{{ current ? current.name : '首页' }}</text>
				</template>
				<template slot="right">
					<view
						style="width: 60rpx;height: 60rpx;"
						class="flex align-center justify-center bg-light rounded-circle mr-3"
						hover-class="bg-hover-light"
						@tap="openAddDialog"
					>
						<text class="iconfont icon-zengjia"></text>
					</view>
					<view
						style="width: 60rpx;height: 60rpx;"
						class="flex align-center justify-center bg-light rounded-circle mr-3"
						hover-class="bg-hover-light"
						@click="openSortDialog"
					>
						<text class="iconfont icon-gengduo"></text>
					</view>
				</template>
			</template>

			<template v-else>
				<view slot="left" class="font-md ml-3 text-primary" @click="handleCheckAll(false)">取消</view>
				<text class="font-md font-weight-bold">已选中{{ checkCount }}个</text>
				<view slot="right" class="font-md mr-3 text-primary" @click="handleCheckAll(true)">全选</view>
			</template>
		</nav-bar>

		<!-- 搜索框 -->
		<view class="px-3 py-2">
			<view class="position-relative">
				<view
					style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;"
					class="flex align-center justify-center text-light-muted"
				>
					<text class="iconfont icon-sousuo"></text>
				</view>
				<input
					style="height: 70rpx;padding-left: 70rpx;"
					type="text"
					class="bg-light font-md rounded-circle"
					placeholder="搜索网盘文件"
				/>
			</view>
		</view>

		<!-- 列表 -->
		<f-list
			v-for="(item, index) in list"
			:key="index"
			:item="item"
			@click="doEvent(item)"
			:index="index"
			@select="select"
		></f-list>

		<!-- 底部操作条 -->
		<!-- 选中个数大于0才会出现这个操作条 -->
		<view v-if="checkCount > 0">
			<!-- 这里要留一定的高度，因为底部操作条需要被固定在底部，并空出底部tabbar高度的地方 -->
			<view style="height: 115rpx;"></view>
			<!-- 操作条容器的样式，高度，颜色，固定在底部，垂直方向拉升效果 -->
			<view style="height: 115rpx;" class="flex align-stretch bg-primary text-white fixed-bottom">
				<!-- 根据元素个数等分容器，所以要么四个等分，要么两个等分，行高的修改可以让图标和文字之间的距离变得合理，点击还会变色:hover-class -->
				<view
					class="flex-1 flex flex-column align-center justify-center"
					style="line-height: 1.5;"
					v-for="(item, index) in actions"
					:key="index"
					hover-class="bg-hover-primary"
					@click="handleBottomEvent(item)"
				>
					<text class="iconfont" :class="item.icon"></text>
					{{ item.name }}
				</view>
			</view>
		</view>

		<!-- 是否要删除，通过ref指定为delete对话框 -->
		<f-dialog ref="delete">是否删除选中？</f-dialog>

		<!-- 重命名,通过ref定义不同的对话框对象，不同操作弹出的dialog是不同的对象 -->
		<f-dialog ref="rename">
			<input
				type="text"
				v-model="renameValue"
				class="flex-1 bg-light rounded px-2"
				style="height: 95rpx;"
				placeholder="重命名"
			/>
		</f-dialog>

		<!-- 新建文件夹，使用自定义弹出层，使用input作为插槽，绑定data中的newdirname变量 -->
		<f-dialog ref="newdir">
			<input
				type="text"
				v-model="newdirname"
				class="flex-1 bg-light rounded px-2"
				style="height: 95rpx;"
				placeholder="新建文件夹名称"
			/>
		</f-dialog>

		<!-- 添加操作条，应当能理解这里ref的作用了，type表示弹出的的位置类型，具体取值都在popup子组件中 -->
		<uni-popup ref="add" type="bottom">
			<view class="bg-white flex" style="height: 200rpx;">
				<!-- 遍历addList数组，纵向flex，为每个操作分配等高的空间，每个操作有图标和名称组成 -->
				<view
					class="flex-1 flex align-center justify-center flex-column"
					hover-class="bg-light"
					v-for="(item, index) in addList"
					:key="index"
					@tap="handleAddEvent(item)"
				>
					<!-- 每个操作的图标，可以传入图标的名称和颜色，很灵活 -->
					<text
						style="width: 110rpx;height: 110rpx;"
						class="rounded-circle bg-light iconfont flex align-center justify-center"
						:class="item.icon + ' ' + item.color"
					></text>
					<!-- 每个操作的名称 -->
					<text class="font text-muted">{{ item.name }}</text>
				</view>
			</view>
		</uni-popup>

		<!-- 排序框,底部弹出，遍历排序操作数组，为当前索引项绑定文字蓝色样式 -->
		<uni-popup ref="sort" type="bottom">
			<view class="bg-white">
				<view
					v-for="(item, index) in sortOptions"
					:key="index"
					class="flex align-center justify-center py-3 font border-bottom border-light-secondary"
					:class="index === sortIndex ? 'text-main' : 'text-dark'"
					hover-class="bg-light"
					@click="changeSort(index)"
				>
					{{ item.name }}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import navBar from '@/components/common/nav-bar.vue';
import fList from '@/components/common/f-list.vue';
import fDialog from '@/components/common/f-dialog.vue';
import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';

export default {
	components: {
		navBar,
		fList,
		fDialog,
		uniPopup
	},
	data() {
		return {
			dirs: [],
			sortIndex: 0,
			sortOptions: [
				{
					name: '按名称排序',
					key: 'name'
				},
				{
					name: '按时间排序',
					key: 'created_time'
				}
			],
			renameValue: '',
			newdirname: '',

			list: [],
			addList: [
				{
					icon: 'icon-file-b-6',
					color: 'text-success',
					name: '上传图片'
				},
				{
					icon: 'icon-file-b-9',
					color: 'text-primary',
					name: '上传视频'
				},
				{
					icon: 'icon-file-b-8',
					color: 'text-muted',
					name: '上传文件'
				},
				{
					icon: 'icon-file-b-2',
					color: 'text-warning',
					name: '新建文件夹'
				}
			]
		};
	},
	onLoad() {
		let dirs = uni.getStorageSync('dirs');
		if (dirs) {
			this.dirs = JSON.parse(dirs);
		}
		this.getData();
	},
	computed: {
		file_id() {
			let l = this.dirs.length;
			if (l === 0) {
				return 0;
			}
			return this.dirs[l - 1].id;
		},
		current() {
			let l = this.dirs.length;
			if (l === 0) {
				return false;
			}
			return this.dirs[l - 1];
		},
		// 选中列表
		checkList() {
			return this.list.filter(item => item.checked);
		},
		// 选中数量
		checkCount() {
			return this.checkList.length;
		},
		// 操作菜单
		actions() {
			if (this.checkCount > 1) {
				return [
					{
						icon: 'icon-xiazai',
						name: '下载'
					},
					{
						icon: 'icon-shanchu',
						name: '删除'
					}
				];
			}
			return [
				{
					icon: 'icon-xiazai',
					name: '下载'
				},
				{
					icon: 'icon-fenxiang-1',
					name: '分享'
				},
				{
					icon: 'icon-shanchu',
					name: '删除'
				},
				{
					icon: 'icon-chongmingming',
					name: '重命名'
				}
			];
		}
	},
	methods: {
		formatList(list) {
			return list.map(item => {
				let type = 'none';
				if (item.isdir === 1) {
					type = 'dir';
				} else {
					type = item.ext.split('/')[0] || 'none';
				}
				return {
					type,
					checked: false,
					...item
				};
			});
		},
		getData() {
			console.log(this.file_id + '>>>>>>>>>>>>');
			let orderby = this.sortOptions[this.sortIndex].key;
			console.log(orderby + '&&&&&&&&');
			this.$H
				.get(`/file?file_id=${this.file_id}&orderby=${orderby}`, {
					token: true
				})
				.then(res => {
					this.list = this.formatList(res.rows);
				});
		},
		// 切换排序
		changeSort(index) {
			// this.sortIndex = index;
			// this.$refs.sort.close();
			this.sortIndex = index;
			this.getData();
			this.$refs.sort.close();
		},
		// 列表点击事件处理
		doEvent(item) {
			switch (item.type) {
				case 'image': // 预览图片
					let images = this.list.filter(item => {
						return item.type === 'image';
					});
					uni.previewImage({
						current: item.url,
						urls: images.map(item => item.url)
					});
					break;
				case 'video':
					uni.navigateTo({
						url: '../video/video?url=' + item.url + '&title=' + item.name
					});
					break;
				default:
					this.dirs.push({
						id: item.id,
						name: item.name
					});
					this.getData();
					uni.setStorage({
						key: 'dirs',
						data: JSON.stringify(this.dirs)
					});
					break;
			}
		},
		select(e) {
			console.log(e.value);
			this.list[e.index].checked = e.value;
		},
		// 全选/取消全选
		handleCheckAll(checked) {
			this.list.forEach(item => {
				item.checked = checked;
			});
		},
		// 处理底部操作条事件
		handleBottomEvent(item) {
			switch (item.name) {
				case '删除': 
					this.$refs.delete.open(close => {
						//对list进行过滤，留下未被选中的
						this.list = this.list.filter(item => !item.checked);
						close();
						uni.showToast({
							title: '删除成功',
							icon: 'none'
						}); 
					});
					break;
				case '重命名':
					//重命名只能对单个文件进行，所以取this.checkList[0]，也就是选中的唯一元素
					this.renameValue = this.checkList[0].name;
					this.$refs.rename.open(close => {
						if (this.renameValue == '') {
							return uni.showToast({
								title: '文件名称不能为空',
								icon: 'none'
							});
						}
						//更新该元素的name值，实时看到效果
						this.checkList[0].name = this.renameValue;
						close();
					});
					break;
				default:
					break;
			}
		},
		// 打开添加操作条
		openAddDialog() {
			this.$refs.add.open();
		},
		openSortDialog() {
			this.$refs.sort.open();
		},
		//处理添加操作条的各种事件
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
						// 模拟请求服务器，这里先增加到list数组中
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
		},
		// 返回上一个目录
		backUp() {
			this.dirs.pop();
			this.getData();
			uni.setStorage({
				key: 'dirs',
				data: JSON.stringify(this.dirs)
			});
		}
	}
};
</script>

<style scoped></style>
