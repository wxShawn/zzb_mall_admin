<template>
  <n-space vertical size="large">
    <n-card>
      <!-- 查询表单 -->
      <n-form
        ref="searchRef"
        inline
        :label-width="80"
        :model="searchForm.formValue"
        :rules="searchForm.rules"
      >
        <n-form-item label="员工名称" path="name">
          <n-input v-model:value="searchForm.formValue.name" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="searchForm.formValue.email" />
        </n-form-item>
        <n-form-item label="角色" path="role_id">
          <n-select style="width: 194px;" v-model:value="searchForm.formValue.role_id" :options="searchForm.roleOptions" />
        </n-form-item>
        <n-form-item>
          <n-button style="margin-right: 18px;" @click="resetClickHandle">重置</n-button>
          <n-button type="primary" @click="searchClickHandle">查询</n-button>
        </n-form-item>
        
        <!-- 添加管理员模态框的开启按钮 -->
        <n-form-item>
          <n-button type="info" @click="showRegisterModal = true">添加管理员</n-button>
        </n-form-item>
      </n-form>
    </n-card>

    <n-card>
      <!-- 管理员列表 -->
      <n-data-table
        :columns="adminInfoTable.columns"
        :data="adminInfoTable.tableData"
        :loading="adminInfoTable.loading.value"
        :pagination="false"
        :bordered="false"
      />

      <!-- 分页 -->
      <n-pagination
        style="margin-top: 20px"
        v-model:page="adminInfoTable.pagination.page"
        v-model:page-size="adminInfoTable.pagination.pageSize"
        :page-count="adminInfoTable.pagination.pageCount"
        show-size-picker
        :page-sizes="adminInfoTable.pagination.sizeOptions"
        @update:page="updatePageHandle"
        @update:page-size="updatePageHandle"
      >
        <template #prefix>
          共：{{ adminInfoTable.pagination.total }} 条数据
        </template>
      </n-pagination>
    </n-card>
  </n-space>

  <!-- 模态框：添加管理员 -->
  <n-modal v-model:show="showRegisterModal" preset="dialog" title="Dialog">
    <template #header>
      <div>添加管理员</div>
    </template>
    <!-- 添加管理员表单 -->
    <n-form
      style="margin-top: 30px;"
      ref="registerRef"
      label-placement="left"
      :rules="registerForm.rules"
      :model="registerForm.formValue"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="registerForm.formValue.name" />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="registerForm.formValue.email" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="registerForm.formValue.password" />
      </n-form-item>
      <n-form-item label="角色" path="role_id">
        <n-select v-model:value="registerForm.formValue.role_id" :options="registerForm.roleOptions" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button @click="showRegisterModal = false">取消</n-button>
      <n-button type="primary" @click="registerClickHandle">确认添加</n-button>
    </template>
  </n-modal>

  <!-- 模态框：编辑管理员 -->
  <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
    <template #header>
      <div>编辑管理员</div>
    </template>
    <!-- 添加管理员表单 -->
    <n-form
      style="margin-top: 30px;"
      ref="updateRef"
      :label-width="50"
      label-placement="left"
      :rules="updateForm.rules"
      :model="updateForm.formValue"
    >
      <n-form-item label="ID" path="id">
        <n-input-number style="width:100%" disabled :show-button="false" v-model:value="updateForm.formValue.id" />
      </n-form-item>
      <n-form-item label="名称" path="name">
        <n-input v-model:value="updateForm.formValue.name" />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="updateForm.formValue.email" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="updateForm.formValue.password" />
      </n-form-item>
      <n-form-item label="角色" path="role_id">
        <n-select v-model:value="updateForm.formValue.role_id" :options="updateForm.roleOptions" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button @click="showUpdateModal = false">取消</n-button>
      <n-button type="primary" @click="updateClickHandle">确认修改</n-button>
    </template>
  </n-modal>

</template>

<script setup>
import { ref, reactive, h, onBeforeMount } from 'vue';
import {
  NButton,
  NDataTable,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  useMessage,
  NModal,
  useDialog,
  NPagination,
  NCard,
  NSpace,
} from 'naive-ui';

import api from '@/api';

import useRegisterForm from './hooks/useRegisterForm';
import useAdminInfoTable from './hooks/useAdminInfoTable';
import useUpdateForm from './hooks/useUpdateForm';
import useSearchForm from './hooks/useSearchForm';

// naive ui 消息组件API
const nMessage = useMessage();
// naive ui 对话框组件API
const nDialog = useDialog();


// 组件挂载前获取角色列表，并将数据传给查询、注册、修改等表单
onBeforeMount( async () => {
  const { data } = await api.role.getRoleList();
  const roleList = [];
  const roleListForSearch = [];
  if (data.code === 0) {
    for (let i = 0, len = data.result.length; i < len; i++) {
      roleList.push({
        label: data.result[i].name,
        value: data.result[i].id,
        disabled: data.result[i].name === '超级管理员' ? true : false,
      });
      roleListForSearch.push({ label: data.result[i].name, value: data.result[i].id });
    }
    // 角色列表将数据传给查询、注册、修改等表单
    searchForm.roleOptions.push(...roleListForSearch);
    registerForm.roleOptions.push(...roleList);
    updateForm.roleOptions.push(...roleList);
  }
});

/**
 * ********** 筛选查询表单 **********
 */
// 表单标识
const searchRef = ref(null);
// 使用 useSearchForm hooks，传入表单标识
const searchForm = useSearchForm(searchRef);
// 处理重置点击
const resetClickHandle = () => {
  searchForm.reset();
}
// 处理查询点击
const searchClickHandle = async () => {
  try {
    let res = await searchRef.value.validate();
  } catch (error) {
    console.log(error);
    return false;
  }
  Object.assign(adminInfoTable.filter, searchForm.formValue);
  adminInfoTable.getData();
}



/**
 * ********** 添加管理员表单 **********
 */
// 添加管理员模态框的显示状态
const showRegisterModal = ref(false);
// 添加管理员表单标识
const registerRef = ref(null);
// 使用 useRegisterForm hooks，并传入表单标识
const registerForm = useRegisterForm(registerRef);
// 处理确认添加的点击事件
const registerClickHandle = async () => {
  // 添加成功时执行回调函数
  registerForm.register((res) => {
    showRegisterModal.value = false;
    nMessage.success(res.message);
    // 刷新表格数据
    adminInfoTable.getData();
  });
}

/**
 * ********** 管理员列表 **********
 */
// 使用 useAdminInfoTable hooks
const adminInfoTable = useAdminInfoTable();
// 表格事件：编辑
adminInfoTable.action.edit = (row) => {
  showUpdateModal.value = true;
  const { id, name, email, role_id } = row;
  Object.assign(updateForm.formValue, { id, name, email, role_id });
}
// 表格事件：删除
adminInfoTable.action.delete = async (row) => {
  nDialog.warning({
    title: "警告",
    content: "注意：这将永远删除该账号",
    positiveText: "确认删除",
    negativeText: "取消",
    onPositiveClick: async () => {
      // 请求服务器删除
      const { data } = await api.admin.deleteAdmin(row.id);
      if (data.code === 0) {
        // 在本地数据中删除
        adminInfoTable.tableData.splice(row.index - 1, 1);
        nMessage.success(data.message);
      }
    },
    onNegativeClick: () => {} // do nothing here
  });
}
// 分页组件相关数据改变时触发
const updatePageHandle = () => {
  adminInfoTable.getData();
}


/**
 * ********** 编辑管理员信息 **********
 */
const showUpdateModal = ref(false);
const updateRef = ref(null);
// 使用 useUpdateForm hooks，并传入表单标识
const updateForm = useUpdateForm(updateRef);
// 处理确认修改的点击事件
const updateClickHandle = () => {
  // 修改成功时执行回调函数
  updateForm.update((res) => {
    showUpdateModal.value = false;
    nMessage.success(res.message);
    // 刷新表格数据
    adminInfoTable.getData();
  });
};

</script>

<style>

.table-action {
  margin-left: 5px;
}

</style>