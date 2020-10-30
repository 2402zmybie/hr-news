//vuex 状态管理

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state:{
		//由于state不是持久化的,  使用同步Storage 完成持久化操作
		historyLists: uni.getStorageSync("__history") || []
	},
	mutations:{
		SET_HISTORY_LISTS(state,history) {
			state.historyLists = history
		},
		CLEAR_HISTORY(state) {
			state.historyLists = []
		}
	},
	actions:{
		set_history({commit,state},history) {
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync("__history", list)
			commit('SET_HISTORY_LISTS',list)
		},
		clearHistory({commit}) {
			uni.removeStorage({
				key:"__history"
			})
			commit('CLEAR_HISTORY')
		}
	}
})

export default store