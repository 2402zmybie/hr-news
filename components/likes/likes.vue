<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons :type="like? 'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>
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
			},
			types: {
				type:String,
				default() {
					return ''
				}
			}
		},
		mounted() {
			this.like = this.item.is_like
		},
		data() {
			return {
				like:false
			};
		},
		methods:{
			likeTap() {
				this.like = !this.like
				this.setUpdateLikes()
			},
			setUpdateLikes() {
				uni.showLoading();
				this.$api.update_likes({
					article_id: this.item._id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: this.like? '收藏成功':'取消收藏',
						icon:'none'
					});
					//当点赞或者取消点赞的时候  发送事件
					uni.$emit('update_article', this.types)
				}).catch(()=> {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40upx;
		height: 40upx;
	}
</style>
