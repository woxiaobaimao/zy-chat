<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const menus = [
  {
    id: 1,
    label: '机器人广场',
    url: 'square'
  },
  {
    id: 3.5,
    label: 'GPT3.5',
    url: 'robot',
    robotId: 3.5
  },
  {
    id: 4,
    label: 'GPT4',
    url: 'robot',
    robotId: 4
  },
  {
    id: 5,
    label: '智能搜索',
    url: 'search'
  },
  {
    id: 6,
    label: 'AI绘画',
    url: 'draw'
  }
]
// 切换页面
const gotoPage = ({ url, robotId }) => {
  router.push({ name: url, query: { robotId } })
}

// 获取用户信息
const { userInfo } = storeToRefs(userStore)

// 指令事件
const handleCommand = (command) => {
  if (command == 'edit') {
    router.push({ name: 'profile' })
  } else {
    userStore.token = ''
    userStore.userInfo = { userInfo: { avatar: '', nick: '' } }
    ElMessage.success('退出成功')
  }
}
// 激活菜单
const activeMenu = computed(() => {
  const { index } = route.meta
  const { robotId } = route.query
  return robotId ? robotId : index
})
</script>

<template>
  <div class="LeftMenu">
    <el-menu class="chats" :default-active="activeMenu">
      <el-menu-item :index="item.id" v-for="item in menus" :key="item.id" @click="gotoPage(item)">
        <div class="robot">
          <img src="@/assets/gpt-3.5.png" class="robot-image" />
          <span>{{ item.label }}</span>
        </div>
      </el-menu-item>
    </el-menu>
    <div class="footer">
      <div>
        <img src="@/assets/robots/1.png" class="robot-image" />
        <span>{{ userInfo.userInfo.nick }}</span>
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <el-icon class="setting"><Setting /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit" icon="Edit">修改资料</el-dropdown-item>
            <el-dropdown-item command="logout" icon="SwitchButton">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.LeftMenu {
  height: 100%;
  .chats {
    height: calc(100% - 60px);
    .robot {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  .footer {
    box-sizing: border-box;
    padding: 10px;
    background-color: white;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting {
      cursor: pointer;
    }
  }

  .robot-image {
    width: 30px;
    border-radius: 5px;
  }
}
</style>
