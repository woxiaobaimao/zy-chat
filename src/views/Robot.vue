<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { chatRecords } from '@/api/robot'
import { useUserStore } from '@/store/user'
import { chat } from '@/api/robot'
import MarkdownRender from '@/components/MarkdownRender.vue'

const userStore = useUserStore()
// 历史记录
const records = ref([])
const getRecord = async () => {
  const { id: userId } = userStore.userInfo
  let res = await chatRecords({ userId })
  records.value = res.data
}

// 开始搜索
const keywork = ref('')
const isWaiting = ref(false)
const search = async () => {
  const content = keywork.value

  keywork.value = ''
  isWaiting.value = true

  const { id: userId } = userStore.userInfo

  records.value.push({
    type: 0,
    content
  })
  records.value.push({
    type: 1,
    content: '正在加载中、请稍后...'
  })

  /**
   * 封装请求参数
   * 30秒超时
   */
  let data = {
    query: content,
    stream: false,
    model_name: 'chatglm2-6b',
    temperature: 1,
    max_tokens: 200,
    prompt_name: 'default'
  }

  let res = await chat(data)
  records.value.pop()
  records.value.push({
    type: 1,
    userId,
    content: res
  })
  isWaiting.value = false
}

/**
 * vue3聊天定位到最下面
 */
const chatRoom = ref(null)
watch(
  () => records,
  () => {
    nextTick(() => {
      chatRoom.value.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' })
    })
  },
  {
    deep: true //深度监听
  }
)

onMounted(() => {
  getRecord()
})
</script>

<template>
  <div class="robot">
    <div class="header">
      <img src="@/assets/gpt-3.5.png" class="robot-image" />
      <span>GPT-3.5</span>
    </div>
    <div class="content-wrappre" ref="chatRoom" id="content-wrappre">
      <div class="content">
        <div v-for="(item, index) in records" :key="index" class="message-block">
          <!-- 用户 -->
          <div v-if="!item.type" class="user">
            <div class="message-content">{{ item.content }}</div>
            <img src="@/assets/robots/1.png" class="robot-image" />
          </div>
          <!-- 机器人 -->
          <div v-else>
            <img src="@/assets/gpt-3.5.png" class="robot-image" />
            <!-- <div class="message-content" v-html="item.content"></div> -->
            <MarkdownRender class="message-content" :text="item.content"></MarkdownRender>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-container">
        <el-input
          v-model="keywork"
          style="width: 750px; height: 50px"
          placeholder="请输入搜索内容，按回车进行提问"
          @keyup.enter="search"
        ></el-input>
        <el-tooltip class="box-item" effect="dark" content="发送" placement="top-start">
          <el-icon class="send-btn"><Promotion /></el-icon>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.robot {
  height: 100%;
  position: relative;
  .robot-image {
    width: 30px;
    border-radius: 5px;
  }

  .header {
    height: 50px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px var(--el-menu-border-color);
  }
  .content-wrappre {
    max-height: 77vh;
    overflow: auto;
  }
  .content {
    width: 800px;
    margin: 20px auto;

    .message-block {
      & > div {
        margin-bottom: 20px;
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }
      .message-content {
        background-color: white;
        width: fit-content;
        border-radius: 12px;
        padding: 12px;
      }
      .user {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
  }
  :deep {
    .el-input {
      height: 50px;
      border-radius: 5px;
    }
  }
  .footer-container {
    position: relative;
    .send-btn {
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
