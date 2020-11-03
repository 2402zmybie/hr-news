'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {
	
	const {
		user_id,   //用户id
		article_id, //文章id
		content //评论内容
	} = event
	
	let user = await db.collection("user").doc(user_id).get()
	//获取用户对象
	user = user.data[0]
	
	let commentObj = {
		comment_id:getID(5),
		comment_content: content,
		create_time:new Date().getTime(),
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
		//回复
		replys:[]
	}
	
	//更新文章表
	await db.collection("article").doc(article_id).update({
		comments: dbCmd.unshift(commentObj)
	})
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据更新成功'
	}
};


function getID(length) {
	return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36)
}
