import request from '../utils/request.js'

//获取public-key
export function getPublic(params) {
	return request({
		url: '/api/backend/public_key',
		method: 'get',
		params: params
	})
}

export function login(params) {
	return request({
		url: '/api/backend/auth/login',
		method: 'post',
		data: params
	})
}

//后台登出
export function logout(params) {
	return request({
		url: '/api/backend/auth/logout',
		method: 'get',
		data: params
	})
}

