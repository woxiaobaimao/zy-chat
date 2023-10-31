<template>
  <el-dialog v-model="dialogVisible" width="30%">
    <div class="header">
      <div class="title">中原GPT</div>
      <div>轻松创建AI机器人</div>
    </div>
    <div>
      <el-form :model="form" label-position="top" ref="ruleFormRef" :rules="rules">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox label="同意 隐私政策 和 服务条款、未注册的手机号将自动创建" />
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" size="large" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/api/user'
import { getUserInfoApi } from '@/api/user'
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'

const dialogVisible = ref(true)
const userStore = useUserStore()
const rules = reactive({
  phone: [{ required: true, message: '请输入手机号' }],
  password: [
    { required: true, message: '请输入密码' },
    { min: 3, message: '密码长度不能小于3' }
  ]
})
const form = reactive({
  phone: '123',
  password: '123'
})
// 登录
const ruleFormRef = ref(null)
const onSubmit = async () => {
  if (!ruleFormRef) return
  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      // let res = await login(form)
      // userStore.token = res.data
      ElMessage.success('登录成功')
      dialogVisible.value = false
      saveUserInfo()
    }
  })
}
// 保存用户信息
const saveUserInfo = async () => {
  let res = await getUserInfoApi()
  userStore.userInfo = res.data
}
</script>
<style scoped>
.header {
  text-align: center;
  .title {
    margin-bottom: 5px;
    font-size: 26px;
    color: black;
  }
}
</style>
