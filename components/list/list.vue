<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
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
				listCatchData:{},
				load: {},
				pageSize:10
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
			loadmore() {
				if(this.load[this.activeIndex].loading === 'noMore') return;
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e) {
				const {current} = e.detail
				this.$emit('change',current )
				//当数据不存在或者长度是0 才请求数据,避免滑动tab的时候一直请求
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				//初始化load, 如果load的数据不存在的话, 避免每次切换swiper的时候 数据共享的问题
				if(!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				let requireData =  {
					name:this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				};
				this.$api.get_list(requireData).then(res => {
					console.log(res);
					const {data} = res
					//判断没有更多数据了
					if(data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore',
						oldLoad.page = this.load[current].page,
						this.$set(this.load,current,oldLoad)
						this.$forceUpdate()
						return
					}
					var oldList = this.listCatchData[current] || []
					oldList.push(...data)
					
					// this.listCatchData[current] = data
					// listCatchData: {0: [] , 1: []}
					//(懒加载) 由于数组是引用类型, 数据发生变化并不能发生页面, 所以强制通知vue进行刷新
					this.$set(this.listCatchData, current,oldList)
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
