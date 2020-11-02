<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header-logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{formData.author.avatar_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<view class="content-html">
				{{formData.content}}
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-input">
				<text>谈谈您的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icons-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.formData = JSON.parse(options.params)
			this.getDetail()
		},
		data() {
			return {
				formData:{}
			};
		},
		methods:{
			//获取详情信息
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					const {data} = res
					this.formData = data
				})
			}
		}
	}
</script>

<style lang="scss">
.detail {
	padding: 30upx 0;
	//54px
	padding-bottom: 108upx;
	.detail-title {
		padding: 0 30upx;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 20upx;
		padding: 0 30upx;
		.detail-header-logo {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			overflow: hidden;
			flex-shrink: 0;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.detail-header-content {
			width: 100%;
			font-size: 12px;
			padding-left: 20upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			.detail-header-content-title {
				font-size: 14px;
				color: #333;
			}
			.detail-header-content-info {
				color: #999;
				text{
					margin-right: 20upx;
				}
			}
		}
	}
	.detail-content {
		margin-top: 40upx;
		.content-html {
			padding: 0 30upx;
			
		}
	}
	
	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 88upx;
		border-top: 1px solid #f5f5f5;
		background-color: #FFFFFF;
		box-sizing: border-box;
		.detail-bottom-input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 20upx;
			padding: 0 20upx;
			width: 100%;
			height: 60upx;
			border: 1px solid #ddd;
			border-radius: 10upx;
			text{
				font-size: 14px;
				color: #999;
			}
		}
		.detail-bottom-icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 20upx;
			.detail-bottom-icons-box {
				width: 88upx;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>
