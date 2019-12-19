import request from '../../utils/request.js'


//获取轮播图列表
export function banners(params) {
	return request({
		url: '/api/backend/banners',
		method: 'get',
		params: params
	})
}

// 创建
export function createBanner(params) {
	return request({
		url: '/api/backend/banners',
		method: 'post',
		data: params
	})
}

// 删除
export function deleteBanner(params,bannerId) {
	return request({
		url: `/api/backend/banners/${bannerId}`,
		method: 'delete',
		params: params
	})
}

// 禁用轮播图
export function disableBanner(params,bannerId) {
	return request({
		url: `/api/backend/banners/${bannerId}/disable`,
		method: 'put',
		data: params
	})
}


// 启用轮播图
export function enableBanner(params,bannerId) {
	return request({
		url: `/api/backend/banners/${bannerId}/enable`,
		method: 'put',
		data: params
	})
}

// 设置轮播图序号
export function sortBanner(params,bannerId) {
	return request({
		url: `/api/backend/banners/${bannerId}/set_sort`,
		method: 'put',
		data: params
	})
}
