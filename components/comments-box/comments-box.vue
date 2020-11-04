<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header-logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-header-info">
				<view v-if="!comments.is_reply" class="title">{{comments.author.author_name}}</view>
				<view v-else class="title">{{comments.author.author_name}} <text class="reply-text">回复</text>{{comments.to}}</view>
				<view class="time">{{comments.create_time}}</view>
			</view>
		</view>
		<view class="comments-content">
			<view>{{comments.comment_content}}</view>
			<view class="comments-info">
				<view class="comments-button" @click="commentReply({comments:comments, is_reply:reply})">回复</view>
			</view>
			<view class="comments-reply" v-for="(item,index) in comments.replys" :key="item.comment_id">
				<comments-box :reply="true" :comments="item" @reply="commentReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	//组件嵌套自己, 递归组件
	import commentsBox from '@/components/comments-box/comments-box.vue'
	export default {
		name:"comments-box",
		components:{
			commentsBox
		},
		props:{
			comments: {
				type:Object,
				default() {
					return {}
				}
			},
			reply: {
				type:Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			commentReply(comment) {
				//为了区分是主回复还是子回复
				if(comment.is_reply) {
					//子回复
					comment.comments.reply_id = comment.comments.comment_id
					comment.comments.comment_id = this.comments.comment_id
				}
				// console.log(comment);
				this.$emit('reply',comment)
			}
		}
	}
</script>

<style lang="scss">
.comments-box {
	margin: 30upx 0;
	.comments-header {
		display: flex;
		flex-direction: row;
		.comments-header-logo {
			width: 60upx;
			height: 60upx;
			border-radius: 10upx;
			flex-shrink: 0;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.comments-header-info {
			margin-left: 30upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			color: #999;
			line-height: 1;
			.title {
				font-size: 14px;
				color: #333;
				.reply-text {
					margin: 0 20upx;
					font-weight: bold;
					color: #000;
				}
			}
		}
		
	}
	.comments-content {
		margin-top: 20upx;
		font-size: 14px;
		color: #000;
		.comments-info {
			margin-top: 30upx;
			display: flex;
			.comments-button {
				padding: 4upx 20upx;
				font-size: 12px;
				color: #999;
				border-radius: 20px;
				border: 1px solid #ccc;
			}
		}
		.comments-reply {
			display: flex;
			margin: 30upx 0;
			padding: 0 20upx;
			border: 1px solid #eee;
		}
	}
}
</style>
