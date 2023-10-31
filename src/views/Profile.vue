<template>
  <div class="profile">
    <div class="title">个人设置</div>
    <el-form class="info" :model="form" label-width="120px" style="width: 500px">
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="form.avatar" placeholder="请输入头像" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nick" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%; margin-top: 20px" size="large">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const form = ref({
  phone: '',
  avatar: '',
  nick: '',
  email: ''
})

const onSubmit = () => {
  console.log('submit!')
}

onMounted(() => {
  const {
    phone,
    email,
    userInfo: { avatar, nick }
  } = userStore.userInfo
  form.value = { phone, avatar, nick, email }
})
</script>
<style lang="scss" scoped>
.profile {
  padding: 50px;
  .title {
    font-size: 20px;
  }
  .info {
    margin-top: 50px;
  }
}
</style>
