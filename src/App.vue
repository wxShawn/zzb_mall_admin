<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<script setup>
import { NMessageProvider } from 'naive-ui'
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  min-width: 1280px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
