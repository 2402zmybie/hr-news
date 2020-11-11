<template>
	<view>
		<view class="my-header">
			<view class="my-header-background">
				<image :src="userinfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header-logo">
				<view class="my-header-logo-box">
					<image :src="userinfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="my-header-name">
					{{userinfo.author_name}}
				</text>
			</view>
			<view class="my-header-info">
				<view class="my-heaer-info-box">
					<text class="my-header-info-title">被关注</text>
					<text>{{userinfo.follow_count}}</text>
				</view>
				<view class="my-heaer-info-box">
					<text class="my-header-info-title">粉丝</text>
					<text>{{userinfo.fans_count}}</text>
				</view>
				<view class="my-heaer-info-box">
					<text class="my-header-info-title">积分</text>
					<text>{{userinfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<view class="my-content">
			<view class="my-content-list" @click="openMyArticle">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content-list">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['userinfo'])
		},
		onLoad() {
			// console.log(this.userinfo);
		},
		methods: {
			openMyArticle() {
				uni.navigateTo({
					url: '/pages/my-article/my-article'
				});
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #F5F5F5;
}
.my-header {
	position: relative;
	padding-bottom: 30upx;
	//让背景图全部撑开, 并且有模糊效果
	.my-header-background {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		filter: blur(8px);
		opacity: 0.3;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.my-header-logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 60upx;
		.my-header-logo-box {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.my-header-name {
			margin-top: 30upx;
			font-size: 16px;
			font-weight: bold;
		}
	}
	.my-header-info {
		margin-top: 30upx;
		display: flex;
		.my-heaer-info-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 12px;
			width: 100%;
			color: #999;
			.my-header-info-title {
				font-size: 14px;
				color: #333;
			}
		}
	}
}

.my-content {
	.my-content-list {
		display: flex;
		justify-content: space-between;
		padding: 30upx;
		margin-top: 20upx;
		background-color: #FFFFFF;
		color: #333;
		font-size: 14px;
		.my-content-list-title {
			display: flex;
			align-items: center;
			.icons {
				margin-right: 10upx;
			}
		}
	}
}
</style>
