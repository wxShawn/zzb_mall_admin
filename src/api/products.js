import request from '../utils/request'

// 获取所有商品
export function get() {
  return request({
    method: 'get',
    url: 'products',
  })
}

// 获取单个商品
export function getOne(id) {
  return request({
    method: 'get',
    url: `products/${id}`,
  })
}

// 创建商品
export function create(data) {
  return request({
    method: 'post',
    url: `products`,
    data,
  })
}

// 更新商品
export function update(id, data) {
  return request({
    method: 'put',
    url: `products/${id}`,
    data,
  })
}

// 删除商品
export function del(id) {
  return request({
    method: 'delete',
    url: `products/${id}`,
  })
}