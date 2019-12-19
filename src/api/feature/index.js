import request from '../../utils/request.js'

// 新建
export function createFeature(params) {
	return request({
		url: '/api/backend/base_characteristics',
		method: 'post',
		data: params
	})
}

// 编辑
export function editFeatures(params,baseCharacteristicId) {
	return request({
		url: `/api/backend/base_characteristics/${baseCharacteristicId}`,
		method: 'put',
		data: params
	})
}

// 列表
export function features(params) {
	return request({
		url: '/api/backend/base_characteristics',
		method: 'get',
		params: params
	})
}

//删除
export function deleteFeature(params,baseCharacteristicId) {
	return request({
		url: `/api/backend/base_characteristics/${baseCharacteristicId}`,
		method: 'delete',
		params: params
	})
}

// 排序
export function enableFeatures(params,baseCharacteristicId) {
	return request({
		url: `/api/backend/base_characteristics/${baseCharacteristicId}/enable`,
		method: 'put',
		data: params
	})
}


// 启用
export function sortFeatures(params,baseCharacteristicId) {
	return request({
		url: `/api/backend/base_characteristics/${baseCharacteristicId}/set_sort`,
		method: 'put',
		data: params
	})
}


// 禁用
export function disableFeatures(params,baseCharacteristicId) {
	return request({
		url: `/api/backend/base_characteristics/${baseCharacteristicId}/disable`,
		method: 'put',
		data: params
	})
}

