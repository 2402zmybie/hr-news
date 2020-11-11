'use strict';

const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		user_id = ''
	} = event
	
	if(!user_id) {
		//如果user_id为空
		return {
			code: 201,
			msg:'获取用户信息失败'
		}
	}
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	//返回数据给客户端
	return {
		code: 200,
		msg:'数据获取成功',
		data: userinfo
	}
};
