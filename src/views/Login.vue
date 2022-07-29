<template>
  <div class="login_container">
    <n-grid class="login" :cols="5" :x-gap="80">
      <n-gi :span="3">
        <img class="login-img" src="../assets/login_img.png" />
      </n-gi>
      <n-gi :span="2" class="form-container">
        
        <n-tabs
          type="line"
          default-value="pwdLogin"
          animated
        >
          <!-- 密码登录表单 -->
          <n-tab-pane name="pwdLogin" tab="密码登录">
            <n-form
              ref="formRef"
              :model="user"
              :rules="rules"
              size="large"
              :show-label="false"
            >
              <n-form-item path="email" label="邮箱">
                <n-input v-model:value="user.email" placeholder="输入邮箱">
                  <template #prefix>
                    <n-icon :component="EmailFilled" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password" label="密码">
                <n-input type="password" show-password-on="click" v-model:value="user.password" placeholder="输入密码" maxlength="15">
                  <template #prefix>
                    <n-icon :component="LockFilled" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item>
                <n-button class="login-btn" type="primary" @click="login">登录</n-button>
              </n-form-item>
            </n-form>
          </n-tab-pane>

          <!-- 验证码登录表单 -->
          <n-tab-pane name="vcLogin" tab="验证码登录">
            <n-form
              ref="vcFormRef"
              :model="vcUser"
              :rules="vcRules"
              size="large"
              :show-label="false"
            >
              <n-form-item ref="vcFormEmailRef" path="email" label="邮箱">
                <n-input v-model:value="vcUser.email" placeholder="输入邮箱">
                  <template #prefix>
                    <n-icon :component="EmailFilled" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item class="verify-code" path="verify_code" label="验证码">
                <n-input style="flex: 1; margin-right: 20px" v-model:value="vcUser.verify_code" placeholder="输入验证码" maxlength="6">
                  <template #prefix>
                    <n-icon :component="VerifiedUserFilled" />
                  </template>
                </n-input>
                <n-button :disabled="verifyCodeBtnDisabled" @click="getVerifyCode" style="width: 66px;">
                  <span v-if="!verifyCodeBtnDisabled">获取</span>
                  <n-countdown
                    v-else
                    :render="renderCountdown"
                    :duration="60000"
                    :active="verifyCodeBtnDisabled"
                    @finish="verifyCodeBtnDisabled = false"
                  />
                </n-button>
              </n-form-item>
              <n-form-item>
                <n-button class="login-btn" attr-type="button" type="primary" @click="vcLogin">登录</n-button>
              </n-form-item>
            </n-form>
          </n-tab-pane>

        </n-tabs>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import {
  NGrid,
  NGi,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NIcon,
  useMessage,
  NTabs,
  NTabPane,
  NCountdown,
} from 'naive-ui';
import { LockFilled, EmailFilled, VerifiedUserFilled } from '@vicons/material';
import api from '../api/index';
import router from '../router';
import { emailRegExp, passwordRegExp, verifyCodeRegexp } from '../utils/regexp';

// 将 naive ui 消息功能挂载到 window 对象上，以便在 vue 组件外使用
window.$message = useMessage();

// naive ui 消息组件
const nMessage = useMessage();

// 登录成功之后的操作
const loginSuccess = (data) => {
  nMessage.success(data.message);
  sessionStorage.setItem('jwt', data.result.jwt);
  console.log(`${data.result.adminInfo.admin_name}，你好， 欢迎回来！`);
  router.push({name: 'Home'});
}


/**
 * ********** 密码登录 **********
 */
// 表单标识
const formRef = ref(null);

// 表单信息
const user = reactive({
  email: '1806394760@qq.com',
  password: '12345678'
});

// 表单校验规则
const rules = {
  email: [
    {
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
    }
  ],
  password: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入密码');
        }
        if (!passwordRegExp.test(value)) {
          return new Error('密码格式错误: 支持8-15个 "数字 字母 _ . @"');
        }
        return true;
      },
      trigger: 'blur'
    }
  ]
};

// 登录
const login = async () => {
  // 发送登录请求前校验表格数据是否合法
  try {
    await formRef.value.validate()
  } catch (error) {
    console.log(error);
    return false;
  }
  // 发送登录请求
  const { data } = await api.admin.loginByPassword({
    email: user.email,
    password: user.password,
  });
  console.log(data);
  if (data.code === 0) {
    loginSuccess(data);
  }
}


/**
 * ********** 验证码登录 **********
 */
// 验证码登录表单标识
const vcFormRef = ref(null);

// 验证码登录表单 email表单项的标识
const vcFormEmailRef = ref(null);

// 验证码登录表单信息
const vcUser = reactive({
  email: '',
  verify_code: ''
});

// 控制是否禁用获取验证码的按键
let verifyCodeBtnDisabled = ref(false);

// 验证码登录表单校验规则
const vcRules = {
  email: [
    {
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
    }
  ],
  verify_code: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入验证码');
        }
        if (!verifyCodeRegexp.test(value)) {
          return new Error('验证码格式错误: 需要输入6位数字');
        }
        return true;
      },
      trigger: 'blur'
    }
  ]
};

// 验证码获取按钮的倒计时渲染
const renderCountdown = ({ hours, minutes, seconds }) => {
  return `${String(seconds).padStart(2, "0")}`;
};

// 获取验证码
const getVerifyCode = async () => {
  // 请求前验证邮箱是否合法
  try {
    await vcFormEmailRef.value.validate();
  } catch (error) {
    console.log(error);
    return false;
  }
  const { data } = await api.admin.getLoginVerifyCode({ email: vcUser.email });
  if (data.code === 0) {
    nMessage.success(data.message);
    verifyCodeBtnDisabled.value = true;
  }
}

// 验证码登录
const vcLogin = async () => {
  // 发送登录请求前校验表格数据是否合法
  try {
    await vcFormRef.value.validate();
  } catch (error) {
    console.log(error);
    return false;
  }
  // 发送登录请求
  const { data } = await api.admin.loginByVerifyCode({
    email: vcUser.email,
    verify_code: vcUser.verify_code,
  });
  console.log(data);
  if (data.code === 0) {
    loginSuccess(data);
  }
}

</script>

<style lang="scss">
.login_container {
  position: relative;
  height: 100vh;
  background: #fff;

  >.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60% !important;
    min-width: 1000px;
    max-width: 1300px;
    background: #fff;

    .login-img {
      width: 100%;
    }

    .form-container {
      position: relative;
      display: flex;
      align-items: center;

      .n-tabs-nav {
        margin-bottom: 15px;
      }

      .verify_code {
        display: flex;
        justify-content: space-between;
      }

      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>