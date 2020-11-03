<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header-logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-header-info">
				<view class="title">{{comments.author.author_name}}</view>
				<view class="time">{{comments.create_time}}</view>
			</view>
		</view>
		<view class="comments-content">
			<view>{{comments.comment_content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			comments: {
				type:Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.comments-box {
	margin: 30upx 0;
	.comments-header {
		display: flex;
		flex-direction: row;
		.comments-header-logo {
			width: 60upx;
			height: 60upx;
			border-radius: 10upx;
			flex-shrink: 0;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.comments-header-info {
			margin-left: 30upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			color: #999;
			line-height: 1;
			.title {
				font-size: 14px;
				color: #333;
			}
		}
		
	}
	.comments-content {
		margin-top: 20upx;
		font-size: 14px;
		color: #000;
	}
}
</style>
