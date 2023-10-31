<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { robotTypes, robotsApi } from '@/api/robot'

const router = useRouter()

// 机器人分类
const robotType = ref(0)
const robotTyps = ref([])
const getTypes = async () => {
  let res = await robotTypes()
  robotTyps.value = res.data
  robotTyps.value.unshift({ label: '全部', type: 0 })
}

// 查询所有机器人
const keyword = ref('')
const robots = ref([])
const getList = async () => {
  let res = await robotsApi({ label: keyword.value, type: robotType.value })
  robots.value = res.data
}

const gotoPage = ({ url }) => {
  console.log(url)
  router.push({ name: url })
}

onMounted(() => {
  getTypes()
  getList()
})
</script>
<template>
  <div class="square">
    <el-input v-model="keyword" placeholder="搜索机器人" @input="getList" clearable size="large" />

    <!-- 机器人分类信息 -->
    <el-tabs v-model="robotType" type="card" class="demo-tabs" @tab-change="getList">
      <el-tab-pane v-for="item in robotTyps" :key="item.type" :name="item.type" :label="item.label">
        <el-row :gutter="20" class="square-row">
          <el-col :span="4">
            <el-card
              shadow="always"
              class="robot"
              @click="createRobot"
              :body-style="{ padding: '0px', height: '280px' }"
            >
              <template #header>
                <span>创建机器人</span>
              </template>
              <div class="plus-image-wrapper">
                <img src="@/assets/add.svg" class="plus-image" />
              </div>
            </el-card>
          </el-col>
          <el-col :span="4" v-for="item in robots" :key="item.id">
            <el-card
              shadow="always"
              class="robot"
              @click="gotoPage(item)"
              :body-style="{ padding: '0px', height: '280px' }"
            >
              <template #header>
                <span>{{ item.label }}</span>
              </template>
              <img :src="'https://robohash.org/' + item.id" class="robot-image" />
              <div class="icons">
                <div>
                  <el-icon><View /></el-icon>
                  <span>1.2K</span>
                </div>
                <div>
                  <el-icon><Star /></el-icon>
                  <span>20</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss" scoped>
.square {
  padding: 20px;
  .demo-tabs {
    margin-top: 20px;
  }
  .robot {
    cursor: pointer;
    position: relative;
    .icons {
      position: absolute;
      bottom: 5px;
      right: 5px;
      display: flex;
      gap: 10px;
      > div {
        display: flex;
        gap: 2px;
        align-items: center;
      }
    }
  }
  .robot-image {
    width: 100%;
    height: 100%;
  }
  .plus-image-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .plus-image {
      width: 150px;
    }
  }
}
</style>
