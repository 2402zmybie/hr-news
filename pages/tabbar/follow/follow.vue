<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active: activeIndex === 0}" @click="tab(0)">文章</view>
				<view class="follow-tab-item" :class="{active: activeIndex === 1}" @click="tab(1)">作者</view>
			</view>
		</view> 
		<view class="follow-list">
			<swiper class="follow-list-swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<list-scroll style="height: 100%;">
						<uni-load-more v-if="list.length === 0 && !articleShow" status="loading" iconType="snow"></uni-load-more>
						<list-card v-for="item in list" :key="item._id" :item="item" types="follow"></list-card>
						<view class="no-data" v-if="articleShow">没有数据</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll></list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list:[],
				articleShow:false
			};
		},
		onLoad() {
			//监听收藏或者取消收藏的自定义事件
			uni.$on('update_article', ()=> {
				console.log('关注页面收到');
				this.getFollow()
			})
			this.getFollow()
		},
		methods:{
			tab(index) {
				this.activeIndex = index
			},
			getFollow() {
				this.$api.get_follow()
					.then(res => {
						console.log(res);
						const {data} = res
						this.list = data
						this.articleShow = this.list.length === 0  ? true:false
					})
			},
			change(e) {
				const current = e.detail.current;
				this.activeIndex = current
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
	
	.follow-list {
		flex: 1;
		.follow-list-swiper {
			height: 100%;
			
		}
	}
	
	.no-data {
		padding: 100upx ;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
}
</style>
