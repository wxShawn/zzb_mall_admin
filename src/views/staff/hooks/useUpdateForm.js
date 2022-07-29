import { reactive } from "vue";
import api from '@/api';
import { nameRegExp, emailRegExp, passwordRegExp, idRegExp } from "@/utils/regexp";

export default (formRef) => {
  // 表单信息
  const formValue = reactive({
    id: null,
    name: '',
    email: '',
    password: '',
    role_id: null,
  });
  // 角色选择器选项
  const roleOptions = reactive([]);
  // 表单校验规则
  const rules = {
    id: {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入ID');
        }
        if (!idRegExp.test(value)) {
          return new Error('ID格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    name: {
      validator(rule, value) {
        if (!nameRegExp.test(value)) {
          return new Error('名称格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    email: {
      validator(rule, value) {
        if (!emailRegExp.test(value)) {
          return new Error('邮箱格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    password: {
      validator(rule, value) {
        if (!value) {
          return true;
        }
        if (!passwordRegExp.test(value)) {
          return new Error('密码格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    role_id: {
      validator(rule, value) {
        if (!idRegExp.test(value)) {
          return new Error('角色id格式错误');
        }
        return true;
      },
      trigger: 'blur'
    }
  };

  // 上传更新数据
  const update = async(callback) => {
    try {
      await formRef.value.validate()
    } catch (error) {
      console.log(error);
      return false;
    }
    const { id, ...newData } = formValue;
    const { data } = await api.admin.updateAdmin(id, newData);
    console.log(data);
    if (data.code === 0) {
      callback(data);
    }
  }

  return {
    formValue,
    rules,
    update,
    roleOptions,
  }
}