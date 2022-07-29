import { ref, reactive, h, onBeforeMount } from "vue";
import { NButton } from "naive-ui";
import api from "@/api";

export default () => {
  // 表单的操作，可以在外部重写 edit、delete 等方法
  const action = reactive({
    edit: (row) => console.log('edit', row),
    delete: (row) => console.log('delete', row),
  });
  // 查询条件
  const filter = reactive({});
  // 分页设置
  const pagination = reactive({
    page: 1,
    pageSize: 20,
    sizeOptions: [
      { label: '20 每页', value: 20 },
      { label: '30 每页', value: 30 }, 
      { label: '40 每页', value: 40 },
      { label: '50 每页', value: 50 },
    ],
    pageCount: null,
    total: null,
  });

  // 定义表格列
  const columns = [
    {
      title: 'NO.',
      key: 'index',
    },
    {
      title: '员工名称',
      key: 'name'
    },
    {
      title: '邮箱',
      key: 'email'
    },
    {
      title: '角色',
      key: 'role'
    },
    {
      title: '创建时间',
      key: 'createdAt'
    },
    {
      title: '更新时间',
      key: 'updatedAt'
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return [
          h(NButton, {
            class: 'table-action',
            secondary: true,
            size: "small",
            disabled: row.role === '超级管理员' ? true : false,
            onClick: () => action.edit(row),
          }, {
            default: () => '编辑'
          }),
          h(NButton, {
            class: 'table-action',
            secondary: true,
            size: "small",
            type: 'error',
            disabled: row.role === '超级管理员' ? true : false,
            onClick: () => action.delete(row),
          }, {
            default: () => '删除'
          }),
        ];
      }
    }
  ];

  // 是否处于加载状态
  const loading = ref(false);

  // 表格数据
  const tableData = reactive([]);

  // 发送请求获取最新 Admin List
  const getData = async () => {
    tableData.length = 0;
    loading.value = true;
    const { page, pageSize } = pagination;
    console.log(pagination);
    const { data } = await api.admin.getAdminList({ page, pageSize, ...filter });
    if (data.code === 0) {
      pagination.pageCount = data.result.pageCount;
      pagination.total = data.result.total;
      for (let i = 0, len = data.result.rows.length; i < len; i++) {
        let { id, name, email, zzb_role, createdAt, updatedAt } = data.result.rows[i];
        createdAt = new Date(createdAt).toLocaleString();
        updatedAt = new Date(updatedAt).toLocaleString();
        tableData.push({
          index: i + 1,
          id,
          name,
          email,
          role_id: zzb_role.id,
          role: zzb_role.name,
          createdAt,
          updatedAt
        });
      }
      loading.value = false;
    }
  };

  // 组件渲染之前获取最新表格数据
  onBeforeMount(async () => {
    getData();
  });

  return {
    columns,
    loading,
    tableData,
    getData,
    action,
    filter,
    pagination,
  }
}