'use strict';

const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	
	const {
		user_id,
		author_id
	} = event
	
	let user = await db.collection("user").doc(user_id).get()
	let author_likes_ids = user.data[0].author_likes_ids
	
	let author_ids = null
	if(author_likes_ids.includes(author_id)) {
		//取消关注
		//pull方法: 数组中删除,某一项
		author_ids = dbCmd.pull(author_id)
	}else {
		//关注
		//addToSet方法: 在数组中追加,如果有就追加,如果没有则不添加
		author_ids = dbCmd.addToSet(author_id)
	}
	
	
	await db.collection("user").doc(user_id).update({
		author_likes_ids: author_ids
	})
	
	
	//返回数据给客户端
	return {
		code:200,
		msg:'更新成功'
	}
};
