<template>
  <view class="border-top border-light-secondary p-3">
    <view class="rounded py-4 flex flex-column align-center justify-center bg-main">
      <text class="text-white font-sm mb-2">当前金币</text>
      <text class="font-weight-bold text-white" style="font-size: 60rpx;">50</text>
    </view>
    <view class="border-top border-light-secondary my-3">
	</view>
    <view>
		<text class="font-sm text-muted">请选择充值金币</text>
	</view>
    <view class="flex flex-wrap" style="margin-left: -20rpx; margin-right: -20rpx;">
      <view class="p-2" style="width: 33.3%;box-sizing: border-box;" v-for="(item,index) in list" :key="index" @click="chooseCoin(index)">
        <view v-if="item.price>0" class="border rounded flex flex-column align-center justify-center" style="height: 130rpx;" :class="activeIndex ===index ?'border-main':''">
          <view class="flex align-center">
            <text class="iconfont text-warning mr-1">&#xe633;</text>
            <text class="font-md font-weight-bold">{{item.coin}}</text>
          </view>
          <text class="font text-light-muted">￥{{item.price}}</text>
        </view>
        <view v-else style="height: 130rpx;" class="border rounded flex flex-column align-center justify-center">
          <text class="font text-light-muted">自定义</text>
        </view>
      </view>
    </view>
    <view class="position-fixed left-0 bottom-0 right-0 border-top flex px-3 align-center" style="height: 100rpx;">
      <view class="flex align-center">
        <text class="iconfont text-warning mr-1">&#xe633;</text>
        <text class="font-md font-weight-bold">{{price}}</text>
      </view>
      <view class="bg-main rounded flex align-center justify-center ml-auto" style="width: 150rpx; height: 70rpx;">
        <text class="text-white font-md">去充值</text>
      </view>
    </view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode = "input" message="自定义充值" :duration="2000" placeholder="充值金额" inputType="number" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
import uniPopupDialog from '@/components/uni-ui/uni-popup/uni-popup-dialog.vue';
export default {
  components: {
    uniPopup,
    uniPopupDialog
  },
  data() {
    return {
      activeIndex: 0,
      list: [
        {
          coin: 10,
          price: 10
        },
        {
          coin: 20,
          price: 20
        },
        {
          coin: 30,
          price: 30
        },
        {
          coin: 50,
          price: 50
        },
        {
          coin: 100,
          price: 100
        },
        {
          price: 0
        }
      ],
      price: 0
    };
  },
  onLoad() {
    let p = this.list[this.activeIndex].price;
    if (p > 0) {
      this.price = p;
    }
  },
  methods: {
    chooseCoin(index) {
      this.activeIndex = index;
      let p = this.list[index].price;
      if (p > 0) {
        this.price = p;
      } else {
        this.$refs.popup.open();
      }
    },
    close(done) {
      done();
    },
    confirm(done, value) {
      console.log(value);
      if (!value) {
        return uni.showToast({
          title: '请输入要充值的金额',
          icon: 'none'
        });
      }
      this.price = value;
      done();
    }
  }
};
</script>

<style></style>