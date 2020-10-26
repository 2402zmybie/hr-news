<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x>
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" v-for="(item,index) in list" :key="index">
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					name: 'uni-app'
				},{
					name: 'vue'
				},{
					name: 'react'
				},{
					name: '前端'
				},{
					name: '后端'
				},{
					name: 'uni-app'
				},{
					name: 'vue'
				},{
					name: 'react'
				},{
					name: '前端'
				},{
					name: '后端'
				},]
			};
		}
	}
</script>

<style lang="scss">
.tab {
	display: flex;
	width: 100%;
	background: #FFFFFF;
	border-bottom: 1px #f5f5f5 solid;
	box-sizing: border-box;
	.tab-scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.tab-scroll-box {
			display: flex;
			height: 45px;
			align-items: center;
			flex-wrap: nowrap;
			.tab-scroll-item {
				flex-shrink: 0;
				padding: 0 10px;
				color: #333;
				font-size: 14px;
			}
		}
	}
	.tab-icons {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90upx;
		//实现左边的竖线
		&::after{
			content: '';
			position: absolute;
			top: 12px;
			bottom: 12px;
			left: 0;
			width: 1px;
			background-color: #ddd;
		}
	}
}
</style>
