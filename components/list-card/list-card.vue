<template>
	<view @click="open">
		<!-- 基础卡片 -->
		<view v-if="item.mode === 'base'" class="listcard">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{ item.title }}
					</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content_des">
					<view class="listcard-content_desc-label">
						<view class="listcard-content_desc-label-item">
							{{ item.classify }}
						</view>
					</view>
					<view class="listcard-content_desc-browse">{{ item.browse_count }}浏览</view>
				</view>
			</view>
		</view>
		
		
		<!-- 多图卡片 -->
		<view v-if="item.mode === 'column'" class="listcard mode-column">
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{item.title}}
					</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-image">
					<view v-if="index <= 2" v-for="(item,index) in item.cover" :key="index" class="listcard-image_item">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				
				<view class="listcard-content_des">
					<view class="listcard-content_desc-label">
						<view class="listcard-content_desc-label-item">
							{{ item.classify }}
						</view>
					</view>
					<view class="listcard-content_desc-browse">{{ item.browse_count }}浏览</view>
				</view>
			</view>
		</view>
		
		
		<!-- 大图卡片 -->
		<view v-if="item.mode === 'image'" class="listcard mode-image">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{item.title}}
					</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content_des">
					<view class="listcard-content_desc-label">
						<view class="listcard-content_desc-label-item">
							{{ item.classify }}
						</view>
					</view>
					<view class="listcard-content_desc-browse">{{ item.browse_count }}浏览</view>
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
		},
		methods:{
			open() {
				console.log("条目打开详情");
			}
		}
	}
</script>

<style lang="scss" scoped>
.listcard {
	display: flex;
	padding: 20upx;
	margin: 20upx;
	border-radius: 10upx;
	box-shadow: 0 0 10upx 2upx rgba($color: #000000, $alpha: 0.1);
	box-sizing: border-box;
	.listcard-image {
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		overflow: hidden;
		flex-shrink: 0;
		image {
			width: 100%;
			height: 100%;
		}	
	}
	.listcard-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 20upx;
		width: 100%;
		.listcard-content_title {
			position: relative;
			padding-right: 60upx;
			font-size: 28upx;
			color: #333;
			font-weight: 400;
			line-height: 1.2;
			text {
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2; 
			}
			
		}
		.listcard-content_des {
			display: flex;
			justify-content: space-between;
			font-size: 24upx;
			.listcard-content_desc-label {
				display: flex;
				.listcard-content_desc-label-item {
					padding: 0 10upx;
					margin-right: 10upx;
					border-radius: 30upx;
					color: $color;
					border: 1px solid $color;
				}
			}
			.listcard-content_desc-browse {
				color: #999;
				line-height: 1.2;
			}
		}
	}
	
	// 多图模式的样式
	&.mode-column {
		.listcard-content {
			width: 100%;
			padding-left: 0;
		}
		.listcard-image {
			display: flex;
			margin-top: 20upx;
			width: 100%;
			height: 140upx;
			.listcard-image_item {
				margin-left: 20upx;
				width: 100%;
				border-radius: 10upx;
				overflow: hidden;
				&:first-child {
					margin-left: 0;
				}
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.listcard-content_des {
			margin-top: 20upx;
		}
	}
	
	// 大图模式
	&.mode-image {
		flex-direction: column;
		.listcard-image {
			width: 100%;
			height: 200upx;
		}
		.listcard-content {
			padding-left: 0;
			margin-top: 20upx;
			.listcard-content_des {
				display: flex;
				align-items: center;
				margin-top: 20upx;
			}
		}
		
	}
}
</style>
