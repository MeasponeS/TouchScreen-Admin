import request from '../../utils/request.js'

// 获取子简介列表
export function SynopsesItem(params,synopsisId) {
	return request({
		url: `/api/backend/synopses/${synopsisId}/items`,
		method: 'get',
		params: params
	})
}

// 删除朱简介
export function deleteSynopsesItem(params,synopsisItemId) {
	return request({
		url: `/api/backend/synopses/items/${synopsisItemId}`,
		method: 'delete',
		params: params
	})
}

// 新建子简介
export function createSynopsesItem(params,synopsisId) {
	return request({
		url: `/api/backend/synopses/${synopsisId}/items`,
		method: 'post',
		data: params
	})
}

// 编辑子简介
export function editSynopsesItem(params,synopsisItemId) {
	return request({
		url: `/api/backend/synopses/items/${synopsisItemId}`,
		method: 'put',
		data: params
	})
}

