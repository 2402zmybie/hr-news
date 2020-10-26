<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :style="{height: navBarHeight + 'px',width:windowWidth + 'px'}">
				<view class="navbar-search">
					<view class="navbar-search-icon">
						<text class="iconfont icon-iconsearch"></text>
						<!-- <uni-icons type="search" size="26px" color="#999"></uni-icons> -->
					</view>
					<view class="navbar-search-text">uni-app,vue</view>
				</view>
			</view>
		</view>
		<!-- 占位,让内容下移 -->
		<view :style="{height: statusBarHeight + navBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight:20, 
				navBarHeight: 45,
				windowWidth:375
			};
		},
		//组件加载的时候执行,  相当于页面的onLoad
		created() {
			const self = this;
			//获取状态栏高度
			const info = uni.getSystemInfo({
				success(res) {
					const { statusBarHeight,windowWidth } = res
					self.statusBarHeight = statusBarHeight
					self.windowWidth = windowWidth
					console.log(`状态栏高度: ${self.statusBarHeight}px`)
				}
			})
			
			//在app, h5, 阿里小程序不运行
			// #ifndef APP-PLUS || H5 || MP-ALIPAY
			//获取胶囊的信息
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log(menuButtonInfo);
			//动态获取导航栏的高度
			//(胶囊底部高度-状态栏高度) + (胶囊顶部高度 - 状态栏高度)
			let navBarHeight = (menuButtonInfo.bottom - self.statusBarHeight)
				+ (menuButtonInfo.top - self.statusBarHeight)
			self.navBarHeight = navBarHeight	
			self.windowWidth = menuButtonInfo.left
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
.navbar {
	.navbar-fixed {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		background-color: $color;
		.navbar-content {
			height: 45px;
			padding: 0 15px;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			.navbar-search {
				height: 30px;
				background-color: #FFFFFF;
				width: 100%;
				display: flex;
				align-items: center;
				border-radius: 30px;
				padding: 0 10px;
				.navbar-search-icon {
					margin-right: 10px;
				}
				.navbar-search-text {
					font-size: 12px;
					color: #999;
				}
				
			}
		}
	}
}
</style>
