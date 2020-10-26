import Vue from 'vue'
import App from './App'

//引入封装挂在vue原型上，各个实例可以通过$appName方式应用
//这样做不会污染全局作用域
import $H from './common/request.js';
Vue.prototype.$H = $H

//引入Vuex并挂载在Vue原型上
import store from './store/index.js';
Vue.prototype.$store = store

Vue.config.productionTip = false

Vue.prototype.authMethod = (callback) => {
	if (!store.state.token) {
		uni.showToast({
			title: '登录成功',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login',
		});
	}

	callback()
}
 
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
