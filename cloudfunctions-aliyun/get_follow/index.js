'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id
	} = event
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	const lists = await db.collection('article')
	//声明聚合
	.aggregate()
	//addFields 添加字段, 判断 _id是否在 user表的article_likes_ids数组中
	.addFields({
		is_like: $.in(['$_id', userinfo.article_likes_ids])
	})
	//不返回 content的字段
	.project({
		content: false
	})
	//删选is_like为true的数据
	.match({
		is_like: true
	})
	.end()
	
	
	//返回数据给客户端
	return {
		code:200,
		msg:'更新成功',
		data: lists.data
	}
};
