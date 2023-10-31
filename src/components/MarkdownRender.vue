<script setup>
import { computed, onMounted } from 'vue'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

// import mdInCode from '@/utils/mdInCode' // 用于判断是否显示光标

const props = defineProps({
  // 输入的 markdown 文本
  text: {
    type: String,
    default: ''
  },
  // 是否需要显示光标？比如在消息流结束后是不需要显示光标的
  showCursor: {
    type: Boolean,
    default: true
  }
})

// 计算最终要显示的 html 文本
const html = computed(() => {
  // 将 markdown 转为 html
  function trans(text) {
    return marked.parse(text)
  }
  // 父组件明确不显示光标
  return trans(props.text)
})
</script>

<template>
  <div v-html="html" v-highlight></div>
</template>

<style lang="scss" scoped></style>
