import { onBeforeMount, reactive } from "vue";
import api from "../api";
import { nameRegExp, emailRegExp, passwordRegExp, idRegExp } from "../utils/regexp";

export default (formRef) => {
  // 表单信息
  const formValue = reactive({
    name: 'Jack',
    email: '345@abc.com',
    password: '12345678',
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
  const register = async () => {
    try {
      await formRef.value.validate()
    } catch (error) {
      console.log(error);
      return false;
    }
    const { data } = await api.admin.createAdmin(formValue);
    if (data.code === 0) {
      return data;
    } else {
      return false;
    }
  };
  // 组件渲染前获取角色列表，并添加到角色选择器的选项中
  onBeforeMount( async () => {
    const { data } = await api.role.getRoleList();
    if (data.code === 0) {
      for (let i = 0, len = data.result.length; i < len; i++) {
        roleOptions.push({
          label: data.result[i].name,
          value: data.result[i].id,
        });
      }
    }
  });

  return {
    formRef,
    formValue,
    rules,
    register,
    roleOptions,
  }
}