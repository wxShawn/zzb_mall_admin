<template>
<n-space :size="14" vertical>
  <n-grid x-gap="14" :cols="5">
    <n-gi :span="3"><n-card class="card1">图表</n-card></n-gi>
    <n-gi :span="2"><n-card class="card1">通知、公告</n-card></n-gi>
  </n-grid>
  <n-grid x-gap="14" :cols="4">
    <n-gi><n-card class="card2">数据1</n-card></n-gi>
    <n-gi><n-card class="card2">数据2</n-card></n-gi>
    <n-gi><n-card class="card2">数据3</n-card></n-gi>
    <n-gi><n-card class="card2">数据4</n-card></n-gi>
  </n-grid>
</n-space>
</template>

<script setup>
import { 
  NGrid,
  NGi,
  NCard,
  NSpace,
} from 'naive-ui'
</script>

<style lang="scss">
.n-card {
  background: #fff;
}

.card1 {
  height: 400px;
}

.card2 {
  height: 200px;
}
</style>