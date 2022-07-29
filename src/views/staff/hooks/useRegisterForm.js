import { reactive } from "vue";
import api from "@/api";
import { nameRegExp, emailRegExp, passwordRegExp, idRegExp } from "@/utils/regexp";

export default (formRef) => {
  // 表单信息
  const formValue = reactive({
    name: '',
    email: '',
    password: '',
    role_id: null,
  });
  // 角色选择器选项
  const roleOptions = reactive([]);
  // 表单校验规则
  const rules = {
    name: {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入名称');
        }
        if (!nameRegExp.test(value)) {
          return new Error('名称格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    email: {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入邮箱');
        }
        if (!emailRegExp.test(value)) {
          return new Error('邮箱格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    password: {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入密码');
        }
        if (!passwordRegExp.test(value)) {
          return new Error('密码格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    role_id: {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请选择角色');
        }
        if (!idRegExp.test(value)) {
          return new Error('角色id格式错误');
        }
        return true;
      },
      trigger: 'blur'
    }
  };

  // 注册
  const register = async (callback) => {
    try {
      await formRef.value.validate()
    } catch (error) {
      console.log(error);
      return false;
    }
    const { data } = await api.admin.createAdmin(formValue);
    if (data.code === 0) {
      Object.assign(formValue, {
        name: '',
        email: '',
        password: '',
        role_id: null,
      });
      callback(data);
    }
  };

  return {
    formValue,
    rules,
    register,
    roleOptions,
  }
}