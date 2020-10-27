<template>
	<view class="content">
		<navbar></navbar>
		<tab :list = "tabList" @tab="tab"></tab>
		<!-- <view v-for="item in 100">
			{{item}}内容
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[]
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				this.$api.get_label({
				}).then((res) => {
					const {data} = res
					this.tabList = data
				})
			},
			tab(data,index) {
				console.log(data, index);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
