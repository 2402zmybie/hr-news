'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {
	
	const {
		user_id,   //用户id
		article_id, //文章id
		content, //评论内容,
		comment_id = '',   //评论id, 区分是评论文章还是回复之前的评论
		reply_id = '',  //子回复id
		is_reply = false  //是否子回复
	} = event
	
	
	
	let user = await db.collection("user").doc(user_id).get()
	//获取用户对象
	user = user.data[0]
	//获取当前文章信息
	const article = await db.collection('article').doc(article_id).get()
	//获取文章下的所有评论
	const comments = article.data[0].comments

	
	let commentObj = {
		comment_id:getID(5),
		comment_content: content,
		create_time:new Date().getTime(),
		is_reply: is_reply,  //区分主回复还是子回复
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
		//回复
		replys:[]
	}
	
	if(comment_id === '') {
		//评论文章
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
	}else {
		//回复对文章的评论
		
		//获取评论索引
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		//获取作者信息
		let commentAuthor = ''
		
		if(is_reply) {
			//子回复
			commentAuthor = comments[commentIndex].replys.find(item => item.comment_id === reply_id)
			
			
		}else {
			//主回复
			commentAuthor = comments.find(item => item.comment_id === comment_id)
		}
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor
		
		//更新回复信息 (通过这种方式能够更新数组某一个下标里面的某一个字段)
		commentObj = {
			[commentIndex] : {
				replys: dbCmd.unshift(commentObj)
			}
		}
	}
	
	//更新文章表
	await db.collection("article").doc(article_id).update({
		comments:commentObj
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
