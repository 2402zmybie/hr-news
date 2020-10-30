<template>
	<view class="home">
		<navbar v-model="value" :isSearch="true" @input="change"></navbar>
		<view class="home-list">
			<!-- 搜索历史 -->
			<view v-if="is_history" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyLists.length > 0" class="label-content">
					<view class="label-content-item" v-for="(item,index) in historyLists" :key="index" @click="openHistory(item)">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<!-- 搜索结果 -->
			<view v-else>
				<list-scroll class="list-scroll">
					<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
					<view v-if="searchList.length > 0">
						<list-card v-for="(item,index) in searchList" :key="index" :item="item" @click="setHistory"></list-card>
					</view>
					<view v-if="searchList.length === 0 && !loading" class="no-data">
						没有搜索到相关数据
					</view>
				</list-scroll>
			</view>
			
			<!-- 测试vuex -->
			<!-- <button type="default" @click="testBtn">测试vuex</button> -->
			
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				//false显示搜索结果, true显示搜索记录方块
				is_history: true,
				searchList:[],
				value:'',
				loading:false
			};
		},
		computed:{
			...mapState(['historyLists']) 
		},
		methods:{
			openHistory(item) {
				this.value = item.name
				this.getSearch(this.value)
			},
			setHistory(item) {
				this.$store.dispatch('set_history', {
					name: this.value
				})
			},
			clear() {
				this.$store.dispatch('clearHistory')
				uni.showToast({
					title: '清空完成'
				});
			},
			change(value) {
				if(!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				//做标记  避免输入一次请求一次
				if(!this.mark) {
					//false
					this.mark = true;
					this.timer = setTimeout(() => {
						//触发搜索
						this.getSearch(value)
						this.mark = false
					},1000)
				}
			
			},
			// testBtn() {
			// 	this.$store.dispatch('set_history', {
			// 		name: 'LiMing'
			// 	})
			// },
			getSearch(value) {
				if(!value) {
					this.searchList = []
					this.is_history = true
					return
				}
				this.is_history = false
				this.loading = true
				//初始化load, 如果load的数据不存在的话, 避免每次切换swiper的时候 数据共享的问题
				let requireData =  {
					value
				};
				this.$api.get_search(requireData).then(res => {
					this.loading = false
					console.log(res);
					const {data} = res
					this.searchList = data
				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
	display: flex;
	background-color: #f5f5f5;
}
.home {
	display: flex;
	flex-direction: column;
	flex: 1;
	.label-box {
		background-color: #FFFFFF;
		margin-bottom: 20upx;
		.label-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			color: #666;
			padding: 20upx 30upx;
			border-bottom: 1px solid #f5f5f5;
			.label-title {
				color: $color;
			}
			.label-clear{
				color: #30b33a;
				font-weight: bold;
			}
		}
		.label-content {
			display: flex;
			flex-direction: row;
			// 	flex-wrap: wrap;超出一行换行
			flex-wrap: wrap;
			padding: 30upx;
			padding-top: 0;
			.label-content-item {
				padding: 4upx 20upx;
				margin-top: 24upx;
				margin-right: 20upx;
				border-radius: 10upx;
				border: 1px solid #666;
				font-size: 14px;
				color: #666;
				flex-shrink: 0;
			}
		}
		
	}
	
.no-data {
	height: 400upx;
	line-height: 400upx;
	width: 100%;
	text-align: center;
	color: #666;
	font-size: 24upx;
	}
}
</style>
