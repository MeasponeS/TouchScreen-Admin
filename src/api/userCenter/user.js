import request from '../../utils/request.js'


// 重置密码
export function resetPassword(params,adminId) {
	return request({
		url: `/api/backend/admins/${adminId}/reset_password`,
		method: 'put',
		data: params
	})
}

// 修改密码
export function updatePassword(params) {
	return request({
		url: '/api/backend/admins/update_password',
		method: 'put',
		data: params
	})
}
