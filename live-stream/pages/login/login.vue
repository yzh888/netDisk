<template>
  <view class="container bg-white">
    <view class="flex align-center justify-center" style="height: 350rpx;">
      <text style="font-size: 50rpx;" class="text-dark">{{ type === 'login' ? '账号密码登录' : '手机验证码登录' }}</text>
    </view>
    <view class="px-3">
      <view v-if=" type === 'login'">
        <view  class="flex border-bottom align-end pb-1">
			<text style="line-height: 80rpx;" class="mr-2">+86</text>
          <input
            type="text"
            v-model="form.username"
            class="px-3 font rounded"
            placeholder="手机号"
            style="height: 80rpx;width: 600rpx;"
            placeholder-style=" color: #bababa;"
          />
        </view>
		</view>
        <view v-else>
		<view  class="flex border-bottom align-end pb-1">
          <input
            type="text"
            v-model="form.username"
            class="px-3 font rounded"
            placeholder="昵称/手机号/邮箱"
            style="height: 80rpx;width: 600rpx;"
            placeholder-style=" color: #bababa;"
          />
        </view>
		</view>
      <view class="flex border-bottom mt-4 align-center align-end pb-1">
        <view v-if=" type === 'login'" style="width: 500rpx;">
          <input
            type="text"
            v-model="form.code"
            class="px-3 font rounded "
            placeholder="请输入验证码"
            style="height: 80rpx; width: 500rpx;"
            placeholder-style=" color: #bababa;"
          />
        </view>
        <view  v-else style="width: 500rpx;">
          <input
            type="text"
            v-model="form.password"
            class="px-3 font rounded "
            placeholder="请输入密码"
            style="height: 80rpx; width: 500rpx;"
            placeholder-style=" color: #bababa;"
          />
        </view>
        <view v-if=" type === 'login'">
          <button :disabled="message >0 && message < 60"
			style=" height: 80rpx; line-height: 80rpx; background-color: #8431f9; color: #FFFFFF" 
			:class="{btnColor:!(message > 0 && message<=60)}"
			class="font-sm rounded" @click="getCode()">
			  {{message}}</button>
        </view>
        <view v-else class="bg-main">
          <view style="width: 200rpx; height: 80rpx; line-height: 80rpx; color: #bababa;" class="font-sm bg-white">
			  忘记密码?</view>
        </view>
      </view>
    </view>
    <view class="p-3 flex align-center justify-center" @click="submit">
      <view class="rounded p-3 flex align-center justify-center flex-1" style="border-radius: 60rpx; background-color: #7725f3;">
        <text class="text-white font-md">登录</text>
      </view>
    </view>
    <view class="flex align-center justify-center ">
      <text class="font p-2 text-main" @click="changeType">
        {{ type === 'login' ? '验证码登陆' : '账号密码登录' }}
      </text>
	  <text class="font p-2 ">
	  	| 
	  </text>
	  <text class="font p-2 text-main">
		登录遇到问题
	  </text>
    </view>
    <view class="flex align-center justify-center mt-5"><text class="font font-smaller text-light-black">———社交账号登录———</text></view>
    <view class="flex align-center justify-between mt-3" style="margin-left: 100rpx;margin-right: 100rpx;">
      <image class="mt-3" style="width: 100rpx;height: 100rpx;" src="../../static/weixin.png" mode="" @click="weixin"></image>
      <image class="mt-3" style="width: 100rpx;height: 100rpx;" src="../../static/QQ.png"></image>
      <image class="mt-3" style="width: 100rpx;height: 100rpx;" src="../../static/weibo.png" mode=""></image>
    </view>
    <view class="flex align-center justify-center mt-5">
      <text class=" font p-2">
        注册即代表您同意
		<text class=" font p-2 text-main">
		  《社区直播协议》
		</text>
      </text>
	  
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isPhoneLogin: true,
      type: 'login',
      form: {
        username: '',
        password: '',
        repassword: '',
		code:'',
		phone:''
      },
	  message:"获取验证码"
    };
  },
  methods: {
	  getCode() {
	  			this.$H.post('/sendcode', {"phone": this.form.username}).then(res => {
	  				this.message = 60;
	  				var that = this
	                  //这是我的定时器
	  				var result = setInterval(function() {
	  					that.message = that.message - 1;
	  					if(that.message == 0) {
	  						that.message = '获取验证码';
	  						clearInterval(result)
	  					}
	  				}, 1000);
	  			})	
	  		},
    changeType() {
      this.isPhoneLogin = !this.isPhoneLogin
      this.type = this.type === 'login' ? 'msg' : 'login'
    },
    submit() {
      let msg = this.type === 'login' ? '登录' : '注册'
	  this.type = this.isPhoneLogin ? 'phoneLogin' :'login';
	  if(this.type == 'phoneLogin') {
		  this.form.username = '老颜'
	  }
      console.log(this.type)
      this.$H.post('/' + this.type, this.form).then(res => {
        console.log("进入内部" + res)
        uni.showToast({
          title: msg + "成功",
          icon: 'none'
        });
        if(this.type === 'reg') {
          this.changeType()
          this.form = {
            username: '',
            passowrd: '',
            repassword: ''
          }
        } else {
          this.$store.dispatch('login', res)
          uni.navigateBack({
            delta: 1
          })
          // uni.navigateTo({
          //   url: '../index/index.vue'
          // })
        }
      })
    },
	weixin() {
				var that = this
				//判断手机是否安装微信
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						//进行微信授权
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								//获取微信信息
								uni.getUserInfo({
									provider: 'weixin',
									success: function(info) {
										var user = info.userInfo;
										var param = {"avatar": user.avatarUrl, "openId": user.openId};
										that.$H.post('/wxLogin', param).then(res => {
											
											uni.showToast({
												title: "登录成功",
												icon: 'none'
											});
											that.$store.dispatch('login', res)
											uni.navigateBack({
												delta: 2
											})
										});
										
									}
								})
							}
						})
					}
				})
			},
  }
};
</script>

<style>
  .container{
    width: 750rpx;
    height: 100vh;
    margin: 0;
    padding: 100rpx 0 0 0;
    background-size: cover;
    /* background-image: linear-gradient(to bottom,#BA7ACE 0%,#8745FF 100%); */
  }
</style>