<script setup>
import LeftMenu from './components/LeftMenu.vue'
import { RouterView } from 'vue-router'
import Login from './views/Login.vue'
import { computed } from 'vue'
import { useUserStore } from '@/store/user'
/**
 * 获取是否登录
 */
const userStore = useUserStore()
const hasToken = computed(() => userStore.token)
</script>

<template>
  <el-container class="chat-container">
    <el-aside width="260px">
      <LeftMenu></LeftMenu>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
    <Login v-if="!hasToken"></Login>
  </el-container>
</template>
