'use strict';

//获取数据库的引用
const db = uniCloud.database()
//聚合操作符
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//接收分类, 通过分类删选数据
	const {
		user_id,
		value,
	} = event
	

	
	//获取用户
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids

	const list = await db.collection('article')
			.aggregate()
			//追加字段
			.addFields({
				is_like: $.in(['$_id',article_likes_ids])
			})
			.project({
				content: false
			})
			//按照title字段筛选
			.match({
				title: new RegExp(value)
			})
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
