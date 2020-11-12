<template>
	<view>
		<view class="feedback-title">意见反馈: </view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" value="" placeholder="请输入您要反馈的问题" />
		</view>
		<view class="feedback-title">反馈图片</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imageLists" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imageLists.length < 5" class="feedback-image-item" @click="addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageLists:[]
			};
		},
		methods:{
			del(index) {
				this.imageLists.splice(index,1)
			},
			addImage() {
				let count = 5 - this.imageLists.length
				uni.chooseImage({
					count,
					success:(res) => {
						const {tempFilePaths} = res
						tempFilePaths.forEach((item,index) => {
							this.imageLists.push({
								url: item
							})
						})
					}
				})
			},
			async submit() {
				let imagesPath = []
				uni.showLoading()
				//同步方法上传图片, 上传图片每次只能上传一张图片
				for(let i = 0; i < this.imageLists.length; i++) {
					let filePath = this.imageLists[i].url
					filePath = await this.uploadFiles(filePath)
					imagesPath.push(filePath)
				}
				uni.hideLoading()
				console.log(imagesPath);
			},
			
			async uploadFiles(filePath) {
				let cloudPathStr = filePath.substring(filePath.lastIndexOf('/')  + 1) + '.png'
				const result = await uniCloud.uploadFile({
					filePath: filePath,
					cloudPath: cloudPathStr
				})
				//fileID 为线上的地址
				return result.fileID
			}
		}
	}
</script>

<style lang="scss">
.feedback-title {
	font-size: 14px;
	margin: 30upx;
	margin-bottom: 0;
	color: #666;
}

.feedback-content {
	margin: 30upx;
	padding: 20upx;
	box-sizing: border-box;
	border: 1px solid #eee;
	textarea {
		font-size: 12px;
		width: 100%;
		height: 200upx;
	}
}
.feedback-image-box {
	display: flex;
	flex-wrap: wrap;
	padding: 20upx;
	.feedback-image-item {
		position: relative;
		width: 33.33%;
		height: 0;
		padding-top: 33.33%;
		box-sizing: border-box;
		.close-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			top: 0;
			width: 44upx;
			height: 44upx;
			border-radius: 50%;
			background-color: #ff5a5f;
			z-index: 2;
		}
		.image-box {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 10upx;
			right: 10upx;
			bottom: 10upx;
			left: 10upx;
			border-radius: 10upx;
			border: 1px solid #eee;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
}

.feedback-button {
		margin: 0 30upx;
		background-color: $color;
}
</style>
