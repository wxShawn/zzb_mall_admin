<template>
  <n-layout has-sider class="home-container" >
    <n-layout-sider
      class="home-sider"
      collapse-mode="width"
      :width="220"
      :collapsed="isCollapseMenu"
      :collapsed-width="64"
    >
      <n-menu
        :options="menuOptions"
        :collapsed="isCollapseMenu"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :value="currentMenuOption"
        @update:value="handleUpdateValue"
        accordion
      >
      </n-menu>
    </n-layout-sider>
    <n-layout style>
      <n-layout-header class="home-header">
        <div class="collapse-btn">
          <n-button text @click="isCollapseMenu = !isCollapseMenu">
            <n-icon :size="26">
              <menu-filled />
            </n-icon>
          </n-button>
        </div>
        <div class="admin-info-container">
          <admin-info :admin-info="adminInfo" />
        </div>
      </n-layout-header>
      <n-layout-content
        position="absolute"
        embedded
        style="top: 60px; bottom: 0px;"
        content-style="padding: 20px;"
        :native-scrollbar="false"
      >
        <router-view></router-view>
      </n-layout-content>
      <n-layout-footer position="absolute" style="height: 0px; background: #efefef"></n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue'

import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NIcon,
  useMessage,
  NButton,
} from 'naive-ui';

import {
  SpaceDashboardOutlined,
  ShoppingCartOutlined,
  BorderColorOutlined,
  MenuFilled,
  PersonPinOutlined,
  SupervisedUserCircleOutlined,
} from '@vicons/material'

import AdminInfo from './components/AdminInfo.vue';

import api from '../api/index'
import router from '../router';
import render from '../utils/render';

// 将 naive ui 消息功能挂载到 window 对象上，以便在 vue 组件外使用
window.$message = useMessage();


// 管理员信息
const adminInfo = ref(null);
onBeforeMount(async () => {
  const { data } = await api.admin.getPersonalInfo();
  if (data.code === 0) {
    const { result: { id, name, email, zzb_role } } = data;
    adminInfo.value = {
      id,
      name,
      email,
      role_id: zzb_role.id,
      role_name: zzb_role.name,
    }
  }
});

// 控制折叠菜单
const isCollapseMenu = ref(false);
// 主菜单数据
const menuOptions = [
  {
    label: render.routerLink('Dashboard', 'Dashboard'),
    key: 'dashboard',
    icon: render.nIcon(SpaceDashboardOutlined),
  },
  {
    label: '员工管理',
    key: 'admin',
    icon: render.nIcon(PersonPinOutlined),
    children: [
      {
        label: render.routerLink('AccountsManage', '账号管理'),
        key: 'accountsManage'
      },
    ]
  },
  {
    label: '用户管理',
    key: 'users',
    icon: render.nIcon(SupervisedUserCircleOutlined),
    children: [
      {
        label: '用户列表',
        key: 'users-list',
        disabled: true,
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
        key: 'products-list',
        disabled: true,
      },
    ]
  },
  {
    label: '订单管理',
    key: 'orders',
    icon: render.nIcon(BorderColorOutlined),
    children: [
      {
        label: '订单列表',
        key: 'oders-list',
        disabled: true
      },
      {
        label: '待处理订单',
        key: 'oders-list',
        disabled: true
      }
    ]
  },
];
// 菜单当前选中项
const currentMenuOption = ref('dashboard');
// 选中菜单选项时将key保存到sessionStorage中
const handleUpdateValue = (key) => {
  currentMenuOption.value = key;
  sessionStorage.setItem('currentMenuOption', currentMenuOption.value);
}
// 挂载组件前获取 sessionStorage 中保存的选中项
onBeforeMount(() => {
  if (sessionStorage.getItem('currentMenuOption')) {
    currentMenuOption.value = sessionStorage.getItem('currentMenuOption');
  }
});
// 卸载组件时将菜单选择项设置为初始值
onBeforeUnmount(() => {
  sessionStorage.setItem('currentMenuOption', 'dashboard');
})

</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;

  .home-sider {
    box-shadow: 0 0 5px #ddd;
  }

  .home-header {
    position: relative;
    height: 60px;
    background: #eee;
    display: flex;
    align-items: center;

    .collapse-btn {
      margin-left: 20px;
    }

    .admin-info-container {
      position: absolute;
      right: 50px;
    }
  }
}
</style>