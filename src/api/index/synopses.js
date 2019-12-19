import request from '../../utils/request.js'

// 获取主简介列表
export function synopses(params) {
	return request({
		url: '/api/backend/synopses',
		method: 'get',
		params: params
	})
}

// 删除朱简介
export function deleteSynopses(params,id) {
	return request({
		url: `/api/backend/synopses/${id}`,
		method: 'delete',
		params: params
	})
}

// 新建主简介
export function createSynopses(params) {
	return request({
		url: '/api/backend/synopses',
		method: 'post',
		data: params
	})
}

// 编辑主简介
export function editeSynopses(params,id) {
	return request({
		url: `/api/backend/synopses/${id}`,
		method: 'put',
		data: params
	})
}

// 禁用主简介
export function disableSynopses(params,id) {
	return request({
		url: `/api/backend/synopses/${id}/disable`,
		method: 'put',
		data: params
	})
}

// 启用主简介
export function enableSynopses(params,id) {
	return request({
		url: `/api/backend/synopses/${id}/enable`,
		method: 'put',
		data: params
	})
}

// 主简介排序
export function sortSynopses(params,synopsisId) {
	return request({
		url: `/api/backend/synopses/${synopsisId}/set_sort`,
		method: 'put',
		data: params
	})
}
