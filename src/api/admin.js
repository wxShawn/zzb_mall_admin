import request from '../utils/request'
/**
 * 管理员相关 API
 */
const prefix = '/admin';
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
  changePassword({ email, password, verify_code }) {
    return request({
      method: 'patch',
      url: `${prefix}/password`,
      data: { email, password, verify_code },
    });
  },
  // 获取用于修改密码的邮箱验证码
  getChangePwdVerifyCode({ email }) {
    return request({
      method: 'get',
      url: `${prefix}/password/email-code`,
      params: { email },
    });
  },
}