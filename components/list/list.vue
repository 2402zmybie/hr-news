<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="listCatchData[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props: {
			tab: {
				type:Array,
				default() {
					return []
				}
			},
			activeIndex: {
				type:Number,
				default:0
			}
		},
		components: {
			listItem
		},
		data() {
			return {
				list:[],
				//缓存数据
				listCatchData:{}
			};
		},
		watch:{
			tab(newValue,oldValue) {
				// debugger
				if(newValue.length === 0) return;
				this.getList(this.activeIndex)
			}
		},
		mounted() {
			
		},
		methods:{
			change(e) {
				const {current} = e.detail
				this.$emit('change',current )
				this.getList(current)
			},
			getList(current) {
				this.$api.get_list({
					name:this.tab[current].name
				}).then(res => {
					const {data} = res
					console.log("请求: " + current);
					// this.listCatchData[current] = data
					// listCatchData: {0: [] , 1: []}
					// 由于数组是引用类型, 数据发生变化并不能发生页面, 所以强制通知vue进行刷新
					this.$set(this.listCatchData, current,data)
				})
			}
		}
	}
</script>

<style lang="scss">
.home-swiper {
	height: 100%;
	.swiper-item {
		height: 100%;
		overflow: hidden;
	}
}
</style>
