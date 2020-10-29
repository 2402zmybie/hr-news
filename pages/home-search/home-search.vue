<template>
	<view class="home">
		<navbar :isSearch="true" @input="change"></navbar>
		<view class="home-list">
			<view class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear">清空</text>
				</view>
				<view v-if="historyList.length > 0" class="label-content">
					<view class="label-content-item" v-for="item in historyList">
						{{item}}内容
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList:[]
			};
		},
		methods:{
			change(value) {
				console.log(value);
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
		.no-data {
			height: 400upx;
			line-height: 400upx;
			width: 100%;
			text-align: center;
			color: #666;
			font-size: 24upx;
		}
	}
}
</style>
