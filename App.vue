<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.get_user({
				user_id:"5f962d36cf447a0001579ed0"
			}).then(res => {
				const {data} = res
				this.$store.dispatch('set_userinfo',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/css/icons.css';
	/* 引入富文本组件需要的样式 */
	@import './components/gaoyia-parse/parse.css';
</style>
