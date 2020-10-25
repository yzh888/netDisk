import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import $H from '../common/request.js';

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
		openid: null,
		testvuex:false,
        colorIndex: 0,
        colorList: ['#FF0000','#00FF00','#0000FF'],
		user: null,
		token: null,
	},
	// mutations: {
	// 	login(state, provider) {
	// 		state.hasLogin = true;
	// 		state.loginProvider = provider;
	// 	},
	// 	logout(state) {
	// 		state.hasLogin = false
	// 		state.openid = null
	// 	},
	// 	setOpenid(state, openid) {
	// 		state.openid = openid
	// 	},
	// 	setTestTrue(state){
	// 		state.testvuex = true
	// 	},
	// 	setTestFalse(state){
	// 		state.testvuex = false
	// 	},
 //        setColorIndex(state,index){
 //            state.colorIndex = index
 //        }
	// },
 //    getters:{
 //        currentColor(state){
 //            return state.colorList[state.colorIndex]
 //        }
 //    },
	actions: {
		login({ state },user){
			state.user = user
			state.token = user.token
			
			uni.setStorageSync('user',JSON.stringify(user))
			uni.setStorageSync('token',user.token)
		},
		logout({state}){
			$H.post('/logout',{},{
				token:true
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
				
			uni.reLaunch({
				url:'/pages/login/login'
			});
		},
		initUser({state}){
			let user = uni.getStorageSync('user')
			if(user){
				state.user = JSON.parse(user)
				state.token = state.user.token
			}
		},
		updateSize({state},e){
			state.user.total_size = e.total_size
			state.user.used_size = e.used_size
		},
		// lazy loading openid
		// getUserOpenId: async function ({
		// 	commit,
		// 	state
		// }) {
		// 	return await new Promise((resolve, reject) => {
		// 		if (state.openid) {
		// 			resolve(state.openid)
		// 		} else {
		// 			uni.login({
		// 				success: (data) => {
		// 					commit('login')
		// 					setTimeout(function () { //模拟异步请求服务器获取 openid
		// 						const openid = '123456789'
		// 						console.log('uni.request mock openid[' + openid + ']');
		// 						commit('setOpenid', openid)
		// 						resolve(openid)
		// 					}, 1000)
		// 				},
		// 				fail: (err) => {
		// 					console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
		// 					reject(err)
		// 				}
		// 			})
		// 		}
		// 	})
		// }
	}
})

export default store
