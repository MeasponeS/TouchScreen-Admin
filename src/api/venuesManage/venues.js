import request from '../../utils/request.js';

// 场馆列表
export function venuesList(params,id) {
	return request({
		url: `/api/backend/exhibition_halls/categories/${id}/halls`,
		method: 'get',
		params: params
	})
}

// 新建场馆
export function createVenues(params,categoryId) {
	return request({
		url: `/api/backend/exhibition_halls/categories/${categoryId}/halls`,
		method: 'post',
		data: params
	})
}

// 删除场馆
export function deleteVenues(params,exhibitionId) {
	return request({
		url: `/api/backend/exhibition_halls/halls/${exhibitionId}`,
		method: 'delete',
		params: params
	})
}

// 编辑场馆
export function editVenues(params,exhibitionHallId) {
	return request({
		url: `/api/backend/exhibition_halls/halls/${exhibitionHallId}`,
		method: 'put',
		data: params
	})
}
