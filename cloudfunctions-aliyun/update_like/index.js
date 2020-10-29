'use strict';

const db = uniCloud.database()
//数据库操作符
const dbCmd = db.command
exports.main = async (event, context) => {
	
	const {
		user_id,
		article_id
	} = event
	
	//doc表示通过id字段查询
	const userinfo = await db.collection('user').doc(user_id).get()
	
	const article_likes_ids = userinfo.data[0].article_likes_ids;
	
	let dbCmdFuns = null
	if(article_likes_ids.includes(article_id)) {
		//数据库用户表中包含文章id  , 删除字段中的数据
		dbCmdFuns = dbCmd.pull(article_id)
	}else {
		//数据库用户表中不包含文章id , 添加字段中的数据
		dbCmdFuns = dbCmd.addToSet(article_id)
	}
	
	
	
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdFuns
	})

	
	//返回数据给客户端
	return {
		code:200,
		msg:"请求数据成功",
		data:userinfo.data[0]
	}
};
