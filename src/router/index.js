import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../layout/Index.vue'),
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Dashboard.vue'),
      },
      {
        path: '/accounts-manage',
        name: 'AccountsManage',
        component: () => import('../views/staff/AccountManage.vue'),
      }
    ]
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// 导航守卫
router.beforeEach((to, from) => {
  // 检查 json web token 是否存在，否则跳转到 Login 页面
  const jwt = sessionStorage.getItem('jwt');
  if (to.name !== 'Login' && !jwt) {
    return {name: 'Login'};
  }
})

export default router