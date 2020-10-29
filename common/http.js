export default function $http(options) {
	
	const {url, data} = options
	
	//每个接口默认请求user_id
	const dataObj = {
		user_id:'5f962d36cf447a0001579ecf',
		...data
	}
	return new Promise((resolve,reject) => {
		uniCloud.callFunction({
			name:url,
			data: dataObj
		}).then((res) => {
			if(res.result.code === 200) {
				resolve(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
}