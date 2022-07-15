<template>
  <button @click="getP">get p</button>
  <button @click="createP">create p</button>
</template>

<script setup>
import api from '../api/index'

const getP = function() {
  api.products.get().then(res => {
    console.log(res)
  })
}

const createP = () => {
  api.products.create({
    data: {
      title: '芬达'
    }
  }).then(res => {
    console.log('添加成功');
  })
}
</script>

<style lang="scss" scoped>

</style>