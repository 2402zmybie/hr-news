<template>
	<view class="home">
		<navbar></navbar>
		<tab :list = "tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[],
				tabIndex:0,
				activeIndex:0
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
			tab({data,index}) {
				console.log(data, index);
				this.activeIndex = index;
			},
			change(current) {
				console.log("当前swiper的位置: " + current);
				this.tabIndex = current
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
	.home-list {
		flex: 1;
		box-sizing: border-box;
	}
}
</style>
