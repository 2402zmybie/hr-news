'use strict';
//获取数据库的引用
const db = uniCloud.database()
//获得 聚合操作符
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {
		user_id,
		type
	} = event
	
	let matchObj = {}
	if(type !== 'all') {
		//只返回 我的标签
		matchObj = {
			current: true
		}
	}
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	// let label = await db.collection("label").get()
	
	let label = await db.collection("label")
	.aggregate()
	.addFields({
		//current 是true,表示是我的标签, false则表示是其他标签
		current: $.in(['$_id', $.ifNull([userinfo.label_ids,[]])])
	})
	.match(matchObj)
	.end()
	
	
	
	//返回数据给客户端
	return {
		code: 200,
		msg:'数据请求成功',
		data: label.data
	}
};
