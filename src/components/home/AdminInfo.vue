<template>

  <div class="admin-info">

    <n-text class="admin-role" depth="3">运营专员</n-text>

    <n-dropdown :options="adminInfoOption">
      <n-button quaternary>
        <n-text type="primary">Shawn</n-text>
      </n-button>
    </n-dropdown>

  </div>

  <n-modal
    v-model:show="showChangPwdModal"
    preset="dialog"
    title="Dialog"
    :icon="render.nIcon(EditOutlined)"
    :mask-closable="false"
  >

    <template #header>
      <div>修改密码</div>
    </template>

    <n-form
      class="new-pwd-form"
      ref="newPwdFormRef"
      :show-label="false"
      :model="newPwdFormInfo"
      :rules="newPwdFormRules"
      label-placement="left"
    >

      <n-form-item path="password">
        <n-input v-model:value="newPwdFormInfo.password" placeholder="新密码"></n-input>
      </n-form-item>

      <n-form-item path="verify_code">
        <div class="verify-code">
          <n-input
            v-model:value="newPwdFormInfo.verify_code"
            clearable
            :show-button="false"
            :keyboard="{ArrowUp: false, ArrowDown: false}"
            placeholder="邮箱验证码"
          />
          <n-button type="info" @click="getEmailVerifyCode">获取</n-button>
        </div>
      </n-form-item>

    </n-form>

    <template #action>
      <n-button @click="showChangPwdModal = false">取消</n-button>
      <n-button type="error" @click="changePassword">修改</n-button>
    </template>

  </n-modal>

</template>

<script setup>
import { reactive, ref } from 'vue';

import {
  NButton,
  NDropdown,
  NText,
  NModal,
  NInput,
  NForm,
  NFormItem,
  useMessage,
} from 'naive-ui';

import {
  EditOutlined,
  LogOutOutlined,
} from '@vicons/material';

import api from '../../api/index'
import router from '../../router';
import render from '../../utils/render';
import { passwordRegExp, verifyCodeRegexp } from '../../utils/regexp';

// 父组件传递的参数，adminInfo 包含除密码外的所有信息
const props = defineProps({
  adminInfo: Object,
});
const {adminInfo} = props;

// naive ui 消息组件
const nMessage = useMessage()

// 管理员信息下拉菜单数据
const adminInfoOption = [
  {
    label: '修改密码',
    key: 'changPassword',
    icon: render.nIcon(EditOutlined),
    props: {
      onClick: () => { showChangPwdModal.value = true }
    }
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: render.nIcon(LogOutOutlined),
    props: {
      onClick: () => { logout() }
    }
  }
];


/**
 * ************  修改密码  ***************
 */
// "修改密码"的模态框显示状态
const showChangPwdModal = ref(false);
// "修改密码"表单标识
const newPwdFormRef = ref(null);
// "修改密码"表单信息
const newPwdFormInfo = reactive({
  password: '',
  verify_code: null,
});
// "修改密码"表单规则
const newPwdFormRules = {
  password: {
    required: true,
    validator(rule, value){
      if (!value) {
        return new Error('请输入新密码');
      }
      if(value.replace(passwordRegExp, '').length > 0) {
        return new Error('密码格式错误: 支持8-15个 "数字 字母 _ . @"');
      }
      return true;
    },
    trigger: 'blur',
  },
  verify_code: {
    required: true,
    validator(rule, value){
      if (!value) {
        return new Error('请输入邮箱验证码');
      }
      if(value.replace(verifyCodeRegexp, '').length > 0) {
        return new Error('验证码格式错误: 需要输入6位数字');
      }
      return true;
    },
    trigger: 'blur',
  }
}
// 获取用于修改密码的验证码
const getEmailVerifyCode = async () => {
  const { email } = adminInfo;
  const res = await api.admin.getChangePwdVerifyCode({ email });
  if (res.code === 0) {
    nMessage.success(res.data.message);
  }
}
// 修改密码
const changePassword = async () => {
  // 发送登录请求前校验表格数据是否合法,.未通过会抛出错误
  try {
    await newPwdFormRef.value.validate();
  } catch (error) {
    console.log(error);
    return false;
  }
  const { email } = adminInfo;
  const res = await api.admin.changePassword({ email, ...newPwdFormInfo });
  if (res.code === 0) {
    // 修改成功，关闭模态框
    showChangPwdModal.value = true;
    nMessage.success(res.data.message);
  }
};


/**
 * ************  退出登录  ***************
 */
// 退出登录
const logout = () => {
  sessionStorage.removeItem('jwt');
  router.push({name: 'Login'});
  nMessage.warning('退出登录');
};

</script>

<style lang="scss" scoped>
.admin-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;

  >* {
    margin: 0 2px;
  }
}

.new-pwd-form {
  margin-top: 30px;

  .verify-code {
    width: 100%;
    display: flex;
    justify-content: space-between;

    >*:first-child {
      flex: 1;
      margin-right: 12px;
    }
  }
}
</style>