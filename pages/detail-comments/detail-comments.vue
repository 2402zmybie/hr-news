<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 7" iconType="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id:'',
				commentsList:[],
				page:1,
				pageSize:7,
				loading: 'loading'
			};
		},
		onLoad(options) {
			const {id} = options
			this.article_id = id
			this.getComments()
			
		},
		onReachBottom() {
			console.log("onReachBottom:" + this.loading);
			// if(this.loading = 'noMore'){
			// 	return
			// }
			this.page++;
			this.getComments()
		},
		methods:{
			//请求评论内容
			getComments() {
				let request = {
					article_id: this.article_id,
					page: this.page,
					pageSize:this.pageSize
				}
				console.log(request);
				this.$api.get_comments(request).then(res => {
					const {data} = res;
					console.log("res:" + this.loading);
					if(data.length === 0) {
						this.loading = 'noMore'
						return
					}
					console.log(data);
					this.commentsList = [...this.commentsList, ...data]
					console.log("新请求长度" + data.length);
					console.log("总长度" + this.commentsList.length);
					
				})
			},
		}
	}
</script>

<style lang="scss">
.comments-content {
	height: 100%;
	padding: 0 30upx;
}
</style>
