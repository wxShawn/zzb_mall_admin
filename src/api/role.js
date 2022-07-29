import request from '../utils/request'

const prefix = '/roles'
export default {
  // 获取角色列表
  getRoleList() {
    return request({
      method: 'get',
      url: `${prefix}`,
    });
  }
}