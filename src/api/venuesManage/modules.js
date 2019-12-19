import request from '../../utils/request.js';

// 模块列表
export function modulesList(params,exhibitionHallId) {
	return request({
		url: `/api/backend/exhibition_halls/halls/${exhibitionHallId}/components`,
		method: 'get',
		params: params
	})
}

// 新建模块
export function createModule(params,exhibitionHallId) {
	return request({
		url: `/api/backend/exhibition_halls/halls/${exhibitionHallId}/components`,
		method: 'post',
		data: params
	})
}

// 删除模块
export function deleteModule(params,componentId) {
	return request({
		url: `/api/backend/exhibition_halls/components/${componentId}`,
		method: 'delete',
		params: params
	})
}

// 编辑模块
export function editModule(params,componentId) {
	return request({
		url: `/api/backend/exhibition_halls/components/${componentId}`,
		method: 'put',
		data: params
	})
}
