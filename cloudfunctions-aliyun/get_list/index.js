'use strict';

//获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	//接收分类, 通过分类删选数据
	const {
		name,
		page = 1,
		pageSize = 10
	} = event
	
	let matchObj = {}
	if(name != '全部') {
		matchObj = {classify: name}
	}
	
	//聚合查询: 更精细化的去处理数据(求和, 分组,指定哪些字段)
	const list = await db.collection('article')
			.aggregate()
			.match(matchObj)
			.project({
				content: false
			})
			//要跳过多少数据
			.skip(pageSize * (page - 1))
			.limit(pageSize)
			.end()
	
	//普通查询, 只是对某个字段的改变
	// const list = await db.collection('article')
	// .field({
	// 	//true表示只返回这个字段, false表示不返回
	// 	content:false
	// })				
	// .get()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data: list.data
	};
};
