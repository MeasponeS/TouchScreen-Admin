import request from '../../utils/request.js';

// 场馆类别列表
export function cateList(params) {
	return request({
		url: '/api/backend/exhibition_halls/categories',
		method: 'get',
		params: params
	})
}

// 新建分类
export function createCate(params) {
	return request({
		url: '/api/backend/exhibition_halls/categories',
		method: 'post',
		data: params
	})
}

// 删除分类
export function deleteCate(params,id) {
	return request({
		url: `/api/backend/exhibition_halls/categories/${id}`,
		method: 'delete',
		params: params
	})
}

// 编辑分类
export function editCate(params,categoryId) {
	return request({
		url: `/api/backend/exhibition_halls/categories/${categoryId}`,
		method: 'put',
		data: params
	})
}

// 开启
export function enableCate(params,categoryid) {
	return request({
		url: `/api/backend/exhibition_halls/categories/${categoryid}/enable`,
		method: 'put',
		data: params
	})
}

// 关闭
export function disableCate(params,categoryid) {
	return request({
		url: `/api/backend/exhibition_halls/categories/${categoryid}/disable`,
		method: 'put',
		data: params
	})
}

// 设置排序
export function sortCate(params,categoryid) {
	return request({
		url: `/api/backend/exhibition_halls/categories/${categoryid}/set_sort`,
		method: 'put',
		data: params
	})
}
