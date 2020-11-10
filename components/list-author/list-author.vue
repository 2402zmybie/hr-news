<template>
	<view>
		<view class="list-author">
			<view class="list-author-image">
				<image :src="item.avatar" mode="aspectFill"></image>
			</view>
			<view class="list-author-content">
				<view class="list-author-content-title">{{item.author_name}}</view>
				<view class="list-author-content-des">
					<view class="list-author-content-des-label">{{item.professional}}</view>
					<view class="list-author-content-des-info">
						<text>发帖 {{item.article_ids.length}}</text>
						<text>粉丝 {{item.fans_count}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item: {
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
.list-author {
	display: flex;
	padding: 20upx 0;
	margin: 0 20upx;
	border-radius: 10upx;
	box-sizing: border-box;
	border-bottom: 2upx solid #f5f5f5;
	.list-author-image {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.list-author-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 20upx;
		width: 100%;
		.list-author-content-title {
			position: relative;
			padding-right: 60upx;
			font-size: 14px;
			color: #333;
			font-weight: bold;
			line-height: 1.2;
		}
		.list-author-content-des {
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			.list-author-content-des-label {
				color: #666;
			}
			.list-author-content-des-info {
				color: #999;
				text:first-child{
					margin-right: 20upx;
				}
			}
		}
	}
	
}
</style>
