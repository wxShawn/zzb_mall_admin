<template>
  <n-layout has-sider class="home-container">
    <n-layout-sider content-style="padding: 24px;" class="home-sider">
      <n-menu :options="menuOptions"></n-menu>
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="home-header">
        <div class="admin-info-container"><admin-info :admin-info="adminInfo" /></div>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { reactive, ref } from 'vue'

import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NIcon,
  useMessage,
} from 'naive-ui';

import {
  HomeOutlined,
  ShoppingCartOutlined,
  BorderColorOutlined,
} from '@vicons/material'

import AdminInfo from '../components/home/AdminInfo.vue';

//import api from '../api/index'
import router from '../router';
import render from '../utils/render';

// 将 naive ui 消息功能挂载到 window 对象上，以便在 vue 组件外使用
window.$message = useMessage();

// 管理员信息（临时）
const adminInfo = reactive({
  admin_name: 'Shawn',
  email: '1806394760@qq.com',
  role_id: '',
});

// 主菜单数据
const menuOptions = [
  {
    label: '主页',
    key: 'go-back-home',
    icon: render.nIcon(HomeOutlined),
  },
  {
    label: '用户管理',
    key: 'users',
    icon: render.nIcon(HomeOutlined),
    children: [
      {
        label: '用户列表',
      }
    ]
  },
  {
    label: '商品管理',
    key: 'products',
    icon: render.nIcon(ShoppingCartOutlined),
    children: [
      {
        label: '商品列表',
        key: 'products-list'
      },
    ]
  },
  {
    label: '订单管理',
    key: 'orders',
    icon: render.nIcon(BorderColorOutlined),
  }
];


</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;

  .home-sider {
    background: #ddd;
  }

  .home-header {
    position: relative;
    height: 60px;
    background: #eee;

    .admin-info-container {
      position: absolute;
      right: 50px;
      height: 100%;
    }
  }
}
</style>