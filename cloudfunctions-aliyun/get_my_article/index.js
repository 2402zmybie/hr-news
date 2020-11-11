'use strict';

const db = uniCloud.database()
//聚合操作符
const $ = db.command.aggregate
//操作符
const dbCmd = db.command
exports.main = async (event, context) => {
	
	const {
		user_id
	} = event
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	let lists = await db.collection('article')
				.aggregate()
				.addFields({
					is_like:$.in(['$_id', userinfo.article_likes_ids])
				})
				//match 里面只能使用操作符, 而不能使用聚合操作符
				.match({
					id: dbCmd.in(userinfo.article_ids)
				})
				.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据获取成功',
		data: lists.data
	}
};
