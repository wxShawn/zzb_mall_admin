import request from '../utils/request'
/**
 * ********** 管理员相关 API **********
 */
const prefix = '/admins';
export default {
  // 密码登录
  loginByPassword({ email, password }) {
    return request({
      method: 'post',
      url: `${prefix}/login`,
      data: { email, password },
    });
  },
  // 验证码登录
  loginByVerifyCode({ email, verify_code }) {
    return request({
      method: 'post',
      url: `${prefix}/login/email-code`,
      data: { email, verify_code },
    });
  },
  // 获取用于登录的验证码
  getLoginVerifyCode({ email }) {
    return request({
      method: 'get',
      url: `${prefix}/login/email-code`,
      params: { email },
    });
  },
  // 修改密码（接受一个新密码以及邮箱和邮箱验证码）
  changePassword({ password, verify_code }) {
    return request({
      method: 'patch',
      url: `${prefix}/password`,
      data: { password, verify_code },
    });
  },
  // 获取用于修改密码的邮箱验证码
  getChangePwdVerifyCode() {
    return request({
      method: 'get',
      url: `${prefix}/password/email-code`,
    });
  },
  // 获取个人信息
  getPersonalInfo() {
    return request({
      method: 'get',
      url: `${prefix}/personal`,
    })
  },
  
  /**
   * ********** 超级管理员权限 **********
   */
  // 注册管理员账号
  createAdmin({ name, email, password, role_id }) {
    return request({
      method: 'post',
      url: `${prefix}/register`,
      data: { name, email, password, role_id },
    });
  },
  // 删除管理员
  deleteAdmin(id) {
    return request({
      method: 'delete',
      url: `${prefix}/${id}`,
    });
  },
  // 修改管理员信息
  updateAdmin(id, { name, email, password, role_id }) {
    return request({
      method: 'put',
      url: `${prefix}/${id}`,
      data: { name, email, password, role_id },
    });
  },
  // 获取管理员列表
  getAdminList(filter) {
    return request({
      method: 'get',
      url: `${prefix}`,
      params: filter ? filter : null,
    })
  },
}