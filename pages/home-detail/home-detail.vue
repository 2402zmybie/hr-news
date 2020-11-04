<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header-logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{formData.author.avatar_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<view class="content-html">
				
				<!-- <u-parse :content="formData.content" :noData="noData"></u-parse> -->
				内容
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-input" @click="openComment">
				<text>谈谈您的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icons-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup type="bottom" ref="popup" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header-item" @click="close">取消</text>
					<text class="popup-header-item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" placeholder="请输入评论内容" maxlength="200" fixed="true"></textarea>
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '../../components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		onLoad(options) {
			this.formData = JSON.parse(options.params)
			this.getDetail()
			this.getComments()
		},
		onReady() {
			//只有自定义组件有ref的属性, 找到组件并调用open方法
		},
		data() {
			return {
				formData:{},
				noData:'<p style="text-align:center;color:#666">详情加载中<p>',
				commentsValue:'',
				commentsList:[],
				replyFormData:{}
			};
		},
		methods:{
			reply(e) {
				this.replyFormData = {
					"comment_id":e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				console.log(this.replyFormData);
	
				this.openComment()
			},
			submit() {
				if(!this.commentsValue) {
					uni.showToast({
						title: '请输入评论内容',
						icon:'none'
					});
					return
				}
				this.setUpdateComment({content: this.commentsValue, ...this.replyFormData})
			},
			setUpdateComment(content) {
				uni.showLoading()
				const formdata = {
					article_id: this.formData._id,
					...content
				}
				
				this.$api.update_comment(formdata).then(res => {
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title: '发布成功'
					});
					this.getComments()
					this.close()
					this.replyFormData = {}
				})
			},
			//打开评论发布窗口
			openComment() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			//获取详情信息
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					const {data} = res
					this.formData = data
				})
			},
			//请求评论内容
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res => {
					const {data} = res;
					console.log(data);
					this.commentsList = data
				})
			}
		}
	}
</script>

<style lang="scss">
.detail {
	padding: 30upx 0;
	//54px
	padding-bottom: 108upx;
	.detail-title {
		padding: 0 30upx;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 20upx;
		padding: 0 30upx;
		.detail-header-logo {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			overflow: hidden;
			flex-shrink: 0;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.detail-header-content {
			width: 100%;
			font-size: 12px;
			padding-left: 20upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			.detail-header-content-title {
				font-size: 14px;
				color: #333;
			}
			.detail-header-content-info {
				color: #999;
				text{
					margin-right: 20upx;
				}
			}
		}
	}
	.detail-content {
		margin-top: 40upx;
		.content-html {
			padding: 0 30upx;
		}
		.detail-comment {
			margin-top: 60upx;
			.comment-title {
				padding: 20upx 30upx;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #F5F5F5;
			}
			.comment-content{
				padding: 0 30upx;
				border-top: 1px solid #eee;
			}
		}
	}
	
	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 88upx;
		border-top: 1px solid #f5f5f5;
		background-color: #FFFFFF;
		box-sizing: border-box;
		.detail-bottom-input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 20upx;
			padding: 0 20upx;
			width: 100%;
			height: 60upx;
			border: 1px solid #ddd;
			border-radius: 10upx;
			text{
				font-size: 14px;
				color: #999;
			}
		}
		.detail-bottom-icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 20upx;
			.detail-bottom-icons-box {
				width: 88upx;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	
	.popup-wrap{
		background-color: #FFFFFF;
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #F5F5F5 solid;
			.popup-header-item {
				height: 100upx;
				line-height: 100upx;
				padding: 0 30upx;
			}
		}
		.popup-content {
			width: 100%;
			padding: 30upx;
			box-sizing: border-box;
			.popup-textarea {
				width: 100%;
				height: 400upx;
			}
			.popup-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
}
</style>
