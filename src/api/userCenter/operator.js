import request from '../../utils/request.js'

//新增
export function createOperator(params) {
	return request({
		url: '/api/backend/admins',
		method: 'post',
		data: params
	})
}

// 编辑
export function editOperator(params,adminId) {
	return request({
		url: `/api/backend/admins/${adminId}`,
		method: 'put',
		data: params
	})
}

// 列表
export function operators(params) {
	return request({
		url: '/api/backend/admins',
		method: 'get',
		params: params
	})
}

// 删除
export function deleteOperators(params,adminId) {
	return request({
		url: `/api/backend/admins/${adminId}`,
		method: 'delete',
		params: params
	})
}
