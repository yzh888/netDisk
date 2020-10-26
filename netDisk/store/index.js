import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import $H from '../common/request.js';
export default new Vuex.Store({
	state: {
		user: null,
		token: null,
		uploadList: [],
		downlist: [],
	},
	actions: {
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')

			uni.reLaunch({
				url: '/pages/login/login'
			});
		},
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		initUser({
			state
		}) {
			let user = uni.getStorageSync('user')
			if (user) {
				state.user = JSON.parse(user)
				state.token = state.user.token
			}
		},
		updateSize({
			state
		}, e) {
			state.user.total_size = e.total_size
			state.user.used_size = e.used_size
		},
		initList({
			state
		}) {
			if (state.user) {
				let d = uni.getStorageSync("downlist_" + state.user.id)
				let u = uni.getStorageSync("uploadList_" + state.user.id)

				state.downlist = d ? JSON.parse(d) : []
				state.uploadList = u ? JSON.parse(u) : []
			}
		},
		createUploadJob({
			state
		}, obj) {
			state.uploadList.unshift(obj)
			uni.setStorage({
				key: "uploadList_" + state.user.id,
				data: JSON.stringify(state.uploadList)
			})
		},
		updateUploadJob({
			state
		}, obj) {
			let i = state.uploadList.findIndex(item => item.key === obj.key)
			if (i !== -1) {
				state.uploadList[i].progress = obj.progress
				state.uploadList[i].status = obj.status
				uni.setStorage({
					key: "uploadList_" + state.user.id,
					data: JSON.stringify(state.uploadList)
				})
			}
		},
		createDownLoadJob({
			state
		}, obj) {
			state.downlist.unshift(obj)
			uni.setStorage({
				key: "downlist_" + state.user.id,
				data: JSON.stringify(state.downlist)
			})
		},
		updateDownLoadJob({
			state
		}, obj) {
			let i = state.downlist.findIndex(item => item.key === obj.key)
			if (i !== -1) {
				state.downlist[i].progress = obj.progress
				state.downlist[i].status = obj.status
				uni.setStorage({
					key: "downlist_" + state.user.id,
					data: JSON.stringify(state.downlist)
				})
			}
		}
	}
})
