import axios from 'axios'

import {
	apiurl,
	cors
} from 'Config'

export default function ({
	cmd,
	method = 'GET',
	type = 'json',
	data = {},
	header = {},
	fileList = [],
}) {
	method = method.toUpperCase()
	type = type.toLowerCase()
	let url = `${apiurl}/${cmd}`
	let option = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...header,
		}
	}
	if (fileList.length) {
		let formData = new FormData()
		option.headers['Content-Type'] = 'multipart/form-data'
		let filelist = [...fileList]
		filelist.forEach((file) => {
			formData.append('files', file)
			// formData.append('files', file, file.name)
		})
		data = formData
		// console.log(data)
		/* old
		let formData = new FormData()
		formData.append('file', fileList[0], fileList[0].name);
		for (let k in data)
		 formData.append(k, data[k])
		option.headers['Content-Type'] = 'multipart/form-data'
		*/
	}
	switch (method) {
		case 'POST':
		case 'PUT':
		case 'DELETE':
			option.data = data
			break;
		case 'GET':
			option.params = data
			break;
	}
	return axios({
		method,
		url,
		...option,
		withCredentials: !!cors, // 直接改動
	}).then((res) => {
		return {
			ok: res.statusText == 'OK',
			status: res.status,
			body: res.data
		}
	})
		.catch(err => {
			let res = err.response
			if (res) {
				return {
					ok: res.statusText == 'OK',
					status: res.status,
					body: res.data
				}
			}
			else {
				return {
					ok: false,
					status: 404,
					body: err.message
				}
			}

		})
}