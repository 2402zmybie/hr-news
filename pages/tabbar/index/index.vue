<template>
	<view class="home">
		<navbar></navbar>
		<tab :list = "tabList" @tab="tab"></tab>
		
		<list-scroll>
			<list-card mode="base"></list-card>
			<list-card mode="image"></list-card>
			<list-card mode="column"></list-card>
		</list-scroll>
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
page {
	height: 100%;
	display: flex;
}
.home {
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
}
</style>
