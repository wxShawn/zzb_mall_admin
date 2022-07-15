<template>
  <div class="login_container">
    <n-grid class="login" :cols="3" :x-gap="80">
      <n-gi :span="2">
        <img class="login-img" src="../assets/login_img.png" />
      </n-gi>
      <n-gi :span="1" class="form-container">
        <n-form
          ref="formRef"
          :model="user"
          :rules="rules"
          size="large"
          :show-label="false"
        >
          <n-form-item path="email" label="邮箱">
            <n-input v-model:value="user.email" placeholder="输入邮箱" maxlength="20">
              <template #prefix>
                <n-icon :component="EmailFilled" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input v-model:value="user.password" placeholder="输入密码" maxlength="15">
              <template #prefix>
                <n-icon :component="LockFilled" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" type="warning" @click="login">登录</n-button>
          </n-form-item>
        </n-form>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NGrid, NGi, NForm, NFormItem, NInput, NButton, NIcon, useMessage } from 'naive-ui'
import { LockFilled, EmailFilled } from '@vicons/material'
import api from '../api/index'
import router from '../router'

// const router = useRouter();
const message = useMessage();
const formRef = ref(null);

// 表单信息
const user = ref({
  email: '3334502209@qq.com',
  password: 'Wang201402'
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
        if (value.length < 7 || value.length > 20) {
          return new Error('邮箱长度必须在3-15个字符之间');
        }
        return true
      },
      // message: '请输入用户名',
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
        if (value.length < 8 || value.length > 15) {
          return new Error('密码长度必须在8-15个字符之间');
        }
        return true
      },
      // message: '请输入密码',
      trigger: 'blur'
    }
  ]
};

// 登录
const login = () => {
  // 发送登录请求前校验表格数据是否合法
  formRef.value.validate( error => {
    if (!error) { // 表格数据合法
      // 发送登录请求
      api.login({
        identifier: user.value.email,
        password: user.value.password,
      }).then(({ data }) => {
        message.success('登录成功');
        sessionStorage.setItem('jwt', data.jwt);
        console.log(`Hello ${data.user.username}`);
        router.push({name: 'Home'});
      })
    } else { // 表格数据不合法
      message.error('登录失败：用户名或密码错误');
    }
  })
}

</script>

<style lang="scss" scoped>
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

      .n-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
    }

    .n-button {
      width: 100%;
    }
  }
}
</style>