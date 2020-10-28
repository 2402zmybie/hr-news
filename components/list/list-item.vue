<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<list-card v-for="(item,index) in list" :key="index" :item="item"></list-card>
		<uni-load-more v-if="list.length===0 ||  list.length > 9" :status="load.loading" iconType="snow"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props:{
			list: {
				type:Array,
				default() {
					return []
				}
			},
			load: {
				type:Object,
				default() {
					return {
						loading:'loading'
					}
				}
			}
		},
		methods:{
			loadmore() {
				this.$emit("loadmore")
			}
		}
	}
</script>

<style lang="scss">
.list-scroll {
	height: 100%;
}
</style>
