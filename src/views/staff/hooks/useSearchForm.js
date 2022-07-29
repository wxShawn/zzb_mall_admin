import { reactive } from "vue";
import api from '@/api';
import { nameRegExp, emailRegExp, idRegExp } from "@/utils/regexp";

export default (formRef) => {
  // 表单数据
  const formValue = reactive({
    name: '',
    email: '',
    role_id: null,
  });
  // 角色选择器选项
  const roleOptions = reactive([{ label: '全部', value: null }]);
  // 表单校验规则
  const rules = {
    admin_name: {
      validator(rule, value) {
        if (!value) {
          return true;
        }
        if (!nameRegExp.test(value)) {
          return new Error('邮箱格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    email: {
      validator(rule, value) {
        if (!value) {
          return true;
        }
        if (!emailRegExp.test(value)) {
          return new Error('邮箱格式错误');
        }
        return true;
      },
      trigger: 'blur'
    },
    role: {
      validator(rule, value) {
        if (!value) {
          return true;
        }
        if (!idRegExp.test(value)) {
          return new Error('邮箱格式错误');
        }
        return true;
      },
      trigger: 'blur'
    }
  }

  // 重置数据
  const reset = () => {
    Object.assign(formValue, {
      name: '',
      email: '',
      role_id: null,
    });
  }

  return {
    formValue,
    rules,
    roleOptions,
    reset,
  }
}