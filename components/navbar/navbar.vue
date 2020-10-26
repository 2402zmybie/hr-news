<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view class="navbar-search">
				<view class="navbar-search-icon"></view>
				<view class="navbar-search-text">uni-app,vue</view>
			</view>
		</view>
		<view style="height: 45px;"></view>
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

<style lang="scss" scoped>
.navbar {
	.navbar-fixed {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 45px;
		background-color: $color;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 15px;
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
				width: 10px;
				height: 10px;
				border: 1px red solid;
				margin-right: 10px;
			}
			.navbar-search-text {
				font-size: 12px;
				color: #999;
			}
			
		}
	}
}
</style>
