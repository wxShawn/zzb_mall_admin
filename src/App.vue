<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<script setup>
import { NMessageProvider } from 'naive-ui'
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
