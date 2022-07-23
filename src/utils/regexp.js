
// 用户名正则表达式（2-16个中文或英文字符）
export const nameRegExp = /^(?:[(\u4e00-\u9fa5)|(A-Za-z)·]{2,16})$/;
// 邮箱正则表达式
export const emailRegExp = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
// 密码正则表达式（8-15个数字、字母、下划线、@ 或 .）
export const passwordRegExp = /^[\w@.]{8,15}$/;
// id正则表达式（以1-9开头的任意数字）
export const idRegExp = /^[1-9][0-9]*$/;
// 验证码正则表达式（6位数字）
export const verifyCodeRegexp = /^[0-9]{6}$/;