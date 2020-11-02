<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{ is_edit? '完成' :'编辑'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow" ></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content_item" v-for="(item,index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons v-if="is_edit" class="icons-close" type="clear" size="16" color="red" @click="del(index)"></uni-icons>
				</view>
				<view class="no-data" v-if="labelList.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow" ></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content_item" v-for="(item,index) in list" :key="item._id" @click="add(index)">{{item.name}}</view>
				<view class="no-data" v-if="list.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit:false,
				labelList:[],
				list:[],
				loading: true
			};
		},
		onLoad() {
			this.getLabel()
		},
		methods:{
			setUpdateLabel(label) {
				uni.showLoading();
				this.$api.update_label({
					label
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title:"更新成功",
						icon:"none"
					})
				})
			},
			editLabel() {
				if(this.is_edit) {
					//点击完成
					this.is_edit = false
					let newArrIds = []
					this.labelList.forEach(item => newArrIds.push(item._id))
					this.setUpdateLabel(newArrIds)
				}else {
					//点击编辑
					this.is_edit = true
				}
			},
			getLabel() {
				this.loading = true
				this.$api.get_label({
					type: 'all'
				}).then((res) => {
					this.loading = false
					const {data} = res
					this.labelList = data.filter(item => item.current)
					this.list = data.filter(item => !item.current)
				})
			},
			del(index) {
				this.list.push(this.labelList[index])
				this.labelList.splice(index,1)
			},
			add(index) {
				if(!this.is_edit) return;
				this.labelList.push(this.list[index])
				this.list.splice(index,1)
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.label {
	.label-box {
		background-color: #fff;
		margin-bottom: 20upx;
		.label-header {
			padding: 20upx 30upx;
			border-bottom: 2upx solid #f5f5f5;
			display: flex;
			justify-content: space-between;
			font-size: 28upx;
			color: #666;
			.label-edit {
				color: #30b33a;
				font-weight: bold;
			}
		}
		.label-content {
			display: flex;
			flex-wrap: wrap;
			padding: 30upx;
			padding-top: 0;
			.label-content_item {
				position: relative;
				padding: 4upx 10upx;
				margin-top: 24upx;
				margin-right: 20upx;
				border-radius: 10upx;
				border: 2upx solid #666;
				font-size: 28upx;
				color: #666;
				.icons-close {
					position: absolute;
					right: -16upx;
					top: -16upx;
					background-color: #fff;
					border-radius: 50%;
				}
			}
		}
	}
	
	.no-data {
		text-align: center;
		padding: 100upx 0;
		color: #999;
		font-size: 14px;
		width: 100%;
	}
}
</style>
