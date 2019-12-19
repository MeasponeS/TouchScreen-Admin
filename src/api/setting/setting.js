import request from '../../utils/request'

// 获取系统设置
export function getSetting(params) {
	return request({
		url: '/api/backend/system/setting/collection',
		method: 'get',
		params: params
	})
}

// 系统设置
export function setting(params) {
	return request({
		url: '/api/backend/system/setting/set',
		method: 'post',
		data: params
	})
}

// 启用
export function enableSetting(params) {
	return request({
		url: '/api/backend/system/setting/enable',
		method: 'put',
		data: params
	})
}

// 禁用
export function disableSetting(params) {
	return request({
		url: '/api/backend/system/setting/disable',
		method: 'put',
		data: params
	})
}
