<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit">编辑</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="item in 10">
					{{item}}标签
					<uni-icons class="icons-close" type="clear" size="16" color="red"></uni-icons>
				</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="item in 10">{{item}}标签</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.label {
	.label-box {
		background-color: #fff;
		margin-bottom: 20upx;
		.label-header {
			padding: 20upx 30upx;
			border-bottom: 2upx solid #f5f5f5;
			display: flex;
			justify-content: space-between;
			font-size: 28upx;
			color: #666;
			.label-edit {
				color: #30b33a;
				font-weight: bold;
			}
		}
		.label-content {
			display: flex;
			flex-wrap: wrap;
			padding: 30upx;
			padding-top: 0;
			.label-content_item {
				position: relative;
				padding: 4upx 10upx;
				margin-top: 24upx;
				margin-right: 20upx;
				border-radius: 10upx;
				border: 2upx solid #666;
				font-size: 28upx;
				color: #666;
				.icons-close {
					position: absolute;
					right: -16upx;
					top: -16upx;
					background-color: #fff;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
