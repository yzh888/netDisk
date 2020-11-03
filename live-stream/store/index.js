import Vue from 'vue'
import Vuex from 'vuex'

import $H from '../common/request.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    token:null
  },
  actions: {
    authMethod({
      state
    },callback){
      if(!state.token){
        uni.showToast({
          title:'请先登录',
          icon:'none'
        });
        return uni.navigateTo({
          url:'/pages/login/login'
        });
      }
    },
    login({
      state
    }, user) {
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
          data: bJSON.stringify(state.user)
        })
      })
    },
    initUser({
      state
    }) {
      let u = uni.getStorageSync('user')
      let t = uni.getStorageSync('token')
      if (u) {
        state.user = JSON.parse(u)
        state.token = t
      }
    },
    logout({
      state
    }) {
      $H.post('/logout', {}, {
        token: true,
        toast: false
      })
      state.user = null
      state.token = null
      uni.removeStorageSync('user')
      uni.removeStorageSync('token')
    }
  }
})