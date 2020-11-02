import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import $H from '../common/request.js';
export default new Vuex.Store({
	state: {
		user:null,
		token:null
	},
	actions: {
		initUser({
			state
		}) {
			let u = uni.getStorageSync("user")
			let t = uni.getStorageSync('token')
			if(u) {
				state.user = JSON.parse(u)
				state.token = t
			}
		},
		login({ state }, user) {
			state.user = user
			state.token = user.token
			
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res
				uni.setStorage({
					key: "user",
					data: JSON.stringify(state.user)
				})
			})
		},
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true,
				toast: false
			})
			state.user = null
			state.token = user.token
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		}
	}
})