<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x>
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" :class="{active: index === activeIndex}" v-for="(item,index) in list" :key="item._id" @click="clickTab(item,index)">
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
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			tabIndex: {
				type:Number,
				default:0
			}
		},
		//可以监听 data props里面值的变化
		watch:{
			tabIndex(newValue,oldValue) {
				// console.log(newValue + "----------" + oldValue);
				this.activeIndex = newValue
			}
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		methods:{
			clickTab(item,index) {
				this.activeIndex = index
				this.$emit('tab', {
					data:item,
					index:index
				})
			}
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
				&.active {
					color: $color;
				}
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
