<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active: activeIndex === 0}" @click="tab(0)">文章</view>
				<view class="follow-tab-item" :class="{active: activeIndex === 1}" @click="tab(1)">作者</view>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0
			};
		},
		methods:{
			tab(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
	display: flex;
}
.follow {
	height: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
	box-sizing: border-box;
	.follow-tab {
		height: 60upx;
		padding: 20upx 40upx;
		border-bottom: 1px solid #F5F5F5;
		.follow-tab-box {
			width: 100%;
			height: 100%;
			display: flex;
			border-radius: 10upx;
			border: 1px solid $color;
			.follow-tab-item {
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
				color: #666;
				font-size: 14px;
				&:first-child {
					border-right: 1px solid $color;
				}
				&.active {
					color: $color;
				}
			}
		}
	}
}
</style>
